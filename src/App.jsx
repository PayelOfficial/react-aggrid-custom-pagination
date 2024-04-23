import { useState } from 'react';

import './App.css';
import AgGridTable from './components/AgGrid';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Ag Grid Custom pagination</h1>
      <AgGridTable />
    </>
  );
}

export default App;
