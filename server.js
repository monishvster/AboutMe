var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();  // make express app
var http = require('http').Server(app);


// set up the view engine

app.set("views", path.resolve(__dirname, "assets")); // path to views
app.set("view engine", "ejs"); // specify our view engine
app.use(express.static(__dirname+'/assets'));
// manage our entries
var entries = [];
app.locals.entries = entries;

// set up the logger
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));


// http GET (default and /new-entry)
app.get("/", function (request, response) {
  response.render("index");
});
app.get("/Emagazine", function (request, response) {
  response.render("Emagazine");
});
app.get("/Contact", function (request, response) {
  response.render("Contact");
});
app.get("/Guestbook", function (request, response) {
  response.render("Guestbook");
});
app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});
//http POST (INSERT)
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  response.redirect("/Guestbook");
});
// contact form for sending email
app.post("/Contact",function(req,res){

  var api_key = 'key-896e41732c6c78b100f997e76be7eb2a'; // API Key
  var domain = 'sandboxe484afc21d1246e492544df8346585da.mailgun.org'; //Domain name
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: 'Mail Gun <postmaster@sandboxe484afc21d1246e492544df8346585da.mailgun.org>', // From email ID
    to: 'monish.vster@gmail.com', // To email ID
    subject: req.body.userName+"<"+req.body.email+">"+" Sent you a message", //Subject Line
    html: "<b style='color:blue'>Message: </b>"+req.body.body //Subject Body
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(!error)
      res.send("Mail Sent");
    else
      res.send("Mail not sent <br/>Error Message : "+error);
  });

});

//404
app.use(function (request, response) {
  response.status(404).render("404");
});

// Listen for an application request on port 8081
http.listen(8081, function () {
  console.log('A03 app listening on http://127.0.0.1:8081/');
});

