import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/JWT.js";

export const signup = async (req, res) => {
    try {
        const { 
            fullname, 
            username, 
            password, 
            confirmPassword,
            gender
        } = req.body;
        
        if(password !== confirmPassword) {
            return res.status(400).json({
                error: "Passwords don`t match"
            });
        }

        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({error: "Username already exists"});
        }

        const genderPrefix = gender === "male" ? "boy" : "girl";
        const profilePicture = `https://avatar.iran.liara.run/public/${genderPrefix}?username=${username}`;

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePicture
        });

        if(!newUser) {
            res.status(400).json({error: "Invalid user data."});
        }

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            profilePicture: newUser.profilePicture
        });
    } catch (error) {
        console.log(`Error in signup controller: ${error}`);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password."});
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        console.log(`Error in login controller: ${error}`);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.log(`Error in logout controller: ${error}`);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

