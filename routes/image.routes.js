const express= require ('express');

const router = express.Router();

const imageController = require('../controllers/image.controller')

router.post('/', imageController.create)

router.get('/', imageController.getAll)

router.get('/:id', imageController.getOne)

router.delete('/:id', imageController.delete)

router.patch('/:id', imageController.update)



module.exports = router;