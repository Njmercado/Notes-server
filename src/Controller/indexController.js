const Note = require("../models/models").Note
const userController = require('./userController')
some = true

const Methods = {

   addNewNote: (data) => {
      
      return Methods.find(data).then(note =>{

         if(note.length == 0){
            const newNote = new Note(data.note)
            newNote.save()
            const id = newNote._id
   
            //Update info inside user
            to_user = {} 
            to_user['user_id'] = data.user_id
            to_user['note_id'] = id
            to_user['purpose'] = 'add_note'
            userController.addNoteToUser(to_user)
   
            return id
         }else{
            return "La nota, que desea crear, ya se encuentra registrada."
         }
      })
   },

   find: async (data) => {//--> informacion de las notas

      if(data.note_id) //--> Una nota en especifico, del usuario que se encuentre logeado.
         return await Note.findById(data.note_id).where('user').equals(data.user_id).populate({
            path: 'user',
            match:{_id: {$eq: data.user_id}},
            select: ['nickName']
         })
      else //--> Todas las notas del usuario logeado
         return await Note.find(data.note).where('user').equals(data.user_id).populate({
            path:'user',
            match:{_id: {$eq: data.user_id}},
            select: ['nickName']
         })
   },
   deleteNote: (data) => {//Se le puede cargar toda la información de una nota
                          //Como tambien se le puede mandar el id de la nota.

      return Note.findByIdAndRemove(data.note_id, (err, note) =>{
         if(err){ 
            return handleError(err)
         }else{
            console.log(note)
         
            if(note.length == 0){
               return "Esta nota no existe, o ya ha sido eliminada con anterioridad."
            }else{
               userController.removeNoteFromUser(data)
               return "ok"
            }
         }
      }).where('user').equals(data.user_id)

   },
   updateNote: (data) => {
      //TODO: Pensar en que casos no se puede editar las notas.

      Methods.find(data).then(info => {

         Object.keys(data.note).forEach(element => {
            info[element] = data.note[element]
         })
         info.save()
      })
   },
}

module.exports = Methods