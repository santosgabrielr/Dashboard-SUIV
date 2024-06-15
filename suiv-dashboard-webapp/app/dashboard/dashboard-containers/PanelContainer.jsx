import React from 'react';
import Panel from '../dashboard-components/Panel.jsx'
import ListaMaisAcessados from '../dashboard-components/ListaMaisAcessados.jsx';
import GraficoMarcas from '../dashboard-components/GraficoMarcas.jsx';
import GraficoClientes from '../dashboard-components/GraficoClientes.jsx';
import GraficoDatas from '../dashboard-components/GraficoDatas.jsx'

const PanelContainer = () => {
  return (
    <div className="panel-container">
      <Panel>
        <ListaMaisAcessados/>
      </Panel>
      <Panel>
        <GraficoMarcas/>
      </Panel>
      <Panel>
        <GraficoClientes/>
      </Panel>
      <Panel>
        <GraficoDatas/>
      </Panel>
    </div>
  );
};

export default PanelContainer;