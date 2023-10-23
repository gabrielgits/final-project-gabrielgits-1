const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const { connectDB } = require('./data/mongodb');
const jwt = require("jsonwebtoken")
const PRIVATE_KEY = "Restaurant-App-2023";
const COLLECTION_NAME = 'users';

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

const bcrypt = require('bcrypt');


// // Configure CORS with specific origins
// const corsOptions = {
//     origin: 'http://localhost:19006', // Replace with the actual front-end URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Include cookies and authorization headers
//     optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
// };

// app.use(cors(corsOptions)); // Apply CORS with options

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome' });
});
let db = null;
const initiDb = async () => {
    db = await connectDB();
}
initiDb();

// Login user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.collection(COLLECTION_NAME).findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const plainPassword = password; // Replace with the actual password

        // Generate a salt
        const saltRounds = 10; // You can adjust the number of rounds; a higher number is more secure but slower
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        if (user.password !== hashedPassword) {
            return res.status(401).json({ success: false, error: 'Invalid password' });
        }

        // Generate JWT token and send it in response
        const token = jwt.sign({ userId: user._id }, PRIVATE_KEY);
        res.status(200).json({ success: true, token, userId: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});


// Signup user
app.post('/signup', async (req, res) => {
    let { email, password, name, phone, address } = req.body;

    try {
        // Check if user already exists
        const existingUser = await db.collection(COLLECTION_NAME).findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, error: 'User already exists' });
        }

        const plainPassword = password;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);
        password=hashedPassword;


        // Create new user
        const newUser = {
            email,
            password,
            name,
            phone,
            address,
        };

        const result = await db.collection(COLLECTION_NAME).insertOne(newUser);
        const token = jwt.sign({ userId: result.insertedId }, PRIVATE_KEY);

        res.status(200).json({ success: true, token, userId: result.insertedId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
