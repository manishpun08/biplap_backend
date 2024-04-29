import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createConnection from '../config/dbConnection.js';
import { generateId } from '../utils/globalFunction.js';

const SECRET_KEY = 'NOTESAPI';

const connection = createConnection();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
          const user = results[0];
          // Compare the user-entered password with the hashed password in the database
          const matchPassword = await bcrypt.compare(password, user.password);

          if (matchPassword) {
            // Passwords match, generate JWT token
            const token = jwt.sign(
              { role: user.role, id: user.user_id, email: user.email },
              SECRET_KEY
            );

            res.status(200).json({
              token,
              message: 'User logged in successfully',
            });
          } else {
            // Passwords don't match
            res.status(401).json({ message: 'Invalid credentials' });
          }
        } else {
          // No user found with the provided email
          res.status(401).json({ message: 'Invalid credentials' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (req, res) => {
  try {
    connection.query('SELECT * FROM users LIMIT 1', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: 'Profile not found' });
        return;
      }

      const { user_id, password, ...rest } = results[0];

      res.status(200).json({
        data: { ...rest, id: user_id.toString() },
        message: 'Data fetched successfully!',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if the user with the provided email already exists
    const userExists = await checkIfUserExists(email);

    if (userExists) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // If the user doesn't exist, proceed to create a new user
    const newUser = {
      user_id: generateId(),
      email,
      password: hashedPassword,
      username,
    };

    // Insert the new user into the database
    const insertUserQuery =
      'INSERT INTO users (user_id,email, password, username) VALUES (?,?,?,?)';
    const insertUserValues = [
      newUser.user_id,
      newUser.email,
      newUser.password,
      newUser.username,
    ];

    connection.query(insertUserQuery, insertUserValues, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating user' });
      }
      res.status(201).json({
        message: 'User has been create ! successfully',
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to check if a user with the provided email already exists
const checkIfUserExists = async (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        }

        resolve(results.length > 0);
      }
    );
  });
};
