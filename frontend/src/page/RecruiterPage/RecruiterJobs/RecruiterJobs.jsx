import RecruiterJobsTable from '@/components/RecruiterJobsTable/RecruiterJobsTable'
import Navbar from '@/components/shared/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useGetlAllRecruiterJobs from '@/hooks/useGetAllRecruiterJobs'
import { setsearchJobByText } from '@/redux/jobSlice.js'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const RecruiterJobs = () => {
  useGetlAllRecruiterJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setsearchJobByText(input))
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className='w-fit'
            placeholder='Filter by name'
            onChange = {(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate('/recruiter/job/create')}>Post Job</Button> 
        </div>
        <RecruiterJobsTable />
      </div>
    </div>
  )
}

export default RecruiterJobs