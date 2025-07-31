
let subjectCount = 0;
let subjects = [];
function addSubject() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Subject Name" id="subName${subjectCount}" />
    <input type="number" placeholder="Marks" id="subMark${subjectCount}" />
  `;
  document.getElementById("subjects").appendChild(div);
  subjectCount++;
}

function calculateResults() {
  const name = document.getElementById("studentName").value;
  const totalMarks = parseFloat(document.getElementById("totalMarks").value);
  let sum = 0;
  subjects = [];
  for (let i = 0; i < subjectCount; i++) {
    const subName = document.getElementById(`subName${i}`).value;
    const subMark = parseFloat(document.getElementById(`subMark${i}`).value);
    if (!subName || isNaN(subMark)) continue;
    subjects.push({ name: subName, mark: subMark });
    sum += subMark;
  }
  const percentage = ((sum / (totalMarks * subjects.length)) * 100).toFixed(2);
  let result = `<h2>${name}'s Result</h2>`;
  result += `<p>Total: ${sum}</p>`;
  result += `<p>Percentage: ${percentage}%</p>`;
  result += `<ul>`;
  subjects.forEach(s => result += `<li>${s.name}: ${s.mark}</li>`);
  result += `</ul>`;
  document.getElementById("results").innerHTML = result;
  drawChart();
}

function drawChart() {
  const ctx = document.getElementById("chartCanvas").getContext("2d");
  const labels = subjects.map(s => s.name);
  const data = subjects.map(s => s.mark);
  if (window.myChart) window.myChart.destroy();
  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Marks',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      }]
    }
  });
}

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(document.getElementById("results").innerText, 10, 10);
  doc.save("student_results.pdf");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
