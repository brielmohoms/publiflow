import React, { useState } from 'react';
import './App.css';
import Layout from './Layout';
import BibUploader from './components/BibUploader';

function App() {
  const [entries, setEntries] = useState([]);

  return (
    <div className="App">
      <h1>Publikationen</h1>
      <BibUploader onParsed={setEntries} />
    </div>
  );
}

export default App;