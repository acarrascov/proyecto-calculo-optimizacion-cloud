// Simulador 2D: C(x) = a*x^2 + (b+c)*x + d, y su derivada C'(x) = 2ax + (b+c)
const paramA = document.getElementById('paramA');
const paramB = document.getElementById('paramB');
const paramD = document.getElementById('paramD');
const valA = document.getElementById('valA');
const valB = document.getElementById('valB');
const valD = document.getElementById('valD');
const resultBox = document.getElementById('resultBox');
const plotDiv = document.getElementById('plotChart');

function costo(a, b, d, x) {
  return a * x * x + b * x + d;
}

function costoMarginal(a, b, x) {
  return 2 * a * x + b;
}

const X_MAX = 45;
const X_STEPS = 200;

function construirCurvas(a, b, d) {
  const xVals = [];
  const yCosto = [];
  const yMarginal = [];
  for (let i = 0; i <= X_STEPS; i++) {
    const x = (X_MAX * i) / X_STEPS;
    xVals.push(x);
    yCosto.push(costo(a, b, d, x));
    yMarginal.push(costoMarginal(a, b, x));
  }
  return { xVals, yCosto, yMarginal };
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

  const { xVals, yCosto, yMarginal } = construirCurvas(a, b, d);

  // Curva principal: costo total C(x), con relleno degradado hacia abajo
  const curvaCosto = {
    type: 'scatter',
    mode: 'lines',
    x: xVals,
    y: yCosto,
    name: 'Costo total C(x)',
    line: { color: '#22d3ee', width: 4, shape: 'spline' },
    fill: 'tozeroy',
    fillcolor: 'rgba(34, 211, 238, 0.12)',
    hovertemplate: 'x = %{x:.0f} instancias<br>C(x) = %{y:.1f} USD/mes<extra></extra>',
  };

  // Curva secundaria: costo marginal C'(x), en eje Y secundario
  const curvaMarginal = {
    type: 'scatter',
    mode: 'lines',
    x: xVals,
    y: yMarginal,
    name: "Costo marginal C'(x)",
    yaxis: 'y2',
    line: { color: '#a855f7', width: 2.5, dash: 'dash' },
    hovertemplate: "x = %{x:.0f}<br>C'(x) = %{y:.1f}<extra></extra>",
  };

  // Punto óptimo sobre la curva de costo
  const puntoOptimo = {
    type: 'scatter',
    mode: 'markers+text',
    x: [xOptimoRedondeado],
    y: [costoMinimo],
    name: 'Mínimo',
    marker: { color: '#f472b6', size: 14, symbol: 'diamond', line: { color: '#ffffff', width: 2 } },
    text: [`  Mínimo: x=${xOptimoRedondeado}`],
    textposition: 'middle right',
    textfont: { color: '#f472b6', size: 13, family: 'JetBrains Mono, monospace' },
    hovertemplate: `Óptimo: x=${xOptimoRedondeado}, C=${costoMinimo.toFixed(1)} USD<extra></extra>`,
  };

  // Donde la marginal cruza cero (referencia visual del criterio de la derivada)
  const puntoCeroMarginal = {
    type: 'scatter',
    mode: 'markers',
    x: [xOptimoRedondeado],
    y: [0],
    yaxis: 'y2',
    name: "C'(x) = 0",
    marker: { color: '#a855f7', size: 10, symbol: 'circle', line: { color: '#ffffff', width: 1.5 } },
    showlegend: false,
    hovertemplate: `C'(x)=0 en x=${xOptimoRedondeado}<extra></extra>`,
  };

  const yMax = Math.max(...yCosto) * 1.08;

  const layout = {
    autosize: true,
    margin: { l: 70, r: 70, t: 55, b: 60 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#cbd5e1', family: 'Space Grotesk, sans-serif' },
    title: {
      text: `Costo mínimo: <span style="color:#5eead4">${costoMinimo.toFixed(1)} USD/mes</span> en x = ${xOptimoRedondeado} instancias`,
      font: { color: '#e6ebf5', size: 17, family: 'Space Grotesk, sans-serif' },
      x: 0.02,
      xanchor: 'left',
    },
    xaxis: {
      title: 'x — número de instancias',
      gridcolor: 'rgba(148,163,184,0.14)',
      zerolinecolor: 'rgba(148,163,184,0.3)',
      color: '#94a3b8',
      range: [0, X_MAX],
    },
    yaxis: {
      title: 'Costo total C(x) — USD/mes',
      gridcolor: 'rgba(148,163,184,0.14)',
      zerolinecolor: 'rgba(148,163,184,0.3)',
      color: '#22d3ee',
      range: [0, yMax],
    },
    yaxis2: {
      title: "Costo marginal C'(x)",
      overlaying: 'y',
      side: 'right',
      color: '#a855f7',
      gridcolor: 'rgba(0,0,0,0)',
      zeroline: true,
      zerolinecolor: 'rgba(168,85,247,0.45)',
      zerolinewidth: 1.5,
    },
    shapes: [
      // Línea vertical punteada desde el eje X hasta el punto óptimo
      {
        type: 'line',
        x0: xOptimoRedondeado,
        x1: xOptimoRedondeado,
        y0: 0,
        y1: costoMinimo,
        line: { color: 'rgba(244,114,182,0.55)', width: 2, dash: 'dot' },
      },
    ],
    legend: { orientation: 'h', x: 0, y: 1.14, font: { color: '#cbd5e1', size: 12 } },
    hovermode: 'x unified',
  };

  const config = { responsive: true, displaylogo: false };

  const datos = [curvaCosto, curvaMarginal, puntoOptimo, puntoCeroMarginal];

  if (!plotIniciado) {
    Plotly.newPlot(plotDiv, datos, layout, config);
    plotIniciado = true;
  } else {
    Plotly.react(plotDiv, datos, layout, config);
  }
}

[paramA, paramB, paramD].forEach(input => input.addEventListener('input', calcular));
window.addEventListener('resize', () => {
  if (plotIniciado) Plotly.Plots.resize(plotDiv);
});

calcular();
