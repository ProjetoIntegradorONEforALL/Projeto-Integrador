   const eficienciaElement = document.getElementById("eficiencia");
    const errosElement = document.getElementById("erros");
    const materiaisElement = document.getElementById("materiais");

    const eficienciaChart = new Chart(document.getElementById("eficienciaChart"), {
      type: 'bar',
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
        datasets: [{
          label: "Quantidade por tempo:",
          data: [85, 90, 92, 94, 93],
          borderColor: "#2e7d32",
          backgroundColor: "rgba(46,125,50,0.1)",
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { min: 80, max: 100 }
        }
      }
    });

    const errosChart = new Chart(document.getElementById("errosChart"), {
      type: 'line',
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
        datasets: [{
          label: "Erros",
          data: [8, 6, 4, 5, 3],
          backgroundColor: "#e53935"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    const materiaisChart = new Chart(document.getElementById("materiaisChart"), {
      type: 'bar',
      data: {
        labels: ["Plástico", "Metal"],
        datasets: [{
          label: "qntd.",
          data: [600, 500],
          backgroundColor: ["#42a5f5", "#66bb6a"]
        }]
      },
      options: {
        responsive: true
      }
    });

    function atualizarDashboard() {
      const novaEf = (90 + Math.random() * 10).toFixed(1);
      const novosErros = Math.floor(Math.random() * 10);
      const novosMateriais = (1300 + Math.random() * 200).toFixed(0);

      eficienciaElement.textContent = `${novaEf}`;
      errosElement.textContent = novosErros;
      materiaisElement.textContent = `${novosMateriais} qtd`;


      materiaisChart.data.datasets[0].data = [
        Math.floor(Math.random() * 800),
        Math.floor(Math.random() * 600),
        Math.floor(Math.random() * 300)
      ];
      materiaisChart.update();
    }

    setInterval(atualizarDashboard, 5000);

  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
  }

  function confirmLogout(event) {
    event.preventDefault();
    if (confirm("Tem certeza que deseja sair?")) {
      window.location.href = "http://127.0.0.1:5501/Frontend/Pages/Login.html";
    }
  }

  function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}