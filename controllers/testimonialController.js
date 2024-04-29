// import { createConnection } from "mysql2"
// import createConnection from '../config/dbConnection.js';
// import { generateId } from "../utils/globalFunction.js";

import createConnection from "../config/dbConnection.js";
import { generateId } from "../utils/globalFunction.js";


const connection = createConnection();


export const viewTestimonials = (req,res) =>{
    try {
    const viewTestimonialsQuery = 'SELECT * FROM testimonials';
    connection.query(viewTestimonialsQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error During testimonials fetching...' });
      }
      res.status(200).json({
        data: { result },
        message: 'Data has been fetched successfully.....',
      });
    });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }

};

export const addTestimonials = (req,res) =>{
    const {customer_name,email,content,rating} = req.body;
    //try-catch
    try {
        // const create to store the data after the query
        const dataStoreTestimonials = {
            testimonial_id:generateId(), //generate 16 digit random id
            customer_name,
            email,
            content,
            rating
        };
        //Insert query to add new testimonials in database
        const addTestimonialsQuery = 'INSERT INTO testimonials(testimonial_id,customer_name,email,content,rating) VALUES (?,?,?,?,?)';
        //storing the data
        const addTestimonialsValue = [
            dataStoreTestimonials.testimonial_id,
            dataStoreTestimonials.customer_name,
            dataStoreTestimonials.email,
            dataStoreTestimonials.content,
            dataStoreTestimonials.rating
        ];
        connection.query(addTestimonialsQuery,addTestimonialsValue,(error,results) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    message: 'Error adding your testimonials...'
                });  
            }
            res.status(200).json({
                message:'Testimonals Added Successfully...'
            });  
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error.....'
        });
    }
};

export const deleteTestimonials = (req,res) =>{
    const testId = req.params.id;
    try {
        const checkTestiIdQuery = 'SELECT * FROM testimonials WHERE testimonial_id = ?';
        connection.query(checkTestiIdQuery,[testId],(checkError,checkResult)=>{
            if (checkError) {
                console.log(checkError);
                return res.status(500).json({
                    message:'Error finding the ID..'
                });
            }
            if (checkResult.length === 0) {
                return res.status(420).json({
                    message:'Error finding the userdata'
                });                
            }
            const deleteTestimonialsQuery = 'DELETE FROM testimonials WHERE testimonial_id = ?';
            connection.query(deleteTestimonialsQuery,[testId],(deleteError,results)=>{
                if (deleteError) {
                    console.log(deleteError);
                    res.status(500).json({
                        message:'Error Deleting the Testimonials'
                    });
                }
                res.status(200).json({
                    message:'Testimonials has been successfully deleted..'
                });
            });
        });
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Error in the surver'
        });
        
    }

};

export const updateTestimonials = (req,res) =>{
    const {customer_name,email,content,rating} = req.body;
    const testId = req.params.id;
    try {
        const dataStoreTestimonials = {
            customer_name,
            email,
            content,
            rating,
        };
        const checkTestiIdQuery = 'SELECT * FROM testimonials WHERE testimonial_id = ?';
        connection.query(checkTestiIdQuery,[testId],(checkError,checkResult) => {
            if (checkError) {
                console.log(checkError);
                res.status(500).json({
                    message:'Error finding the testimonials'
                });
            }
            if (checkResult.length === 0) {
                res.status(404).json({
                    message:'Error finding the user data..'
                });
            }

            const updateTestimonialsQuery = 'UPDATE testimonials SET customer_name = ?, email = ?, content = ?, rating = ? WHERE testimonial_id = ?';
            const updateTestimonialsValue = [
                dataStoreTestimonials.customer_name,
                dataStoreTestimonials.email,
                dataStoreTestimonials.content,
                dataStoreTestimonials.rating,
                testId,

            ];
            connection.query(updateTestimonialsQuery,updateTestimonialsValue,(updateError,results) => {
                if (updateError) {
                    console.log(error);
                    res.status(500).json({
                        message:'Error Updating the data based on ID'
                    });
                };
                res.status(200).json({
                    message:'Data updated successfully'
                });
            });
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Error in the server..'
        });
        
    }

};

