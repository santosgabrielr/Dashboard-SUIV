import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

df_maisAcessados = pd.read_excel('dados.xlsx')

app = Flask(__name__)
CORS(app)

@app.route('/dashboardSuiv')
def listaMaisAcessados():
    dataMaisAcessados = df_maisAcessados.to_dict()
    return(jsonify(dataMaisAcessados))

if __name__ == '__main__':
    app.run(debug=True)