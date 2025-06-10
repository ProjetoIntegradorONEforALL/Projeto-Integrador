document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:6379/api/v1/auth/login", {
            method: "POST",
            headers: {"Content-Type": "aplication/json" },
            body: JSON.stringify({ username, password})
        });
        const data = await response.json();

        if(response.ok){
            localStorage.setItem("token", data.token);
            window.location.href = "home.html";
        } else {
            document.getElementById("errorMsg").textContent = "Usuario ou senha inválidos."
        }
        
    } catch (error) {
        console.error("Erro na requisição: ", error);
        document.getElementById("errorMsg").textContent = "Erro na conexão com o servidor.";
    }

});