// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Simulador interactivo: C(x) = a*x^2 + (b+c)*x + d
const paramA = document.getElementById('paramA');
const paramB = document.getElementById('paramB');
const paramD = document.getElementById('paramD');
const valA = document.getElementById('valA');
const valB = document.getElementById('valB');
const valD = document.getElementById('valD');
const resultBox = document.getElementById('resultBox');

const ctx = document.getElementById('costChart').getContext('2d');
let chart;

function costo(a, b, d, x) {
  return a * x * x + b * x + d;
}

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

  const xVals = [];
  const cVals = [];
  const maxX = Math.max(40, xOptimoRedondeado * 2);
  for (let x = 0; x <= maxX; x++) {
    xVals.push(x);
    cVals.push(costo(a, b, d, x));
  }

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xVals,
      datasets: [
        {
          label: 'C(x) - Costo total (USD/mes)',
          data: cVals,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37,99,235,0.1)',
          pointRadius: 0,
          borderWidth: 2,
          tension: 0.2,
        },
        {
          label: `Mínimo (x=${xOptimoRedondeado})`,
          data: xVals.map(x => (x === xOptimoRedondeado ? costoMinimo : null)),
          borderColor: '#f97316',
          backgroundColor: '#f97316',
          pointRadius: 6,
          showLine: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { title: { display: true, text: 'x (número de instancias)' } },
        y: { title: { display: true, text: 'Costo (USD/mes)' } },
      },
    },
  });
}

[paramA, paramB, paramD].forEach(input => input.addEventListener('input', calcular));
calcular();
