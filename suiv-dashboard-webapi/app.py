import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from pandas import to_datetime

# carrega os dados do arquivo excel
df_maisAcessados = pd.read_excel("C:\\Users\GR\\Desktop\\SUIV\\Dashboard\\dados2.xlsx", sheet_name='Genuinas')[['Data', 'Success', 'ClientTokenId', 'Marca', 'Modelo', 'Ano']]

app = Flask(__name__)
CORS(app)


@app.route('/maisAcessados')
def listaMaisAcessados():
    # trazer os parâmetros de página e filtros da solicitação
    filter_client = request.args.get('client')
    filter_marca = request.args.get('marca')
    filter_modelo = request.args.get('modelo')
    filter_ano = request.args.get('ano')
    
    # filtra os dados com base nos filtros fornecidos
    filtered_data = df_maisAcessados.copy()
    if filter_client:
        filtered_data = filtered_data[filtered_data['ClientTokenId'] == filter_client]
    if filter_marca:
        filtered_data = filtered_data[filtered_data['Marca'] == filter_marca]
    if filter_modelo:
        filtered_data = filtered_data[filtered_data['Modelo'] == filter_modelo]
    if filter_ano:
        filtered_data = filtered_data[filtered_data['Ano'] == int(filter_ano)]
    
    # agrupar dados por Marca, Modelo e Ano e contar as ocorrências
    contagem_acessos = filtered_data.groupby(['Marca', 'Modelo', 'Ano']).size().reset_index(name='Acessos')
    # calcular total de acessos
    total_acessos = contagem_acessos['Acessos'].sum()
    # calcular porcentagem de cada posição
    contagem_acessos['PorcentagemTotal'] = contagem_acessos['Acessos'].apply(lambda x: f"{round((x / total_acessos)* 100, 2)}%")
    # ordena os dados pela coluna 'Acessos' em ordem decrescente
    contagem_acessos = contagem_acessos.sort_values(by='Acessos', ascending=False)
    # limita os resultados aos 100 primeiros
    top_100_acessos = contagem_acessos.head(100)
    # adicionaa a coluna 'Posição' com a posição de cada veículo
    top_100_acessos.insert(0, 'Posição', range(1, 1 + len(top_100_acessos)))

    return jsonify(top_100_acessos.to_dict(orient='records'))


@app.route('/graficoMarcas')
def contagemPorMarca():
    # agrupa os dados por Marca e conta as ocorrências
    contagem_marcas = df_maisAcessados.groupby('Marca').size().reset_index(name='Acessos')
    # ordena os dados pela coluna 'Acessos' em ordem decrescente
    contagem_marcas = contagem_marcas.sort_values(by='Acessos', ascending=False)
    # retorna os dados em formato JSON
    return jsonify(contagem_marcas.to_dict(orient='records'))


@app.route('/graficoClientes')
def contagemPorClientes():
    contagem_clientes = df_maisAcessados.groupby('ClientTokenId').size().reset_index(name='Acessos')
    contagem_clientes = contagem_clientes.sort_values(by='Acessos', ascending=False)
    return jsonify(contagem_clientes.to_dict(orient='records'))


@app.route('/dataAcessos')
def contagemAcessosPorData():
    # converte a coluna 'Data' para datetime
    df_maisAcessados['Data'] = to_datetime(df_maisAcessados['Data'], format='%d/%m/%Y %H:%M')
    # extrai o mês e o ano da coluna 'Data'
    df_maisAcessados['MesAno'] = df_maisAcessados['Data'].dt.to_period('M')
    # converte 'Mes/Ano' para string pois tipo Period do pandas não é serializavel em JSON
    df_maisAcessados['MesAno'] = df_maisAcessados['MesAno'].astype(str)
    # agrupa os dados por mês/ano
    contagem_acessos_por_mes = df_maisAcessados.groupby('MesAno').size().reset_index(name='Acessos')
    # ordena os valores pelo número de acessos
    contagem_acessos_por_mes = contagem_acessos_por_mes.sort_values(by='MesAno', ascending=True)
    return jsonify(contagem_acessos_por_mes.to_dict(orient='records'))


if __name__ == '__main__':
    app.run(debug=True)