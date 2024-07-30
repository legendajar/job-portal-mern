import React from "react";
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";


const Navbar = () => {
    const user = false;
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
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
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
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="Avatar Image" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="flex gap-4 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar Image" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium ">Harsh Solanki</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Lorem ipsum dolor sit amet.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 text-gray-600">
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <User2 />
                                            <Button variant="link">View Profile</Button>
                                        </div>
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button variant="link">Logout</Button>
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
