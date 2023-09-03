const express = require('express');
const router = express.Router();

const controller = require('../controllers/chofer');

router.get('/chofer', controller.index);
router.get('/chofer/nombre_id', controller.show);

module.exports = router;