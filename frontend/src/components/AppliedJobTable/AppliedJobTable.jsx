import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {

  const {allAppliedJobs} = useSelector(store => store.job)

  const appliedDate = (date) => {
    const extractDate = date.split("T")[0];
    const correctDate = extractDate.split("-").reverse().join("-");
    return correctDate
  }
  const renderBadge = (status) => {
    if (status === "pending") {
      return <Badge>{status}</Badge>;
    } else if (status === "accepted") {
      return <Badge className='bg-green-600 text-white' variant="success">{status}</Badge>;
    } else if (status === "rejected") {
      return <Badge className='bg-red-600 text-white' variant="danger">{status}</Badge>;
    } else {
      return <Badge variant="default">{status}</Badge>;
    }
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0 ? 
            <span>You have not applied any job yet.</span> : 
            allAppliedJobs.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{appliedDate(item.createdAt)}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>
                <TableCell className='text-right'>
                  {renderBadge(item.status)}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable