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
} from '../controllers/customRowController.js';

router.route('/').post(createNewCustomRow).get(getAllCustomRow);
router.route('/:rowId').delete(deleteCustomRow).patch(updateCustomRow);
router.route('/singleCustomRow/:id').get(getSingleCustomRow);
router.route('/addNewChannel/:id').post(addNewChannel);
router.route('/singleCustomRow/:rowId').post(createPoster);
router.route('/singleCustomRow/:rowId/channel/:posterId').delete(deletePoster);

export default router;
