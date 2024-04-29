import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import createConnection from './config/dbConnection.js';
import { authRouter } from './routes/authRoutes.js';
import { contactUsRouter } from './routes/contactUsRoute.js';
import { charityRoutes } from './routes/charityRoutes.js';
import { donationRoutes } from './routes/donationRoutes.js';
import { testimonialRoutes } from './routes/testimonialRoutes.js';
import { PORT } from './constant/constant.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connection = createConnection();

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM notes';

  // Use the connection.query method to execute the SQL query
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Result:', result);
    res.json(result);
  });
});

app.use('/auth', authRouter);
app.use('/contact', contactUsRouter);
app.use('/charity', charityRoutes);
app.use('/donation', donationRoutes);
app.use('/testimonial', testimonialRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // connection();
});
