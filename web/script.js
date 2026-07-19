// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Simulador 3D: superficie C(x, a) = a*x^2 + (b+c)*x + d
const paramA = document.getElementById('paramA');
const paramB = document.getElementById('paramB');
const paramD = document.getElementById('paramD');
const valA = document.getElementById('valA');
const valB = document.getElementById('valB');
const valD = document.getElementById('valD');
const resultBox = document.getElementById('resultBox');
const plotDiv = document.getElementById('plot3d');

function costo(a, b, d, x) {
  return a * x * x + b * x + d;
}

// Rangos fijos para construir la superficie (x = instancias, y = parámetro a)
const X_MAX = 45;
const A_MIN = 0.1;
const A_MAX = 2;
const A_STEPS = 40;
const X_STEPS = 60;

function construirSuperficie(b, d) {
  const xVals = [];
  const aVals = [];
  const zMatrix = [];

  for (let i = 0; i <= X_STEPS; i++) {
    xVals.push((X_MAX * i) / X_STEPS);
  }
  for (let j = 0; j <= A_STEPS; j++) {
    aVals.push(A_MIN + ((A_MAX - A_MIN) * j) / A_STEPS);
  }
  for (let j = 0; j <= A_STEPS; j++) {
    const fila = [];
    for (let i = 0; i <= X_STEPS; i++) {
      fila.push(costo(aVals[j], b, d, xVals[i]));
    }
    zMatrix.push(fila);
  }
  return { xVals, aVals, zMatrix };
}

let plotIniciado = false;

function calcular() {
  const a = parseFloat(paramA.value);
  const b = parseFloat(paramB.value);
  const d = parseFloat(paramD.value);

  valA.textContent = a.toFixed(1);
  valB.textContent = b.toFixed(0);
  valD.textContent = d.toFixed(0);

  // Punto óptimo: derivada C'(x) = 2ax + b = 0 -> x = -b / (2a)
  const xOptimo = -b / (2 * a);
  const xOptimoRedondeado = Math.max(0, Math.round(xOptimo));
  const costoMinimo = costo(a, b, d, xOptimoRedondeado);

  resultBox.innerHTML = `Punto óptimo: <strong>x = ${xOptimoRedondeado}</strong> instancias &nbsp;|&nbsp; Costo mínimo: <strong>${costoMinimo.toFixed(1)} USD/mes</strong>`;

  const { xVals, aVals, zMatrix } = construirSuperficie(b, d);

  const superficie = {
    type: 'surface',
    x: xVals,
    y: aVals,
    z: zMatrix,
    colorscale: 'Viridis',
    opacity: 0.95,
    showscale: true,
    colorbar: { title: 'USD/mes', titleside: 'right' },
    contours: {
      z: { show: true, usecolormap: true, highlightcolor: '#f97316', project: { z: true } },
    },
  };

  // Curva de mínimos: traza el punto óptimo para cada valor de "a" en la superficie
  const curvaMinimos = {
    type: 'scatter3d',
    mode: 'lines',
    x: aVals.map(av => Math.max(0, -b / (2 * av))),
    y: aVals,
    z: aVals.map(av => {
      const xm = Math.max(0, -b / (2 * av));
      return costo(av, b, d, xm);
    }),
    line: { color: '#ffffff', width: 5 },
    name: 'Curva de mínimos',
  };

  // Punto óptimo actual (marcador rojo, según el slider "a")
  const puntoOptimo = {
    type: 'scatter3d',
    mode: 'markers',
    x: [xOptimoRedondeado],
    y: [a],
    z: [costoMinimo],
    marker: { color: '#ef4444', size: 8, symbol: 'diamond' },
    name: `Mínimo actual (x=${xOptimoRedondeado})`,
  };

  const layout = {
    autosize: true,
    height: 560,
    margin: { l: 0, r: 0, t: 10, b: 0 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    scene: {
      xaxis: { title: 'x (instancias)' },
      yaxis: { title: 'a (saturación)' },
      zaxis: { title: 'Costo (USD/mes)' },
      camera: { eye: { x: 1.6, y: -1.6, z: 0.9 } },
    },
    legend: { orientation: 'h', x: 0, y: 0 },
  };

  const config = { responsive: true, displaylogo: false };

  if (!plotIniciado) {
    Plotly.newPlot(plotDiv, [superficie, curvaMinimos, puntoOptimo], layout, config);
    plotIniciado = true;
  } else {
    Plotly.react(plotDiv, [superficie, curvaMinimos, puntoOptimo], layout, config);
  }
}

[paramA, paramB, paramD].forEach(input => input.addEventListener('input', calcular));
window.addEventListener('resize', () => {
  if (plotIniciado) Plotly.Plots.resize(plotDiv);
});
calcular();
