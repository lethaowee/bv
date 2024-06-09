const express = require('express');
const ptsController = require('./../controller/phieuTaiSanController');

const router = express.Router();

router
  .route('/')
  .get(ptsController.getAllPTS)
  .post(ptsController.create);
router
  .route('/:id')
  .get(ptsController.getOnePTS)
// .delete(ptsController.deletePTS);

module.exports = router;
