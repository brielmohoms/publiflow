import React from 'react';
import EasyEdit from 'react-easy-edit';

// Liste möglicher BibTeX-Felder (nicht jeder Eintragstyp braucht alle)
const bibtexFields = [
  "entryType", "citationKey", "author", "title", "journal", "booktitle", "year",
  "volume", "number", "pages", "month", "note", "publisher", "editor",
  "series", "address", "edition", "howpublished", "institution", "organization",
  "school", "chapter", "type", "doi", "url", "isbn"
];

export default function BibtexEntryEditor({ entry, onSave }) {
  const handleSave = (field, value) => {
    onSave({ ...entry, [field]: value });
  };

  return (
    <div className="p-4 border rounded shadow space-y-2">
      {bibtexFields.map((field) => (
        <div key={field}>
          <label className="block font-semibold">{field}:</label>
          <EasyEdit
            type="text"
            value={entry[field] || ''}
            onSave={(value) => handleSave(field, value)}
            onCancel={() => {}}
            saveButtonLabel="✔"
            cancelButtonLabel="✖"
            attributes={{ name: field, id: field }}
          />
        </div>
      ))}
    </div>
  );
}
