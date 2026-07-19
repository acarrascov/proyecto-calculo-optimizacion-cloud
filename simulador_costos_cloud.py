"""
Simulador de optimización de costos de infraestructura cloud
mediante Aplicación de la Derivada.

Proyecto: Minimización del costo de alojamiento en la nube
Asignatura: Cálculo - Unidad 3 (Aplicación de la Derivada)

Requiere: sympy, matplotlib
Instalar con: pip install sympy matplotlib
"""

import sympy as sp
import matplotlib.pyplot as plt
import numpy as np


def analizar_costo(a, b_mas_c, d, rango_x=(0, 40)):
    """
    Modela el costo total C(x) = a*x^2 + (b+c)*x + d, calcula su derivada,
    encuentra el punto óptimo (mínimo) y grafica ambas funciones.

    Parámetros:
        a: coeficiente cuadrático (costo por saturación de cómputo)
        b_mas_c: coeficiente lineal combinado (cómputo + almacenamiento)
        d: costo fijo mensual
        rango_x: tupla con el rango de instancias a graficar
    """
    x = sp.symbols('x', positive=True)
    C = a * x**2 + b_mas_c * x + d

    # Primera y segunda derivada
    C_prima = sp.diff(C, x)
    C_segunda = sp.diff(C_prima, x)

    print(f"Función de costo total:      C(x) = {C}")
    print(f"Costo marginal (C'(x)):      C'(x) = {C_prima}")
    print(f"Segunda derivada:            C''(x) = {C_segunda}")

    # Puntos críticos: C'(x) = 0
    puntos_criticos = sp.solve(sp.Eq(C_prima, 0), x)
    print(f"\nPuntos críticos (C'(x)=0): {puntos_criticos}")

    for punto in puntos_criticos:
        valor_segunda = C_segunda.subs(x, punto)
        tipo = "MÍNIMO" if valor_segunda > 0 else "MÁXIMO" if valor_segunda < 0 else "Indeterminado"
        costo_optimo = C.subs(x, punto)
        print(f"  x = {punto} -> C''(x) = {valor_segunda} => {tipo}")
        print(f"  Costo en ese punto: C({punto}) = {costo_optimo}")

    # Graficar
    x_vals = np.linspace(rango_x[0], rango_x[1], 200)
    C_func = sp.lambdify(x, C, 'numpy')
    Cp_func = sp.lambdify(x, C_prima, 'numpy')

    fig, ax = plt.subplots(1, 2, figsize=(12, 5))

    ax[0].plot(x_vals, C_func(x_vals), label='C(x) - Costo total', color='steelblue')
    for punto in puntos_criticos:
        p = float(punto)
        if rango_x[0] <= p <= rango_x[1]:
            ax[0].scatter([p], [float(C.subs(x, punto))], color='red', zorder=5,
                          label=f'Mínimo en x={p}')
    ax[0].set_xlabel('x (número de instancias)')
    ax[0].set_ylabel('Costo (USD/mes)')
    ax[0].set_title('Función de costo total')
    ax[0].legend()
    ax[0].grid(True)

    ax[1].plot(x_vals, Cp_func(x_vals), label="C'(x) - Costo marginal", color='darkorange')
    ax[1].axhline(0, color='black', linewidth=0.8)
    ax[1].set_xlabel('x (número de instancias)')
    ax[1].set_ylabel('Costo marginal')
    ax[1].set_title('Derivada del costo (costo marginal)')
    ax[1].legend()
    ax[1].grid(True)

    plt.tight_layout()
    plt.savefig('grafico_optimizacion_costos.png', dpi=150)
    print("\nGráfico guardado como 'grafico_optimizacion_costos.png'")
    plt.show()

    return puntos_criticos


if __name__ == "__main__":
    print("=== Simulador de optimización de costos cloud ===\n")
    # Parámetros de ejemplo (ver Diapositiva 8 del proyecto)
    analizar_costo(a=0.5, b_mas_c=-20, d=500, rango_x=(0, 40))
