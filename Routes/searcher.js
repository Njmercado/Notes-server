const express = require('express')
const router = express.Router()
const find = require('../src/Methods/methods').find

router.route("/search").post((req, res)=>{
   
   find(req.body).then(notes => res.send(notes))
})

module.exports = router