document.getElementById('chat-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const input = document.getElementById('user-input');
  const mensagem = input.value.trim();
  if (!mensagem) return;

  const respostaDiv = document.getElementById('chat-resposta');
  addMessage('user', mensagem);

  try {
    const res = await fetch('http://52.20.151.92:3000/api/v1/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensagem })
    });

    const data = await res.json();
    addMessage('bot', data.resposta);
    input.value = '';
  } catch (err) {
    addMessage('bot', 'Erro ao processar a resposta.');
    console.error(err);
  }
});

function addMessage(sender, text) {
  const respostaDiv = document.getElementById('chat-resposta');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.innerHTML = `<div class="bubble">${text}</div>`;
  respostaDiv.appendChild(msgDiv);
  respostaDiv.scrollTop = respostaDiv.scrollHeight;
}

document.getElementById('user-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    document.getElementById('chat-form').dispatchEvent(new Event('submit'));
  }
});

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
  }

function confirmLogout(event) {
    event.preventDefault();
    if (confirm("Tem certeza que deseja sair?")) {
      window.location.href = "/Frontend/Pages/Login.html";
    }
  }