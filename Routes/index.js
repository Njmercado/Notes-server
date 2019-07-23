const express = require("express")
const router = express.Router()
const controller = require("../src/Controller/indexController")

/*
Estructura de la busqueda:
{
   note:{ --> Note information to be added in the system --> *Obligatorio*
      _id: 'id' --> Note id
   },
   user_id: 'id', --> id from user to be add --> *Obligatorio*
}
*/


router.route("/").get((req, res) => { //Obtiene todas las notas

   controller.find(req.query).then((notes) => {// --> todas las notas
      res.send(notes)
   })
}).post((req, res) => { //Agrega una Nota, nueva.

   controller.addNewNote(req.body.params.data).then(result=>{
      res.send({
         result:result
      })
   })
}).put((req, res) => { //Actualiza una nota

   controller.updateNote(req.body)
}).delete((req, res) => { //Elimina una nota o todo la base de datos, esto depende de si el usuario asi lo desee.

   /*
      La estructura del request para realizar el proceso debe ser:
         {
            note_id: 'note id',
            user_id: 'user id'
         }
    */

   controller.deleteNote( JSON.parse(req.query.data) ).then(result =>{
      res.send({
         result: result
      })
   })
})

module.exports = router
