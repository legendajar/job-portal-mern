import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RecruiterJobsTable = () => {
    const { allRecruiterJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allRecruiterJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allRecruiterJobs.length >= 0 && allRecruiterJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allRecruiterJobs, searchJobByText])

    const jobDate = (date) => {
        const dateSplit = date.split("T")[0];
        const reversedDate = dateSplit.split("-").reverse().join("-");
        return reversedDate;
    }
  return (
    <div>
        <Table>
            <TableCaption> A list of your posted jobs </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    filterJobs.length <= 0 ?
                    <span> No Jobs Found </span> : 
                    filterJobs?.map((job) => {
                        return (
                            <tr key = {job._id}>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{jobDate(job?.createdAt)}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            <div className='flex items-center justify-around cursor-pointer' onClick={() => navigate(`/recruter/job/${job._id}`)} >
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>   
                                </TableCell>
                            </tr>
                        )
                    })
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default RecruiterJobsTable