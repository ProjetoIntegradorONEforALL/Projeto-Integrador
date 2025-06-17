from flask import Flask, request, jsonify
import json, re

app = Flask(__name__)

# Carrega os dados
def carregar_pecas_json(nome_arquivo):
    with open(nome_arquivo, 'r', encoding='utf-8') as arquivo:
        return json.load(arquivo)

dados_pecas = carregar_pecas_json('quantidade.json')

# Função de resposta do chatbot
def responder(entrada):
    texto = entrada.lower()

    if re.search(r"\b(total|totais)\b", texto):
        total = 0
        for key in dados_pecas:
            if key != "pecas_refugo":
                for qty in dados_pecas[key]:
                    total += dados_pecas[key][qty]
        return f"O total de peças é {total}"

    if re.search(r"\b(oi|olá|ola|iai|opa)\b", texto):
        return "Olá, como posso te ajudar?"
    if re.search(r"\b(obrigado|obrigada|valeu|ok)\b", texto):
        return "Deseja algo mais?"
    if re.search(r"\b(sim|gostaria)\b", texto):
        return "Me diga o que mais você precisa 😊?"
    if re.search(r"\b(nao|não|só isso mesmo|so isso mesmo)\b", texto):
        return "Tudo bem, se precisar de algo mais pode me chamar."
    if re.search(r"\b(tchau|ate|logo|xau)\b", texto):
        return "Até logo! Se precisar de algo digite *quero informações*"
    if re.search(r"\b(informaçao|informacao|informaçoes|informação)\b", texto):
        return "Sobre o que você gostaria de saber?"

    # Plástico
    plastico = dados_pecas.get('pecas_plastico', {})
    if re.search(r"\b(azul|azuis)\b", texto):
        return f"Quantidade de peças azuis: {plastico.get('quantidade_azul', 0)}."
    if re.search(r"\b(branca|brancas|branco|brancos)\b", texto):
        return f"Quantidade de peças brancas: {plastico.get('quantidade_branca', 0)}."
    if re.search(r"\b(verde|verdes)\b", texto):
        return f"Quantidade de peças verdes: {plastico.get('quantidade_verde', 0)}."
    if re.search(r"\b(vermelha|vermelho|vermelhas|vermelhos)\b", texto):
        return f"Quantidade de peças vermelhas: {plastico.get('quantidade_vermelha', 0)}."

    # Metais
    metais = dados_pecas.get('pecas_metais', {})
    if re.search(r"\b(ferro|ferros)\b", texto):
        return f"Quantidade de peças de ferro: {metais.get('quantidade_ferro', 0)}."
    if re.search(r"\b(aluminio|aluminios)\b", texto):
        return f"Quantidade de peças de alumínio: {metais.get('quantidade_aluminio', 0)}."
    if re.search(r"\b(metal|metais)\b", texto):
        return f"Quantidade total de metais: {metais.get('quantidade_total_metais', metais.get('quantidade_ferro', 0) + metais.get('quantidade_aluminio', 0))}."

    # Refugo
    refugo = dados_pecas.get('pecas_refugo', {})
    if re.search(r"\b(perdidas|perca|perda|refugo)\b", texto):
        return f"Peças perdidas: {refugo.get('peças_perdidas', 0)}."
    if re.search(r"\b(defeituosas|defeito|defeituosa)\b", texto):
        return f"Peças defeituosas: {refugo.get('quantidade_defeituosas', 0)}."
    if re.search(r"\b(refugo|refugos)\b", texto):
        return f"Total de peças de refugo: {refugo.get('total_refugo', 0)}."

    # Plástico total
    if re.search(r"\b(plasticas total|total de peças plasticas)\b", texto):
        return f"Total de peças plásticas: {dados_pecas.get('quantidade_total_plastico', 0)}."

    return "Desculpa, não entendi. Poderia reformular?"

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    pergunta = data.get('mensagem', '')
    resposta = responder(pergunta)
    return jsonify({'resposta': resposta})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
