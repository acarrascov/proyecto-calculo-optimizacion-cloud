"""Genera las diapositivas (PNG 1920x1080) usadas como fondo visual del video,
con la misma paleta oscura/futurista del sitio web (styles.css).

Uso:
    python3 generar_diapositivas.py
Salida:
    video/diapositivas/01_intro.png ... 06_conclusion.png
"""
import os
from PIL import Image, ImageDraw, ImageFont

ANCHO, ALTO = 1920, 1080
BG = (5, 6, 17)
CIAN = (34, 211, 238)
VIOLETA = (168, 85, 247)
MAGENTA = (244, 114, 182)
TEAL = (94, 234, 212)
BLANCO = (230, 235, 245)
GRIS = (148, 163, 184)

FUENTE_TITULO = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FUENTE_TEXTO = "/System/Library/Fonts/Supplemental/Arial.ttf"
FUENTE_MONO = "/System/Library/Fonts/SFNSMono.ttf"

URL_SITIO = "proyecto-calculo-optimizacion-cloud.vercel.app"

SALIDA = os.path.join(os.path.dirname(__file__), "diapositivas")
os.makedirs(SALIDA, exist_ok=True)


def fuente(path, size):
    return ImageFont.truetype(path, size)


def fondo_base():
    img = Image.new("RGB", (ANCHO, ALTO), BG)
    draw = ImageDraw.Draw(img)
    # Franja de acento superior (simula el gradiente de marca del sitio)
    for x in range(ANCHO):
        t = x / ANCHO
        r = int(CIAN[0] + (VIOLETA[0] - CIAN[0]) * t)
        g = int(CIAN[1] + (VIOLETA[1] - CIAN[1]) * t)
        b = int(CIAN[2] + (VIOLETA[2] - CIAN[2]) * t)
        draw.line([(x, 0), (x, 6)], fill=(r, g, b))
    return img, draw


def eyebrow(draw, texto, y=110):
    f = fuente(FUENTE_MONO, 30)
    draw.text((120, y), texto.upper(), font=f, fill=CIAN)


def titulo(draw, texto, y=170, size=76):
    f = fuente(FUENTE_TITULO, size)
    draw.text((120, y), texto, font=f, fill=BLANCO)


def bullets(draw, items, y_inicio=420, gap=90, size=38, color=BLANCO):
    f = fuente(FUENTE_TEXTO, size)
    fb = fuente(FUENTE_MONO, 30)
    y = y_inicio
    for item in items:
        draw.ellipse([120, y + 14, 138, y + 32], fill=TEAL)
        draw.text((165, y), item, font=f, fill=color)
        y += gap


def pie(draw, texto=f"Cálculo · Unidad 3 · {URL_SITIO}"):
    f = fuente(FUENTE_MONO, 26)
    draw.text((120, ALTO - 90), texto, font=f, fill=GRIS)


# --- Diapositiva 1: Introducción / Portada ---
img, draw = fondo_base()
f_titulo = fuente(FUENTE_TITULO, 84)
draw.text((120, 380), "Minimización del costo de", font=f_titulo, fill=BLANCO)
draw.text((120, 480), "alojamiento en la nube", font=f_titulo, fill=CIAN)
f_sub = fuente(FUENTE_TEXTO, 40)
draw.text((120, 620), "Aplicación de la Derivada · Unidad 3 · Cálculo", font=f_sub, fill=GRIS)
draw.text((120, 680), "Ingeniería en Informática", font=f_sub, fill=GRIS)
f_url = fuente(FUENTE_MONO, 36)
draw.text((120, 780), URL_SITIO, font=f_url, fill=CIAN)
img.save(os.path.join(SALIDA, "01_intro.png"))

