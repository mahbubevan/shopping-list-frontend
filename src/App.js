import React from 'react';
import './App.css';

import HandleAPI from './component/HandleAPI'
import NavBar from './component/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
     <HandleAPI />
    </div>
  );
}

export default App;
