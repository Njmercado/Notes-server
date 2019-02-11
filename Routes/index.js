const express = require("express")
const router = express.Router()
//const Note = require("../src/models/models").Note
const methods = require("../src/Methods/methods")

router.route("/").get((req, res) => {

   methods.find(null).then((notes) => {
      res.send(notes)
   })

}).post((req, res) => {

   res.send(
      {"id": methods.addNewNote(req.body)}
   )

}).put((req, res) => {

   methods.updateNote(req.body)

}).delete((req, res) => {

   console.log(req.body)
   methods.deleteNote(req.body)
})

module.exports = router