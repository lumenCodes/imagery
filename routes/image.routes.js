const express= require ('express');

const router = express.Router();

const imageController = require('../controllers/image.controller')

router.post('/', imageController.create)

router.get('/', imageController.getAll)

router.delete('/', imageController.delete)

router.patch('/', imageController.update)



module.exports = router;