# Marketing — azioni

Derivato da `strategia-marketing.md` (analisi e motivazioni). Questo file è solo *cosa fare, quando, e cosa è deciso*. Principio: contenuti imperfetti pubblicati battono contenuti perfetti in bozza.

Oggi: **venerdì 11 settembre 2026**. Obiettivo: **lunedì 14 landing pubblica + primi DM LinkedIn.**

## Le date

| Data | Cosa |
| --- | --- |
| lun 14 set | Landing online, primi 5-10 DM |
| lun 5 ott | Checkpoint: iscritti al pre-corso |
| mer 14 ott | Live 1 |
| mer 21 ott | Live 2 |
| mer 28 ott | Live 3 |
| mer 4 nov | Live 4 + offerta |
| 4-13 nov | Chiusura iscrizioni |
| lun 16 nov | Partenza corso (12 posti) |
| ~21 dic - 6 gen | Pausa natalizia |
| fine feb 2027 | Fine corso |

## Decisioni prese (i 10 dubbi della §12.3, chiusi)

Prese oggi con criterio "agire subito". Ogni riga è cambiabile, ma da lunedì si parte così.

- **D1 · La landing vende il pre-corso.** Una sola CTA in tutta la pagina: iscriviti al pre-corso gratuito. Prezzo, ammissione e garanzia restano visibili come informazione, senza bottone. Il bottone "Prenota il tuo posto" sparisce. Dal 4 novembre la CTA diventa l'iscrizione al corso: è una modifica di una riga.
- **D2 + D3 · Le 3 lezioni già scritte diventano le prime 3 live.** Live 1: il form di registrazione come lo farebbe un Design Engineer (il workflow con AI). Live 2: il caso Leap — il portfolio conta più dell'esperienza. Live 3: i miei primi 5 clienti — non vendevo design, vendevo risultati (mercato internazionale, freelance). Live 4: come funziona il corso, il journal, il metodo, Q&A, offerta.
- **D4 · La tagline resta "Diventa Design Engineer".** Non si cambia l'identità della pagina tre giorni prima del lancio.
- **D5 · L'internazionale sta in una riga dell'hero**, come uno degli esiti, non come titolo. Peso pieno in `garanzia.html`.
- **D6 · L'iscrizione al pre-corso è il form Netlify già esistente** (email) → atterra su `mini-corso/index.html` riadattata a pagina di conferma (date, "ricevi il link Zoom via email", replay dopo ogni live). Skool si apre entro il 1 ottobre, non serve per lunedì.
- **D7 · Il prezzo si mostra subito.** La trasparenza è metà del posizionamento; chi non può permetterselo non perde 4 serate.
- **D8 · Soglie della garanzia: quelle in fondo a questo file.** Sono default ragionevoli, da correggere se non ti convincono, ma da lunedì `garanzia.html` le pubblica con la dicitura "condizioni definitive nel contratto".
- **D9 · Le prove di esito non bloccano il lancio.** Si chiamano i 3 studenti dell'anno scorso nel weekend; se rispondono, entrano in pagina quando ci sono. Il carousel dei progetti studenti si rimanda alla coorte 2.
- **D10 · La garanzia non sta nell'hero.** Sta accanto al prezzo e nella sua sezione. L'hero parla del contenuto.

Altre decisioni operative prese oggi:

- **Deploy su Netlify** (i form sono già `data-netlify`). Il repo non ha remote né config: si crea sabato.
- **`content.html` diventa `index.html`** (o redirect): la landing deve stare alla radice del dominio.
- **Tieni un journal dell'outreach tu** — un file in questo repo, con commit giornalieri: contatti, risposte, click, iscritti. È la metrica del checkpoint del 5 ottobre, ed è la stessa cosa che chiederai agli studenti.

## Piano fino a lunedì

### Venerdì 11 (oggi) — copy

