# Marketing — azioni

Derivato da `strategia-marketing.md` (analisi e motivazioni). Questo file è solo *cosa fare, quando, e cosa è deciso*. Principio: contenuti imperfetti pubblicati battono contenuti perfetti in bozza.

Oggi: **venerdì 18 settembre 2026**. Prima live: **mercoledì 7 ottobre** — mancano **19 giorni**. Obiettivo immediato: **la lista LinkedIn esiste e i primi DM partono questa settimana.**

> **Nota di riallineamento (18 settembre 2026).** La versione precedente di questo file portava ancora il calendario vecchio — live il 14/21/28 ottobre e il 4 novembre, partenza il 16 novembre — mentre `strategia-marketing.md` §8, il sito e `garanzia.html` dicono da giorni **live il 7/14/21/28 ottobre e partenza il 9 novembre**. Era il file da cui si prendono le date per i DM: una settimana di errore in un messaggio di outreach non si recupera. Il calendario qui sotto è quello vero.

## Le date

| Data | Cosa |
| --- | --- |
| ven 18 set | Landing aggiornata online (hero, video, FAQ, garanzia) |
| 18-25 set | Lista LinkedIn + primi 5-10 DM al giorno, primi ~100 nomi |
| ven 25 set | Prima correzione del messaggio, con i numeri in mano |
| entro 1 ott | Apertura Skool (community + casa dei replay) |
| lun 5 ott | **Checkpoint**: quanti iscritti al pre-corso |
| mer 7 ott | Live 1 — Il form di registrazione, in stile Design Engineer |
| mer 14 ott | Live 2 — Il caso Leap: il portfolio conta più dell'esperienza |
| mer 21 ott | Live 3 — Come ho trovato i miei primi 5 clienti |
| mer 28 ott | Live 4 — Come funziona il corso + **offerta**. Da qui si bloccano i posti |
| 28 ott - 6 nov | Finestra di chiusura iscrizioni |
| lun 9 nov | **Partenza corso** (12 posti) |
| 21 dic - 6 gen | Pausa natalizia |
| fine feb 2027 | Fine corso |

## Il vincolo, detto in chiaro

`strategia-marketing.md` §8: per 12 studenti servono **60-80 iscritti al pre-corso**, cioè **400-600 contatti**. LinkedIn permette ~100-200 inviti a settimana. Da oggi alla prima live ci sono 19 giorni: il tetto fisico è **~270-540 contatti**, e solo partendo subito e senza saltare un giorno.

Questo non cambia il calendario — l'outreach non si ferma quando parte il pre-corso, e chi arriva tardi recupera dai replay. Cambia lo scenario centrale: **la prima classe sarà probabilmente più piccola di 12**, e le 4 live registrate diventano l'asset della coorte 2. §8 lo prevedeva già come esito accettabile («un pre-corso con 20 iscritti si tiene lo stesso e produce le registrazioni per la coorte 2»).

La decisione da prendere adesso, non a metà ottobre: **si parte anche con meno di 12?** Se sì, qual è il numero sotto il quale invece si rimanda.

## Decisioni prese (i 10 dubbi della §12.3, chiusi l'11 settembre)

- **D1 · La landing vende il pre-corso.** Una sola CTA in tutta la pagina: iscriviti al pre-corso gratuito. Prezzo, ammissione e garanzia restano visibili come informazione, senza bottone. Dal 28 ottobre la CTA diventa l'iscrizione al corso: è una modifica di una riga.
- **D2 + D3 · Le 3 lezioni già scritte diventano le prime 3 live.** Live 1: il form di registrazione come lo farebbe un Design Engineer (il workflow con AI). Live 2: il caso Leap — il portfolio conta più dell'esperienza. Live 3: i miei primi 5 clienti — non vendevo design, vendevo risultati (mercato internazionale, freelance). Live 4: come funziona il corso, il journal, il metodo, Q&A, offerta.
- **D4 · La tagline resta "Diventa Design Engineer".**
- **D5 · L'internazionale sta in una riga dell'hero**, come uno degli esiti, non come titolo. Peso pieno in `garanzia.html`.
- **D6 · L'iscrizione al pre-corso è il form Netlify già esistente** (email) → atterra su `mini-corso/index.html` riadattata a pagina di conferma. ✅ **Fatto il 18 settembre**: la pagina ora conferma l'iscrizione, elenca le 4 date con i titoli, dice che il link arriva via email e spiega i replay.
- **D7 · Il prezzo si mostra subito.**
- **D8 · Soglie della garanzia** → **superata.** La fonte di verità è `garanzia.html`, che è più recente e più severa della bozza che stava in fondo a questo file. Vedi la sezione "Garanzia" qui sotto.
- **D9 · Le prove di esito non bloccano il lancio.** ⚠️ I 3 studenti dell'anno scorso non sono ancora stati chiamati. La gallery dei progetti studenti invece è in pagina: è arrivata prima del previsto.
- **D10 · La garanzia non sta nell'hero.** Sta accanto al prezzo e nella sua sezione.

