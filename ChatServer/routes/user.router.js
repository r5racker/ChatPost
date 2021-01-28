const express= require('express')
const router =express.Router()
const userCtrl = require('../controllers/user.controller');
const fileUpload=require('../controllers/fileUpload')
router.post('/register', userCtrl.register)

router.put('/register', (req,res) =>{
    res.send('updated')
})

router.post('/login',userCtrl.login)
router.get('/getAll',userCtrl.getAllUser)
router.post('/delete',userCtrl.deleteUser)
router.post('/get',userCtrl.getUser)
router.post('/upload',
    [fileUpload.single('image'),userCtrl.fileUpload]
    )

module.exports=router;