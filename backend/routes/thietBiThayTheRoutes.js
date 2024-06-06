const express = require('express');
const tbttController = require('./../controller/thietBiThayTheController');

const router = express.Router();

router
  .route('/')
  .get(tbttController.getAllTBTT)
  // .post(tbttController.createTBTT);
router
  .route('/:id')
  .get(tbttController.getOneTBTT)
  // .delete(tbttController.deleteTBTT);

module.exports = router;
