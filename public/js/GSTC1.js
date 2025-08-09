let gstChart = null;

function calculateGST() {
  const amount = parseFloat(document.getElementById('amount').value);
  const rate = parseFloat(document.getElementById('gstRate').value);
  const mode = document.getElementById('gstMode').value;
  const resultDiv = document.getElementById('gstResult');

  if (isNaN(amount) || amount <= 0) {
    resultDiv.classList.remove('d-none');
    resultDiv.classList.replace('alert-info', 'alert-danger');
    resultDiv.innerText = 'Please enter a valid amount.';
    return;
  }

  let gstAmount, total, net;
  if (mode === 'add') {
    gstAmount = amount * (rate / 100);
    total = amount + gstAmount;
    net = amount;
  } else {
    total = amount;
    net = amount / (1 + (rate / 100));
    gstAmount = total - net;
  }

  const halfGST = gstAmount / 2;

  resultDiv.innerHTML = `
    <strong>Net Amount:</strong> ₹${net.toFixed(2)}<br>
    <strong>GST Amount:</strong> ₹${gstAmount.toFixed(2)}<br>
    <strong>CGST:</strong> ₹${halfGST.toFixed(2)} &nbsp;&nbsp; <strong>SGST:</strong> ₹${halfGST.toFixed(2)}<br>
    <strong>Total Amount:</strong> ₹${total.toFixed(2)}
  `;
  resultDiv.classList.remove('d-none');
  resultDiv.classList.replace('alert-danger', 'alert-info');

  const ctx = document.getElementById('gstChart').getContext('2d');
  if (gstChart) gstChart.destroy();
  gstChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Net Amount', 'GST'],
      datasets: [{
        data: [net, gstAmount],
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
