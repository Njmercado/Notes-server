   //Stablish a connections with remote DB.
var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/notes", {useNewUrlParser:true})

var db = mongoose.connection
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function(){
   console.log("Successful")
})

module.exports = mongoose