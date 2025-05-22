import React, { useState } from 'react';

function BibUploader() {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Bitte eine .bib-Datei auswählen');
      return;
    }

    try {
      const bibText = await file.text();

      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: bibText,
      });

      if (!response.ok) {
        throw new Error(`Upload fehlgeschlagen: ${response.statusText}`);
      }

      const result = await response.json();
      setJsonData(result);
    } catch (error) {
      console.error('Fehler beim Hochladen:', error);
      alert('Fehler beim Hochladen. Siehe Konsole.');
    }
  };

  const handleClear = () => {
    setJsonData(null);
    setFile(null);
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <input type="file" accept=".bib" onChange={handleFileChange} />

       <button type="button" onClick={handleUpload}>Hochladen</button>

      {jsonData && (
        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '10px',
          borderRadius: '5px',
          marginTop: '15px',
          border: '1px solid #ccc'
        }}>
          <h4>Antwort vom Server:</h4>
          <pre style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
          <button onClick={handleClear} style={{ marginTop: '10px' }}>
            JSON löschen
          </button>
        </div>
      )}
    </div>
  );
}

export default BibUploader;
