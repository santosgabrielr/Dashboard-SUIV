import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const GraficoClientes = () => {
  const [chartData, setChartData] = useState({
  labels: [],
  datasets: [{
    label: 'Acesso por Clientes',
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
    fetch('http://127.0.0.1:5000/graficoClientes')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)){
          const clientes = data.map(item => item.ClientTokenId)
          const acessos = data.map(item => item.Acessos)

          setChartData({
            labels: clientes,
            datasets: [{
              label: 'Acesso por Clientes',
              data: acessos,
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1
            }]
          })
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="GraficoDeClientes">
      <main>
        <h2>Acessos por Cliente</h2>
        < Bar data={chartData} options={options} plugins={[ChartDataLabels]}/>
      </main>
    </div>
  );  
}

export default GraficoClientes;