Altre decisioni operative:

- **Deploy su Netlify.** ✅ Fatto: `www.mucca.design`, repo `luc4leone/mucca-website-v2`, deploy automatico da `main`.
- **La landing alla radice** → **cambiata**: `index.html` è rimasto un biglietto da visita e la landing del corso vive su `/master-ux-ui.html`. Il traffico arriva dal link diretto nei DM, non dalla radice. `content.html` è stato rimosso il 18 settembre.
- **Tieni un journal dell'outreach tu** — `outreach.md` in questo repo, con commit giornalieri: contatti, risposte, click, iscritti. È la metrica del checkpoint del 5 ottobre, ed è la stessa cosa che chiederai agli studenti nel Modulo 3.

## Stato: cosa è pronto e cosa manca

**Pronto e online**: landing con hero nuovo e video introduttivo, `garanzia.html` per esteso, FAQ, gallery dei progetti degli studenti, le tre recensioni con foto, pagina di conferma dell'iscrizione, i due form Netlify.

**Manca, in ordine di urgenza:**

- [ ] **Lista LinkedIn**: i primi ~100 nomi in `outreach.md`. È il collo di bottiglia: senza lista non parte niente.
- [ ] **Primi DM** (messaggio v2 qui sotto).
- [ ] **Notifica Netlify sulle submission**: verificare nel pannello che arrivi un'email a ogni iscrizione. Con l'invio manuale è l'unica cosa che ti dice che qualcuno si è iscritto.
- [ ] **Post pubblico LinkedIn** che annuncia il pre-corso con le date.
- [ ] **Skool** entro il 1 ottobre: serve come casa dei replay dal 7 ottobre in poi.
- [ ] **Setup della live**: quale piattaforma, come si registra, dove finisce il replay. Da chiudere prima del 5 ottobre, non il 7.
- [ ] **Email promemoria Live 1**, scritta a mano agli iscritti, ~2 giorni prima.
- [ ] Chiamare i 3 studenti dell'anno scorso (D9): before/after. Non blocca niente, ma è la prova più forte che manca in pagina.
- [ ] Scaletta dettagliata della Live 1.

## Il messaggio LinkedIn

### Chi cercare

Il target sono **alumni Boolean UX/UI che non sono stati miei studenti diretti**. Non si trovano per keyword: LinkedIn quel dato ce l'ha strutturato nel campo *Formazione*, non nel testo del profilo.

1. **Via principale** — la pagina scuola di Boolean → sezione **Persone**: è la lista degli alumni, filtrabile. Più preciso di qualsiasi keyword, e non dipende da come ognuno ha scritto il proprio titolo.
2. **Via secondaria** — ricerca Persone con filtro **Scuola = Boolean** + località Italia, usando la keyword (`UX`, `UI`, `product design`) solo come raffinamento.
3. **Terza via, quando la lista Boolean si esaurisce** — ricerca Persone per titolo (`UX designer`, `UI designer`, `junior product designer`) + Italia, scremando a mano chi è senior.

**Ordine di contatto**: i primi ~100 **non sono i contatti migliori**. Il messaggio si testa su un sottoinsieme; i nomi più promettenti restano intatti per quando il messaggio è quello giusto (§8, "non bruciare la lista in due settimane").

### Richiesta di connessione (max 300 caratteri, nessun link)

> Ciao [nome], anch'io Boolean — ci ho insegnato UX/UI. Mi fa piacere restare in contatto con chi è passato da lì.

### DM v2 — dopo l'accettazione (18 settembre 2026)

Più corto della v1: si legge in una notifica sul telefono, e arriva al punto in tre righe invece che in sette. Un problema solo invece di tre, la data esatta invece di "a ottobre", e il link con l'UTM — senza, la metrica "click sulla landing" non esiste.

