import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t border-t-gray-200 py-8'>
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-bold">ApniJOB</h2>
                    <p className="text-sm">
                        &copy; 2024 ApniJOB. All rights reserved.
                    </p>
                </div>

                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#"></a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer