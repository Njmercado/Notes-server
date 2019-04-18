const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const webpush = require('web-push')
const path = require('path')

//Configuration of notifications. Begin
const publicVapidKey = "BHcvEVyfQHL_BhSUYduy-06DschMO7nsbVBeQ4OY0rtyH3edxStaUgkRFEvWHhB9fUQhoBjBvEcz6LG2cX8iE5g"
const privateVapidKey = "dgPUDDKaEwbIOOEx8MKC4VN_AZp06Qdk-dHeCbcesx8"

webpush.setVapidDetails('mailto:njesusmercado@gmail.com', publicVapidKey, privateVapidKey)
//Configuration of notifications. End


const port = process.env.PORT || 3000

var index = require("./Routes/index")
var searcher = require("./Routes/Searcher")
var user = require("./Routes/User")

app.use(express.static(path.join(__dirname, "/Client")))//Carga la informacion de la pagina a mostrar --> Cliente
app.use(bodyParser.urlencoded({
   extended:true
}))
app.use(bodyParser.json())

//Routes
app.use("/user", user) //Manejo de los usuarios, CRUD
app.use("/note", index) //Manejo de las notas, CRUD
app.use("/search", searcher) //buscador para poder encontrar una nota o un grupo de notas en especifico
//

app.post('/subscribe', (req, res) =>{//--> Main de la api para el llamado de 

   console.log(req.body)

   const subscription = req.body.subscription

   //Resource has been created
   res.status(201).json({})

   //Create Payload
   const payload = JSON.stringify({title: req.body.title})
   //

   webpush.sendNotification(subscription, payload).catch(err => console.error(err))
})

app.listen(port, () => {
   console.log(`listen in port ${port}`)
})