import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

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

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dataAcessos')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)){
          const datas_acesso = data.map(item => item.MesAno)
          const acessos = data.map(item => item.Acessos)

          setChartData({
            labels: datas_acesso,
            datasets: [{
              label: 'Acesso Mês',
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
    <div className="GraficoPorData">
      <main>
        <h2>Acessos por Data</h2>
        < Bar data={chartData} />
      </main>
    </div>
  );  
}

export default GraficoPorDatas;