
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k - 1L", "1L - 5L"]
    }
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup>
            {
                filterData.map((item, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg'>{item.filterType}</h1>
                        {
                            item.array.map((item, index) => {
                                return (
                                    <div className='flex items-center space-x-2 my-2' key={index}>
                                        <RadioGroupItem value={item} />
                                        <Label>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard