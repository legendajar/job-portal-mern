import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Edit2, LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {USER_API_END_POINT} from "@/utils/constant.js";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice.js";

const Navbar = () => {
    const {user} = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const naivigate = useNavigate();

    const logoutHandler = async() => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`,{
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(null))
                naivigate("/");
                toast.success(res.data.message);
            }
        } catch(err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <Link to='/'>
                    <div>
                        <h1 className="text-2xl font-bold">Apni<span className="text-[#F83002]">JOB</span></h1>
                    </div>
                </Link>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to='/recruiter/companies'>Companies</Link>
                                    </li>
                                    <li>
                                        <Link to='/recruiter/jobs'>Jobs</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/jobs'>Jobs</Link></li>
                                    <li><Link to='/browse'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to='/auth/login'>
                                    <Button>Login</Button>
                                </Link>
                                <Link to='/auth/signup'>
                                    <Button className="bg-[#F83002]">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    {
                                        user.profile.profilePhoto ? 
                                        (
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="Avatar Image" />
                                            </Avatar>
                                        ) : 
                                        (
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar Image" />
                                            </Avatar>
                                        )
                                    }
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="flex gap-4 space-y-2">
                                        {
                                            user.profile.profilePhoto ? 
                                            (
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="Avatar Image" />
                                                </Avatar>
                                            ) : 
                                            (
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar Image" />
                                                </Avatar>
                                            )
                                        }
                                        <div>
                                            <h4 className="font-medium ">{user?.firstName} {user?.lastName}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {user?.profile?.bio}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 text-gray-600">
                                        {
                                            user && user.role === 'student' && (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link">
                                                    <Link to='/profile'>
                                                        View Profile
                                                    </Link>
                                                </Button>
                                            </div>
                                            )
                                        }

                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <Edit2 />
                                            <Button variant="link">
                                                <Link to={`/user/${user._id}/changepassword`} >
                                                    Change Password
                                                </Link>
                                            </Button>
                                        </div>
                                        
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>    
        </div>
    );
};

export default Navbar;
