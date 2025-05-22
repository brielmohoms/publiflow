import React, { useState } from 'react';
import BibUploader from './BibUploader';
import './App.css';

function Layout() {
  const [openSection, setOpenSection] = useState(null); // au lieu de useState dans la boucle

  const toggleSection = (num) => {
    setOpenSection((prev) => (prev === num ? null : num));
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Publikationen</h1>
        <p>Hallo, Prof. Altmeyer</p>
        <div className="search-box">
          <input type="text" placeholder="Suchen…" />
        </div>

        <ul className="list">
          {[1, 2, 3].map((num) => (
            <li className="list-item" key={num}>
              <div
                onClick={() => toggleSection(num)}
                style={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  padding: '10px',
                  background: '#fafafa',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                Import {num}
                <button className="edit-btn">✏️</button>
              </div>

              {openSection === num && (
                <div className="details-content">
                  <form>
                    <label>Dokumenttyp</label>
                    <select>
                      <option>Wissenschaftlicher Artikel</option>
                      <option>Dissertation</option>
                      <option>Buch (Monographie)</option>
                    </select>

                    <label>Datei hochladen</label>
                    <BibUploader />

                    <label>Kommentar</label>
                    <textarea rows="2" />

                    <label>Nachname</label>
                    <input type="text" placeholder="Nachname" />

                    <label>Vorname</label>
                    <input type="text" placeholder="Vorname" />

                    <label>E-Mail-Adresse</label>
                    <input type="email" placeholder="email@example.com" />

                    <label>Sprache</label>
                    <select>
                      <option>Deutsch</option>
                      <option>Englisch</option>
                      <option>Andere</option>
                    </select>

                    <label>Haupttitel</label>
                    <input type="text" placeholder="Titel" />

                    <label>Abstract</label>
                    <textarea rows="3" />

                    <label>Autor*innen</label>
                    <input type="text" placeholder="z. B. Meyer, Max" />

                    <label>Jahr der Fertigstellung</label>
                    <input type="text" placeholder="JJJJ" />

                    <label>Datum Online-Veröffentlichung</label>
                    <input type="date" />

                    <label>Institution</label>
                    <input type="text" placeholder="Institution" />

                    <label>Seitenzahl</label>
                    <input type="number" placeholder="Seitenzahl" />
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="actions">
        <div className="card">
          <div className="icon">📂</div>
          <div className="label">BibTeX Datei importieren</div>
        </div>

        <div className="card">
          <div className="icon">📤</div>
          <div className="label">Exportieren</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
