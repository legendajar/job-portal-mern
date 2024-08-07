import { setAllRecruiterJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant.js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetlAllRecruiterJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllRecruiterJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllRecruiterJobs(res.data.jobs))
                }
            } catch(err) {
                console.log(err);
            }
        }
        fetchAllRecruiterJobs();
    }, [])
}

export default useGetlAllRecruiterJobs;