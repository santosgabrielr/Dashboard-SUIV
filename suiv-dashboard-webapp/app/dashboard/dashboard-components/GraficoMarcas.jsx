import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ChartMarcasAcessadas = () => {
  const [chartData, setChartData] = useState({
  labels: [],
  datasets: [{
    label: 'Acesso por Marca',
    data: [],
    backgroundColor: 'rgba(0, 123, 255, 0.5)',
    borderColor: 'rgba(0, 123, 255, 1)',
    borderWidth: 1
  }]
});

  useEffect(() => {
    fetch('http://127.0.0.1:5000/graficoMarcas')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)){
          const marcas = data.map(item => item.Marca)
          const acessos = data.map(item => item.Acessos)

          setChartData({
            labels: marcas,
            datasets: [{
              label: 'Acesso por Marca',
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
    <div className="GraficoMarcas">
      <main>
        <h2>Acessos por Marca</h2>
        < Bar data={chartData} />
      </main>
    </div>
  );  
}

export default ChartMarcasAcessadas;