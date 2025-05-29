import React, { useState } from 'react';

export default function EditableField({ value, onSave }) {
  // Zustand, ob das Feld gerade bearbeitet wird
  const [editing, setEditing] = useState(false);
  // Temporärer Wert für die Eingabe, um Änderungen vor dem Speichern zu halten
  const [tempValue, setTempValue] = useState(value);

  // Speichert den temporären Wert und beendet den Bearbeitungsmodus
  const handleSave = () => {
    onSave(tempValue);
    setEditing(false);
  };

  // Abbrechen der Bearbeitung, setzt den Wert zurück und beendet den Bearbeitungsmodus
  const handleCancel = () => {
    setTempValue(value);
    setEditing(false);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      {editing ? (
        <>
          {/* Eingabefeld für Bearbeitung */}
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
          {/* Speichern Button */}
          <button onClick={handleSave}>✔</button>
          {/* Abbrechen Button */}
          <button onClick={handleCancel}>✖</button>
        </>
      ) : (
        // Anzeige des Wertes oder [leer] wenn kein Wert, Klick aktiviert Bearbeitungsmodus
        <span onClick={() => setEditing(true)} style={{ cursor: 'pointer', borderBottom: '1px dashed gray' }}>
          {value || <i style={{ color: '#aaa' }}>[leer]</i>}
        </span>
      )}
    </div>
  );
}
