# Proyecto de Cálculo — Optimización de Costos Cloud mediante Derivadas

Sitio web del proyecto de la asignatura de Cálculo (Unidad 3 — Aplicación de la Derivada),
Ingeniería en Informática.

**Tema:** minimización del costo mensual de alojamiento en la nube (cómputo + almacenamiento)
usando el criterio de la primera y segunda derivada para encontrar el punto de costo mínimo.

## Estructura

- `web/` — sitio estático (HTML/CSS/JS) con el contenido del proyecto y un simulador interactivo.
- `Contenido_Proyecto.md` — contenido completo para las 14 diapositivas del PPT.
- `Guion_Video.md` — guion para el video de presentación de 5 minutos.
- `simulador_costos_cloud.py` — script en Python (sympy/matplotlib) que calcula la derivada y grafica.

## Ver el sitio localmente

```bash
cd web
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Despliegue

Este sitio es 100% estático, se puede desplegar en GitHub Pages o Vercel sin build step.