- [ ] `content.md`: riscrivere le sezioni secondo M1-M9, N2, N4, N5 di `strategia-marketing.md` §12
  - [ ] hero: una riga "per chi / cosa" + CTA pre-corso
  - [ ] "Mini corso gratis" → "Pre-corso gratuito", 4 live con date e titoli
  - [ ] "Per chi NON è il corso giusto": riscrivere la riga sul supporto carriera
  - [ ] Modulo 3: da elenco di domande a modulo con consegne (portfolio HTML, journal, mercato internazionale, inglese)
  - [ ] "Come insegno": una riga su journal e time tracking
  - [ ] date: 16 novembre → fine febbraio, pausa natalizia
  - [ ] processo di ammissione senza call obbligatoria
  - [ ] sezione garanzia: una riga + link
  - [ ] FAQ garanzia (4-5 domande)
- [ ] `content.html`: allineare a `content.md`, togliere il bottone "Prenota il tuo posto"
- [ ] `mini-corso/index.html` → pagina di conferma iscrizione al pre-corso

### Sabato 12 — garanzia, video, lista

- [ ] `garanzia.html`: condizioni per esteso (soglie in fondo a questo file)
- [ ] Video introduttivo: scroll della landing con voce. Una ripresa, senza montaggio. Caricare su Vimeo (già usato in pagina) e incorporare nell'hero
- [ ] Lista LinkedIn: primi 100 nomi (alumni Boolean UX/UI **non** miei ex studenti diretti), in un file nel repo
- [ ] Messaggio DM: versione 1 (bozza in fondo a questo file), da testare sui primi 100

### Domenica 13 — pubblicazione

- [ ] Creare repo GitHub, collegare Netlify, deploy
- [ ] `content.html` → `index.html` alla radice
- [ ] Testare i due form Netlify (pre-corso, lascia un messaggio) con un invio reale
- [ ] Testare la pagina da mobile: è da lì che la aprono dal DM LinkedIn
- [ ] Chiamare i 3 studenti dell'anno scorso: dove sono, cosa fanno, mi dai un before/after
- [ ] Rilettura finale della pagina da cima a fondo. Poi si pubblica com'è

### Lunedì 14 — si parte

- [ ] 5-10 DM ai primi contatti della lista (non ai migliori: vedi §8 di `strategia-marketing.md`)
- [ ] Journal outreach: prima voce
- [ ] Post pubblico LinkedIn che annuncia il pre-corso con le date

## Piano settimanale fino al 16 novembre

Ogni **lunedì**: rileggere il journal outreach, contare (inviati / accettati / risposte / click / iscritti), decidere il volume della settimana.

| Settimana | Outreach | Altro |
| --- | --- | --- |
| 14-20 set | 5-10/giorno, primi 100 | Osservare cosa risponde la gente. Correggere il messaggio a fine settimana |
| 21-27 set | 10-15/giorno con il messaggio corretto | Post LinkedIn 2×. Chiedere referral ai 3 studenti |
| 28 set - 4 ott | 15-20/giorno | Aprire Skool (community + posto per replay). Scaletta dettagliata Live 1 |
| 5-11 ott | 15-20/giorno | **Checkpoint 5 ott**: quanti iscritti al pre-corso. Email promemoria Live 1 |
| 12-18 ott | continua | **Live 1 mer 14**. Replay su Skool entro 24h. Email replay |
| 19-25 ott | continua | **Live 2 mer 21**. Scaletta Live 3 |
| 26 ott - 1 nov | continua | **Live 3 mer 28** |
| 2-8 nov | ultimi DM: "ultima live, replay disponibili" | **Live 4 mer 4 + offerta**. Landing: CTA → iscrizione al corso. Email offerta a chi ha visto solo i replay |
| 9-15 nov | stop | Chiusura iscrizioni ven 13. Contratti, pagamenti. Preparazione Modulo 0 |
| lun 16 nov | — | **Partenza** |

Se l'outreach non produce, la sequenza non cambia: si aggiusta il messaggio, non il calendario. Un pre-corso con 20 iscritti si tiene lo stesso e produce le registrazioni per la coorte 2.

## Metriche (nel journal outreach, ogni giorno)

