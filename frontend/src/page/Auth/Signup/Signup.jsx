import Navbar from "@/components/shared/Navbar/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@radix-ui/react-radio-group"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {USER_API_END_POINT} from "@/utils/constant.js"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/redux/authSlice"

const Signup = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "student",
    file: ""
  })

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const changeEventHandler = (e) => {
    setInput({
      ...input, 
      [e.target.name]: e.target.value,
    })
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0]
    })
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("email", input.email);
    formData.append("mobile", input.mobile);
    formData.append("password", input.password);
    formData.append("confirmPassword", input.confirmPassword);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    // API call to register the user
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });

      if (res.data.success){
        navigate("/auth/login");
        toast.success(res.data.message);
      }
    } catch(err) {
      console.log(err);
      toast.error(err.response.data.message)
    } finally {
      dispatch(setLoading(false));
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
    <div className='signup'>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10" encType="multipart/form-data">
          <h1 className="font-bold text-xl mb-5">Register</h1>
          <div className="flex gap-2">
            <div className="my-2 flex-grow">
              <Label htmlFor="">First Name</Label>
              <Input 
                type="text"
                name="firstName"
                value={input.firstName}
                onChange={changeEventHandler}
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="my-2 flex-grow">
              <Label htmlFor="">Last Name</Label>
              <Input 
                type="text"
                value={input.lastName}
                name="lastName"
                onChange={changeEventHandler}
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          <div className="my-2">
            <Label htmlFor="">Email</Label>
            <Input 
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter Email"
              required              
            />
          </div>
          <div className="my-2">
            <Label htmlFor="">Phone</Label>
            <Input 
              type="text"
              value={input.mobile}
              name="mobile"
              onChange={changeEventHandler}
              placeholder="Enter Phone Number"
              required
            />
          </div>
          <div className="my-2">
            <label htmlFor="">Password</label>
            <Input 
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="my-2">
            <label htmlFor="">Confirm Password</label>
            <Input 
              type="password"
              value={input.confirmPassword}
              name="confirmPassword"
              onChange={changeEventHandler}
              placeholder="Enter Confirm Password"
              required
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
                  required
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
                  required
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input 
                accept="image/*" 
                type="file" 
                name="file"
                className="cursor-pointer" 
                onChange={changeFileHandler}
                required
              />
            </div>
          </div>
          {
            loading ? 
            <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait </Button> : 
            <Button type="submit" className="w-full my-4 bg-[#F83002]"> Signup </Button>
          }

          <span className="text-sm">Already have an account ? 
            <Link to='/auth/login' className='text-blue-600'> Login</Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Signup