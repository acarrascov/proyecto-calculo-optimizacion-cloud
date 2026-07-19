# Guion para video de presentación (5 minutos)

Tema: Minimización del costo de alojamiento en la nube mediante Aplicación de la Derivada

---

**[0:00–0:30] Introducción**
"Hola, mi nombre es [Tu nombre], estudiante de Ingeniería en Informática. En este proyecto abordo un problema real de mi especialidad: cómo las empresas de desarrollo de software pueden gastar de más —o entregar un servicio lento— por no calcular correctamente cuántos recursos contratar en la nube. Usando la aplicación de la derivada, calculamos matemáticamente el punto óptimo de recursos que minimiza el costo."

**[0:30–1:15] Problemática y objetivos**
"Las aplicaciones web se alojan en servidores en la nube, como AWS o Azure, pagando por cómputo y almacenamiento. Si se contratan pocos recursos, el sistema se satura y sube el costo por ineficiencia; si se contratan demasiados, se paga por recursos ociosos. El objetivo de este proyecto es modelar el costo total como una función matemática y usar la derivada para encontrar el número exacto de instancias que minimiza el gasto mensual, sin sacrificar el rendimiento."

**[1:15–2:30] Modelamiento matemático y aplicación de la derivada**
"Definimos el costo total en función de x, el número de instancias, como C(x) = 0.5x² − 20x + 500, donde el término cuadrático refleja el aumento de costo por saturación, y el término lineal refleja los descuentos iniciales por volumen.

Para encontrar el mínimo, calculamos la derivada: C'(x) = x − 20, que representa el costo marginal. Igualamos a cero: x − 20 = 0, por lo tanto x = 20. Verificamos con la segunda derivada: C''(x) = 1, que al ser positiva confirma que x = 20 es efectivamente un mínimo, no un máximo.

Esto significa que el costo mensual se minimiza contratando 20 instancias, con un costo de 300 dólares al mes."

*(Mostrar en pantalla el desarrollo matemático y/o el gráfico generado en Python.)*

**[2:30–3:30] Producto tecnológico: el simulador**
"Para poner esto en práctica, desarrollé un simulador en Python usando la librería sympy, que calcula automáticamente la derivada de cualquier función de costo ingresada, encuentra el punto óptimo, y grafica tanto la función de costo como su derivada, marcando el mínimo."

*(Mostrar la ejecución del script/notebook en vivo: ingresar parámetros, ver el gráfico y el resultado.)*

**[3:30–4:20] Resultados**
"Comparando escenarios: con 5 instancias el costo es de 412.5 dólares, con 35 instancias también 412.5 dólares, pero en el punto óptimo de 20 instancias el costo es de solo 300 dólares. Esto representa un ahorro de aproximadamente 27% mensual simplemente por aplicar correctamente el cálculo diferencial a una decisión tecnológica real."

**[4:20–5:00] Conclusión**
"Este proyecto demuestra que la aplicación de la derivada, un contenido estudiado en la unidad 3 de Cálculo, tiene una aplicación directa y concreta en mi especialidad: permite tomar decisiones de arquitectura de software basadas en evidencia matemática, en lugar de estimaciones arbitrarias. Muchas gracias por su atención."

---

## Recomendaciones para la grabación
- Duración total: no exceder 5 minutos (cronometrar antes de la entrega final).
- Mostrar en pantalla: el modelo matemático (puede ser en la diapositiva 8-9), el gráfico de C(x) y C'(x), y la ejecución del simulador.
- Hablar con claridad, sin leer literalmente el guion (usarlo como apoyo).
- Verificar audio y que las diapositivas sean legibles en el video.
