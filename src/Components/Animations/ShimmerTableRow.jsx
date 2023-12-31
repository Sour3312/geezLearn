import React from 'react'
import './tableshimmer.css'


function ShimmerTableRow() {
    return (

        <div className='flex flex-col bg-white space-y-4 rounded-md'>
            <div className='bg-gray-200 w-full h-10 flex justify-center items-center p-4 animate'></div>
        </div>
    )
}

export default ShimmerTableRow