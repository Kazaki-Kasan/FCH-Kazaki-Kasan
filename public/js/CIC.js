window.onload = function () {
  let chart;
  let isINR = false;

  const currencyToggle = document.getElementById("currencyToggle");
  const currencySymbol = () => (isINR ? "₹" : "$");

  document.getElementById("compoundForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const P = parseFloat(document.getElementById("principal").value);
    const r = parseFloat(document.getElementById("rate").value) / 100;
    const t = parseFloat(document.getElementById("years").value);
    const n = parseInt(document.getElementById("frequency").value);

    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;

    document.getElementById("finalAmount").innerText = currencySymbol() + A.toFixed(2);
    document.getElementById("interestEarned").innerText = currencySymbol() + interest.toFixed(2);

    const ctx = document.getElementById("compoundChart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Principal", "Interest Earned"],
        datasets: [{
          data: [P, interest],
          backgroundColor: ["#0d6efd", "#198754"],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": " + currencySymbol() + context.parsed.toFixed(2);
              }
            }
          }
        }
      }
    });
  });

  currencyToggle.addEventListener("click", function () {
    isINR = !isINR;
    currencyToggle.innerText = isINR ? "Switch to $" : "Switch to ₹";
    document.getElementById("compoundForm").dispatchEvent(new Event("submit"));
  });
};
