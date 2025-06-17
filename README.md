# Projeto Integrador  
Atividades do Projeto Integrador - Calouros e Veteranos  

## **Documentação**  

1. [Padrões de Commits](PadraoCommit.md)  
2. [Gerenciamento de Branches](GerenciamentoBranch.md)  
3. [Ferramentas e Dependências](Ferramentas_e_dependencias.md)  

## **Instalação e Execução**

### Pré-requisitos
- Node.js (versão LTS recomendada)
- Visual Studio Code ou sua IDE preferida
- Git
- Redis Server (para cache e gerenciamento de sessões)

### Configuração do Redis

1. Se você estiver usando WSL (Windows Subsystem for Linux), instale o Redis:
```bash
sudo apt update
sudo apt install redis-server
```

2. Inicie o serviço do Redis:
```bash
sudo service redis-server start
```

3. Verifique se o Redis está rodando:
```bash
redis-cli ping
```
Se retornar "PONG", o Redis está funcionando corretamente.

### Backend

1. Navegue até a pasta do backend:
```bash
cd Backend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

O servidor backend estará rodando em `http://localhost:3000` (ou na porta configurada no arquivo de ambiente).

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd Frontend
```

2. Abra o arquivo `index.html` em seu navegador ou use um servidor local.

Para usar um servidor local simples, você pode usar a extensão "Live Server" do VS Code ou executar:
```bash
npx http-server
```

## **Estrutura do Projeto**

- `Backend/`: Contém o código do servidor Node.js
  - `src/`: Código fonte do backend
  - `package.json`: Dependências e scripts do backend

- `Frontend/`: Contém a interface do usuário
  - `Pages/`: Páginas da aplicação
  - `Css/`: Estilos
  - `Js/`: Scripts JavaScript
  - `images/`: Recursos de imagem

---

### **Diagrama de Sequência**
```