import React, { useState, useEffect } from "react";
import "./App.css";
import BibUploader from "./components/BibUploader";
import BibtexEntryEditor from "./components/BibtexEntryEditor";
import EntryListView from "./components/EntryListView";

const ITEMS_PER_PAGE = 5;
const STORAGE_KEY = "bibtex-entries";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        setEntries(JSON.parse(cached));
      } catch (_) {
        console.warn("Corrupt cache – ignoring it.");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // Wird aufgerufen, wenn eine .bib-Datei erfolgreich geparsed wurde
  const handleParsed = (parsedEntries) => {
    setEntries(parsedEntries);
    setCurrentPage(1); // zurück zur ersten Seite
  };

  // Speichert aktualisierte Felder eines Eintrags
  const handleSave = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.citationKey === updatedEntry.citationKey ? updatedEntry : entry
      )
    );
  };

  // Speichert ALLE Einträge manuell (Speichern-Button) -----------------
   const handlePersistClick = () => {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
     alert('Gespeichert! ✓');
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
      handlePersist={handlePersistClick}
      handleParsed={handleParsed}
    />
  );
}