- DM inviati
- Connessioni accettate
- Risposte
- Click sulla landing (UTM `?utm_source=linkedin&utm_medium=dm` sul link nel DM)
- Iscritti al pre-corso (dalle notifiche Netlify)

Numeri di riferimento dalla §1 di `strategia-marketing.md`: se dopo 100 DM hai meno di 25 accettazioni, è il profilo/richiesta; se hai accettazioni ma meno di 8 risposte, è il messaggio; se hai risposte ma nessun iscritto, è la landing.

## Bozza messaggio LinkedIn (v1, da testare sui primi 100)

Da mandare **dopo** l'accettazione della connessione, non nella richiesta. Corto: si legge su mobile in una notifica.

> Ciao [nome], ho visto che hai fatto il corso UX/UI di Boolean — ci ho insegnato per un po' e sono rimasto in contatto con parecchi ex studenti. Quasi tutti mi raccontano gli stessi 3 problemi dopo il corso: come usare l'AI per disegnare interfacce sul serio, un portfolio che non convince, e candidature che non rispondono.
>
> A ottobre tengo 4 live gratuite, una a settimana, in cui mostro come lavoro io su queste tre cose. Se ti interessa: [link]
>
> Nessun impegno, e i replay restano disponibili.

Richiesta di connessione (300 caratteri max): una riga, il gancio Boolean, niente link.

> Ciao [nome], anch'io Boolean — ci ho insegnato UX/UI. Mi fa piacere restare in contatto con chi è passato da lì.

## Soglie della garanzia (default per `garanzia.html`)

Tutte verificabili senza giudizio a posteriori. Da correggere se non ti convincono; da lunedì si pubblicano queste.

**Chi può accedere alla garanzia**
- Iscritto alla classe del 16 novembre 2026, in regola coi pagamenti
- Inglese: autodichiarazione livello B2 + colloquio di 15 minuti in inglese con me prima della partenza. Chi non lo supera fa il corso normalmente, senza garanzia, e lo sa dal primo giorno
- Sceglie di cercare lavoro sui mercati internazionali (dipendente remoto o freelance), e lo dichiara all'iscrizione

**Durante il corso (entro il 26 febbraio 2027)**
- Tutte le esercitazioni dei 3 moduli consegnate; massimo 2 in ritardo, nessuna mancante
- Presenza ad almeno il 75% delle lezioni live, oppure replay + consegna dell'esercizio entro la lezione successiva
- Portfolio pubblicato online come pagina HTML (non PDF), con almeno 3 progetti, di cui i 2 del corso (Coffee Machine, Press Office) come interfacce interattive funzionanti nel browser
- Revisione finale del portfolio con esito "approvato" entro l'ultima settimana di corso; eventuali correzioni chiuse entro 3 settimane

**Nei 6 mesi successivi (fino al 26 agosto 2027)**
- Journal delle azioni di ricerca in un repository git, con commit in almeno 4 giorni a settimana, per almeno 20 delle 26 settimane
- Almeno 10 azioni documentate a settimana (data, destinatario, canale, link, esito), di cui almeno 5 contatti diretti o proposte — non solo risposte ad annunci — per almeno 20 settimane
- Portfolio online e aggiornato per tutto il periodo
- 3 check-in con me (a 2, 4 e 6 mesi dalla fine del corso), tutti fatti

**Cosa conta come "trovato lavoro"**: qualsiasi lavoro retribuito — dipendente, stage retribuito, part-time, contratto a progetto, freelance — anche non da designer.

**Rimborso**: 100% di quanto pagato, entro 30 giorni dalla richiesta, su presentazione del journal e del portfolio. Richiesta possibile dal 27 agosto al 26 settembre 2027.

## Cosa NON fare entro lunedì

- Non riscrivere la tagline
- Non aprire Skool
- Non montare il video
- Non aspettare le risposte dei 3 studenti per pubblicare
- Non rifinire `garanzia.html` oltre le soglie qui sopra: si corregge dopo, col contratto in mano
