import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const GraficoPorDatas = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Acesso por Data',
      data: [],
      backgroundColor: 'rgba(0, 123, 255, 0.5)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 1
    }]
  });

  const options = {
    plugins: {
      datalabels: {
        color: '#FFF',
        anchor: 'end',
        align: 'start',
        offset: -10,
        font: {
          weight: 'bold'
        },
        formatter: (value) => {
          return value;
        }
      }
    }
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dataAcessos')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)){
          // Ordena os dados pela coluna MesAno
          data.sort((a, b) => {
            const [mesA, anoA] = a.MesAno.split('/').map(Number);
            const [mesB, anoB] = b.MesAno.split('/').map(Number);
            return new Date(anoA, mesA - 1) - new Date(anoB, mesB - 1);
          });

          const datas_acesso = data.map(item => item.MesAno);
          const acessos = data.map(item => item.Acessos);

          setChartData({
            labels: datas_acesso,
            datasets: [{
              label: 'Acesso Mês',
              data: acessos,
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1
            }]
          });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="GraficoPorData">
      <main>
        <h2>Acessos por Data</h2>
        <Bar data={chartData} options={options} plugins={[ChartDataLabels]}/>
      </main>
    </div>
  );  
}

export default GraficoPorDatas;