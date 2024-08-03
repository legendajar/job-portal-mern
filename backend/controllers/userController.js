import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


const register = async (req, res) => { 
    try {
        const { firstName, lastName, email, mobile, role, password, confirmPassword } = req.body;

        if (!firstName) {
            return res.status(400).json({
                success: false,
                message: "First Name is required"
            })
        }

        if (!lastName) {
            return res.status(400).json({
                success: false,
                message: "Last Name is required"
            })
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        }

        if (!mobile) {
            return res.status(400).json({
                success: false,
                message: "Mobile is required"
            })
        }

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required"
            })
        }
        const user = await userModel.findOne({ email: email });     
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords Do Not Match"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }

        const file = req.file;

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            role: role,
            password: hashedPassword,
            profile: {
                profilePhoto: file.path
            }
        })

        return res.status(201).json({
            success: true,
            message: "Account Created Successfully"
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const login = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        })
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required"
        })
    }

    if (!role) {
        return res.status(400).json({
            success: false,
            message: "Role is required"
        })
    }

    try {
        let user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        if (role !== user.role) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized Access"
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: '1d'});

        user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            profile: user.profile,
        }

        return res.status(200).cookie("token", token, {
            maxAge: 1*24*60*60*1000,
            httpsOnly: true,
            sameSite: 'strict'
        }).json({
            success: true,
            message: "Login Successful",
            user,
            token
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict'
        }) .json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
};

const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, bio, skills } = req.body;

        const file = req.file;        
        
        let skillsArray = [];
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (mobile) user.mobile = mobile;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray; 

        // resume
        if (file) {
            user.profile.resume = file.path // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // save the original file name
        }

        await user.save();

        user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            success: true,
            message: "Profile Update Successfully",
            user
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export { register, login, logout, updateProfile }