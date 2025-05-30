import React, { useState } from 'react';

const bibtexFields = [
  "entryType", "citationKey", "author", "title", "journal", "booktitle", "year",
  "volume", "number", "pages", "month", "note", "publisher", "editor",
  "series", "address", "edition", "howpublished", "institution", "organization",
  "school", "chapter", "type", "doi", "url", "isbn"
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
    <div className="bibtex-card">
      {bibtexFields.map((field) => (
        <div key={field} className="field-row">
          <label className="field-label">{field}:</label>

          {editingField === field ? (
            <div className="edit-controls">
              {(field === 'title' || field === 'note') ? (
                // Mehrzeiliges Textfeld für längere Texte
                <textarea
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  rows={3}
                  autoFocus
                />
              ) : (
                // Eingabefeld für einfache einzeilige Texte
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  autoFocus
                />
              )}
              {/* Speichern-Button */}
              <button className="btn btn-save" onClick={() => saveField(field)}>✓</button>
              {/* Abbrechen-Button */}
              <button className="btn btn-cancel" onClick={stopEditing}>×</button>
            </div>
          ) : (
            // Anzeige des Werts, Klick zum Bearbeiten
            <span className="field-value" onClick={() => startEditing(field)}>
              {formData[field] && formData[field].trim() !== '' ? formData[field] : '[leer]'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
