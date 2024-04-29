import createConnection from '../config/dbConnection.js';
import { generateId } from '../utils/globalFunction.js';

const connection = createConnection();

export const postContactUs = async (req, res) => {
  const { full_name, email, subject, message } = req.body;

  try {
    const newContactData = {
      user_id: generateId(),
      full_name,
      email,
      subject,
      message,
    };

    //Insert the new user into the database
    const insertContactUsQuery =
      'INSERT INTO contact_us (inquiry_id,full_name,email,subject,message) VALUES (?,?,?,?,?)';
    const insertContactUsValues = [
      newContactData.user_id,
      newContactData.full_name,
      newContactData.email,
      newContactData.subject,
      newContactData.message,
    ];

    connection.query(
      insertContactUsQuery,
      insertContactUsValues,
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Error creating contact us' });
        }

        res.status(201).json({
          message: 'Your data has been sent !!',
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllContactUs = async (req, res) => {
  try {
    const getContactQuery = 'SELECT * FROM contact_us';
    connection.query(getContactQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching contact us' });
      }

      res.status(200).json({
        data: { result },
        message: 'Data has been fetched successfully!',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteContactUs = (req, res) => {
  const id = req.params.id; // Assuming the id is provided in the request parameters

  try {
    // Check if the id exists in the table
    const checkIdQuery = 'SELECT * FROM contact_us WHERE inquiry_id = ?';

    connection.query(checkIdQuery, [id], (checkError, checkResult) => {
      if (checkError) {
        console.error(checkError);
        return res.status(500).json({ message: 'Error checking if ID exists' });
      }

      // Check if the id was found in the table
      if (checkResult.length === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      // If the id exists, proceed with the DELETE operation
      const deleteContactByIdQuery =
        'DELETE FROM contact_us WHERE inquiry_id = ?';

      connection.query(deleteContactByIdQuery, [id], (deleteError, result) => {
        if (deleteError) {
          console.error(deleteError);
          return res
            .status(500)
            .json({ message: 'Error deleting contact us by ID' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

