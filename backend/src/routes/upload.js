const router = require('express').Router();
const parserService = require('../services/parserservice');

// POST /api/upload
router.post('/upload', async (req, res, next) => {
  try {

    // nimmt einen BibTex-Text aus req.body
    const bibText = req.body;

    // wenn er leer ist oder nur Leerzeichen enthält, wird ein Fehler ausgegeben
    if (!bibText.trim()) {
      const err = new Error('Keine BibTeX-Daten gesendet');
      err.statusCode = 400;
      throw err;
    }

    // das parsing an den parsing service (Frontend) delegieren
    const entries = await parserService.parseBib(bibText);

    // antwort und das JSON-Array der geparsten Einträge
    res.status(201).json(entries);

  } catch (err) {
    next(err);
  }
});

module.exports = router;
