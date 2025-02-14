import express from 'express';
import connectDB from './config/db';
import studentRoutes from './routes/studentRoutes';
import path from 'path';
import env from 'dotenv';
import session from 'express-session';

env.config(); 

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve favicon.ico from the views directory
app.use('/favicon.ico', express.static(path.join(__dirname, 'views', 'favicon.ico')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure the session secret is assigned correctly
const sessionSecret: string = process.env.SESSION_SECRET || 'mySecret';

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000 // 72 hours
    }
}));

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
