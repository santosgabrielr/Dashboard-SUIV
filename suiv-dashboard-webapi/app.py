import pandas as pd
from flask import Flask, jsonify

df_ModelosMaisAcessados = pd.read_excel('dados.xlsx')

app = Flask(__name__)

@app.route('/dashboard', methods=['GET'])
def listaMaisVendidos():
    # convertendo o DataFrame em dicionário
    data = df_ModelosMaisAcessados.to_dict()
    # retornando uma string JSON
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)