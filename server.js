const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const port = process.env.PORT || 3000

var index = require("./Routes/index")
var searcher = require("./Routes/searcher")

app.use(bodyParser.urlencoded({
   extended:true
}))
app.use(bodyParser.json())

app.use("/", index) //miniaplicación para el home
app.use("/", searcher) //buscador para poder encontrar una nota o un grupo de notas en especifico

app.listen(port, () => {
   console.log(`listen in port ${port}`)
})