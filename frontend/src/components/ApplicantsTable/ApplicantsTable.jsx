import { MoreHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "../../utils/constant.js"

const shortListingStatus = ["Accepted", "Rejected"]
const ApplicantsTable = () => {
    const {applicants} = useSelector(store => store.application)
    const applicationDate = (date) => {
        const extractDate = date.split("T")[0];
        const correctDate = extractDate.split("-").reverse().join("-");
        return correctDate
    }

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status});
            if (res.data.success) {
                console.log(res);
                toast.success(res.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>AppliedDate</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.firstName} {item?.applicant?.lastName}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.mobile}</TableCell>
                                <TableCell>
                                {
                                    item?.applicant?.profile?.resume ?
                                    <a className='text-blue-600' href={item?.applicant?.profile?.resume} target='_blank'>{item?.applicant?.profile?.resumeOriginalName} </a> :
                                    <span>NA</span>
                                }
                                    
                                </TableCell>
                                <TableCell>{applicationDate(item?.applicant?.createdAt)}</TableCell>
                                <TableCell className='text-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortListingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)}className='flex w-fit items-center my-2 cursor-pointer' key={index}>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }     
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable