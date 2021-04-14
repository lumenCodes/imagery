const express= require ('express');

const router = express.Router();

const imageController = require('../controllers/image.controller')

router.post('/', imageController.create)

router.get('/', imageController.getAll)

module.exports = router;