const User = require('.../models/userModel');

exports.createUser = (req, res) =>{
    const user = req.body;
    const result = User.create(user);
    res.status(200).send({success:true, data:result})
}
