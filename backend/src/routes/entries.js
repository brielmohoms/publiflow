const router = require('express').Router();

// GET // so kann das Frontend beim Laden alle Einträge abrufen. 
// Liefert alle aktuell gespeicherten Einträge als JSON-Array
router.get('/entries', (req,res) => {
  const allEntries = store.getAll(); 
  res.json(allEntries);
});

// GET // Einzelnen Datensatz holen
router.get('/entries/:id', (req, res) => {
  const id = Number(req.params.id);
  const entry = entriesStore.find(e => e.id === id);
  if (!entry) return res.status(404).json({ error:'Nicht gefunden' });
  res.json(entry);
});

// PUT (edit) // erlaube das Speichern von Änderungen
router.put('/entries/:id', (req, res) => {
  const id = Number(req.params.id);
  let entry = entriesStore.find(e => e.id === id);
  if (!entry) return res.status(404).json({ error:'Nicht gefunden' });
  entry = { ...entry, ...req.body, id };
  entriesStore = entriesStore.map(e => e.id===id? entry : e);
  res.json(entry); // geändertes Objekt zurück
});

module.exports = router;
