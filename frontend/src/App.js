import React, { useState } from 'react';
import './App.css';
import Layout from './Layout';
import BibUploader from './components/BibUploader';
import BibtexEntryEditor from './components/BibtexEntryEditor';

function App() {
  const [entries, setEntries] = useState([]);

  const handleSave = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.citationKey === updatedEntry.citationKey ? updatedEntry : entry
      )
    );
  };

  return (
    <div className="App">
      <h1>Publikationen</h1>
      <BibUploader onParsed={setEntries} />
      {entries.map((entry) => (
        <BibtexEntryEditor
          key={entry.citationKey || entry.id}
          entry={entry}
          onSave={handleSave}
        />
      ))}
    </div>
  );
}

export default App;