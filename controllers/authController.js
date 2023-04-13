const User = require('../models/userModel')
const { hashPassword, comparePassword }= require('../helpers/authHelper')
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config({path: "../.env"})

exports.registerController = async (req, res) => {
    try {
        const {username, email,password, phone, address} = req.body;
        // Validations
        if(!username) {
            return res.send({error: "username is required"})
        }
        if(!email) {
            return res.send({error: "Email is required"})
        }
        if(!password) {
            return res.send({error: "Password is required"})
        }
        if(!phone) {
            return res.send({error: "Phone Number is required"})
        }
        if(!address) {
            return res.send({error: "Address is required"})
        }

        // Check for user
        const userMatch = await User.findOne({email: email})
        // Check for existing User
        if(userMatch){
            res.status(200).send({
                success: true,
                message: "User already exist, please login"
            })
        }
        // Register User
        const hashedPassword = await hashPassword(password)
        // save the password
        const user = new User({
            username,
            email,
            phone,
            address,
            password: hashedPassword
        })
        await user.save()

        return res.status(201).send({
            success: true,
            message: "User Registered",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "Error while registration",
            error
        })
    }
}

exports.loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        // Validation
        if(!email || !password) {
            return res.status(404).send({
                success:false,
                message: "Email or Password is required"
            })
        }
        // check User 
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const passwordMatch = await comparePassword(password, user.password)
        if(!passwordMatch) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }
        // Create Token
        const token = await JWT.sign({
            _id:user._id
        }, 
        process.env.JWT_SECRET, 
        {expiresIn: "7d"})
        return res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                 name: user.name,
                 email: user.email,
                 address: user.address,
                 phone: user.phone
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while login the user",
            error
        })
    }
}
