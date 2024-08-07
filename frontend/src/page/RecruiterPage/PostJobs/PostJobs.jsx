import Navbar from '@/components/shared/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { JOB_API_END_POINT } from '@/utils/constant.js'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];


const PostJobs = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const [loading, setLoading] = useState(false);

    const { allCompanies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const jobTypeChangeHandler = (value) => {
        setInput({
            ...input,
            jobType: value
        })
    }

    const selectCompanyChangeHandler = (value) => {
        const selectedCompany = allCompanies.find((company) => company.name.toLowerCase() === value);
        setInput({
            ...input,
            companyId: selectedCompany._id
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/recruiter/jobs')
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border-gray-200 shadow-lg rounded-medium'>
                    <h1 className='font-medium text-2xl text-[#F83002]'>Post Job</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input 
                                type='text'
                                name='title'
                                value={input.title}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus:visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input 
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus:visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input 
                                type='text'
                                name='requirements'
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus:visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input 
                                type='text'
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus:visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input 
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus:visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Select name='jobType' onValueChange={jobTypeChangeHandler}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Select a Job Type' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value='Full Time'>Full Time</SelectItem>
                                        <SelectItem value='Part Time'>Part Time</SelectItem>
                                        <SelectItem value='Internship'>Internship</SelectItem>
                                        <SelectItem value='contractual'>Contractual</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input 
                                type='text'
                                name='experience'
                                value={input.experience}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus:visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input 
                                type='number'
                                name='position'
                                value={input.position}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus:visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Company</Label>
                            {
                                allCompanies.length >= 0 && (
                                    <Select onValueChange={selectCompanyChangeHandler}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={'Select a Company'}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    allCompanies.map((company) => {
                                                        return (
                                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                                {company?.name}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )
                            }
                        </div>
                    </div>
                    {
                        loading ? 
                        <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait </Button> : 
                        <Button type="submit" className='w-full mt-8 bg-[#F83002]'> Post Job </Button>
                    }
                    {
                        companyArray.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJobs