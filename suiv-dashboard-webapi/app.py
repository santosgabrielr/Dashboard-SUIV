import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

# Carrega os dados do arquivo Excel
df_maisAcessados = pd.read_excel('dados.xlsx')

app = Flask(__name__)
CORS(app)

# Define o tamanho padrão da página
PAGE_SIZE = 100

@app.route('/dashboardSuiv')
def listaMaisAcessados():
    # trazer os parâmetros de página e filtros da solicitação (não obrigatório)
    page = request.args.get('page', default=1, type=int)
    filter_rank = request.args.get('rank')
    filter_modelo = request.args.get('modelo')
    filter_versao = request.args.get('versao')
    filter_contagem = request.args.get('contagem')
    
    # filtra os dados com base nos filtros fornecidos
    filtered_data = df_maisAcessados.copy()
    if filter_rank:
        filtered_data = filtered_data[filtered_data['RANK'] == int(filter_rank)]
    if filter_modelo:
        filtered_data = filtered_data[filtered_data['MODELO'] == filter_modelo]
    if filter_versao:
        filtered_data = filtered_data[filtered_data['VERSAO'] == filter_versao]
    if filter_contagem:
        filtered_data = filtered_data[filtered_data['CONTAGEM'] == int(filter_contagem)]
    
    # calcula o índice de início e fim com base no número da página e no tamanho da página
    start_index = (page - 1) * PAGE_SIZE
    end_index = start_index + PAGE_SIZE
    
    # obtém os dados da página atual após aplicar os filtros
    paginated_data = filtered_data.iloc[start_index:end_index]

    paginated_data = filtered_data.iloc[start_index:end_index].to_dict(orient='records')
    
    return jsonify(paginated_data)

if __name__ == '__main__':
    app.run(debug=True)