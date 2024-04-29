import express from 'express';
import { addTestimonials, deleteTestimonials, updateTestimonials, viewTestimonials } from '../controllers/testimonialController.js';


export const testimonialRoutes = express.Router();

testimonialRoutes.get('/view', viewTestimonials);
testimonialRoutes.post('/add',addTestimonials);
testimonialRoutes.put('/update/:id', updateTestimonials);
testimonialRoutes.delete('/delete/:id', deleteTestimonials);



