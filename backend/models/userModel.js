import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    mobile: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },

    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String }, // URL to resume file
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: {
            type: String,
            default: ""
        }
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);

export default userModel