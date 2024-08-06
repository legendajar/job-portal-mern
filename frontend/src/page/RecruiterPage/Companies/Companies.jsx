import CompaniesTable from '@/components/CompaniesTable/CompaniesTable'
import Navbar from '@/components/shared/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input className='w-fit' placeholder='Filter by name' />
                    <Button onClick={() => navigate("/recruiter/company/create")}>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies