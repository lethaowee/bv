const express = require('express');
const pbController = require('./../controller/phongBanController');

const router = express.Router();

router
  .route('/')
  .get(pbController.getAllPB)
  // .post(pbController.createPB);
router
  .route('/:id')
  .get(pbController.getOnePB)
  // .delete(pbController.deletePB);

module.exports = router;
