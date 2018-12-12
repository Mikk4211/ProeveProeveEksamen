/* For at åbne serveren */
var app = require('express')();
var http = require('http').Server(app);
/* gør så serveren kan læse JSON objekter ved at parse objekter som læselige JSON objekter. */
bodyParser = require('body-parser');

/* Vigtigt for POST request*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*Require MySQL modul for at kunne bruge MySQL databasen*/
var mysql = require('mysql');

/*GET request. Her henter vi kun html dokumentet.*/
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

//Laver connection til DB 
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345"
  });

  /*GET request. Her henter vi alle objekterne*/
app.get('/hent', function(req,res){
    
    /*Der bliver tjekket for errors. Hvis der er errors, thrower den en error tilbage.*/
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        /*Bruger databasenavn*/
        con.query("use testeksamen;", function (err, result) {
            if (err) throw err;
            console.log("connected");
          });
          /*Bruger tablenavn*/
        con.query("select * from ikeapare", function (err, result) {
          if (err) throw err;
          console.log("selected *");
          /*Det den sender, når man går ind på localhost:5050/hent */
        res.send(result);
        });
      });

})


app.post('/opret', function(req,res){
    

 con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        /*Bruger databasenavn*/
        con.query("use testeksamen;", function (err, result) {
            if (err) throw err;
            console.log("connected");
          });
con.query("insert into ikeapare(onoff, nominelStrom, aktuelStrom, lysIntensitet, farve, uniktID, hardwareID, softwareID) values ("+req.body.onoff+","+req.body.nominelStrom+","+req.body.aktuelStrom+", "+req.body.lysIntensitet+",'"+req.body.farve+"','"+req.body.uniktID+"', '"+req.body.hardwareID+"','"+req.body.softwareID+"');", function (err, result) {
    if (err) throw err;
    console.log("selected *");
    /*Det den sender, når man går ind på localhost:5050/hent */
  res.send("skrrr");
  });
});
});
/*'hoster' serveren, ved at vi 'lytter' på en speciel addresse, i det her tilfælde localhost */
http.listen(5050, function(){
    console.log('listening on localhost:5050');
  });
