import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import EntryListView from "./components/EntryListView";

const STORAGE_KEY = "bibtex-entries";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        setEntries(JSON.parse(cached));
      } catch {
        console.warn("Corrupt cache – ignoring it.");
      }
    }
  }, []);

  // Wird aufgerufen, wenn eine .bib-Datei erfolgreich geparsed wurde
  const handleParsed = (parsedEntries) => {
    if (parsedEntries.length === 0) return;

    const newEntries = parsedEntries.map((e) => ({
      ...e,
      id: nanoid(), // new unique token
    }));
    setEntries((prev) => [...prev, ...newEntries]);

    setCurrentPage(1); // zurück zur ersten Seite
  };

  // Speichert aktualisierte Felder eines Eintrags
  const handleSave = (updatedEntry) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === updatedEntry.id ? updatedEntry : e))
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  };

  // Speichert ALLE Einträge (Speichern-Button)
  const handlePersistClick = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    alert("Gespeichert! ✓");
  };

  const handleDelete = (id) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);

      setCurrentPage((p) =>
        Math.min(p, Math.max(1, Math.ceil(next.length / 5)))
      );
      return next;
    });
  };

  const handleDeleteAll = () => {
    if (!window.confirm("Möchtest du wirklich alle Einträge löschen?")) {
      return;
    }
  
    setEntries([]);
    
    setCurrentPage(1);
    
    localStorage.removeItem(STORAGE_KEY);

  };

  return (
    <EntryListView
      entries={entries}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      handleSave={handleSave}
      handleDelete={handleDelete}
      handleDeleteAll={handleDeleteAll}
      handlePersist={handlePersistClick}
      handleParsed={handleParsed}
    />
  );
}
