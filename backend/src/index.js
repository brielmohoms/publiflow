// load Express and helper libraries
const express = require('express');
const cors = require('cors');

// load our routes
const uploadRoute = require('./routes/upload');
const entriesRoute = require('./routes/entries');

// create an Express app
const app = express();

// enable cors for all origins
app.use(cors());

// für den BibTex upload
app.use(express.text({ type: 'text/plain', limit: '10mb' }));

// für den JSON PUT (edit)
app.use(express.json({ limit: '10mb' }));

// Mount alle Routes
app.use('/api', uploadRoute);
app.use('/api', entriesRoute);

// global error handler. Any error thrown in a route is caught here. Return a JSON error response
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
