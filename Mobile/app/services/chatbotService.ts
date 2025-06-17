import api from "./api";

export const sendMessageToChatbot = async (message: string) => {
  try {
    const response = await api.post("/api/chatbot", {
      mensagem: message,
    });

    return response.data.resposta;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error;
  }
};
