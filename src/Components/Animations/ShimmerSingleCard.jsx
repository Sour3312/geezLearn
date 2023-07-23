import React from 'react'
import './ShimmerTable'

function ShimmerSingleCard() {
    return (
        <div className="col-span-10 md:col-span-2  rounded-md border">
            <div className="h-auto py-10 w-full rounded-t-md object-cover bg-gray-200 animate">

            </div>
            <div className="p-4">
                <div className="inline-flex items-center text-lg font-semibold animate w-full bg-gray-200">
                    &nbsp;
                </div>
                <div className="mt-3 text-sm text-gray-600 w-full animate bg-gray-200">
                    &nbsp;
                </div>
                <div className="mt-4">
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                        <span className='animate'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                        <span className='animate'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                        <span className='animate'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                </div>
                <div className="mt-3 text-sm text-gray-600 w-full animate bg-gray-200">
                    &nbsp;
                </div>
            </div>
        </div>
    )
}

export default ShimmerSingleCard