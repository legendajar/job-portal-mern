import express from 'express';
import { registerCompany, getCompany, getCompanyById, updateCompany } from '../controllers/companyController.js'
import isAuthenticated from '../middlewares/isAuthenticated.js';

const companyRouter = express.Router();

// Register Company Route
companyRouter.post('/register', isAuthenticated, registerCompany);

// Get Companies Route
companyRouter.get('/get', isAuthenticated, getCompany);

// Get Company Route
companyRouter.get('/get/:id', isAuthenticated, getCompanyById );

// Update Company Data Route
companyRouter.put('/update/:id', isAuthenticated, updateCompany);


export default companyRouter