// app/services/auth.ts

export const login = async (email: string, password: string) => {
  // 🔥 Simulação de requisição: cria um delay para parecer "real"
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 🔥 Usuário e senha "fictícios"
  const fakeUser = {
    email: 'user@test.com',
    password: '123456',
    name: 'Usuário Teste',
    token: 'fake-jwt-token-123',
  };

  if (email === fakeUser.email && password === fakeUser.password) {
    // Sucesso! Retorna um objeto simulando a resposta de um backend
    return {
      token: fakeUser.token,
      user: {
        name: fakeUser.name,
        email: fakeUser.email,
      },
    };
  } else {
    // Falha no login: email/senha errados
    throw new Error('Credenciais inválidas');
  }
};
