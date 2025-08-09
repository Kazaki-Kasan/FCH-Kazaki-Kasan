let amortizationChart = null;

function calculateAmortization() {
  const P = parseFloat(document.getElementById("loanAmount").value);
  const rate = parseFloat(document.getElementById("interestRate").value) / 100;
  const years = parseFloat(document.getElementById("loanTerm").value);
  const freq = parseFloat(document.getElementById("paymentsPerYear").value);
  const resultDiv = document.getElementById("amortizationResult");

  if (!P || !rate || !years || !freq || P <= 0 || rate <= 0 || years <= 0 || freq <= 0) {
    resultDiv.classList.remove("d-none");
    resultDiv.classList.replace("alert-info", "alert-danger");
    resultDiv.innerText = "Please enter valid inputs.";
    return;
  }

  const n = years * freq;
  const r = rate / freq;
  const PMT = P * r / (1 - Math.pow(1 + r, -n));

  let balance = P;
  let schedule = [];
  let totalInterest = 0;

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const principal = PMT - interest;
    balance -= principal;
    totalInterest += interest;
    schedule.push({ payment: i, balance: balance < 0 ? 0 : balance });
  }

  resultDiv.classList.remove("d-none");
  resultDiv.classList.replace("alert-danger", "alert-info");
  resultDiv.innerHTML = `<strong>Payment per Period:</strong> ₹${PMT.toFixed(2)}<br>
                         <strong>Total Interest:</strong> ₹${totalInterest.toFixed(2)}<br>
                         <strong>Total Repayment:</strong> ₹${(PMT * n).toFixed(2)}`;

  const ctx = document.getElementById("amortizationChart").getContext("2d");
  if (amortizationChart) amortizationChart.destroy();
  amortizationChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: schedule.map(e => e.payment),
      datasets: [{
        label: "Remaining Balance",
        data: schedule.map(e => e.balance),
        borderColor: "#0d6efd",
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
