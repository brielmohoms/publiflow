import React, { useState, useEffect } from 'react';
import './App.css';
import BibUploader from './components/BibUploader';
import BibtexEntryEditor from './components/BibtexEntryEditor';

function App() {
  // Zustand für die importierten BibTeX Einträge
  const [entries, setEntries] = useState([]);
  // Zustand, um den Upload-Bereich anzuzeigen
  const [showUploader, setShowUploader] = useState(false);

  // useEffect für das Setup der Klick-Listener auf die Import-Karte
  useEffect(() => {
    const importCard = document.getElementById('importCard');
    const input = document.getElementById('bibInput');

    // Falls Elemente nicht gefunden werden, nichts machen
    if (!importCard || !input) return;

    // Funktion, die beim Klick auf die Import-Karte ausgeführt wird
    const onClick = () => {
      setShowUploader(true);
      input.value = '';  // wichtig: Wert zurücksetzen, um erneutes Laden desselben Datei zu erzwingen
      input.click();     // Öffnet den Dateiauswahl-Dialog
    };

    // EventListener für Klick hinzufügen
    importCard.addEventListener('click', onClick);

    // Cleanup-Funktion zum Entfernen des EventListeners beim Unmount
    return () => {
      importCard.removeEventListener('click', onClick);
    };
  }, []);

  // Funktion, die aufgerufen wird, wenn die BibTeX Daten geparsed wurden
  const handleParsed = (parsedEntries) => {
    setEntries(parsedEntries);

    // Zeige den React Root Container an, nachdem eine Datei importiert wurde
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.style.display = 'block';
    }
  };

  // Funktion zum Speichern einer geänderten BibTeX-Eintragung
  const handleSave = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.citationKey === updatedEntry.citationKey ? updatedEntry : entry
      )
    );
  };

  return (
    <div className="App">
      {/* Zeige den Uploader nur, wenn showUploader true ist */}
      {showUploader && <BibUploader onParsed={handleParsed} />}
      {/* Liste aller Einträge anzeigen, jeweils mit Editor */}
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
