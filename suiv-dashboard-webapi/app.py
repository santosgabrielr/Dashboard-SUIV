import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

# carrega os dados do arquivo excel
df_maisAcessados = pd.read_excel("C:\\Users\GR\\Desktop\\SUIV\\Dashboard\\dados2.xlsx")

app = Flask(__name__)
CORS(app)

# define o tamanho padrão da página
PAGE_SIZE = 100

@app.route('/dashboardSuiv')
def listaMaisAcessados():
    # trazer os parâmetros de página e filtros da solicitação
    page = request.args.get('page', default=1, type=int)
    filter_posicao = request.args.get('posicao')
    filter_marca = request.args.get('marca')
    filter_modelo = request.args.get('modelo')
    filter_versao = request.args.get('versao')
    filter_ano = request.args.get('ano')
    filter_tipo = request.args.get('tipo')
    filter_contagem = request.args.get('contagem')
    
    # filtra os dados com base nos filtros fornecidos
    filtered_data = df_maisAcessados.copy()
    if filter_posicao:
        filtered_data = filtered_data[filtered_data['POSICAO'] == int(filter_posicao)]
    if filter_marca:
        filtered_data = filtered_data[filtered_data['MARCA'] == filter_marca]
    if filter_modelo:
        filtered_data = filtered_data[filtered_data['MODELO'] == filter_modelo]
    if filter_versao:
        filtered_data = filtered_data[filtered_data['VERSAO'] == filter_versao]
    if filter_ano:
        filtered_data = filtered_data[filtered_data['ANO']] == int(filter_ano)
    if filter_tipo:
        filtered_data = filtered_data[filtered_data['TIPO'] == filter_tipo]
    if filter_contagem:
        filtered_data = filtered_data[filtered_data['CONTAGEM'] == int(filter_contagem)]
    
    # calcula o índice de início e fim com base no número da página e no tamanho da página
    start_index = (page - 1) * PAGE_SIZE
    end_index = start_index + PAGE_SIZE
    
    # obtém os dados da página atual após aplicar os filtros
    paginated_data = filtered_data.iloc[start_index:end_index]

    paginated_data = filtered_data.iloc[start_index:end_index].to_dict(orient='records')
    
    return jsonify(paginated_data)


@app.route('/marcaPieChart')
def marcaPieChart():
    # contar a ocorrência de cada marca
    marca_counts = df_maisAcessados['MARCA'].value_counts().reset_index()
    marca_counts.columns = ['Marca', 'Count']
    
    # calcular a porcentagem de cada marca
    total = marca_counts['Count'].sum()
    marca_counts['Percentage'] = (marca_counts['Count'] / total) * 100
    
    # retornar os dados em formato JSON
    return jsonify(marca_counts.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)