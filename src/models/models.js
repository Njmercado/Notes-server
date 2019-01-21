const mongoose = require("../mongoose/mongoose")
const noteSchema = require("../schemas/schemas").noteSchema

const models = {
   
   Note: mongoose.model('Note', noteSchema, 'myNotes')
}

module.exports = models