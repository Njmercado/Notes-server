const models = require("../models/models")

const Methods = {

   addNewNote: (data) => {

      if (!Methods.exist(data)) {

         const newNote = new models.Note(data)
         newNote.save()
         const id = newNote._id

         return id
      }
   },
   exist: (data) => {

      models.Note.findOne(data)
         .then((info) => {
            return info
         }, (err) => {
            console.log({
               error: err,
               message: "Este es un error"
            })
            return null
         })
         .then((data) => {
            return data ? true : false
         })
   },

   find: async (data) => {
      
      var notes = null

      if (data.data !== undefined && data.data.id !== undefined) { //Si solo quiero encontrar uno (1), por su ID.

         notes = await models.Note.findById(data.data.id);
      } else {

         if (Object.keys(data).length == 1) { //Toda la información de la base de datos.

            notes = await models.Note.find();
         } else { //Si quiero encontrar todos los relacionados con ese valor

            //some = new RegExp(data.data.color, "i") //Ejemplo, no influeye en el programa
            //console.log(some)
            //notes = await models.Note.find().where('color').regex(some).limit(data.amount)
         }
      }

      return notes;
   },
   deleteNote: (data) => {
      console.log(data)
      Methods.find(data).then(notes => {
         notes.forEach(element => {
            element.remove()
            element.save()
         });
      })
   },
   updateNote: (data) => {
      //TODO: Pensar en que casos no se puede editar las notas.

      Methods.find(data).then(info => {

         Object.keys(data.data).forEach(element => {
            info[element] = data.data[element]
         })
         info.save()
      })
   },
}

module.exports = Methods