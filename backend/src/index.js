// load Express and helper libraries
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// load our routes
const uploadRoute = require('./routes/upload');

// create an Express app
const app = express();

// enable cors for all origins
app.use(cors());

app.use(bodyParser.text({ type: 'text/plain', limit: '10mb' }));

app.use('/api', uploadRoute);

// global error handler. Any error thrown in a route is caught here. Return a JSON error response
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
