import React, { useEffect, useState, useCallback } from 'react';

export default function BibUploader({ onParsed }) {
  // Ladezustand (true wenn Datei verarbeitet wird)
  const [loading, setLoading] = useState(false);
  // Fehlermeldung, falls Upload fehlschlägt
  const [error, setError]     = useState('');

  // Funktion zum Verarbeiten der Datei, mit useCallback um Referenz stabil zu halten
  const handleFile = useCallback(async (file) => {
    setError('');
    setLoading(true);
    try {
      // Datei als Text lesen
      const text = await file.text();
      // Upload an Backend via POST
      const res  = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: text
      });
      // Fehler werfen wenn Antwort nicht OK
      if (!res.ok) throw new Error(res.statusText);
      // Antwort JSON parsen
      const json = await res.json();
      // Ergebnis nach oben geben
      onParsed(json);
    } catch (e) {
      // Fehler speichern für Anzeige
      setError('Upload fehlgeschlagen: ' + e.message);
    } finally {
      // Ladezustand zurücksetzen
      setLoading(false);
    }
  }, [onParsed]);

  // Effekt zum Verbinden von DOM-Elementen und Events
  useEffect(() => {
    const input = document.getElementById('bibInput');
    const trigger = document.getElementById('importCard');

    if (trigger && input) {
      // Klick auf Trigger löst Klick auf verstecktes Input aus
      const onTriggerClick = () => input.click();
      // Wenn Datei im Input geändert wird, handleFile aufrufen
      const onInputChange = (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
      };

      trigger.addEventListener('click', onTriggerClick);
      input.addEventListener('change', onInputChange);

      // Aufräumen bei Komponentendemontage
      return () => {
        trigger.removeEventListener('click', onTriggerClick);
        input.removeEventListener('change', onInputChange);
      };
    }
  }, [handleFile]);

  // UI: Ladeanzeige und Fehlernachricht
  return (
    <div style={{ marginTop: '1rem' }}>
      {loading && <span>Lädt…</span>}
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}
