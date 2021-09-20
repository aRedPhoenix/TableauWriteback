//Initialisations
const express = require("express");
const app = express();
const database = require("./db");

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");

//When requested for root page
app.get("/",function(request,response){
    response.render("index");
});

app.get("/request/:requestID", async function(request, response) {
    let data = await database.getRequest(request.params.requestID);
    let emp = await database.getEmployees();
    console.log(data);
    response.render("request", {request: data, emp});
  });

app.post("/update/:requestID", async function(request, response) {
    let update = await database.updateRequest(request.params.requestID, request.body);
    response.send(update);
});

//listener for page
const listener = app.listen(3000, function() {
    console.log(`Server started on port`+listener.address().port);
});