window.onload = function () {
  let chart;
  let isINR = false;
  const toggle = document.getElementById("currencyToggle");
  const symbol = () => (isINR ? "₹" : "$");

  document.getElementById("rateForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const p = parseFloat(document.getElementById("principal").value);
    const i = parseFloat(document.getElementById("interest").value);
    const t = parseFloat(document.getElementById("time").value);

    const r = (i / (p * t)) * 100;
    document.getElementById("rateOutput").innerText = r.toFixed(2) + "%";

    const ctx = document.getElementById("rateChart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Interest', 'Principal'],
        datasets: [{
          data: [i, p],
          backgroundColor: ['#dc3545', '#0d6efd']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  });

  toggle.addEventListener("click", function () {
    isINR = !isINR;
    toggle.innerText = isINR ? "Switch to $" : "Switch to ₹";
    document.getElementById("rateForm").dispatchEvent(new Event("submit"));
  });
};
