import jobModel from "../models/jobModel.js";

// For job
const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if(!title){
            return res.status(400).json({
                success: false,
                message: "Title is required"
            })
        }

        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Description is required"
            })
        }

        if (!requirements) {
            return res.status(400).json({
                success: false,
                message: "Requirements is required"
            })
        }

        if (!salary) {
            return res.status(400).json({
                success: false,
                message: "Salary is required"
            })
        }

        if (!location) {
            return res.status(400).json({
                success: false,
                message: "Location is required"
            })
        }

        if (!jobType) {
            return res.status(400).json({
                success: false,
                message: "Job Type is required"
            })
        }

        if (!experience) {
            return res.status(400).json({
                success: false,
                message: "Experience is required"
            })
        }

        if (!position) {
            return res.status(400).json({
                success: false,
                message: "Position is required"
            })
        }

        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            })
        }

        const job = await jobModel.create({
            title: title,
            description: description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location: location,
            jobType: jobType,
            experienceLevel: experience,
            position: position,
            company: companyId,
            created_by: userId
        })

        return res.status(200).json({
            success: true,
            message: "Job Posted Successfully",
            job
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
// For Job
const getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                {title: {$regex: keyword, $options:"i"}},
                {description: {$regex: keyword, $options:"i"}},
            ]
        };

        const job = await jobModel.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});
        if(!job) {
            return res.status(404).json({
                success: false,
                message: "No job found"
            })
        }

        return res.status(200).json({
            success: true,
            jobs: job
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Student Job
const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await jobModel.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            job
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await jobModel.find({
            created_at: adminId
        })
        if (!jobs) {
            return res.status(404).json({
                success: false,
                message: "No job found"
            })
        }

        return res.status(200).json({
            success: true,
            jobs
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export { postJob, getAllJob, getJobById, getAdminJob }