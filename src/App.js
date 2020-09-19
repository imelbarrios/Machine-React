import React from 'react';
import Orders from './components/Orders';

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <div className="row AppC">
        <h1>Vending Machine </h1>
        <Orders />
      </div>
    </div>
  );
}

export default App;
