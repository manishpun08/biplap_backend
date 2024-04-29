import express from 'express';
import {
  getAllContactUs,
  postContactUs,
  deleteContactUs,
} from '../controllers/contactUsController.js';
import { isAdmin } from '../middlewares/auth.js';

export const contactUsRouter = express.Router();

contactUsRouter.post('/', postContactUs);
contactUsRouter.get('/all', isAdmin, getAllContactUs);
contactUsRouter.delete('/delete/:id', isAdmin, deleteContactUs);
