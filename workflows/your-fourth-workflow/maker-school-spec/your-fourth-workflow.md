Time to build a real CRM pattern that I sell all the time: we're going to take an external event (a calendar booking) and use it to update an entry in our CRM (ClickUp), automatically.

You'll learn:





How to catch bookings instantly using webhooks like we talked about (no polling waste).



A simple, "find-or-create" pattern I use all the time when building CRM flows.



How to update status/enrich a record/trigger downstream actions on stage change.

Why this matters: bookings are high-intent, and CRMs are common problem areas for clients. Often, they have no single source of truth. If you can create one for them by tying together calendar bookings, CRM updates, and sales calls, you add tremendous value (and can justify a big price!)

The flow (TLDR)

Here's what our flow is going to look like:





Trigger: Calendly or Cal.com—whatever you use—will send a webhook on booking created.



Find-or-create in ClickUp: we'll then locate the contact/task by email. If it's missing, we'll create it using an IF node to handle the branching logic.



Update: we'll set the stage/status, assign the owner, set a due date, and attach meeting metadata before logging notes.



Notify: we'll post to Slack.



Stage-change trigger: separately, we'll watch ClickUp status changes to kick off next steps.

Bottom line: this workflow has tons of value. Let's get into building it!
