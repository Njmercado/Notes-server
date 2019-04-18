const User = require('../models/models').User
const Note = require('../models/models').Note


const mongoose = require("../mongoose/mongoose")
const Schema = mongoose.Schema

const methods = {
    
   addNewUser: (data)=> {

      const user = new User(data)
      user.save()
      return user._id
   },
   addNoteToUser: (data)=>{

      return User.findById(data.user_id).then(user =>{
            
         user.notes.push(data.note_id)
         user.notes.sort()
         user.save()   
      }).catch(err =>{
         return "El usuario suministrado no se encuentra registrado, por favor  verifique sus datos."
      })
   }, 
   removeNoteFromUser: (data)=>{

      return User.findById(data.user_id).then(user =>{
         
         var ll = 0,
         lu = user.notes.length
         middle = Math.trunc((ll+lu)/2 - 1)

         while(user.notes[middle] != data.note_id){ // => Busqueda binaria
     
            if(user.notes[middle] < data.note_id) ll = middle+1
            else lu = ll+middle
            middle = Math.trunc((lu+ll)/2)
         }

         user.notes.splice(middle, 1) // => elimina la nota buscada
         user.save()
         return "Se ha eliminado la nota"
      })
   },
   removeUser: (data)=>{

      return User.findByIdAndRemove(data.user_id).then(user =>{

         user.notes.forEach(element => {   
            Note.findByIdAndRemove(element).exec()
         });
      }).catch(err =>{
         if(err){

            handleError(err)
            return "Problemas para encontrar el usuario sumistrado."
         }
      })
   }
}

module.exports = methods