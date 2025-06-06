import React, { useState } from 'react';
import './App.css';
import BibUploader from './components/BibUploader';
import BibtexEntryEditor from './components/BibtexEntryEditor';
import EntryListView from './components/EntryListView';

const ITEMS_PER_PAGE = 5;

export default function App() {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Wird aufgerufen, wenn eine .bib-Datei erfolgreich geparsed wurde
  const handleParsed = (parsedEntries) => {
    setEntries(parsedEntries);
    setCurrentPage(1); // zurück zur ersten Seite
  };

  // Speichert aktualisierte Felder eines Eintrags
  const handleSave = (updatedEntry) => {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.citationKey === updatedEntry.citationKey ? updatedEntry : entry
      )
    );
  };

  // Pagination: aktuelle Seite filtern
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEntries = entries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);

  return (
    <EntryListView
      entries={entries}
      currentEntries={currentEntries}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      handleSave={handleSave}
      handleParsed={handleParsed}
    />
  );
}
