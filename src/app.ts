import express from 'express';
import connectDB from './config/db';
import studentRoutes from './routes/studentRoutes';
import path from 'path';
import env from 'dotenv';

env.config(); 

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve favicon.ico from the views directory
app.use('/favicon.ico', express.static(path.join(__dirname, 'views', 'favicon.ico')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to prevent caching
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store'); 
    next(); 
});

// Connect to the database
connectDB();

// Set up routes
app.use('/', studentRoutes);

export default app;
