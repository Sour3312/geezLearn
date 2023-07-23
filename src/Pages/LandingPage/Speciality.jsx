import { BsFillPlayFill } from 'react-icons/bs'

function Speciality() {
    return (
        <>
            <div className='bg-gray-100 w-full py-8 px-4'>
                <div className='text-center text-2xl font-bold'>Why learn on GeezLearn</div>
                <div className="flex flex-col md:flex-row py-6">
                    <div className="flex-1 flex justify-center items-center space-x-2">
                        <div className="flex-initial">
                            <div className='h-10 w-10 flex justify-center items-center bg-gray-300 rounded-full'> <BsFillPlayFill className='inline text-lg' /></div>
                        </div>
                        <div className="flex-1">
                            <div className='md:w-4/6 leading-5 font-semibold text-gray-600 '>Learn in-demand skills with over 213,000 video courses</div>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center space-x-2 mt-10 md:mt-0">
                        <div className="flex-initial">
                            <div className='h-10 w-10 flex justify-center items-center bg-gray-300 rounded-full'> <BsFillPlayFill className='inline text-lg' /></div>
                        </div>
                        <div className="flex-1">
                            <div className='md:w-4/6 leading-5 font-semibold text-gray-600'>Learn in-demand skills with over 213,000 video courses</div>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center space-x-2 mt-10 md:mt-0">
                        <div className="flex-initial">
                            <div className='h-10 w-10 flex justify-center items-center bg-gray-300 rounded-full'> <BsFillPlayFill className='inline text-lg' /></div>
                        </div>
                        <div className="flex-1">
                            <div className='md:w-4/6 leading-5 font-semibold text-gray-600'>Learn in-demand skills with over 213,000 video courses</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Speciality