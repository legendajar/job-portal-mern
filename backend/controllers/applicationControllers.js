import applicationModel from "../models/applicationModel.js";
import jobModel from "../models/jobModel.js";
import mongoose from 'mongoose';

const applyJob = async (req, res) => {
    try {
        const userId = req.id;

        // checking if job id is not provided at the time application
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(404).json({
                success: false,
                message: "Job Id Required"
            })
        }

        // Validate jobId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Job Id"
            });
        }


        // check if the user already applied for the job
        const existingApplication = await applicationModel.findOne({job: jobId, applicant: userId})
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            })
        }

        // check if job exists
        const job = await jobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job Not Found"
            })
        }


        // Create new application for the job
        const application = await applicationModel.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(application._id)
        await job.save()

        return res.status(201).json({
            success: true,
            message: "Applied Successfully",
        });
    } catch (err) {
        console.log(err)
        return res.status(501).json({
            success: false,
            message: "Internal Server Error"
        })
    }
};


// This is for the user to check the job applied by the user
const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await applicationModel.find({applicant: userId}).sort({createAt: -1}).populate({
            path: 'job',
            options: {
                sort: {createdAt: -1}
            },
            populate: {
                path: 'company',
                options: {
                    sort: {createdAt: -1}
                }
            }
        })
        if (!applications) {
            return res.status(404).json({
                success: false,
                message: "No Applicantions Found"
            })
        }


        return res.status(200).json({
            success: true,
            applications
        })

    } catch (err) {
        console.log(err)
        return res.status(501).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


// This is for the recruiter to find the applications for its job
const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await jobModel.findById(jobId).populate({
            path: 'applications',
            options: {
                sort: { createdAt: -1 }
            },
            populate: {
                path: 'applicant',
                options: {
                    sort: { createdAt: -1 }
                }
            }
        });
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job Not Found"
            })
        };

        return res.status(200).json({
            success: true,
            job
        });

    } catch (err) {
        console.log(err)
        return res.status(501).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id

        if (!status) {
            return res.status(404).json({
                success: false,
                message: "Status Required"
            })
        }

        // find the application by applicant id
        const application = await applicationModel.findOne({
            _id: applicationId
        })
        if (!application) {
            return res.json(404).json({
                success: false,
                message: "Applications Not Found"
            })
        }
        //update status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            success: true,
            message: "Status Updated Successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(501).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export { applyJob, getAppliedJobs, getApplicants, updateStatus }