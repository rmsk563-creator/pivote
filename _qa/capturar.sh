#!/bin/bash
# Capturas y medición de desbordes con Chrome headless (D-042 · T-4).
# Uso: _qa/capturar.sh [pagina.html ...]   (por defecto, las 13 páginas)
# Requiere el servidor local: python3 -m http.server 8123 (desde la raíz del proyecto).
# Deja las imágenes en _qa/capturas/ (ignorado por Git) y el informe en _qa/capturas/informe.txt.
set -u
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://127.0.0.1:8123"
ANCHOS="320 360 390 768 834 1024 1280 1440"
cd "$(dirname "$0")/.."
mkdir -p _qa/capturas
PAGINAS=${*:-"index.html servicios.html proyectos.html proyectos/botica-de-barrio.html proyectos/floreria-en-barranco.html proyectos/barberia-con-espera-a-la-vista.html proyectos/cafeteria-de-paso.html como-trabajamos.html estudio.html cotizar.html sobre.html privacidad.html 404.html"}
: > _qa/capturas/informe.txt
for p in $PAGINAS; do
  for w in $ANCHOS; do
    nombre="$(echo "$p" | tr '/' '_' | sed 's/.html$//')-$w"
    ventana=$(( w < 500 ? 500 : w ))
    # 1) informe de desbordes (DOM tras ejecutar el marco)
    "$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=$ventana,900 --virtual-time-budget=6000 \
      --dump-dom "$BASE/_qa/marco.html?pagina=$p&ancho=$w" 2>/dev/null \
      | sed -n 's/.*<div id="informe">\(.*\)<\/div>.*/\1/p' | head -1 >> _qa/capturas/informe.txt
    # 2) captura de página completa (ventana alta; el marco ajusta su alto al contenido)
    if [ "${CAPTURAS:-1}" = "1" ]; then
      "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=$ventana,9000 \
        --virtual-time-budget=6000 --screenshot="_qa/capturas/$nombre.png" "$BASE/_qa/marco.html?pagina=$p&ancho=$w&completo=1&alto=9000" 2>/dev/null
    fi
  done
done
cat _qa/capturas/informe.txt
