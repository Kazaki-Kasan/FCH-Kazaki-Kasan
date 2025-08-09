window.onload = function () {
  let chart;
  const toggle = document.getElementById("toggleRegion");
  const regionLabel = document.getElementById("regionLabel");
  const currencySymbol = document.getElementById("currencySymbol");
  const currency1 = document.getElementById("currency1");
  const currency2 = document.getElementById("currency2");

  const usBrackets = [
    [0, 11000, 0.10],
    [11000, 44725, 0.12],
    [44725, 95375, 0.22],
    [95375, 182100, 0.24],
    [182100, 231250, 0.32],
    [231250, 578125, 0.35],
    [578125, Infinity, 0.37]
  ];

  const indiaBrackets = [
    [0, 250000, 0.00],
    [250000, 500000, 0.05],
    [500000, 1000000, 0.20],
    [1000000, Infinity, 0.30]
  ];

  function updateLabels() {
    const isIndia = toggle.checked;
    if (isIndia) {
      regionLabel.textContent = "🇮🇳 India";
      currencySymbol.textContent = "₹";
      currency1.textContent = "₹";
      currency2.textContent = "₹";
    } else {
      regionLabel.textContent = "🇺🇸 US";
      currencySymbol.textContent = "$";
      currency1.textContent = "$";
      currency2.textContent = "$";
    }
  }

  toggle.addEventListener("change", updateLabels);
  updateLabels();

  document.getElementById("taxForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const income = parseFloat(document.getElementById("income").value);
    const isIndia = toggle.checked;
    const brackets = isIndia ? indiaBrackets : usBrackets;

    let tax = 0;
    for (let [min, max, rate] of brackets) {
      if (income > min) {
        tax += (Math.min(income, max) - min) * rate;
      } else {
        break;
      }
    }

    const effectiveRate = (tax / income) * 100;
    const postTax = income - tax;

    document.getElementById("taxOwed").innerText = tax.toFixed(2);
    document.getElementById("taxRate").innerText = effectiveRate.toFixed(2) + "%";
    document.getElementById("postTax").innerText = postTax.toFixed(2);

    const ctx = document.getElementById("taxChart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tax Owed', 'Post-Tax Income'],
        datasets: [{
          label: 'Income Breakdown',
          data: [tax, postTax],
          backgroundColor: ['#dc3545', '#198754']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  });
};