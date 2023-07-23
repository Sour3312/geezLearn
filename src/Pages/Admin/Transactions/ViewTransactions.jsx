import React from 'react'
import { FcComboChart } from 'react-icons/fc';

function ViewTransactions({id, goBack}) {
    return (
        <>
            <div className='flow-root bg-white border-b-2 rounded-t-md md:px-5 p-2'>
                <div className='float-left text-lg font-semibold flex'> <FcComboChart className='mt-1.5 mr-2' />Transaction Details of XXX</div>
                <button onClick={() => goBack()} className='float-right border bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-sm'>Back </button>
            </div>
            <div>ViewTransactions</div>
        </>
    )
}

export default ViewTransactions