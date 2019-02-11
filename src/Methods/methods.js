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

      if (data) {

         if (data.all === undefined) { //Si solo quiero encontrar uno (1), por su ID.
            notes = await models.Note.findById(data);
         } else { //Si quiero encontrar todos los relacionados con ese valor
            delete data.all // Ya no será necesaria, solo me funcionaba para saber que cantidad buscar
            notes = await models.Note.find(data)
         }
      } else { //Si quiero todo
         notes = await models.Note.find();
      }
      return notes;
   },
   deleteNote: (data) => {
      Methods.find(data).then(notes => {
         notes.forEach(element => {
            element.remove()
            element.save()
         });
      })
   },
   updateNote: (data) => {
      const id = data.id

      delete data.id //Lo elimino para no tener redundancia y no reasignarlo, cuando no es necesario.
      
      //TODO: Pensar en que casos no se puede editar las notas.

      Methods.find(id).then(info => {

         Object.keys(data).forEach(element =>{
            info[element] = data[element]
         })
         info.save()
      })
   },
}

module.exports = Methods