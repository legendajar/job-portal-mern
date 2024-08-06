import companyModel from '../models/companyModel.js'

const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                success: false,
                message: "Company Name is required"
            })
        }

        let company = await companyModel.findOne({name: companyName});
        if (company) {
            return res.status(400).json({
                success: false,
                message: "Company Already Exists"
            });
        }

        company = await companyModel.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            success: true,
            message: "Company Created Successfully",
            company
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await companyModel.find({userId: userId})
        if (!companies) {
            return res.status(404).json({
                succees: false,
                message: "Companies not Found"
            })
        }
        return res.status(200).json({
            success: true,
            companies
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await companyModel.findById(companyId);
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            company
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const { name, description, website, location } = req.body;
        const logo = req.file;

        const updateData = { 
            name: name, 
            description: description, 
            website: website, 
            location: location, 
            logo: logo.path
        }

        const company = await companyModel.findByIdAndUpdate(companyId, updateData, {new: true})

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Company Update Successfully",
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export { registerCompany, getCompany, getCompanyById, updateCompany }
