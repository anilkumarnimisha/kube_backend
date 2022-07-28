import User from '../models/user'
import { hashPassword, comparePassword } from '../helpers/auth';
import jwt from 'jsonwebtoken';
import user from '../models/user';

export const register = async (req, res) => {
    //console.log("Register endpoint => ", req.body);
    const { name, email, password, number } = req.body;

    //validation
    if(!name) return res.status(400).send('Name is required');
    if(!password || password.length < 6) return res.status(400).send('Password is required and should be 6 characters long');
    if(!email) return res.status(400).send('Email is required');

    const exist = await User.findOne({ email })
    if(exist) return res.status(400).send('Email already exists');

    //hash password
    const hashedPassword = await hashPassword(password);
    const user = new User({name, email, password: hashedPassword, number});
    try {
        await user.save();
        return res.json({
            ok: true,
        });
    }catch (err) {
        console.log('error')
        return res.status(400).send('Error. Try again');    
    }
};   

export const login = async (req, res) => {
    try {
       console.log(req.body)
       const { email, password } = req.body;
       const userResponse = await User.findOne({email});
       if(!userResponse) return res.status(400).send('No user found');
       
       //check password
       const match = await comparePassword(password, userResponse.password);
       if(!match) return res.status(400).send("Wrong password");
        
       //create signed token
        const token = jwt.sign({_id: userResponse._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        userResponse.password = undefined;
        userResponse.number = undefined;
        res.json({
            token, 
            userResponse
        }) //send token and user response to ui 
    } catch (error) {
        console.log('error')
        return res.status(400).send('Error. Try again');   
    }
}