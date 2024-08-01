import AppliedJobTable from '@/components/AppliedJobTable/AppliedJobTable'
import Footer from '@/components/shared/Footer/Footer'
import Navbar from '@/components/shared/Navbar/Navbar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Contact, Mail, Pen } from 'lucide-react'
import React from 'react'

const skills = ["HTML", "CSS", "JS", "ReactJS"]

const Profile = () => {
    const isResume = true;
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className="flex items-center gap-4">
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src='/microsoft_logo.png' alt='profile'/>
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>First Name + Last Name</h1>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa recusandae impedit dolorum.</p>
                        </div>
                    </div>
                    <Button className='text-right' variant='outline'><Pen /></Button>
                </div>
                <div className="my-5">
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>supriyasingh@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>+91 7688874472</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            skills.length !== 0 ? 
                            skills.map((item, index) => <Badge key={index}>{item}</Badge>) : 
                            <span>NA</span>   
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1 5">
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? 
                        <a target='blank' href="https://youtube.com" className='text-blue-500 w-full hover:underline cursor-pointer'>Resume Link</a> : 
                        <span>NA</span>
                    }
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Application Table */}
                <AppliedJobTable />
            </div>
            <Footer />
        </div>
    )
}

export default Profile