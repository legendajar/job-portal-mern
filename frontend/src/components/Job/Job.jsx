import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from '../ui/badge'

const Job = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-100'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'> 2 Days ago </p>
            <Button variant='outline' className='rounded-full' size='icon'>
                <Bookmark />
            </Button>
        </div>
        <div className="flex items-center gap-2 my-2">
            <Button className="p-6" variant="outline" size="icon">
                <Avatar>
                    <AvatarImage src='/microsoft_logo.png' />
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-600'> India </p>
            </div>
        </div>

        <div>
            <h1 className='font-bold text-lg my-2'>Title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta cumque sequi saepe praesentium repudiandae quod eligendi assumenda quasi enim tempora?</p>
        </div>

        <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-[#F83002] font-bold' variant='ghost'>12 Positions</Badge>
            <Badge className='text-[#F83002] font-bold' variant='ghost'>Part Time</Badge>
            <Badge className='text-[#F83002] font-bold' variant='ghost'>24 LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button variant='outline'>Details</Button>
            <Button className='bg-[#F83002]'>Save For Later</Button>
        </div>
        
    </div>
  )
}

export default Job