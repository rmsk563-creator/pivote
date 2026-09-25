#!/bin/bash
# Captura una página por tramos de ALTO px en un ancho exacto: _qa/tramos.sh pagina.html ancho [alto] [tramos]
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
p=$1; w=$2; alto=${3:-1400}; n=${4:-8}
cd "$(dirname "$0")/.."; mkdir -p _qa/capturas
v=$(( w < 500 ? 500 : w ))
for i in $(seq 0 $((n-1))); do
  y=$(( i * alto ))
  "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=$v,$alto --virtual-time-budget=5000 \
    --screenshot="_qa/capturas/tramo-$(echo $p|tr '/' '_'|sed 's/.html//')-$w-$i.png" "http://127.0.0.1:8123/_qa/marco.html?pagina=$p&ancho=$w&alto=$alto&y=$y" 2>/dev/null
done
