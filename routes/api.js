const Router = require('express');
const router = new Router();
const authController = require('../controller/authController.js')
const mainController = require('../controller/main.controller')
const authMiddleware = require('../middleware/middleware')
const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(req.body)
        cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
        console.log(req.body)
        cb(null,Date.now()+"--"+ file.originalname)
    }
})
const upload = multer({storage:fileStorageEngine})

router.get('/:entityName/',authMiddleware, mainController.getEntityCollection)
router.get('/:entityName/:id',authMiddleware, mainController.getEntity)
router.post('/:entityName/', authMiddleware,mainController.createEntity)
router.delete('/:entityName/:id', authMiddleware ,mainController.deleteEntity)
router.post('/auth/login',authController.login)
router.post('/auth/registration', authController.registration)
module.exports = router