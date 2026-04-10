const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('./db/database.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS sockets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      place_name TEXT NOT NULL,
      suburb TEXT NOT NULL,
      socket_type TEXT NOT NULL,
      power_output TEXT NOT NULL,
      availability TEXT NOT NULL,
      notes TEXT
    )
  `);

  db.get("SELECT COUNT(*) AS count FROM sockets", (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }

    if (row.count === 0) {
      const stmt = db.prepare(`
        INSERT INTO sockets (place_name, suburb, socket_type, power_output, availability, notes)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      stmt.run('Deakin Library Charging Zone', 'Burwood', 'USB-C', '65W', 'Available', 'Near study area');
      stmt.run('Campus Cafe Wall Socket', 'Burwood', 'Standard Plug', '240V', 'Busy', 'Next to window seats');
      stmt.run('Student Hub Fast Charger', 'Geelong', 'USB-C', '100W', 'Available', 'Level 1 help desk');
      stmt.run('Train Station Charging Spot', 'Box Hill', 'USB-A', '18W', 'Limited', 'Near platform entrance');

      stmt.finalize();
    }
  });
});

// GET all sockets
app.get('/api/sockets', (req, res) => {
  db.all('SELECT * FROM sockets', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST new socket
app.post('/api/sockets', (req, res) => {
  const { place_name, suburb, socket_type, power_output, availability, notes } = req.body;

  if (!place_name || !suburb || !socket_type || !power_output || !availability) {
    return res.status(400).json({ error: 'Please fill all required fields.' });
  }

  const sql = `
    INSERT INTO sockets (place_name, suburb, socket_type, power_output, availability, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [place_name, suburb, socket_type, power_output, availability, notes], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      message: 'Socket location added successfully',
      id: this.lastID
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});