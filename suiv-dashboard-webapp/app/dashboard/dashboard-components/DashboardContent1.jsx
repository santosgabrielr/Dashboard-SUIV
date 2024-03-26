import { useEffect, useState } from "react";


const DashboardContent1 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dashboardSuiv')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

    return (
      <div className="DasboardContent-1">
        <main>
            <h2>Teste</h2>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </main>
      </div>
    );
  }
  
  export default DashboardContent1;