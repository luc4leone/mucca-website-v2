#!/usr/bin/env python3
"""Normalizza la tipografia del copy: caratteri veri, non entità né ASCII.

La regola sta in CLAUDE.md, sezione "Convenzioni tipografiche". Qui c'è la
sua applicazione meccanica, usata in due modi:

    python3 tools/tipografia.py --check .      # dice cosa non va, non tocca
    python3 tools/tipografia.py file.html      # corregge sul posto

Il secondo modo è quello che chiama l'hook in .claude/settings.json dopo
ogni scrittura di un .html o .md.

Le zone di codice sono intoccabili: dentro <pre>, <code>, <script>, <style>,
i commenti HTML e i blocchi/backtick del Markdown, "->" è notazione e le
entità sono l'esempio che si sta mostrando. Il file viene spezzato su quelle
zone e solo i pezzi di prosa vengono riscritti.
"""

import re
import sys
from pathlib import Path

# Le uniche entità che restano: le tre che l'HTML richiede per non
# confondere il markup, e lo spazio unificatore, che da carattere vero
# sarebbe invisibile nell'editor e indistinguibile da uno spazio normale.
CONSERVA = {"&amp;", "&lt;", "&gt;", "&quot;", "&apos;", "&nbsp;"}

ENTITA = {
    "&rsquo;": "’", "&lsquo;": "‘",
    "&rdquo;": "”", "&ldquo;": "“",
    "&mdash;": "—", "&ndash;": "–",
    "&hellip;": "…",
    "&rarr;": "→", "&larr;": "←",
    "&uarr;": "↑", "&darr;": "↓",
    "&bull;": "•", "&middot;": "·",
    "&euro;": "€", "&pound;": "£", "&deg;": "°",
    "&times;": "×", "&ne;": "≠", "&le;": "≤", "&ge;": "≥",
    "&laquo;": "«", "&raquo;": "»",
    "&lsaquo;": "‹", "&rsaquo;": "›",
    "&agrave;": "à", "&egrave;": "è", "&eacute;": "é",
    "&igrave;": "ì", "&ograve;": "ò", "&ugrave;": "ù",
    "&Agrave;": "À", "&Egrave;": "È", "&Eacute;": "É",
    "&Igrave;": "Ì", "&Ograve;": "Ò", "&Ugrave;": "Ù",
    "&ccedil;": "ç", "&ntilde;": "ñ", "&uuml;": "ü",
    "&copy;": "©", "&reg;": "®", "&trade;": "™",
}

# Entità numeriche: si risolvono tutte, tranne quelle che coincidono con le
# entità da conservare e tranne i caratteri di controllo.
NUMERICA = re.compile(r"&#(x[0-9a-fA-F]+|[0-9]+);")
INTOCCABILI = {0x26, 0x3c, 0x3e, 0x22, 0x27, 0xa0}

PROTETTE_HTML = re.compile(
    r"<pre\b.*?</pre>|<code\b.*?</code>|<script\b.*?</script>"
    r"|<style\b.*?</style>|<!--.*?-->",
    re.DOTALL | re.IGNORECASE,
)
PROTETTE_MD = re.compile(r"^```.*?^```|`[^`\n]+`", re.DOTALL | re.MULTILINE)

# La freccia in prosa. Non tocca "-->" (chiusura di commento) né "<-".
FRECCIA = re.compile(r"(?<![-<!])->")

SALTA = ("assets/", "export-md/", ".editor-backup/", "node_modules/", ".git/")


def normalizza_prosa(testo: str) -> str:
    for entita, carattere in ENTITA.items():
        testo = testo.replace(entita, carattere)

    def numerica(m):
        grezzo = m.group(1)
        punto = int(grezzo[1:], 16) if grezzo[0] in "xX" else int(grezzo)
        if punto in INTOCCABILI or punto < 0x20:
            return m.group(0)
        return chr(punto)

    testo = NUMERICA.sub(numerica, testo)
    return FRECCIA.sub("→", testo)


def normalizza(testo: str, suffisso: str) -> str:
    protette = PROTETTE_HTML if suffisso == ".html" else PROTETTE_MD
    fuori = []
    posizione = 0
    for m in protette.finditer(testo):
        fuori.append(normalizza_prosa(testo[posizione:m.start()]))
        fuori.append(m.group(0))
        posizione = m.end()
    fuori.append(normalizza_prosa(testo[posizione:]))
    return "".join(fuori)


def da_controllare(percorso: Path):
    if percorso.is_dir():
        for p in sorted(percorso.rglob("*")):
            if p.suffix in (".html", ".md") and not any(
                s in p.as_posix() for s in SALTA
            ):
                yield p
    elif percorso.suffix in (".html", ".md"):
        yield percorso


def main(argv):
    solo_check = "--check" in argv
    bersagli = [a for a in argv if not a.startswith("--")] or ["."]
    fuori_regola = []

    for bersaglio in bersagli:
        for p in da_controllare(Path(bersaglio)):
            try:
                originale = p.read_text(encoding="utf-8")
            except (UnicodeDecodeError, OSError):
                continue
            corretto = normalizza(originale, p.suffix)
            if corretto == originale:
                continue
            fuori_regola.append(p)
            if not solo_check:
                p.write_text(corretto, encoding="utf-8")

    if not fuori_regola:
        return 0
    verbo = "da correggere" if solo_check else "corretti"
    print(f"tipografia: {len(fuori_regola)} file {verbo}", file=sys.stderr)
    for p in fuori_regola:
        print(f"  {p}", file=sys.stderr)
    return 1 if solo_check else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
