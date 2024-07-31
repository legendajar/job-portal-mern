import Footer from '@/components/shared/Footer/Footer'
import Navbar from '@/components/shared/Navbar/Navbar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import React from 'react'

const Profile = () => {
  return (
    <div>
        <Navbar />
        <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
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
            <div>
                <div className='flex items-center gap-3'>
                    <Mail />
                    <span>supriyasingh@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                    <Contact />
                    <span>+91 7688874472</span>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Profile