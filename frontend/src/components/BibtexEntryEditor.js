import React, { useState } from 'react';

const bibtexFields = [
  "type", "title", "language", "summary", "author", "year", "date", "institution",
  "number of pages", "publisher", "location", "titel of the parent work", "date of first publication", "editors", 
  "keywords", "volume", "doi", "isbn"
];

export default function BibtexEntryEditor({ entry, onSave }) {
  const [formData, setFormData] = useState(entry);
  const [editingField, setEditingField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const startEditing = (field) => setEditingField(field);
  const stopEditing = () => setEditingField(null);

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