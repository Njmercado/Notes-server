const express = require("express")
const router = express.Router()
const methods = require("../src/Methods/methods")
const NotifySend = require('node-notifier').NotifySend
const notify = new NotifySend()
const path = require('path')

/*
Estructura de la busqueda:
{
   data:{

   },
   amount: ''       --> Me indica la cantidad de datos a buscar.
                        Puede tener un valor n, 0 o culquier otro, el 
                        cual me dice la cantidad de datos a traer, 
                        0 --> todos. 
}
*/


router.route("/").get((req, res) => { //Obtiene todas las notas

   notify.notify({
      title:'hola mundo title',
      message:"lorem",
      icon: "document-open",
      urgency: "critical",
   })

   notify.on('click', (notifierObject, options) => {
      //notify.notify('Se me ha presionado tio!!!!!!!!')
      console.log("hola mundo. Se me ha presionado hp!!!!!!!!!!!!")
   })



   methods.find(req.body).then((notes) => {
      res.send(notes)
   })

}).post((req, res) => { //Agrega una nota

   res.send({
      "id": methods.addNewNote(req.body)
   })

}).put((req, res) => { //Actualiza una nota

   methods.updateNote(req.body)

}).delete((req, res) => { //Elimina una nota o todo la base de datos, esto depende de si el usuario asi lo desee.
   console.log(req.body)
   methods.deleteNote(req.body)
   res.send("Eliminado todoo")
})

module.exports = router
