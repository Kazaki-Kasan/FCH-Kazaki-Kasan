let investmentChart = null;
let barChart = null;

function calculateInvestment() {
  // Input values
  const principal = parseFloat(document.getElementById('initialInvestment').value);
  const annualContribution = parseFloat(document.getElementById('annualContribution').value) || 0;
  const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
  const rate = parseFloat(document.getElementById('interestRate').value) / 100;
  const frequency = parseInt(document.getElementById('compoundFrequency').value);
  const years = parseInt(document.getElementById('years').value) || 0;
  const months = parseInt(document.getElementById('months').value) || 0;
  const contributionTiming = document.getElementById('contributionTiming').value;
  const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
  const inflationRate = parseFloat(document.getElementById('inflationRate').value) || 0;

  const totalMonths = years * 12 + months;
  const periods = Math.floor((totalMonths / 12) * frequency);

  if (isNaN(principal) || isNaN(rate) || periods <= 0) {
    alert("Please fill in valid investment details.");
    return;
  }

  let totalPrincipal = principal;
  let balance = principal;
  let interestEarned = 0;
  let history = [];

  const contributionPerPeriod = (annualContribution + (monthlyContribution * 12)) / frequency;

  for (let i = 1; i <= periods; i++) {
    if (contributionTiming === "beginning") {
      balance += contributionPerPeriod;
      totalPrincipal += contributionPerPeriod;
    }

    const interest = balance * (rate / frequency);
    balance += interest;
    interestEarned += interest;

    if (contributionTiming === "end") {
      balance += contributionPerPeriod;
      totalPrincipal += contributionPerPeriod;
    }

    if (i % frequency === 0) {
      history.push({
        year: i / frequency,
        deposit: totalPrincipal,
        interest: interestEarned,
        balance: balance
      });
    }
  }

  const taxAmount = (taxRate / 100) * interestEarned;
  const inflationAdjustment = (inflationRate > 0) ? balance / Math.pow(1 + (inflationRate / 100), totalMonths / 12) : balance;

  const adjustedBalance = inflationAdjustment - taxAmount;

  // Results
  const resultBox = document.getElementById("resultBox");
  resultBox.classList.remove("d-none");
  resultBox.innerHTML = `
    <strong>Ending Balance:</strong> ₹${balance.toFixed(2)}<br>
    <strong>Total Principal:</strong> ₹${totalPrincipal.toFixed(2)}<br>
    <strong>Total Interest Earned:</strong> ₹${interestEarned.toFixed(2)}<br>
    <strong>Adjusted for Inflation & Tax:</strong> ₹${adjustedBalance.toFixed(2)}
  `;

  // Doughnut Chart
  const ctx = document.getElementById("investmentChart").getContext("2d");
  if (investmentChart) investmentChart.destroy();
  investmentChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Principal", "Contributions", "Interest"],
      datasets: [{
        data: [principal, totalPrincipal - principal, interestEarned],
        backgroundColor: ["#0d6efd", "#198754", "#ffc107"]
      }]
    },
    options: {
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });

  // Bar Chart
  const ctxBar = document.getElementById("barChart").getContext("2d");
  if (barChart) barChart.destroy();
  barChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: history.map(item => `Year ${item.year}`),
      datasets: [{
        label: "Ending Balance",
        backgroundColor: "#0d6efd",
        data: history.map(item => item.balance.toFixed(2))
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
