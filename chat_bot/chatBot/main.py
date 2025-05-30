import json
import re

# Função que carrega o JSON do arquivo
def carregar_pecas_json(nome_arquivo):
    with open(nome_arquivo, 'r', encoding='utf-8') as arquivo:
        return json.load(arquivo)

# Carrega os dados uma vez só
dados_pecas = carregar_pecas_json('quantidade.json')


# Função que responde de acordo com a entrada do usuário
def responder(entrada):
    texto = entrada.lower()  # normaliza para minúsculas

    
 #total de peças    
    if re.search(r"\b(total|totais)\b", texto):
        total = 0
        for key in dados_pecas:
            if key != "pecas_refugo":
                for qty in dados_pecas[key]:
                    total += dados_pecas[key][qty]
        return ("o total de peças é {}".format(total))


    # cumprimentos
    if re.search(r"\b(oi|olá|ola|iai|opa)\b", texto):
        return "Olá, como posso te ajudar?"
    
    # agradecimentos
    if re.search(r"\b(obrigado|obrigada|valeu|ok)\b", texto):
        return "deseja algo mais ?"
    
   # continuando a conversa
    if re.search(r"\b(sim|gostaria)\b", texto):
        return "me diga o que mais voce precisa😊?"
   
   
    # finalizando a conversa
    if re.search(r"\b(nao|não|só isso mesmo|so isso mesmo)\b", texto):
        return "tudo bem, se precisar de algo mais pode me falar "
    
    if re.search(r"\b(tchau|ate|logo|xau)\b", texto):
        return "ate logo,se precisar de algo digite *quero informaçoes* "
    
    # deseja continuar a conversa?
    if re.search(r"\b(informaçao|informacao|informaçoes|informação)\b", texto):
        return "sobre o que voce gostaria de saber?"
    
    # nao reconhece outros idiomas 
    if re.search(r"\b(hi|hello|how are you|hey|thank you|thanks)\b", texto):
        return "desculpa nao entendo outros idiomas apenas portugues?"

    # resposta de acordo com o que foi enviado as saudaçoes
    if re.search(r"\b(bom dia)\b", texto):
        return "Bom dia, como posso te ajudar?"

    if re.search(r"\b(boa noite)\b", texto):
        return "Boa noite, como posso te ajudar?"

    if re.search(r"\b(boa tarde)\b", texto):
        return "Boa tarde, como posso te ajudar?"
    

    # peças azuis
    if re.search(r"\b(azul|azuis)\b", texto):
        qtd_azul = dados_pecas['pecas_plastico']['quantidade_azul']

        return f"A quantidade de peças azuis é {qtd_azul}."

    # peças brancas
    if re.search(r"\b(branca|brancas|branco|brancos)\b", texto):
        qtd_branca = dados_pecas['pecas_plastico']['quantidade_branca']
        return f"A quantidade de peças brancas é {qtd_branca}."

    # Peças verdes
    if re.search(r"\b(verde|verdes)\b", texto):
        qtd_verde = dados_pecas['pecas_plastico']['quantidade_verde']
        return f"A quantidade de peças verdes é {qtd_verde}."

    # Peças vermelhas
    if re.search(r"\b(vermelha|vermelho|vermelhas|vermelhos)\b", texto):
        qtd_vermelha = dados_pecas['pecas_plastico']['quantidade_vermelha']
        return f"A quantidade de peças vermelhas é {qtd_vermelha}."

    # Peças de ferro
    if re.search(r"\b(ferro|ferros)\b", texto):
        qtd_ferro = dados_pecas['pecas_metais']['quantidade_ferro']
        return f"A quantidade de peças de ferro é {qtd_ferro}."

    # Peças de alumínio
    if re.search(r"\b(aluminio|aluminios)\b", texto):
        qtd_aluminio = dados_pecas['pecas_metais']['quantidade_aluminio']
        return f"A quantidade de peças de alumínio é {qtd_aluminio}."

    # Total de metais
    if re.search(r"\b(metal|metais)\b", texto):
        qtd_total_metais = dados_pecas['pecas_metais']['quantidade_total_metais']
        return f"A quantidade total de peças metálicas é {qtd_total_metais}."

    # Refugo – peças perdidas
    if re.search(r"\b(perdidas|perca|perda|refugo)\b", texto):
        qtd_perdidas = dados_pecas['pecas_refugo']['peças_perdidas']
        return f"A quantidade de peças perdidas é {qtd_perdidas}."

    # Refugo – peças defeituosas
    if re.search(r"\b(defeituosas|defeito|defeituosa)\b", texto):
        qtd_defeituosas = dados_pecas['pecas_refugo']['quantidade_defeituosas']
        return f"A quantidade de peças defeituosas é {qtd_defeituosas}."

    # Total de refugo
    if re.search(r"\b(refugo|refugos)\b", texto):
        total_refugo = dados_pecas['pecas_refugo']['total_refugo']
        return f"A quantidade total de peças de refugo é {total_refugo}."
    
    # total de peças plasticas
    if re.search(r"\b(plasticas total|total de peças plasticas)\b", texto):
        qtd_total_plastico = dados_pecas['quantidade_total_plastico']
        return f"A quantidade de peças azuis é {qtd_total_plastico}."


    # Se não entender
    return "Desculpa, não entendi. Poderia me dar mais informações?"


# Interface simples de console
print("Bem-vindo ao Chatbot! Digite 'sair' para encerrar.")

while True:
    user_input = input("Você: ")
    if user_input.lower() == "sair":
        print("Chatbot: Até mais 😉")
        break
    resposta = responder(user_input)
    print(f"Chatbot: {resposta}")
