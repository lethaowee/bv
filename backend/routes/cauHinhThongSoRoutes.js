const express = require('express');
const chtsController = require('./../controller/cauHinhThongSoController');

const router = express.Router();

router
  .route('/')
  .get(chtsController.getAllCHTS)
  // .post(chtsController.createCHTS);
router
  .route('/:id')
  .get(chtsController.getOneCHTS)
  // .delete(chtsController.deleteCHTS);

module.exports = router;
