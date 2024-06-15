import { useEffect, useState } from "react";

const ListaMaisAcessados = () => {
  const [tableHTML, setTableHTML] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/maisAcessados')
      .then(response => response.json())
      .then(data => {
        // converter os dados JSON em HTML de tabela
        const tableRows = data.map((item, index) => {
          return `
            <tr>
            <td>${index + 1}</td>
            <td>${item.Marca || ''}</td>
            <td>${item.Modelo || ''}</td>
            <td>${item.Ano || ''}</td>
            <td>${item.Acessos || ''}</td>
            <td>${item.PorcentagemTotal || ''}</td>
            </tr>
          `;
        });

        // montando a tabela HTML
        const tableHTML = `
          <table border="1">
            <thead>
              <tr>
                <th>Posição</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Acessos</th>
                <th>% Total</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows.join('')}
            </tbody>
          </table>
        `;

        // definindo a tabela HTML no estado
        setTableHTML(tableHTML);
      });
  }, []);

  return (
    <div className="ListaMaisAcessados">
      <main>
        <h2>Acessos por Veículo</h2>
        {tableHTML && <div dangerouslySetInnerHTML={{ __html: tableHTML }}></div>}
      </main>
    </div>
  );
}

export default ListaMaisAcessados;