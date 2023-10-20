const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');  

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome' });
});

app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});