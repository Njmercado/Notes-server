//Like google, but only to look for notes.

const express = require('express')
const router = express.Router()
const controller = require('../src/Controller/indexController')

router.route("/").post((req, res)=>{
   
    controller.find(req.body.params.data).then(notes => res.send(notes))
})

module.exports = router
