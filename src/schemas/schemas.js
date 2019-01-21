const mongoose = require("../mongoose/mongoose")
const Schema = mongoose.Schema

const Schemas = {

   noteSchema: new Schema({
      subject: {type:String},
      color: {type:String},
      description: {type:String},
      hour: {type:String},
      date: {type:String},
      importance: {type:Number},
   })
}

module.exports = Schemas