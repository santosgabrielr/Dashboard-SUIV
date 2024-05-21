import { useEffect, useState } from "react";

const DashboardContent1 = () => {
  const [tableHTML, setTableHTML] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dashboardSuiv')
      .then(response => response.json())
      .then(data => {
        // converter os dados JSON em HTML de tabela
        const tableRows = data.map(item => {
          return `
            <tr>
            <td>${item.POSICAO || ''}</td>
            <td>${item.MARCA || ''}</td>
            <td>${item.MODELO || ''}</td>
            <td>${item.VERSAO || ''}</td>
            <td>${item.ANO || ''}</td>
            <td>${item.TIPO || ''}</td>
            <td>${item.CONTAGEM || ''}</td>
            </tr>
          `;
        });

        // montando a tabela HTML
        const tableHTML = `
          <table border="1">
            <thead>
              <tr>
                <th></th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Versão</th>
                <th>Ano</th>
                <th>Tipo</th>
                <th>Consultas</th>
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
    <div className="DashboardContent-1">
      <main>
        <h2>Veículos mais acessados</h2>
        {tableHTML && <div dangerouslySetInnerHTML={{ __html: tableHTML }}></div>}
      </main>
    </div>
  );
}

export default DashboardContent1;