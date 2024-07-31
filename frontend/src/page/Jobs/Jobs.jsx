import FilterCard from "@/components/FilterCard/FilterCard";
import Job from "@/components/Job/Job";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import React from "react";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {
            jobsArray.length <= 0 ? (
            <span> Job Not Found </span>
            ) : (
                <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                    {jobsArray.map((item, index) => (
                    <div key={index}>
                        <Job />
                    </div>
                    ))}
                </div>
                </div>
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
