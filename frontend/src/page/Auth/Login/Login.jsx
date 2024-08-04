import Navbar from '@/components/shared/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import { setLoading, setUser } from '@/redux/authSlice';
import {USER_API_END_POINT} from '@/utils/constant.js';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  })

  const changeEventHandler = (e) => {
    setInput({...input, 
      [e.target.name]:e.target.value
    })
  };

  const {loading} = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    
    // API call to login the user
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className='login'>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10" action="">
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label htmlFor="">Email</Label>
            <Input 
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter Email"
            />
          </div>
          <div className="my-2">
            <Label htmlFor="">Password</Label>
            <Input 
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input 
                  type="radio" 
                  name="role" 
                  value="student" 
                  className="cursor-pointer" 
                  checked={input.role === 'student'} 
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input 
                  type="radio" 
                  name="role" 
                  value="recruiter" 
                  className="cursor-pointer" 
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? 
            <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait </Button> : 
            <Button type="submit" className="w-full my-4 bg-[#F83002]"> Login </Button>
          }
          
          <span className="text-sm"> Don't have an account ? 
            <Link to='/auth/signup' className='text-blue-600'> Signup</Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Login