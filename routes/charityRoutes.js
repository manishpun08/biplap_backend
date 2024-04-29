import express from 'express';
import {
  deleteCharityById,
  getAllCharity,
  getCharityByID,
  postCharity,
  updateCharityById,
} from '../controllers/charityController.js';
import { auth, isAdmin } from '../middlewares/auth.js';

export const charityRoutes = express.Router();

charityRoutes.post('/add', isAdmin, postCharity);
charityRoutes.get('/getAll', getAllCharity);
charityRoutes.delete('/delete/:id', isAdmin, deleteCharityById);
charityRoutes.put('/update/:id', updateCharityById);
charityRoutes.get('/:id', getCharityByID);
