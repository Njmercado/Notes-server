const express = require('express')
const router = express.Router()
const controller = require('../src/Controller/userController')

router.route('/').post((req, res)=>{ //Crea un nuevo usuario
   
   res.send({
      usrId: controller.addNewUser(req.body)
   })
}).delete((req, res)=>{//Delete some user
   
   controller.removeUser(req.body)
   res.send({
      result:"something"
   })
})

module.exports = router