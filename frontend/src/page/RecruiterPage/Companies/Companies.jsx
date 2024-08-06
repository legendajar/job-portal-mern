import CompaniesTable from '@/components/CompaniesTable/CompaniesTable'
import Navbar from '@/components/shared/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input])

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input className='w-fit' placeholder='Filter by name' onChange={(e) => setInput(e.target.value)}/>
                    <Button onClick={() => navigate("/recruiter/company/create")}>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies