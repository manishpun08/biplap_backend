import express from 'express';
import {
  addDonation,
  deleteDonation,
  getDonationByCharityID,
  getDonationByUserID,
  viewDonation,
} from '../controllers/donationController.js';
import { auth, isAdmin } from '../middlewares/auth.js';

export const donationRoutes = express.Router();

donationRoutes.post('/add', auth, addDonation);
donationRoutes.get('/all', isAdmin, viewDonation);
donationRoutes.get('/charity/:id', isAdmin, getDonationByCharityID);
donationRoutes.get('/user/:id', auth, getDonationByUserID);
donationRoutes.delete('/delete/:id', isAdmin, deleteDonation);
