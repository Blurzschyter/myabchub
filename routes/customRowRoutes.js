import express from 'express';
const router = express.Router();
import {
  createNewCustomRow,
  getAllCustomRow,
  addNewChannel,
  getSingleCustomRow,
  deletePoster,
  createPoster,
  deleteCustomRow,
  updateCustomRow,
  createNewCustomRowMSSQL,
  getAllCustomRowMSSQL,
  createPosterMSSQL,
  deleteCustomRowMSSQL,
  getSingleCustomRowMSSQL,
  deletePosterMSSQL,
  updateCustomRowMSSQL,
} from '../controllers/customRowController.js';

router.route('/').post(createNewCustomRow).get(getAllCustomRow);
// router.route('/').post(createNewCustomRowMSSQL).get(getAllCustomRowMSSQL);
router.route('/:rowId').delete(deleteCustomRow).patch(updateCustomRow);
// router
//   .route('/:rowId')
//   .delete(deleteCustomRowMSSQL)
//   .patch(updateCustomRowMSSQL);
router.route('/singleCustomRow/:id').get(getSingleCustomRow);
// router.route('/singleCustomRow/:id').get(getSingleCustomRowMSSQL);
router.route('/addNewChannel/:id').post(addNewChannel);
router.route('/singleCustomRow/:rowId').post(createPoster);
// router.route('/singleCustomRow/:rowId').post(createPosterMSSQL);
router.route('/singleCustomRow/:rowId/channel/:posterId').delete(deletePoster);
// router
//   .route('/singleCustomRow/:rowId/channel/:posterId')
//   .delete(deletePosterMSSQL);

export default router;
