// Simulador 3D a pantalla completa: superficie C(x, a) = a*x^2 + (b+c)*x + d
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
const A_STEPS = 50;
const X_STEPS = 70;

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
    colorscale: [
      [0, '#0f0326'],
      [0.25, '#4c1d95'],
      [0.5, '#7c3aed'],
      [0.7, '#22d3ee'],
      [1, '#5eead4'],
    ],
    opacity: 0.97,
    showscale: true,
    colorbar: {
      title: 'USD/mes',
      titleside: 'right',
      titlefont: { color: '#cbd5e1' },
      tickfont: { color: '#94a3b8' },
      outlinewidth: 0,
    },
    contours: {
      z: { show: true, usecolormap: true, highlightcolor: '#f472b6', project: { z: true } },
    },
    lighting: { ambient: 0.6, diffuse: 0.7, specular: 0.4, roughness: 0.5 },
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
    line: { color: '#e0f2fe', width: 6 },
    name: 'Curva de mínimos',
  };

  // Punto óptimo actual (marcador brillante, según el slider "a")
  const puntoOptimo = {
    type: 'scatter3d',
    mode: 'markers',
    x: [xOptimoRedondeado],
    y: [a],
    z: [costoMinimo],
    marker: { color: '#f472b6', size: 10, symbol: 'diamond', line: { color: '#ffffff', width: 1 } },
    name: `Mínimo actual (x=${xOptimoRedondeado})`,
  };

  const layout = {
    autosize: true,
    margin: { l: 0, r: 0, t: 10, b: 0 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#cbd5e1', family: 'Space Grotesk, sans-serif' },
    scene: {
      xaxis: { title: 'x (instancias)', gridcolor: 'rgba(148,163,184,0.15)', zerolinecolor: 'rgba(148,163,184,0.3)', color: '#94a3b8' },
      yaxis: { title: 'a (saturación)', gridcolor: 'rgba(148,163,184,0.15)', zerolinecolor: 'rgba(148,163,184,0.3)', color: '#94a3b8' },
      zaxis: { title: 'Costo (USD/mes)', gridcolor: 'rgba(148,163,184,0.15)', zerolinecolor: 'rgba(148,163,184,0.3)', color: '#94a3b8' },
      camera: { eye: { x: 1.7, y: -1.7, z: 0.95 } },
      bgcolor: 'rgba(0,0,0,0)',
    },
    legend: { orientation: 'h', x: 0, y: 0, font: { color: '#cbd5e1' } },
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
