import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const JobDescription = () => {
  const isApplied = true;
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className="font-bold text-xl">Frontend Developer</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                12 Positions
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                Part Time
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                24 LPA
              </Badge>
            </div>
          </div>
          {
            isApplied ? 
            <span className='flex items-center justify-between text-green-500'> <Check /> Already Applied</span> :
            <Button className='bg-[#F83002]'>Apply Now</Button>
          }
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
        <div className='my-4'>
          <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-600'>Frontend Developer</span></h1>
          <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-600'>Hyderabad</span></h1>
          <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, porro.</span></h1>
          <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-600'>2 yrs</span></h1>
          <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-600'>12 LPA</span></h1>
          <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-600'>4</span></h1>
          <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-600'>17-07-2024</span></h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDescription;
