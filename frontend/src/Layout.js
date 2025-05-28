import React from 'react';
import BibUploader from './components/BibUploader';
import './App.css';

function Layout() {
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
              <details>
                <summary>
                  Import {num}
                  <button className="edit-btn">✏️</button>
                </summary>
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
              </details>
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

