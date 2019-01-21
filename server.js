const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const port = process.env.PORT || 3000
const Note = require("./src/models/models").Note

app.use(bodyParser.urlencoded({
   extended:true
}))
app.use(bodyParser.json())

app.post("/", function(req,res){
   res.send(req.body)
   var a = new Note(req.body)
   a.save()
})

app.get("/",function(req, res){
   res.send("hola mundo")
})

app.get("/notes", function(req, res){

   Note.find().then(function(notes){
      res.send(notes)
      console.log(notes)
   })
})

app.get("/h", function(req, res){
   res.send("perro")
})

app.listen(port, () => {
   console.log(`listen in port ${port}`)
})