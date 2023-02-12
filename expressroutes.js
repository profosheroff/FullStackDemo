const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "michael",
  password: "Mysqlpassword1+",
  database: "fullstack"
});

var url = require('url');

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.get('/:name', (req, res) => {

    var url_object = url.parse(req.url);

    let name = req.params.name;
    console.log("name = "+name);

    switch (name) {
      case "update":
         console.log("inside of update function")
         con.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");

           var search_string = url_object.search;
           let searchParams = new URLSearchParams(url_object.search);
           let company_name = searchParams.get('name');
           let company_address = searchParams.get('address');
           console.log(company_name, company_address);

           var sql = "INSERT INTO customers (name, address) VALUES ('"+company_name+"', '"+company_address+"')";
           con.query(sql, function (err, result) {
             if (err) throw err;
             console.log("1 record inserted, ID:" + result.insertId);
             res.json({
               message: 'Inserted record ' + result.insertId
             });
           });
         });
         break;

    case "read":
      console.log("inside of read function")
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        let searchParams = new URLSearchParams(url_object.search);
        let record_id = searchParams.get('recordID');

        var sql = "SELECT * FROM customers WHERE ID = '"+record_id+"'";
        console.log(sql);
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          console.log("1 record read: " + result[0].name + " " + result[0].address);
          res.json({
            message: 'Retrieved record ' + result[0].name + " " + result[0].address
          });
        });
      });

  }


});


app.listen(2020, () => {
    console.log('server is listening on port 2020');
});
