//Structure of each collection('Table') in the DB.
const mongoose = require("../mongoose/mongoose")
const Schema = mongoose.Schema

const Schemas = {

   noteSchema: new Schema({
      subject: {type:String},
      color: {type:String},
      description: {type:String},
      hour: {type:String},
      date: {type:String},
      importance: {type:Number},//1 to 5, being 1 lower and 5 higher.
      user: {type:String, ref:'User'}, //Conection with users --> user name
   }),
   userSchema: new Schema(
      {
         _id:{type:String},
         usrName: {type:String},
         nickName:{type:String},
         notes:[{ type: Schema.Types.ObjectId, ref:'Note'}]
      }, { _id: false}),
}

module.exports = Schemas