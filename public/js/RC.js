window.onload = function () {
  let chart;
  let isINR = false;

  const toggle = document.getElementById("currencyToggle");
  const symbol = () => (isINR ? "₹" : "$");

  document.getElementById("salaryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const mg = parseFloat(document.getElementById("monthlyGross").value);
    const md = parseFloat(document.getElementById("deductions").value);

    const annualGross = mg * 12;
    const annualDeduct = md * 12;
    const net = annualGross - annualDeduct;

    document.getElementById("annualGross").innerText = symbol() + annualGross.toFixed(2);
    document.getElementById("annualDeduct").innerText = symbol() + annualDeduct.toFixed(2);
    document.getElementById("annualNet").innerText = symbol() + net.toFixed(2);

    const ctx = document.getElementById("salaryChart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Gross', 'Deductions', 'Net'],
        datasets: [{
          data: [annualGross, annualDeduct, net],
          backgroundColor: ['#0d6efd', '#dc3545', '#198754']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  });

  toggle.addEventListener("click", function () {
    isINR = !isINR;
    toggle.innerText = isINR ? "Switch to $" : "Switch to ₹";
    document.getElementById("salaryForm").dispatchEvent(new Event("submit"));
  });
};
