const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const port = 5001;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB((err, data, CatData) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    } else {
        console.log('Connected to MongoDB');
        global.foodData = data;
        global.foodCategory = CatData;

        // Start the server after the database is initialized
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });

        // Define routes after database is initialized
        app.use('/api/auth', require('./routes/auth'));

        // Root route
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });
    }
});
