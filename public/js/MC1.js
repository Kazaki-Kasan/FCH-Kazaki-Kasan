let mortgageChart = null;

function calculateMortgage() {
  const amount = parseFloat(document.getElementById('loanAmount').value);
  const rate = parseFloat(document.getElementById('interestRate').value);
  const termValue = parseFloat(document.getElementById('loanTerm').value);
  const termUnit = document.getElementById('termUnit').value;
  const resultDiv = document.getElementById('mortgageResult');

  if (isNaN(amount) || isNaN(rate) || isNaN(termValue) || amount <= 0 || rate <= 0 || termValue <= 0) {
    resultDiv.classList.remove('d-none');
    resultDiv.classList.replace('alert-info', 'alert-danger');
    resultDiv.innerText = 'Please enter valid mortgage details.';
    return;
  }

  const months = termUnit === "years" ? termValue * 12 : termValue;
  const monthlyRate = rate / 12 / 100;

  const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - amount;

  resultDiv.innerHTML = `
    <strong>Monthly EMI:</strong> ₹${emi.toFixed(2)}<br>
    <strong>Total Interest:</strong> ₹${totalInterest.toFixed(2)}<br>
    <strong>Total Payment:</strong> ₹${totalPayment.toFixed(2)}<br>
    <small class="text-muted">(Term converted to ${months} months)</small>
  `;
  resultDiv.classList.remove('d-none');
  resultDiv.classList.replace('alert-danger', 'alert-info');

  const ctx = document.getElementById('mortgageChart').getContext('2d');
  if (mortgageChart) mortgageChart.destroy();
  mortgageChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Principal', 'Interest'],
      datasets: [{
        data: [amount, totalInterest],
        backgroundColor: ['#0d6efd', '#dc3545']
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
