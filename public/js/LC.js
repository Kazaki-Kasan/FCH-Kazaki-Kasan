let loanChartInstance = null;

function calculateLoan() {
  const amount = parseFloat(document.getElementById('loanAmount').value);
  const interest = parseFloat(document.getElementById('interestRate').value);
  const termValue = parseFloat(document.getElementById('loanTerm').value);
  const termType = document.getElementById('termType').value;
  const resultDiv = document.getElementById('loanResult');

  if (isNaN(amount) || isNaN(interest) || isNaN(termValue) || amount <= 0 || interest <= 0 || termValue <= 0) {
    resultDiv.classList.remove('d-none');
    resultDiv.classList.replace('alert-info', 'alert-danger');
    resultDiv.innerText = 'Please enter valid loan details.';
    return;
  }

  // Convert term to months
  let totalMonths;
  switch (termType) {
    case 'years': totalMonths = termValue * 12; break;
    case 'months': totalMonths = termValue; break;
    case 'weeks': totalMonths = termValue / 4.345; break;
    case 'days': totalMonths = termValue / 30.4375; break;
    default: totalMonths = termValue;
  }

  const monthlyRate = interest / 100 / 12;
  const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - amount;

  // Show results
  resultDiv.innerHTML = `
    <strong>Monthly EMI:</strong> ₹${emi.toFixed(2)}<br>
    <strong>Total Interest:</strong> ₹${totalInterest.toFixed(2)}<br>
    <strong>Total Payment:</strong> ₹${totalPayment.toFixed(2)}<br>
    <small class="text-muted">(Converted to ${totalMonths.toFixed(1)} months)</small>
  `;
  resultDiv.classList.remove('d-none');
  resultDiv.classList.replace('alert-danger', 'alert-info');

  // Draw chart
  const ctx = document.getElementById('loanChart').getContext('2d');
  if (loanChartInstance) loanChartInstance.destroy();
  loanChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Principal', 'Interest'],
      datasets: [{
        data: [amount, totalInterest],
        backgroundColor: ['#0d6efd', '#ffc107'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
