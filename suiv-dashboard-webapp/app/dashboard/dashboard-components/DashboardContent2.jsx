import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const MarcaPieChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:5000/marcaPieChart')
      .then(response => response.json())
      .then(data => {
        if (!data || data.length === 0) {
          throw new Error('Dados vazios retornados pela API');
        }
        const labels = data.map(item => item.Marca);
        const percentages = data.map(item => item.Percentage);
  
        setChartData({
          labels: labels,
          datasets: [
            {
              data: percentages,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF5733',
                '#C70039',
                '#900C3F',
                '#581845'
              ]
            }
          ]
        });
      })
      .catch(error => {
        console.error('Erro na solicitação da API:', error.message);
        // tratar o erro conforme necessário
      });
  }, []);

  return (
    <div className="DashboardContent-2">
      <h2>Distribuição de Marcas</h2>
      {chartData.labels && chartData.labels.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p>Nenhum dado disponível</p>
      )}
    </div>
  );
}

export default MarcaPieChart;