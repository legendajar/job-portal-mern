import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    const getDaysAgo = (createdAt) => {
        const currentTime = Date.now();
        const timeDifference = currentTime - new Date(createdAt).getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                {
                    getDaysAgo(job?.createdAt) > 0? `${getDaysAgo(job?.createdAt)} days ago` : "Today"
                }
                </p>
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
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-600'> {job?.company?.location} </p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
                <Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.salary}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant='outline' onClick={() => navigate(`/job/${job?._id}`)}>Details</Button>
                <Button className='bg-[#F83002]'>Save For Later</Button>
            </div>
            
        </div>
    )
}

export default Job