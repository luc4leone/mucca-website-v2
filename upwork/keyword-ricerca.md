# Keyword di ricerca — gig di automazione

Da cosa nascono: i due case study finiti in `automations/index.html` — Trello → SMS
e Modulo → Google Slides — e in particolare la sezione «Automazioni concettualmente
identiche, nella forma diverse» di ciascuno. È lì che sta il bacino vero: la
competenza non è Trello+Twilio, che quasi nessuno cerca con quelle due parole, ma
l'architettura sotto, e ogni variante di quella architettura è una query diversa.

Il principio, che vale più delle liste qui sotto: **i clienti non cercano
«automazione», nominano i loro tool e il loro problema.** Le query che funzionano
sono fatte di nomi propri.

Upwork accetta `OR`, `NOT`, le parentesi e le virgolette per la frase esatta.

## Architettura 1 — evento su un sistema → messaggio, esito riscritto sul sistema

```
n8n AND (Twilio OR SMS OR WhatsApp)
("appointment reminder" OR "no-show" OR "booking confirmation" OR "reminder system") AND (SMS OR WhatsApp OR Twilio)
(Trello OR Airtable OR Calendly OR "Google Calendar" OR HubSpot OR Pipedrive OR GoHighLevel) AND (SMS OR Twilio OR Slack OR notification)
(Typeform OR Jotform OR "Google Forms" OR Stripe) AND (webhook OR notification OR automation)
```

## Architettura 2 — modulo → modello → documento da template → link

```
("proposal" OR "quote" OR "estimate" OR "onboarding") AND (automation OR generator OR template)
("Google Slides" OR "Google Docs" OR PandaDoc OR DocuSign) AND (API OR automation OR template)
("document generation" OR "document automation" OR "report automation")
n8n AND (OpenAI OR GPT OR JSON)
```

## Le keyword singole, per resa

| Priorità | Keyword | Perché |
| --- | --- | --- |
| Alta | `n8n` | La skill dichiarata, ed è il filo conduttore di 2 dei 3 annunci in `upwork-gigs.md` |
| Alta | `Twilio`, `SMS automation`, `WhatsApp automation` | Il lato messaggio del caso 1, più raro e meno affollato di «n8n» secco |
| Alta | `proposal automation`, `document generation` | Il caso 2 ha pochi concorrenti che mostrano un flusso finito |
| Media | `Airtable`, `Trello`, `Calendly`, `GoHighLevel`, `Stripe` | I trigger: ognuno è una variante già costruibile |
| Media | `Google Slides API`, `Google Docs template`, `PandaDoc` | Il lato documento |
| Media | `webhook`, `API integration`, `workflow automation` | Generiche: molto volume, molta concorrenza |
| Bassa | `Zapier`, `Make.com` | Moltiplicano il bacino, ma solo se si sanno usare — dai case study risulta solo n8n |

## I gig di riparazione

Il vantaggio competitivo non è tecnico: è la sezione «Un'automazione solida» dei
case study. Gli annunci raccolti finora chiedono «fix», «audit»,
«troubleshooting» — cercano chi sa *perché* un flusso si rompe. La gestione degli
errori scritta sulla card invece che in un log, il JSON Output, il template
impaginato a mano una volta: è roba che quasi nessuno mostra in un portfolio.

```
("fix" OR "debug" OR "troubleshoot" OR "broken" OR "audit") AND (n8n OR Zapier OR Make.com OR automation OR workflow)
```

Gig più piccoli, concorrenza molto più debole, e portano il cliente in casa.

## Cosa filtrare via

Dagli annunci raccolti si vede il tipo di gig che fa perdere tempo: `AI video`,
`voice agent`, e il fisso da 40 dollari «da completare oggi». Sulle query
generiche conviene aggiungere:

```
NOT video NOT voice
```

## Come si aggiorna

Questo file si tiene allineato a `upwork-gigs.md`: quando un annuncio nuovo viene
salvato lì, le parole che il cliente ha usato davvero per descrivere il suo
problema entrano qui. Le liste qui sopra sono dedotte da tre annunci soli — vanno
corrette da come parla il mercato, non da come si descrive il lavoro.
