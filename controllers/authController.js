const User = require('../model/User')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const register = async( req, res)=>{
    try {
        const { name, email, password } = req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"all field are required"});
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user already exist"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({name, email, password: hashedPassword})
         res.status(201).json({message:"user created successfully", user: newUser})
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}

const login = async(req, res)=>{
    try {
        const { email, password } = req.body
        if(!email || !password){
             return res.status(400).json({message:"all field are required"});
        }
        const user = await User.findOne({email})

        if(!user){
             return res.status(400).json({message:"invalid credential"});
        } 
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(400).json({message:"invalid credential"})
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY,
            { expiresIn: '1h' }
            )
            res.status(200).json({message:"login successfully", token})
            } catch (error) {
                res.status(500).json({message:"server error"})
                }
}

module.exports = {register, login}