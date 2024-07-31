import React from 'react'
import LatestJobCards from './LatestJobCards'


const randomJobs = [1,2,3,4,5,6,7,8]

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20">
        <h1 className='text-4xl font-bold'>
            <span className="text-[#f83002]"> Latest & Top </span> Job Openings
        </h1>
        {/* Multiple Job Cards Display */}
        {
            randomJobs.map((item, index) => <LatestJobCards /> )
        }
    </div>
  )
}


export default LatestJobs