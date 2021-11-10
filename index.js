const express = require("express");
const path = require("path");


const app = express();

// Express Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


//const sqlite3 = require("sqlite3").verbose();

//var db= require(path.join(__dirname, "database", "db.js"));

/* // Database Connection
const db_name = path.join(__dirname, "data", "todo.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to database 'todo.db'");
});
 */

/* // Task Table creation (unique_id, name, created_at, completed_at status)
const sql_create = `CREATE TABLE IF NOT EXISTS Tasks (
  unique_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name Text NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  status VARCHAR(100) NOT NULL DEFAULT 'Pending'
);`; */

/* //insert temp data
db.run(sql_create, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Creation of table 'Tasks' successfull ");
  // // Inserting Temp Data
  // const sql_insert = `INSERT INTO Tasks (unique_id, name , status) VALUES
  // (1, 'Task 1' , 'Pending'),
  // (2, 'Task 2' , 'Pending'),
  // (3, 'Task 3' , 'Pending');`;
  // db.run(sql_insert, err => {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   console.log("Insert of temp data 'Tasks' table was successfull ");
  // });
});
 */

var routespath = path.join(__dirname, "routes", "routes.js");
var dbLocation = path.join(__dirname, "database", "db.js");

require(routespath)(app, dbLocation);

//require('../ToDoApp/routes/routes.js')(app , db);

//Server Listen
app.listen(3000, () => {
    console.log("Server Listening on: (http://localhost:3000/) !");
});