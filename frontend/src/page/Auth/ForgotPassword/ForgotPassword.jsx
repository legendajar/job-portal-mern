import Navbar from '@/components/shared/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import { setLoading } from '@/redux/authSlice.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const ForgotPassword = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
    });

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const {loading, user} = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();

        
        const formData = new FormData();
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("confirmPassword", input.confirmPassword);
        formData.append("role", input.role);


        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/forgotpassword`, formData, {
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                navigate("/auth/login");
                toast.success(res.data.message);
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
            toast.success("You are already logged in")
            return;
        }
    }, [])
  return (
    <div className='forgotpassword'>
        <Navbar />
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Forgot Password</h1>
                <div className='my-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input 
                        type='email' 
                        name='email'
                        placeholder='Enter email'
                        onChange={changeEventHandler}
                        value={input.email}
                    />
                </div>
                <div className='my-2'>
                    <Label htmlFor='password'>Password</Label>
                    <Input 
                        type='password' 
                        name='password'
                        placeholder='Enter email'
                        onChange={changeEventHandler}
                        value={input.password}
                    />
                </div>
                <div className='my-2'>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input 
                        type='password' 
                        name='confirmPassword'
                        placeholder='Enter email'
                        onChange={changeEventHandler}
                        value={input.confirmPassword}
                    />
                </div>
                <div className='flex items-center justify-betweeen'>
                    <RadioGroup className='flex items-center gap-4 my-5'>
                        <div className="flex items-center space-x-2">
                            <Input 
                                type='radio'
                                name='role'
                                value='student'
                                className='cursor-pointer'
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                            />
                            <Label htmlFor='student'>Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input 
                                type='radio'
                                name='role'
                                value='recruiter'
                                className='cursor-pointer'
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                            />
                            <Label htmlFor='recruiter'>Recruiter</Label>
                        </div>
                    </RadioGroup>
                </div>
                {
                    loading ? 
                    <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait </Button> : 
                    <Button type="submit" className="w-full my-4 bg-[#F83002]"> Update Password </Button>
                }
            </form>
        </div>
    </div>
  )
}

export default ForgotPassword