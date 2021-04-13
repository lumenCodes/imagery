const express= require ('express');

const router = express.Router();
const imageController = require('./image.controller')

router.post('/', imageController.create)

router.get('/', imageController.getAll)

module.exports = router;