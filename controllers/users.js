const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
    signup,
    login
};

async function login(req, res) {
    // find the user in the db by email
    try {
        const user = await User.findOne({ email: req.body.email });
        // if the user does not exist, we respond with 400
        if (!user) return res.status(400).json({ err: 'bad credentials' });
        // if the user is found, we then compare the password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                //if the password matches, we create a token and then send to the client
                const token = createJWT(user);
                res.json({ token });
            } else {
                //if the password does not match we respond with a 401
                return res.status(401).json({ err: 'bad credentials' });
            }
        });
    } catch (error) {
        res.status(500).json({
            err: 'this request cannot be completed at this time'
        });
    }
}

async function signup(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

function createJWT(user) {
    return jwt.sign({ user }, SECRET, { expiresIn: '24h' });
}
