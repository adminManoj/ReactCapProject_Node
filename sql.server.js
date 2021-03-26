var express = require("express");
var app = express();
var sql = require("mssql");
var cors = require("cors");
var bodyParser = require("body-parser");
var configDetails = require("./config");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var config = {
  user: "sa", //configDetails.user,
  password: "texoMD11@#21", //configDetails.password,
  server: "43.239.110.144", // configDetails.server,
  database: "master", // configDetails.database,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

app.get("/products", function (req, res) {
  console.log(req.body);

  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select * from Products", function (err, recordset) {
      if (err) console.log(err);
      res.send(recordset.recordset);
    });
  });
});
app.get("/products/:id", function (req, res) {
  console.log("/getProducts" + req.params.id);

  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
      "select * from Products where id =" + req.params.id,
      function (err, recordset) {
        if (err) console.log(err);
        res.send(recordset.recordset);
      }
    );
  });
});

app.post("/products", function (req, res) {
  //console.log(req.body);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    var request = new sql.Request();
    var query =
      `Select * from Users ` +
      ` where Username = '${req.body.username}' and Password = '${req.body.password}' and IsActive = 1 `;
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) console.log(err);
      res.send(recordset.recordset);
    });
  });
  //res.send({ status: "SUCCESS" });
});

var server = app.listen(5051, function () {
  console.log("Server is running..");
});
