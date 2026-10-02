// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp Microservice endpoint
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;

  // 1. If date is empty, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // 2. If dateParam is numeric, parse as integer (Unix timestamp)
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      // 3. Otherwise parse as standard date string
      date = new Date(dateParam);
    }
  }

  // 4. Return error if date is invalid
  if (date.toUTCString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 5. Return JSON with unix timestamp and UTC string
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});