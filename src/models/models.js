const mongoose = require("../mongoose/mongoose")
const schemas = require("../schemas/schemas")

const models = {

   Note: mongoose.model('Note', schemas.noteSchema, 'myNotes'),
   User: mongoose.model('User', schemas.userSchema, 'myUsers'),
}

module.exports = models