import Navbar from '@/components/shared/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setLoading } from '@/redux/authSlice.js'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { Loader2 } from 'lucide-react'

const ChangePassword = () => {
    const { loading } = useSelector(store => store.auth)
    const [ input, setInput ] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const changeInputHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("password", input.password);
        formData.append("newPassword", input.newPassword);
        formData.append("confirmNewPassword", input.confirmNewPassword);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/changepassword`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }, 
                withCredentials: true
            });

            if (res.data.success) {
                navigate("/");
                toast.success("Password Changed Successfully");
            }

        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        } finally {
            dispatch(setLoading(false))
        }
    }
    return (
        <div className='changepassword'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Change Password</h1>
                    <div className="my-2">
                        <Label htmlFor='password'>Password</Label>
                        <Input 
                            type="password" 
                            name='password'
                            placeholder = 'Enter Old Password'
                            onChange={changeInputHandler}
                            value={input.password}
                        />
                    </div>
                    <div className="my-2">
                        <Label htmlFor='password'>New Password</Label>
                        <Input 
                            type="password" 
                            name='newPassword'
                            placeholder = 'Enter New Password'
                            onChange={changeInputHandler}
                            value={input.newPassword}
                        />
                    </div>
                    <div className="my-2">
                        <Label htmlFor='changePassword'>Confirm New Password</Label>
                        <Input 
                            type="password" 
                            name='confirmNewPassword'
                            placeholder = 'Confirm New Password'
                            onChange={changeInputHandler}
                            value={input.confirmNewPassword}
                        />
                    </div>
                    {
                        loading ?
                        <Button><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait </Button> :
                        <Button type='submit' className='w-full my-4 bg-[#F83002]'> Update Password</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default ChangePassword