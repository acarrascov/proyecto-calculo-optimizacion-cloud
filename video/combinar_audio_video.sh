#!/bin/bash
# Combina el video mudo (video_mudo.mp4) con tu audio grabado leyendo el guion.
#
# Uso:
#   ./combinar_audio_video.sh /ruta/a/tu_audio.m4a
#
# Genera: video_final.mp4
# - Si tu audio dura MÁS que el video, la última diapositiva se queda congelada
#   (fondo fijo) hasta que termines de hablar.
# - Si tu audio dura MENOS, el video se recorta a la duración exacta del audio.

set -e

if [ -z "$1" ]; then
  echo "Uso: ./combinar_audio_video.sh /ruta/a/tu_audio.m4a"
  exit 1
fi

AUDIO="$1"
VIDEO="video_mudo.mp4"
SALIDA="video_final.mp4"

if [ ! -f "$VIDEO" ]; then
  echo "No se encontró $VIDEO. Ejecuta primero generar_diapositivas.py y arma el video mudo."
  exit 1
fi

if [ ! -f "$AUDIO" ]; then
  echo "No se encontró el archivo de audio: $AUDIO"
  exit 1
fi

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$AUDIO")
echo "Duración del audio: ${DUR}s"

ffmpeg -y -i "$VIDEO" -i "$AUDIO" \
  -filter_complex "[0:v]tpad=stop_mode=clone:stop_duration=999[v]" \
  -map "[v]" -map 1:a \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k \
  -t "$DUR" \
  "$SALIDA"

echo "Listo: $SALIDA"
