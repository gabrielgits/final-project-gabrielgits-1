const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
//const jwt = require("jsonwebtoken")
const PRIVATE_KEY = "Restaurant-App-2023";

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome' });
});

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
