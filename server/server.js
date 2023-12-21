const express = require("express");
const server = express();

// Lägg till CORS-middleware
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Tillåt alla domäner
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

const port = 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));

server.get('/users', (req, res) => {
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database("./gik339-labb2.db");

  db.all("SELECT * FROM USERS", (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});
