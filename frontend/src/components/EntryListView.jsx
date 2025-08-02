import React, { useState, useEffect } from "react";
import { FiSave, FiTrash2, FiUpload } from "react-icons/fi";
import BibUploader from "./BibUploader";
import BibtexEntryEditor from "./BibtexEntryEditor";


function entriesToXML(entries) {
  const escapeXML = (str) =>
    str ? str.replace(/[<>&'"]/g, (c) => ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    }[c])) : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<entries>
${entries.map(entry => `
  <entry>
${Object.entries(entry).map(([key, value]) =>
  key !== 'id' && value !== undefined
    ? `    <${key}>${escapeXML(String(value))}</${key}>`
    : ''
).join('\n')}
  </entry>
`).join('\n')}
</entries>`;
}

function handleExport(entries) {
  const xmlContent = entriesToXML(entries);
  const blob = new Blob([xmlContent], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "entries.xml";
  a.click();
  URL.revokeObjectURL(url);
}

export default function EntryListView({
  entries,
  currentPage,
  setCurrentPage,
  handleSave,
  handleDelete,
  handleDeleteAll,
  handlePersist,
  handleParsed,
}) {
  const [query, setQuery] = useState("");

  const filteredEntries = query
    ? entries.filter((e) => {
        const hay =
          (e.title || "") +
          " " +
          (e.citationKey || "") +
          " " +
          (e.author || "");
        return hay.toLowerCase().includes(query.toLowerCase());
      })
    : entries;

  function calcPerPage() {
    const w = window.innerWidth;
    if (w < 600) return 2; // phones
    if (w < 900) return 3; // small tablets / narrow windows
    if (w < 2000) return 4;
    return 6; // desktops and large tablets
  }

  const [perPage, setPerPage] = useState(calcPerPage());

  useEffect(() => {
    const onResize = () => setPerPage(calcPerPage());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / perPage));
  const pageSlice = filteredEntries.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages, setCurrentPage]);

  return (
    <div className="container">
      {/* Linke Seite mit Anleitung und Liste */}
      <div className="sidebar">
        <div className="intro">
          <h2>Willkommen</h2>
          <ul className="instruction-list">
            <li>
              Klicken Sie auf <em>„BibTeX Datei importieren“</em>, um eine Datei
              auszuwählen.
            </li>
            <li>Die Einträge erscheinen unten nach dem Import.</li>
            <li>Sie können bearbeitet und anschließend exportiert werden.</li>
          </ul>
        </div>

        <div className="search-row">
          <input
            type="text"
            className="search-input"
            placeholder="Suchen …"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* Löschen aller Einträge */}
          <div
            className="deleteCard"
            onClick={handleDeleteAll}
            title="Alle löschen"
          >
            <FiTrash2 className="icon" size={20} />
          </div>
          {/* Speichern aller Einträge */}
          <div
            className="saveCard"
            onClick={handlePersist}
            title="Alle speichern"
          >
            <FiSave className="icon" size={20} />
          </div>
        </div>
        {pageSlice.length > 0 && (
          <ul className={`list ${pageSlice.length < 5 ? "few-items" : ""}`}>
            {pageSlice.map((entry, index) => {
              const stableKey =
                entry.citationKey ||
                (entry.author ?? "") +
                  (entry.year ?? "") +
                  (entry.title ?? "") +
                  index;

              return (
                <li key={stableKey} className="list-item">
                  <details>
                    <summary className="entry-summary">
                      <span className="entry-title">
                        {entry.title || `Eintrag ${index + 1}`}
                      </span>

                      {/* delete button */}
                      <button
                        className="trash-btn"
                        title="Eintrag löschen"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(entry.id);
                        }}
                      >
                        <FiTrash2 size={16} aria-label="Eintrag löschen" />
                      </button>

                      <span className="chevron">▾</span>
                    </summary>

                    <div className="details-content">
                      <BibtexEntryEditor entry={entry} onSave={handleSave} />
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        )}

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ← Zurück
            </button>
            <span style={{ margin: "0 1rem" }}>
              Seite {currentPage} von {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Weiter →
            </button>
          </div>
        )}
      </div>

      {/* Rechte Seite mit Buttons */}
      <div className="actions">
        <div id="importCard" className="card">
          <div className="icon">📂</div>
          <div className="label">BibTeX Datei importieren</div>
        </div>
        <div className="card"  onClick={() => handleExport(entries)}>
          <FiUpload className="icon" size={28} title="Als XML exportieren" />
          <div className="label">Exportieren</div>
        </div>
        <BibUploader onParsed={handleParsed} />
      </div>
    </div>
  );
}
