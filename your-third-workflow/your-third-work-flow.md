Next, we're going to build a proposal generator that goes from form fill → AI-written proposal content (JSON) → a polished deck in Google Slides.

Then I'll show you the same pattern with a more sophisticated proposal generation platform (PandaDoc) for teams that want e-signatures, pricing tables, and approvals. n8n makes that part a little more complicated (mostly because of the HTTP request structure), but it's important you see it built at least once before we proceed.

Why this matters: proposals are repetitive. B2B clients often spend a ton of time and money on these things, and would prefer consistency, speed, and a clean handoff. 

This system lets you generate client-ready assets in minutes with minimal manual work. In my experience, clients love this system—I have, no joke, sold it hundreds of times!

The flow (TLDR)

Here's what our flow is going to look like when all is said and done:





Trigger: n8n form node capturing "New response."



OpenAI Node: Generate proposal content as strict JSON using what we learned in the last module.



Google Slides Node: "Create presentation from template," map placeholders.



Slack/Email Node: Send notification with the final deck link.

Afterwards, we'll swap Slides for PandaDoc to handle pricing tables and e-signature.

It seems complex—but this is one of the easiest, straightest line systems you will ever build! Let's get into it.
