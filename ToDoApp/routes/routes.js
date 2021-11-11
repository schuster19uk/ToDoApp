



module.exports = function(app , dbLocation)
{
var db = require(dbLocation);


// GET /
app.get("/", (req, res) => {
  
    //res.render("index");
    const sql = "SELECT * FROM Tasks ORDER BY unique_id";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(rows);
      res.render("Tasks", { model: rows });
    });

  });
  
  // GET /Tasks
  app.get("/Tasks", (req, res) => {
    const sql = "SELECT * FROM Tasks ORDER BY unique_id";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("Tasks", { model: rows });
    });

  });
  
  // GET /create
  app.get("/create", (req, res) => {
    res.render("create", { model: {} });
  });
  
  // POST /create
  app.post("/create", (req, res) => {
  
    const sql = "INSERT INTO Tasks (name) VALUES (?)";
    const book = [req.body.name];
    db.run(sql, book, err => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/Tasks");
    });

  });
  
  
  // POST /edit/5
   app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    const book = [id];
    const sql = `UPDATE Tasks SET status = 'Completed' , completed_at = CURRENT_TIMESTAMP WHERE unique_id = ? and completed_at IS NULL` ;
    db.run(sql, book , err => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/Tasks");
    });

  }); 
  
  // GET /delete/5 (used to test delete)
  app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Tasks WHERE unique_id = ?";
    db.get(sql, id, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("delete", { model: row });
    });

    db.close();
  });
  
  // POST /delete/5
  app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM Tasks WHERE unique_id = ?";
    db.run(sql, id, err => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/Tasks");
    });
  });

  // GET /data
  app.get("/data", (req, res) => {
  

    let toggle = "N"
    let completedString = "";
    if (req.query.completed != null)
    {

    toggle = req.query.completed;
    }
    
    if(toggle == "N")
    {
      completedString = "Pending";
    }
    else
    {
      completedString = "Completed";
    }

    var date = new Date();
    
    //"2021-11-08 21:04:34"
    var datestr =   date.toISOString().split('T')[0] + ' ' + date.toISOString().split('T')[1].split('.')[0];
    
    const searchValues = {
        date: datestr ,
        completed: completedString
      };
    
      console.log("completed value is " + completedString);
      console.log("date is " + searchValues.date);
    
    // date searches need to add date picker
    //let sql = "SELECT * FROM Tasks  WHERE created_at <= date(?,'-2 day') and status = ? ORDER BY unique_id";
    //let sql = "SELECT * FROM Tasks  WHERE created_at <= date(?) and status = ? ORDER BY unique_id";
    
    let sql = "SELECT * FROM Tasks WHERE created_at <= ? and status = ? ORDER BY unique_id";
    
      db.all(sql, [searchValues.date , searchValues.completed] , (err, rows) => {
        console.log(sql)
        if (err) {
          return console.error(err.message);
        }
    
        //console.log(rows)
    
        res.render("data", { search: searchValues , model: rows });
      });
      
    
    });

}