const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const port = process.env.PORT || 3000

var indexRouter = require("./Routes/index")

app.use(bodyParser.urlencoded({
   extended:true
}))
app.use(bodyParser.json())

app.use("/", indexRouter) //miniaplicación para el home

app.listen(port, () => {
   console.log(`listen in port ${port}`)
})