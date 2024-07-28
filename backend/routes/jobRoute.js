import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { postJob, getAllJob, getJobById, getAdminJob } from '../controllers/jobController.js'

const jobRouter = express.Router();

// Post Job Route
jobRouter.post("/post", isAuthenticated, postJob)

// Get All Job Route
jobRouter.get("/get", isAuthenticated, getAllJob)

// Get Job using current id
jobRouter.get("/get/:id", isAuthenticated, getJobById)

// Get Job posted by admin user
jobRouter.get("/getadminjobs", isAuthenticated, getAdminJob)

export default jobRouter