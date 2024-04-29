import createConnection from '../config/dbConnection.js';
import { checkValidation, generateId } from '../utils/globalFunction.js';

const connection = createConnection();

export const viewDonation = async (req, res) => {
  try {
    const viewDonationQuery = 'SELECT * FROM donation_list';
    connection.query(viewDonationQuery, (error, result) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error During Donation fetching...' });
      }
      res.status(200).json({
        data: { result },
        message: 'Data has been fetched successfully.....',
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ' Oops.. Server Error' });
  }
};

//Add Donation
export const addDonation = (req, res) => {
  const { user_id, charity_id, donor_name, donor_message, donation_amount } =
    req.body;

  try {
    const store_donation = {
      donation_id: generateId(),
      user_id,
      charity_id,
      donor_name,
      donor_message,
      donation_amount,
    };

    // Check if user and charity exist
    const userExist = checkValidation('user', user_id);
    const charityExist = checkValidation('charity', charity_id);

    if (!userExist || !charityExist) {
      return res.status(500).json({
        message: 'Charity or user is not found.',
      });
    }

    // Add donation to the donation_list table
    const addDonationQuery = `
        INSERT INTO donation_list(donation_id, user_id, charity_id, donor_name, donor_message, donation_amount)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    const addDonationValues = [
      store_donation.donation_id,
      store_donation.user_id,
      store_donation.charity_id,
      store_donation.donor_name,
      store_donation.donor_message,
      store_donation.donation_amount,
    ];

    connection.query(addDonationQuery, addDonationValues);

    // Update donation_count and collected_amount in the charity table
    const updateCharityQuery = `
        UPDATE charity
        SET donation_count = donation_count + 1,
            collected_amount = collected_amount + ?
        WHERE charity_id = ?
      `;
    const updateCharityValues = [
      store_donation.donation_amount,
      store_donation.charity_id,
    ];

    connection.query(updateCharityQuery, updateCharityValues);

    res.status(200).json({
      message: 'Donation has been made successfully...',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server ERROR...',
    });
  }
};

//View Donation by CharityID
export const getDonationByCharityID = (req, res) => {
  try {
    const charityID = req.params.id;
    const getDonationQuery = `
        SELECT donation_list.*, charity.title AS charity_title
        FROM donation_list
        JOIN charity ON donation_list.charity_id = charity.charity_id
        WHERE donation_list.charity_id = ?
      `;

    connection.query(getDonationQuery, [charityID], (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: 'Error fetching donations by charity ID' });
      }

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: 'No donations found for the charity' });
      }

      res.status(200).json({
        data: result,
        message: 'Donations have been fetched successfully!',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//View Donation by userID
export const getDonationByUserID = (req, res) => {
  try {
    const userID = req.params.id;
    const getDonationQuery = `
        SELECT donation_list.*, charity.title AS charity_title
        FROM donation_list
        JOIN charity ON donation_list.charity_id = charity.charity_id
        WHERE donation_list.user_id = ?
      `;

    connection.query(getDonationQuery, [userID], (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: 'Error fetching donations by User ID' });
      }

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: 'No donations found for the User ID' });
      }

      res.status(200).json({
        data: result,
        message: 'Donations have been fetched successfully!',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// export const deleteDonation = async (req, res) => {
//   try {
//     // Placeholder for the deleteDonation function
//     // Implement the logic to delete a donation based on the provided donation ID
//     const donationID = req.params.id;

//     // Your delete query and logic here

//     res.status(200).json({ message: 'Donation deleted successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

export const deleteDonation = async (req, res) => {
  try {
  } catch (error) {}
};
