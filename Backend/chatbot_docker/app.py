from flask import Flask, request, jsonify, render_template
import json, re

app = Flask(__name__, static_url_path='/static', static_folder='static', template_folder='templates')

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

    if re.search(r"\b(azul|azuis)\b", texto):
        return f"Quantidade de peças azuis: {dados_pecas['pecas_plastico']['quantidade_azul']}."
    if re.search(r"\b(branca|brancas|branco|brancos)\b", texto):
        return f"Quantidade de peças brancas: {dados_pecas['pecas_plastico']['quantidade_branca']}."
    if re.search(r"\b(verde|verdes)\b", texto):
        return f"Quantidade de peças verdes: {dados_pecas['pecas_plastico']['quantidade_verde']}."
    if re.search(r"\b(vermelha|vermelho|vermelhas|vermelhos)\b", texto):
        return f"Quantidade de peças vermelhas: {dados_pecas['pecas_plastico']['quantidade_vermelha']}."
    if re.search(r"\b(ferro|ferros)\b", texto):
        return f"Quantidade de peças de ferro: {dados_pecas['pecas_metais']['quantidade_ferro']}."
    if re.search(r"\b(aluminio|aluminios)\b", texto):
        return f"Quantidade de peças de alumínio: {dados_pecas['pecas_metais']['quantidade_aluminio']}."
    if re.search(r"\b(metal|metais)\b", texto):
        return f"Quantidade total de metais: {dados_pecas['pecas_metais']['quantidade_total_metais']}."
    if re.search(r"\b(perdidas|perca|perda|refugo)\b", texto):
        return f"Peças perdidas: {dados_pecas['pecas_refugo']['peças_perdidas']}."
    if re.search(r"\b(defeituosas|defeito|defeituosa)\b", texto):
        return f"Peças defeituosas: {dados_pecas['pecas_refugo']['quantidade_defeituosas']}."
    if re.search(r"\b(refugo|refugos)\b", texto):
        return f"Total de peças de refugo: {dados_pecas['pecas_refugo']['total_refugo']}."
    if re.search(r"\b(plasticas total|total de peças plasticas)\b", texto):
        return f"Total de peças plásticas: {dados_pecas['quantidade_total_plastico']}."

    return "Desculpa, não entendi. Poderia reformular?"

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    pergunta = data.get('mensagem', '')
    resposta = responder(pergunta)
    return jsonify({'resposta': resposta})

if __name__ == '__main__':
    app.run(debug=True)
