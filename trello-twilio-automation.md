# Trello → SMS appointment confirmation

Working automation, built 16 September 2026. Source document for the client-facing
page and for the proposals that reuse this flow.

Written in English because it exists to be read by clients, and translating it
twice would be waste. The rest of the repo's documentation stays in Italian.

**Stack**: Trello · n8n Cloud · Twilio
**Cost to run**: n8n Cloud subscription + roughly €0.07 per SMS to Italy. No number
to rent — the flow sends from an alphanumeric sender ID.

---

## The business problem it solves

A team confirms appointments by hand. Somebody looks at the board, sees a booking
has been confirmed, opens WhatsApp or the phone dialler, and types a message. It
works until it doesn't: somebody is off sick, somebody forgets, somebody confirms
at 6pm and sends the text the next morning. The customer turns up on the wrong day,
or doesn't turn up at all.

A no-show costs the full value of the slot. A reminder costs seven cents.

**The design decision that matters is not the SMS — it is the trigger.** The team
already moves the card to *Confirmed* as part of their existing job. That drag is
the only signal the automation needs. Nobody has to learn a new tool, tick a new
box, or remember a new step: the reminder becomes a consequence of work they were
already doing.

This is what makes it stick. Automations that require a new human habit get
abandoned in three weeks. This one has no habit to abandon — if the team stops
moving cards, they have stopped running their business, not just the automation.

---

## What the flow does

```
Trello: card updated                    webhook, fires on any board change
      │
Moved to Confirmed?                     action.type = updateCard
      │                                 AND listAfter.name = "confirmed"
      ├── no ──► stop
      │
Get card details                        full card: description + labels
      │
Extract & validate phone                parse, normalise, check the "sent" label
      │
Safe to send?                           valid number AND not already sent
      │
      ├── no ──► Log: not sent          comment on the card, with the reason
      │
      └── yes ─► Send SMS ──┬── ok ────► Mark card as sent   (green label)
                            │
                            └── error ─► Log: send failed     comment with Twilio's error
```

Nine nodes. The SMS body carries the card title, so the customer gets the date and
time that the team actually wrote down — not a generic template.

### Why these choices

**Webhook, not polling.** Trello calls n8n the moment something changes, instead of
n8n asking Trello every few minutes. The reminder arrives in about two seconds, and
the flow doesn't burn API calls all day asking a question whose answer is almost
always "nothing happened".

**The card is fetched, not trusted.** The webhook payload names the card but does
not carry its description or its labels. One extra read gets both — the phone
number and the idempotency check — so the cost is one call, not two.

**The label is the idempotency key.** "Already sent" is not kept in n8n's memory,
where a restart would lose it. It lives on the card itself, where the team can see
it, and where a second run of the flow will find it.

**Errors are written back to the card.** Not to a log file, not to a dashboard
nobody opens. The person who moved the card is the person who needs to know the
text didn't go, and the card is where they are already looking.

**The country code is a constant, not a hard-coded string.** Numbers written
without an international prefix get a configured default. One line to change per
client.

---

## What can go wrong, and what happens

| Failure | What the flow does | What the team sees |
|---|---|---|
| Card has no phone number | Sends nothing | Comment: `no "Phone:" line in the card description` |
| Number written as `339 155 7277` | Normalises to `+393391557277`, sends | Nothing — this is the normal case |
| Number too short or malformed | Sends nothing | Comment: `invalid phone number: …` |
| Card is dragged back and re-confirmed | Sends nothing | Comment: `SMS already sent for this card` |
| Trello fires two events per drag | Filters the position event out | Nothing — one text, not two |
| Card renamed or description edited | Sends nothing | Nothing |
| Twilio rejects the message | Records the rejection | Comment: `SMS send failed — <Twilio's own error>` |
| Card moved to any other list | Sends nothing | Nothing |

**The one that costs real money is the fourth.** Sending a duplicate text is worse
than sending none: it reads as sloppy to the customer, and at volume it is a bill.
The label check is the whole reason the flow is safe to leave running unattended.

**The one that is easiest to get wrong is the fifth.** Dragging a card in Trello
emits two `updateCard` events — one for its position, one for the list change. Only
the second carries `listBefore`/`listAfter`. An implementation that skips that
filter sends every customer two texts, and the bug only shows up in production.

### Honest limits of the current version

These are not handled yet. Each is a decision for the client, not an oversight:

- **No retry.** A failure is recorded, not re-attempted. Adding backoff is
  straightforward; whether a stale reminder should be sent an hour late is a
  business call, not a technical one.
- **No delivery confirmation.** Twilio accepting a message is not the handset
  receiving it. Closing that gap needs a status callback webhook.
- **No quiet hours.** A card confirmed at 2am sends at 2am.
- **No opt-out handling.** Required in most jurisdictions once volume is real, and
  a hard requirement for US traffic.
- **If n8n is unreachable**, Trello retries for a while and then deactivates the
  webhook after repeated failures. Monitoring for that belongs in any production
  version.

---

## Variants of the same flow

The architecture is: **an event in a system of record triggers a message, and the
outcome is written back to the record.** Everything below is that same shape with
different edges — which is what makes it worth building once.

### Different trigger, same message

| Variant | What changes |
|---|---|
| Google Calendar event created | Calendar trigger instead of Trello; attendee's number from the event |
| Airtable / Notion row moves status | Their trigger node; the "sent" flag becomes a checkbox column |
| HubSpot / Pipedrive deal stage change | CRM trigger; contact record already holds the phone number |
| Typeform / Tally submission | Form trigger; confirmation on submit rather than on staff action |
| Stripe payment succeeded | Payment trigger; receipt or booking confirmation |
| Gmail label applied | Gmail trigger; useful when bookings arrive by email |

### Different channel, same trigger

| Variant | What changes |
|---|---|
| WhatsApp instead of SMS | Twilio WhatsApp sender; needs an approved message template |
| Email | Gmail or SendGrid node; no character limit, so richer content |
| Slack or Teams DM | Internal notifications rather than customer-facing |
| Automated voice call | Twilio Voice; for audiences that don't read texts |

### Different timing

| Variant | What changes |
|---|---|
| Reminder 24h before, not on confirmation | A scheduled trigger that queries cards due tomorrow, instead of an event trigger |
| Both: confirm now, remind later | Two flows sharing the same card fields |
| Quiet hours | Queue outside business hours, release in the morning |

### Extra capability

| Variant | What changes |
|---|---|
| **Two-way** — customer replies YES/NO | Inbound webhook from Twilio; the reply moves the card or adds a label. This is the one clients ask for second, and it doubles the value |
| **Escalation** — no reply within 2h | A wait branch; notifies staff so a human can call |
| **Daily digest** — tomorrow's appointments | Scheduled trigger, one message to staff instead of many to customers |
| **Multi-language** | A language field on the card selects the message template |
| **Opt-out** — STOP keyword | Inbound handler labels the contact; the send branch checks it first |
| **Delivery receipts** | Twilio status callback updates the card when a message is undelivered |

### Which variant to lead with

For a first paid job, the two-way version and the 24h-before reminder are the ones
worth naming in a proposal: they are the obvious next questions a client has after
seeing the basic flow, and answering them before they ask is what separates a
consultant from someone who builds what they were told.
