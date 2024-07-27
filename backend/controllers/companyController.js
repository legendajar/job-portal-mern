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
            })
        }

        company = await companyModel.create({
            name: companyName,
            userId: req.id
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export { registerCompany }
