import Navbar from '@/components/shared/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT} from '@/utils/constant.js'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CreateCompany = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/recruiter/company/${companyId}`);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.res.data.message)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
                </div>

                <Label>Compnay Name</Label>
                <Input type='text' className='my-2' placeholder='Jobhunt, Microsoft, etc.' onChange={(e) => setCompanyName(e.target.value)} />

                <div className="flex items-center gap-2 my-10">
                    <Button variant='outline' onClick={() => navigate('/recruiter/company/create')}>Cancel</Button>
                    <Button onClick={registerNewCompany} className='bg-[#F83002]'>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany