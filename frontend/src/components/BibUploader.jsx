import React, { useState } from 'react';

export default function BibUploader({ onParsed }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleFile = async (file) => {
    setError(''); setLoading(true);
    try {
      const text = await file.text();                      // Read file
      const res  = await fetch('/api/upload', {            // POST to backend
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: text
      });
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();                       // Get JSON back
      onParsed(json);                                      // Pass up to parent
    } catch (e) {
      setError('Upload fehlgeschlagen: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="btn btn-outline-primary">
        BibTeX Datei importieren
        <input
          type="file"
          accept=".bib"
          hidden
          disabled={loading}
          onChange={e => e.target.files[0] && handleFile(e.target.files[0])}
        />
      </label>
      {loading && <span> Lädt…</span>}
      {error   && <div className="text-danger">{error}</div>}
    </div>
  );
}
