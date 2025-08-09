
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('inflation-root');
  root.innerHTML = `
  <div class="p-4 rounded shadow bg-light" id="inflation-calculator">
    <form class="row g-2 align-items-center justify-content-center">
      <div class="col-md-auto">
        <label class="form-label mb-1">Amount</label>
        <input type="number" class="form-control" id="amount" value="100">
      </div>
      <div class="col-md-auto">
        <label class="form-label mb-1">From</label>
        <div class="input-group">
          <select class="form-select" id="from-month">
            <option>Average</option><option>January</option><option>February</option>
            <option>March</option><option>April</option><option>May</option>
            <option>June</option><option>July</option><option>August</option>
            <option>September</option><option>October</option><option>November</option>
            <option>December</option>
          </select>
          <input type="number" class="form-control" id="from-year" value="2015" min="1913" max="2025">
        </div>
      </div>
      <div class="col-md-auto text-center">
        <span class="fs-4">=</span>
      </div>
      <div class="col-md-auto">
        <label class="form-label mb-1">To</label>
        <div class="input-group">
          <select class="form-select" id="to-month">
            <option>Average</option><option>January</option><option>February</option>
            <option>March</option><option>April</option><option>May</option>
            <option selected>June</option><option>July</option><option>August</option>
            <option>September</option><option>October</option><option>November</option>
            <option>December</option>
          </select>
          <input type="number" class="form-control" id="to-year" value="2025" min="1913" max="2025">
        </div>
      </div>
    </form>
    <div class="text-center mt-4">
      <h5 class="fw-bold" id="result">$123.45 in June 2025</h5>
    </div>
    <canvas id="inflationChart" height="100" class="mt-4"></canvas>
  </div>`;

  const ctx = document.getElementById('inflationChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
      datasets: [{
        label: 'Value Over Time ($)',
        data: [100,102,105,108,110,112,115,118,120,122,125],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
});

// Forward Flat Rate Inflation Calculator
const forwardRoot = document.createElement('div');
forwardRoot.className = "mt-5 p-4 rounded shadow bg-light";
forwardRoot.innerHTML = `
  <h5 class="text-center mb-3">Forward Flat Rate Inflation Calculator</h5>
  <form class="row g-2 align-items-center justify-content-center">
    <div class="col-md-auto">
      <label class="form-label mb-1">Amount</label>
      <input type="number" class="form-control" id="forward-amount" value="100">
    </div>
    <div class="col-md-auto">
      <label class="form-label mb-1">Inflation Rate (%)</label>
      <input type="number" class="form-control" id="forward-rate" value="3" step="0.1">
    </div>
    <div class="col-md-auto">
      <label class="form-label mb-1">After (Years)</label>
      <input type="number" class="form-control" id="forward-years" value="10">
    </div>
    <div class="col-md-auto text-center">
      <span class="fs-4">=</span>
    </div>
    <div class="col-md-auto">
      <label class="form-label mb-1">Future Value</label>
      <input type="text" class="form-control" id="forward-result" readonly>
    </div>
  </form>`;
document.getElementById('inflation-root').appendChild(forwardRoot);

document.getElementById('forward-amount').addEventListener('input', calculateForward);
document.getElementById('forward-rate').addEventListener('input', calculateForward);
document.getElementById('forward-years').addEventListener('input', calculateForward);

function calculateForward() {
  const amount = parseFloat(document.getElementById('forward-amount').value) || 0;
  const rate = parseFloat(document.getElementById('forward-rate').value) || 0;
  const years = parseFloat(document.getElementById('forward-years').value) || 0;
  const result = amount * Math.pow(1 + rate / 100, years);
  document.getElementById('forward-result').value = result.toFixed(2);
}

// Backward Flat Rate Inflation Calculator
const backwardRoot = document.createElement('div');
backwardRoot.className = "mt-5 p-4 rounded shadow bg-light";
backwardRoot.innerHTML = `
  <h5 class="text-center mb-3">Backward Flat Rate Inflation Calculator</h5>
  <form class="row g-2 align-items-center justify-content-center">
    <div class="col-md-auto">
      <label class="form-label mb-1">Amount</label>
      <input type="number" class="form-control" id="backward-amount" value="100">
    </div>
    <div class="col-md-auto">
      <label class="form-label mb-1">Inflation Rate (%)</label>
      <input type="number" class="form-control" id="backward-rate" value="3" step="0.1">
    </div>
    <div class="col-md-auto">
      <label class="form-label mb-1">Years Ago</label>
      <input type="number" class="form-control" id="backward-years" value="10">
    </div>
    <div class="col-md-auto text-center">
      <span class="fs-4">=</span>
    </div>
    <div class="col-md-auto">
      <label class="form-label mb-1">Past Value</label>
      <input type="text" class="form-control" id="backward-result" readonly>
    </div>
  </form>`;
document.getElementById('inflation-root').appendChild(backwardRoot);

document.getElementById('backward-amount').addEventListener('input', calculateBackward);
document.getElementById('backward-rate').addEventListener('input', calculateBackward);
document.getElementById('backward-years').addEventListener('input', calculateBackward);

function calculateBackward() {
  const amount = parseFloat(document.getElementById('backward-amount').value) || 0;
  const rate = parseFloat(document.getElementById('backward-rate').value) || 0;
  const years = parseFloat(document.getElementById('backward-years').value) || 0;
  const result = amount / Math.pow(1 + rate / 100, years);
  document.getElementById('backward-result').value = result.toFixed(2);
}