> Ciao [nome], grazie del collegamento.
>
> Sono rimasto in contatto con parecchi ex studenti Boolean, e la frase che mi sento ripetere più spesso è sempre quella: «mando candidature e non risponde nessuno».
>
> A ottobre tengo 4 live gratuite in cui faccio vedere come lavoro — la prima è mercoledì 7. Se ti va: https://www.mucca.design/master-ux-ui.html?utm_source=linkedin&utm_medium=dm
>
> Nessun impegno, e i replay restano.

### DM v1 — la bozza dell'11 settembre (tenuta per confronto)

Non si cancella: quando arriveranno i numeri serve per capire cosa è cambiato. **Attenzione: conteneva implicitamente il calendario sbagliato.**

> Ciao [nome], ho visto che hai fatto il corso UX/UI di Boolean — ci ho insegnato per un po' e sono rimasto in contatto con parecchi ex studenti. Quasi tutti mi raccontano gli stessi 3 problemi dopo il corso: come usare l'AI per disegnare interfacce sul serio, un portfolio che non convince, e candidature che non rispondono.
>
> A ottobre tengo 4 live gratuite, una a settimana, in cui mostro come lavoro io su queste tre cose. Se ti interessa: [link]
>
> Nessun impegno, e i replay restano disponibili.

## Il ritmo

| Settimana | Outreach | Altro |
| --- | --- | --- |
| 18-25 set | Costruire la lista + 5-10/giorno sui primi ~100 | Notifica Netlify, post pubblico LinkedIn. Osservare cosa risponde la gente |
| 26 set - 4 ott | 15-20/giorno col messaggio corretto | Aprire Skool. Setup della live. Scaletta Live 1 |
| 5-11 ott | continua | **Checkpoint lun 5**. Email promemoria. **Live 1 mer 7**. Replay entro 24h |
| 12-18 ott | continua | **Live 2 mer 14**. Scaletta Live 3 |
| 19-25 ott | continua | **Live 3 mer 21**. Preparare l'offerta |
| 26 ott - 1 nov | ultimi DM: "ultima live, replay disponibili" | **Live 4 mer 28 + offerta**. Landing: CTA → iscrizione al corso |
| 2-8 nov | stop | Chiusura iscrizioni ven 6. Contratti, pagamenti. Modulo 0 |
| lun 9 nov | — | **Partenza** |

Se l'outreach non produce, la sequenza non cambia: si aggiusta il messaggio, non il calendario.

**Ogni lunedì**: rileggere `outreach.md`, contare, decidere il volume della settimana.

## Metriche (in `outreach.md`, ogni giorno)

- DM inviati
- Connessioni accettate
- Risposte
- Click sulla landing (UTM `?utm_source=linkedin&utm_medium=dm` sul link nel DM)
- Iscritti al pre-corso (dalle notifiche Netlify, campo `origine` per distinguere hero da sezione)

Criteri di diagnosi dalla §1 di `strategia-marketing.md`, da usare così come sono:

- meno di **25 accettazioni su 100** → è il profilo, o la richiesta di connessione
- accettazioni ma meno di **8 risposte** → è il DM
- risposte ma **nessun iscritto** → è la landing

## Garanzia

Le soglie che stavano in fondo a questo file erano una bozza dell'11 settembre, **superata**. La versione pubblicata in `garanzia.html` è più recente e più severa; dove le due divergevano, vale la pagina:

| | bozza dell'11 set | `garanzia.html` (pubblicata) |
| --- | --- | --- |
| Inglese | autodichiarazione B2 | **C1**, più una call di 15 minuti |
| Progetti in portfolio | almeno 3, di cui i 2 del corso | **4**, di cui almeno 3 rifatti col metodo |
| Azioni di ricerca | 10/settimana per 20 settimane su 26 | **10/settimana per 24 settimane su 26** |
| Check-in | 3 (a 2, 4, 6 mesi) | **6, uno al mese** |
| Scadenze | date assolute legate al 16 novembre | relative all'ultima lezione: non si rompono se il calendario si sposta |

Da fare: portare queste condizioni nel contratto, che è l'unico posto dove diventano vincolanti.

## Cosa NON fare

- Non riscrivere la tagline
- Non rifare il video
- Non rifinire ancora `garanzia.html`: si corregge col contratto in mano
- Non aspettare i 3 studenti per mandare i DM
- Non costruire la lista intera prima di mandare il primo messaggio: 30 nomi bastano per partire
