# Netlify o Vercel: mini corso e form, senza backend

## Il bisogno

Un mini corso (video + testo) come lead magnet gratuito, senza backend e senza piattaforme terze tipo Teachable. Stack semplice, coerente col resto del progetto.

## Il mini corso: come funziona senza backend

- Pagine HTML statiche, una per lezione.
- Video ospitati su YouTube/Vimeo in modalità **unlisted**, embeddati via iframe — nessun hosting video da gestire.
- Testo direttamente nell'HTML.

Flusso completo:

1. L'utente inserisce l'email in un form (lead magnet).
2. Il form invia la submission, il browser reindirizza a una pagina statica con l'indice delle lezioni.
3. Ogni lezione linka/embedda il video YouTube unlisted corrispondente, più testo.

Nota: un link "unlisted" non è vera sicurezza (chiunque abbia il link accede) e non c'è sync dei progressi tra dispositivi (al massimo `localStorage`). Accettabile per un lead magnet gratuito, non per contenuto a pagamento con vero controllo accessi.

## Netlify Forms

- Si aggiunge `data-netlify="true"` al `<form>` HTML, più un campo nascosto `form-name`. Nessun backend richiesto.
- Al deploy, Netlify scansiona l'HTML pubblicato e registra il form — funziona anche su sito statico puro, senza build step.
- Alla submission, Netlify la salva in dashboard e può notificare (email, Slack, webhook).
- Piano gratuito con limite di submission mensili (verificare i numeri attuali). Honeypot anti-spam e reCAPTCHA opzionale inclusi.
- **Non manda automaticamente un'email al lead** con un link di accesso: notifica solo te. Il modo standard è il redirect immediato dopo l'invio (via `action` del form) verso la pagina statica con l'indice delle lezioni.
- Non verifica che l'email sia reale: è cattura del campo, non un vero double opt-in.

## Equivalente su Vercel

Vercel non ha un servizio nativo equivalente. Opzioni:

- Una **serverless function** Vercel che riceve la POST e la inoltra altrove — è comunque un po' di backend da scrivere e mantenere.
- Un **servizio esterno solo per il form** (Formspree, Basin, GetForm): l'`action` del form punta al loro endpoint, zero codice server. Funziona identico su Netlify o Vercel.

Distinzione importante rispetto a Teachable: questi servizi form-only non possiedono il corso né la UX, gestiscono solo l'invio di un form — zero lock-in sul contenuto.

## I tre form della pagina, ridotti a due categorie

### Categoria 1: "cattura e avvisami" — lead magnet + "lascia messaggio"

Stesso pattern per entrambi: submission → notifica a te → rispondi/agisci manualmente. Nessuna lista, nessun invio ricorrente. Netlify Forms (o Formspree) gestisce entrambi senza differenza — due form distinti per `name`, stesso account.

Il form "lascia messaggio", essendo testo libero aperto al pubblico, è più esposto a spam di un form solo-email: attivare honeypot/reCAPTCHA.

### Categoria 2: "costruisci una lista e invia" — newsletter

Bisogno diverso: serve invio ricorrente, non solo cattura. Netlify Forms/Formspree salvano submission ma non mandano email — costruire l'invio da zero (deliverability, SPF/DKIM, bounce) non ha senso per questo progetto.

Serve un **ESP** (email service provider) dedicato — Buttondown, ConvertKit, Mailchimp (piano free): form HTML embeddabile (zero backend), gestione lista, editor per comporre e inviare la newsletter. Terze parti, ma categoria diversa da Teachable: possiede solo la lista email, non la landing page né il corso.

### Riepilogo

- **Netlify Forms o Formspree**: lead magnet + "lascia messaggio" (2 form, stesso strumento).
- **ESP dedicato**: newsletter (1 form, strumento separato).

Due strumenti in totale, non tre.

## Raccomandazione: Netlify

Per questo progetto Netlify è la scelta più semplice: gestisce form nativamente, eliminando la necessità di un servizio esterno per lead magnet e "lascia messaggio". Deploy statico e branch deploy per confrontare varianti funzionano in modo equivalente su entrambe le piattaforme — quindi l'unico differenziale concreto pesa a favore di Netlify.

Tradeoff: Vercel è generalmente più forte su performance edge e integrazione con framework (Next.js in particolare) — non rilevante qui, dato che il sito resta vanilla HTML/CSS/JS senza framework. Se in futuro si introducesse un framework o una serverless function, la scelta andrebbe riconsiderata.
