const express = require('express');
const tsController = require('./../controller/taiSanController');

const router = express.Router();

router
  .route('/')
  .get(tsController.getAllTS)
  .post(tsController.create);
router
  .route('/:id')
  .get(tsController.getOneTS)
// .delete(tsController.deleteTS);

module.exports = router;