# --- Diapositiva 2: Problemática y objetivos ---
img, draw = fondo_base()
eyebrow(draw, "01 · Contexto")
titulo(draw, "Problemática y objetivo")
bullets(draw, [
    "Sobredimensionar recursos cloud = pagar de más",
    "Subdimensionar recursos = servicio lento",
    "Objetivo: modelar el costo con una función",
    "y usar la derivada para hallar el punto óptimo",
])
pie(draw)
img.save(os.path.join(SALIDA, "02_problematica.png"))

# --- Diapositiva 3: Modelo matemático ---
img, draw = fondo_base()
eyebrow(draw, "03 · Desarrollo matemático")
titulo(draw, "Modelo matemático y derivada")
fm = fuente(FUENTE_MONO, 50)
y = 400
lineas = [
    ("C(x) = 0.5x\u00b2 \u2212 20x + 500", BLANCO),
    ("C'(x) = x \u2212 20     \u2192     x = 20", CIAN),
    ("C''(x) = 1 > 0     \u2192     m\u00ednimo", VIOLETA),
]
for texto, color in lineas:
    draw.text((120, y), texto, font=fm, fill=color)
    y += 90
f_res = fuente(FUENTE_TITULO, 46)
draw.text((120, 720), "Costo mínimo: C(20) = 300 USD/mes", font=f_res, fill=TEAL)
pie(draw)
img.save(os.path.join(SALIDA, "03_modelo.png"))

# --- Diapositiva 4: Simulador ---
img, draw = fondo_base()
eyebrow(draw, "04 · Herramienta tecnológica")
titulo(draw, "Simulador interactivo")
bullets(draw, [
    "Grafica C(x) y su derivada C'(x) en vivo",
    "El punto óptimo se marca donde C'(x) = 0",
    "Parámetros a, b+c y d ajustables en tiempo real",
])
f_prueba = fuente(FUENTE_TITULO, 42)
draw.text((120, 760), "Pruébalo tú mismo en:", font=f_prueba, fill=GRIS)
f_url = fuente(FUENTE_MONO, 44)
draw.text((120, 820), URL_SITIO, font=f_url, fill=CIAN)
img.save(os.path.join(SALIDA, "04_simulador.png"))

# --- Diapositiva 5: Resultados ---
img, draw = fondo_base()
eyebrow(draw, "05 · Hallazgos")
titulo(draw, "Resultados")
f_tab = fuente(FUENTE_MONO, 42)
filas = [
    ("5 instancias", "412.5 USD/mes", BLANCO),
    ("20 instancias (óptimo)", "300 USD/mes", TEAL),
    ("35 instancias", "412.5 USD/mes", BLANCO),
]
y = 420
for izq, der, color in filas:
    draw.text((140, y), izq, font=f_tab, fill=color)
    draw.text((900, y), der, font=f_tab, fill=color)
    y += 100
f_ahorro = fuente(FUENTE_TITULO, 50)
draw.text((120, 780), "Ahorro aproximado: 27%", font=f_ahorro, fill=MAGENTA)
pie(draw)
img.save(os.path.join(SALIDA, "05_resultados.png"))

# --- Diapositiva 6: Conclusión ---
img, draw = fondo_base()
eyebrow(draw, "06 · Cierre")
titulo(draw, "Conclusión")
f_c = fuente(FUENTE_TEXTO, 40)
texto_final = [
    "La aplicación de la derivada permite tomar",
    "decisiones de arquitectura de software basadas",
    "en evidencia matemática, no en estimaciones",
    "arbitrarias.",
]
y = 400
for linea in texto_final:
    draw.text((120, y), linea, font=f_c, fill=BLANCO)
    y += 60
f_gracias = fuente(FUENTE_TITULO, 60)
draw.text((120, 700), "Gracias por su atención", font=f_gracias, fill=CIAN)
f_url = fuente(FUENTE_MONO, 38)
draw.text((120, 800), f"Revisa el proyecto en: {URL_SITIO}", font=f_url, fill=TEAL)
img.save(os.path.join(SALIDA, "06_conclusion.png"))

print(f"Diapositivas generadas en: {SALIDA}")
