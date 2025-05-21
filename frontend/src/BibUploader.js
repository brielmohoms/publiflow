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
      // 🔁 Lire le contenu texte du fichier sélectionné
      const bibText = await file.text();

      // 🔼 Envoyer le texte brut au backend
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

      // ✅ Réponse JSON attendue du backend
      const result = await response.json();
      setJsonData(result);
    } catch (error) {
      console.error('Fehler beim Hochladen:', error);
      alert('Fehler beim Hochladen. Siehe Konsole.');
    }
  };

  return (
    <div>
      <input type="file" accept=".bib" onChange={handleFileChange} />
      <button onClick={handleUpload}>Hochladen</button>

      {jsonData && (
        <div>
          <h4>Antwort vom Server:</h4>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default BibUploader;

