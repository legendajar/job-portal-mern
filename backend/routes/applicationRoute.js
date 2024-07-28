import express from 'express'
import { applyJob, getAppliedJobs, getApplicants, updateStatus } from '../controllers/applicationControllers.js'
import isAuthenticated from '../middlewares/isAuthenticated.js';


const applicationRouter = express.Router();


// Apply Job Route
applicationRouter.post('/apply/:id', isAuthenticated, applyJob);

// Get Applied Jobs Route
applicationRouter.get('/get', isAuthenticated, getAppliedJobs)

// Get Application Route
applicationRouter.get('/:id/applicants', isAuthenticated, getApplicants)

// Update Sttus Roure
applicationRouter.post('/status/:id/update', isAuthenticated, updateStatus)


export default applicationRouter