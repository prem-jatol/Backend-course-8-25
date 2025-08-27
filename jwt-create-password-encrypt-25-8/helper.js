const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'this_is_my_secret_key';

const encrypPassword = (password) =>{
        return bcrypt.hashSync(password.toString(), 10);
}

const comparePassword = (reqPassword, dbPassword) =>{
        return bcrypt.compareSync(reqPassword.toString(), dbPassword);
}

const generateToken = (data) =>{
   return jwt.sign(data, SECRET_KEY, {expiresIn: '1h'});
}


module.exports = {encrypPassword, comparePassword, generateToken};