import axios from 'axios';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '@/utils/constant.js';
import { setAllCompanies } from '@/redux/companySlice';


const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${ COMPANY_API_END_POINT }/get`, {
                    withCredentials: true
                });
                if(res.data.success) {
                    console.log("Fetched Companies: ", res.data.companiess);
                    dispatch(setAllCompanies(res.data.companies))
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllCompanies();
    }, [])
}

export default useGetAllCompanies