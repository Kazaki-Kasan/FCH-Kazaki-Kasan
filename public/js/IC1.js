let interestChart = null;

function calculateInterest() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const time = parseFloat(document.getElementById('time').value);
  const resultDiv = document.getElementById('interestResult');

  if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate <= 0 || time <= 0) {
    resultDiv.classList.remove('d-none');
    resultDiv.classList.replace('alert-info', 'alert-danger');
    resultDiv.innerText = 'Please enter valid inputs.';
    return;
  }

  const interest = (principal * rate * time) / 100;
  const total = principal + interest;

  resultDiv.innerHTML = `
    <strong>Total Interest:</strong> ₹${interest.toFixed(2)}<br>
    <strong>Total Amount:</strong> ₹${total.toFixed(2)}
  `;
  resultDiv.classList.remove('d-none');
  resultDiv.classList.replace('alert-danger', 'alert-info');

  const ctx = document.getElementById('interestChart').getContext('2d');
  if (interestChart) interestChart.destroy();
  interestChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Principal', 'Interest'],
      datasets: [{
        data: [principal, interest],
        backgroundColor: ['#0d6efd', '#ffc107']
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
