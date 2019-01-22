const express = require("express")
const router = express.Router()
const Note = require("../src/models/models").Note

router.route("/").get((req, res)=>{
   
   Note.find().then((notes) =>{
      res.send(notes)
   })

}).post((req, res)=>{

   Note.findOne(req.body).then(
   (notes)=>{

      if(notes)
         res.send("Este elemento ya se encuentra resgistrado en nuestra base de datos, por favor intente con otros valores")
      else{
         Note.create(req.body)
         res.send("Nota agregada exitosamente\n")
      }
   }, 
   (reason)=>{
      var h = "ERROR: "+reason
      res.send(h)
   })
      
}).put((req, res)=>{

   const param = req.body.param //Parametro a cambiar.
   const value = req.body.value //Informacion del parametro que se desea cambiar.
   var condition = {
      color : req.body.color
   }

   Note.findOne(condition).then((notes)=>{ 
      notes[param] = value
      notes.save()
      res.send(notes)
   })

}).delete((req, res)=>{
   
   Note.deleteMany({color:"purple"}, function(err){
      console.log("ERROR:", err)
   })

   Note.find().then(notes =>{res.send(notes)})
})

module.exports = router