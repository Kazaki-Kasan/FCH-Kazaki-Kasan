window.onload = function () {
  let chart;

  document.getElementById("financeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const N = parseFloat(document.getElementById("n").value);
    const IY = parseFloat(document.getElementById("iy").value) / 100;
    const PV = parseFloat(document.getElementById("pv").value);
    const PMT = parseFloat(document.getElementById("pmt").value);

    let FV = PV;
    let totalPMT = 0;
    let interestAcc = 0;

    const labels = [];
    const pvData = [];
    const fvData = [];
    const pmtSumData = [];
    const interestData = [];

    for (let i = 0; i <= N; i++) {
      labels.push(i);
      pvData.push(PV);
      fvData.push(FV);
      pmtSumData.push(totalPMT);
      interestData.push(interestAcc);

      FV = FV * (1 + IY) + PMT;
      totalPMT += PMT;
      interestAcc = FV - PV - totalPMT;
    }

    document.getElementById("fv").innerText = FV.toFixed(2);
    document.getElementById("totalPMT").innerText = totalPMT.toFixed(2);
    document.getElementById("totalInterest").innerText = interestAcc.toFixed(2);

    const ctx = document.getElementById("resultChart").getContext("2d");

    // Destroy the old chart before creating a new one
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Present Value (PV)",
            data: pvData,
            borderColor: "blue",
            fill: false
          },
          {
            label: "Future Value (FV)",
            data: fvData,
            borderColor: "green",
            fill: false
          },
          {
            label: "Sum of PMT",
            data: pmtSumData,
            borderColor: "red",
            fill: false
          },
          {
            label: "Accumulated Interest",
            data: interestData,
            borderColor: "orange",
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Years" } },
          y: { title: { display: true, text: "Amount ($)" } }
        }
      }
    });
  });
};
