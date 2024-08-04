import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/constant.js";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector(store => store.job);
  const {user} = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, {
        withCredentials: true
      })
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true); // update the local state
        const updateSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            {
              applicant: user?._id
            }
          ]
        }
        dispatch(setSingleJob(updateSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const getDaysAgo = (createdAt) => {
    const currentTime = Date.now();
    const timeDifference = currentTime - new Date(createdAt).getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
}

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <p className='text-sm text-gray-500'> {
              getDaysAgo(singleJob?.createdAt) > 0? `${getDaysAgo(singleJob?.createdAt)} days ago` : "Today"
            }</p>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.position} Positions
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.salary}
              </Badge>
            </div>
          </div>
          {isApplied ? (
                <span className='flex items-center justify-between text-green-500'>
                    <Check /> Already Applied
                </span>
            ) : (
                <Button onClick={applyJobHandler} className='bg-[#F83002]'>
                    Apply Now
                </Button>
            )}
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
        <div className='my-4'>
          <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-600'>{singleJob?.title}</span></h1>
          <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-600'>{singleJob?.location}</span></h1>
          <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-600'>{singleJob?.description}</span></h1>
          <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-600'>{singleJob?.experienceLevel} yrs</span></h1>
          <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-600'>{singleJob?.salary}</span></h1>
          <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-600'>{singleJob?.applications.length}</span></h1>
          <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-600'>{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDescription;
