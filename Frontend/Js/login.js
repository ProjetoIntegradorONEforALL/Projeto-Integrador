document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        const text = await response.text(); // Captura o texto da resposta para depuração
        console.log('Resposta do servidor:', text);
        document.getElementById("errorMsg").textContent = 
          text.includes('Not Found') ? "Endpoint não encontrado." : "Login ou Senha Errada.";
        return;
      }
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", data.data.token); // Corrigido para data.data.token
        window.location.href = "home.html";
      } else {
        document.getElementById("errorMsg").textContent = data.message || "Usuário ou senha inválidos.";
      }
    } catch (error) {
      console.error("Erro na requisição: ", error);
      document.getElementById("errorMsg").textContent = "Erro na conexão com o servidor.";
    }
  });