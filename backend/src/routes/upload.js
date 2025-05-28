const router = require('express').Router();
const parserService = require('../services/parserService'); // oder keine Ahnung wie das heißt

// POST /api/upload
router.post('/upload', async (req, res, next) => {
  try {

    // takes a BibTex text from req.body
    const bibText = req.body;

    // if it is empty or contains only whitespace, we throw an error
    if (!bibText.trim()) {
      const err = new Error('Keine BibTeX-Daten gesendet');
      err.statusCode = 400;
      throw err;
    }

    // delegate parsing to the parsingService (frontend)
    const entries = await parserService.parseBib(bibText);

    // response and the JSON array of the parsed entries
    res.status(201).json(entries);

  } catch (err) {
    next(err);
  }
});

module.exports = router;