import React from 'react';
import BibUploader from './BibUploader';
import BibtexEntryEditor from './BibtexEntryEditor';

export default function EntryListView({
  entries,
  currentEntries,
  currentPage,
  totalPages,
  setCurrentPage,
  handleSave,
  handleParsed
}) {
  return (
    <div className="container">
      {/* Linke Seite mit Anleitung und Liste */}
      <div className="sidebar">
        <div className="intro">
          <h2>Willkommen</h2>
          <ul className="instruction-list">
            <li>Klicken Sie auf <em>„BibTeX Datei importieren“</em>, um eine Datei auszuwählen.</li>
            <li>Die Einträge erscheinen unten nach dem Import.</li>
            <li>Sie können bearbeitet und anschließend exportiert werden.</li>
          </ul>
        </div>

        {entries.length > 0 && (
          <ul className={`list ${currentEntries.length < 5 ? 'few-items' : ''}`}>
            {currentEntries.map((entry, index) => {
              const stableKey =
                entry.citationKey ||
                entry.author + entry.year + entry.title + index;

              return (
                <li key={stableKey} className="list-item">
                  <details>
                    <summary>
                      <span className="entry-title">
                        {entry.title || `Eintrag ${index + 1}`}
                      </span>
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
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ← Zurück
            </button>
            <span style={{ margin: '0 1rem' }}>
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
        <div className="card">
          <div className="icon">📤</div>
          <div className="label">Exportieren</div>
        </div>
        <BibUploader onParsed={handleParsed} />
      </div>
    </div>
  );

}
