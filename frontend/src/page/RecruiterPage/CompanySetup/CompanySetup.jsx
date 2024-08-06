import Navbar from '@/components/shared/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CompanySetup = () => {
    const {singleCompany} = useSelector(store => store.company);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const [loading, setLoading] = useState(false);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({
           ...input,
            file: file
        })
    }

    const navigate = useNavigate();

    const params = useParams();
    const id = params.id
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        
        console.log("Filer in Company Setup: ", input.file)
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/recruiter/companies');
            }
        } catch (err) {
            console.log(err);
            toast.error(err.res.data.message);
        } finally {
            setLoading(false);
        }
    } 

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate('/recruiter/companies')}variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input 
                                type='text'
                                name='name'
                                onChange={changeEventHandler}
                                value={input.name}
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input 
                                type='text'
                                name='description'
                                onChange={changeEventHandler}
                                value={input.description}
                            />
                        </div>

                        <div>
                            <Label>Website</Label>
                            <Input 
                                type='text'
                                name='website'
                                onChange={changeEventHandler}
                                value={input.website}
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input 
                                type='text'
                                name='location'
                                onChange={changeEventHandler}
                                value={input.location}
                            />
                        </div>

                        <div>
                            <Label>Logo</Label>
                            <Input 
                                type='file'
                                name='file'
                                onChange={changeFileHandler}
                                accept="image/*"
                            />
                        </div>
                    </div>
                    {
                        loading ? 
                        <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait </Button> : 
                        <Button type="submit" className='w-full mt-8 bg-[#F83002]'> Update </Button>
                    }
                </form>

            </div>
        </div>
    )
}

export default CompanySetup