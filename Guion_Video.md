# Guion para video de presentación

Tema: Minimización del costo de alojamiento en la nube mediante Aplicación de la Derivada

> El profesor confirmó que el video **no tiene que durar 5 minutos exactos**: puede ser más corto,
> siempre que explique bien el proyecto. Este guion está pensado para ~2:45–3:00 minutos, sin
> perder ningún punto importante. Cada bloque indica qué pantalla se muestra en el video (para que
> calce con las capturas usadas al armar el video).

---

**[0:00–0:15] Introducción** — *Pantalla: portada del sitio (hero)*
"Hola, mi nombre es [Tu nombre], estudiante de Ingeniería en Informática. Este proyecto resuelve un problema real de mi especialidad: cómo evitar pagar de más —o entregar un servicio lento— en la nube, calculando matemáticamente el punto óptimo de recursos con la derivada."

**[0:15–0:45] Problemática y objetivos** — *Pantalla: sección "Problemática"*
"Las aplicaciones web se alojan en servidores cloud, como AWS o Azure, pagando por cómputo y almacenamiento. Si se contratan pocos recursos, el sistema se satura y sube el costo por ineficiencia; si se contratan demasiados, se paga por recursos ociosos. El objetivo es modelar el costo total como una función y usar la derivada para encontrar el número exacto de instancias que minimiza el gasto mensual, sin sacrificar el rendimiento."

**[0:45–1:30] Modelamiento matemático y aplicación de la derivada** — *Pantalla: sección "Modelo"*
"Definimos el costo total en función de x, el número de instancias, como C(x) = 0.5x² − 20x + 500. El término cuadrático refleja el aumento de costo por saturación, y el término lineal, los descuentos iniciales por volumen.

Derivamos: C'(x) = x − 20, el costo marginal. Igualamos a cero: x = 20. Verificamos con la segunda derivada, C''(x) = 1, positiva, lo que confirma que x = 20 es un mínimo.

El costo se minimiza contratando 20 instancias, con un gasto de 300 dólares al mes."

**[1:30–2:00] Producto tecnológico: el simulador** — *Pantalla: simulador en vivo (simulador.html)*
"Para poner esto en práctica, desarrollé un simulador interactivo que grafica en tiempo real el costo total C(x) y su derivada, el costo marginal C'(x), marcando el punto donde la derivada se anula: el mínimo. Permite ajustar los parámetros del modelo y ver cómo cambia el punto óptimo al instante."

**[2:00–2:30] Resultados** — *Pantalla: sección "Resultados"*
"Comparando escenarios: con 5 instancias el costo es 412.5 dólares, con 35 instancias también 412.5 dólares, pero en el óptimo de 20 instancias el costo es solo 300 dólares. Un ahorro aproximado de 27% mensual, simplemente por aplicar correctamente el cálculo diferencial a una decisión tecnológica real."

**[2:30–2:50] Conclusión** — *Pantalla: portada o bibliografía*
"Este proyecto demuestra que la aplicación de la derivada, contenido de la unidad 3 de Cálculo, tiene una aplicación directa en mi especialidad: tomar decisiones de arquitectura de software basadas en evidencia matemática, y no en estimaciones arbitrarias. Muchas gracias por su atención."

---

## Recomendaciones para la grabación
- Duración total: flexible, apunta a 2:30–3:30 minutos; lo importante es explicar bien, no cronometrar al segundo.
- Habla con claridad y ritmo natural, sin leer literalmente el guion (úsalo como apoyo, no como lectura palabra por palabra).
- Reemplaza "[Tu nombre]" por tu nombre real antes de grabar.
- Verifica que no haya ruido de fondo y que el micrófono esté a una distancia constante de la boca.
