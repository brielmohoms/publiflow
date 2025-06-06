import React, { useState } from 'react';

const bibtexFields = [
  "address", "author", "booktitle", "chapter", "doi", "edition", "editor", "howpublished",
  "institution", "isbn", "issn", "journal", "month", "note", "number", "organization",
  "pages", "publisher", "school", "series", "title", "type", "url", "volume", "year",
  "abstract", "annote", "crossref", "key", "language", "location", "pdf", "keywords"
];

export default function BibtexEntryEditor({ entry, onSave }) {
  // Zustand für die Formular-Daten initialisiert mit dem übergebenen Eintrag
  const [formData, setFormData] = useState(entry);
  // Zustand für das aktuell bearbeitete Feld (null = keines)
  const [editingField, setEditingField] = useState(null);

  // Funktion zum Aktualisieren des Formular-States bei Eingabeänderungen
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Bearbeitung eines Feldes starten
  const startEditing = (field) => setEditingField(field);
  // Bearbeitung beenden
  const stopEditing = () => setEditingField(null);

  // Feld speichern, Änderungen weitergeben und Bearbeitung beenden
  const saveField = (field) => {
    onSave(formData);
    stopEditing();
  };

  return (
    <div className="bibtex-editor-inside-details">
      {bibtexFields.map((field) => (
        <div key={field} className="field-row">
          <label className="field-label">{field}:</label>

          {editingField === field ? (
            <div className="edit-controls">
              {(field === 'title' || field === 'note') ? (
                <textarea
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  rows={3}
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  autoFocus
                />
              )}
              <button className="btn btn-save" onClick={() => saveField(field)}>✓</button>
              <button className="btn btn-cancel" onClick={stopEditing}>×</button>
            </div>
          ) : (
            <span className="field-value" onClick={() => startEditing(field)}>
              {formData[field] && formData[field].trim() !== '' ? formData[field] : '[leer]'}
            </span>
          )}
        </div>
      ))}
    </div>
  );

}
