const bcrypt = require('bcrypt');
const { Users } = require('../models')

async function register (req, res) {
  try {
    const { email, firstName, lastName, password } = req.body;
    const user = await Users.findOne({where: {email}});
    if (user) return res.status(409).send({error: '409', message: 'User already exists'})
    const hash = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      ...req.body,
      password: hash
    });
    req.login(user, function(error) {
      if (error) throw new Error('Passport error loggin in', error);
    })
    res.status(201).json({"statusCode": 200, "message": "User created"}); // TODO: login by default or redirect to login page on client?
  } catch (error) {
    console.log(error);
    res.status(500).json({"statusCode": 200, "message": error});
  }
}

function logout (req, res) {
  try {
    if (req.user) {
      req.logout(function(error) {
        if (error) throw new Error();
      })
      res.status(200).json({"statusCode": 200, "message": 'User logged out'})
    } else {
      res.status(404).json({"statusCode": 200, "message": 'User not found'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({"statusCode": 200, "message": error});
  }
}

function login (req, res) {
    res.status(200).json({'statusCode': 200, 'message':'logged in', 'data':req.user});
}

module.exports = {register, logout, login};