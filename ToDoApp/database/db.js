const path = require("path");

var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = path.join(__dirname, "todo.db");

// Task Table creation (unique_id, name, created_at, completed_at status)
const sql_create = `CREATE TABLE IF NOT EXISTS Tasks (
  unique_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name Text NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  status VARCHAR(100) NOT NULL DEFAULT 'Pending'
);`; 

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
         console.log('Connected to the SQLite database.')
        db.run(sql_create,
        (err) => {
            if (err) {
                // Table already created
            }else{
                
            }
        });  
    }
});


module.exports = db
