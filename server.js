import express, { json } from 'express';
import {authRoutes} from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(json());
app.use('/auth', authRoutes); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
