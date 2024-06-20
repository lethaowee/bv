const express = require('express');
const psController = require('./../controller/phieuSuaController');

const router = express.Router();

router
    .route('/')
    .get(psController.getAllPS)
    .post(psController.create);
router
    .route('/:id')
    .get(psController.getOnePS)
// .delete(ptsController.deletePTS);

module.exports = router;
