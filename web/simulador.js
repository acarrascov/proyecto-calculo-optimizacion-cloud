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
    colorscale: 'Viridis',
    reversescale: false,
    opacity: 1,
    showscale: true,
    colorbar: {
      title: 'USD/mes',
      titleside: 'right',
      titlefont: { color: '#cbd5e1', size: 12 },
      tickfont: { color: '#94a3b8', size: 11 },
      outlinewidth: 0,
      len: 0.75,
      thickness: 14,
    },
    contours: {
      z: { show: true, usecolormap: true, highlightcolor: '#ffffff', project: { z: true }, width: 1 },
    },
    lighting: { ambient: 0.55, diffuse: 0.85, specular: 0.25, roughness: 0.65, fresnel: 0.2 },
    lightposition: { x: 100, y: -100, z: 200 },
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
    line: { color: '#ffffff', width: 7 },
    name: 'Curva de mínimos',
  };

  // Techo de la superficie, usado para dibujar la línea de proyección vertical
  const zTecho = Math.max(...zMatrix.flat());
  const zPiso = Math.min(...zMatrix.flat());

  // Línea vertical que "cae" desde el techo hasta el punto óptimo real (ancla visual)
  const lineaProyeccion = {
    type: 'scatter3d',
    mode: 'lines',
    x: [xOptimoRedondeado, xOptimoRedondeado],
    y: [a, a],
    z: [zTecho, costoMinimo],
    line: { color: '#f472b6', width: 4, dash: 'dot' },
    showlegend: false,
    hoverinfo: 'skip',
  };

  // Punto óptimo actual (marcador brillante, según el slider "a")
  const puntoOptimo = {
    type: 'scatter3d',
    mode: 'markers+text',
    x: [xOptimoRedondeado],
    y: [a],
    z: [costoMinimo],
    marker: { color: '#f472b6', size: 12, symbol: 'diamond', line: { color: '#ffffff', width: 1.5 } },
    text: [`x=${xOptimoRedondeado}`],
    textposition: 'top center',
    textfont: { color: '#f472b6', size: 13, family: 'JetBrains Mono, monospace' },
    name: `Mínimo actual (x=${xOptimoRedondeado})`,
  };

  const layout = {
    autosize: true,
    margin: { l: 0, r: 0, t: 45, b: 0 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#cbd5e1', family: 'Space Grotesk, sans-serif' },
    title: {
      text: `Costo mínimo: <span style="color:#5eead4">${costoMinimo.toFixed(1)} USD/mes</span> en x = ${xOptimoRedondeado} instancias`,
      font: { color: '#e6ebf5', size: 16, family: 'Space Grotesk, sans-serif' },
      x: 0.02,
      xanchor: 'left',
    },
    scene: {
      xaxis: { title: 'x — instancias', gridcolor: 'rgba(148,163,184,0.2)', zerolinecolor: 'rgba(148,163,184,0.35)', color: '#cbd5e1', backgroundcolor: 'rgba(148,163,184,0.03)', showbackground: true },
      yaxis: { title: 'a — saturación', gridcolor: 'rgba(148,163,184,0.2)', zerolinecolor: 'rgba(148,163,184,0.35)', color: '#cbd5e1', backgroundcolor: 'rgba(148,163,184,0.03)', showbackground: true },
      zaxis: { title: 'Costo (USD/mes)', gridcolor: 'rgba(148,163,184,0.2)', zerolinecolor: 'rgba(148,163,184,0.35)', color: '#cbd5e1', backgroundcolor: 'rgba(148,163,184,0.05)', showbackground: true, range: [zPiso, zTecho] },
      aspectmode: 'manual',
      aspectratio: { x: 1.3, y: 1, z: 0.75 },
      camera: {
        eye: { x: 1.35, y: -1.9, z: 1.05 },
        center: { x: 0, y: 0, z: -0.15 },
      },
      bgcolor: 'rgba(0,0,0,0)',
    },
    legend: { orientation: 'h', x: 0, y: 0, font: { color: '#cbd5e1' } },
  };

  const config = { responsive: true, displaylogo: false, scrollZoom: true };

  if (!plotIniciado) {
    Plotly.newPlot(plotDiv, [superficie, curvaMinimos, lineaProyeccion, puntoOptimo], layout, config);
    plotIniciado = true;
  } else {
    Plotly.react(plotDiv, [superficie, curvaMinimos, lineaProyeccion, puntoOptimo], layout, config);
  }
}

[paramA, paramB, paramD].forEach(input => input.addEventListener('input', calcular));
window.addEventListener('resize', () => {
  if (plotIniciado) Plotly.Plots.resize(plotDiv);
});

// Evita que el scroll normal de la página quede "atrapado" haciendo zoom del
// gráfico 3D: solo se hace zoom si el usuario mantiene presionado Ctrl/Cmd
// mientras usa la rueda; de lo contrario el scroll pasa de largo a la página.
const plotStage = plotDiv.closest('.plot-stage') || plotDiv.parentElement;
plotStage.addEventListener(
  'wheel',
  (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
  },
  { capture: true, passive: false }
);

calcular();
