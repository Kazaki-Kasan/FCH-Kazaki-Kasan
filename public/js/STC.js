window.onload = function () {
  let chart;
  let isINR = false;
  const toggle = document.getElementById("currencyToggle");
  const currency = () => (isINR ? "₹" : "$");

  document.getElementById("taxForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value);
    const rate = parseFloat(document.getElementById("rate").value);

    const tax = (amount * rate) / 100;
    const total = amount + tax;

    document.getElementById("taxValue").innerText = currency() + tax.toFixed(2);
    document.getElementById("totalValue").innerText = currency() + total.toFixed(2);

    const ctx = document.getElementById("taxChart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Base Amount', 'Sales Tax'],
        datasets: [{
          data: [amount, tax],
          backgroundColor: ['#0d6efd', '#ffc107']
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
    document.getElementById("taxForm").dispatchEvent(new Event("submit"));
  });
};
