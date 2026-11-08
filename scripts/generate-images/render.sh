#!/bin/bash
# render.sh in.excalidraw out.svg -- subset Excalifont to the text used, render.
set -eu
S=/tmp/claude-1000/-home-razvan-orgs-dc-teaching-so-operating-systems/7f221f6a-cffa-4105-83a5-3261bd069078/scratchpad
in="$1"; out="$2"
chars=$(python3 -I -c "
import json,sys
d=json.load(open(sys.argv[1]))
s=set()
for e in d['elements']:
    if e['type']=='text' and not e.get('isDeleted'): s.update(e['text'])
s.discard('\n')
print(''.join(sorted(s)))
" "$in")
sub="$S/fonts/subset-$$.woff2"
"$S/venv/bin/pyftsubset" "$S/fonts/Excalifont-Regular.woff2" --text="$chars" --flavor=woff2 --output-file="$sub" --no-hinting --desubroutinize 2>/dev/null
node "$S/tools/exc2svg.js" "$in" "$out" --font "$sub"
rm -f "$sub"
