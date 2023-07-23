import React from 'react'

function Overview(props) {
    return (
        <div className='w-full grid grid-cols-12 px-40 py-2'>

            {/* LEFT MARGIN SPACER HIDDEN IN SMALL */}
            {/* <div className="col-span-2 hidden sm:block"></div> */}

            <div className="col-span-12 px-4 py-2">
                <h1 className='text-2xl font-bold text-gray-800 font-custom-montserrat'>About this course</h1>
                <h1 className='text-sm font-semibold text-gray-600 mt-2'>Learn web design in 1 hour with 25+ simple-to-use rules and guidelines — tons of amazing web design resources included!</h1>

                <p className='text-sm text-gray-700 mt-4'>{props?.courseDetails?.description?.descriptionText}</p>
            </div>
            
            <div className="col-span-12 px-4 flex border-t py-10">
                <div className='flex-1'>By the numbers</div>
                <div className='flex-1'>
                    Skill level: All Levels
                    Students: 659160
                    Languages: English
                    Captions: Yes</div>
                <div className='flex-1'>
                    Lectures: 19
                    Video: 2.5 total hours
                </div>
            </div>

            {/* DESCRIPTION */}
            <div className="col-span-12 px-4 flex border-t py-10">
                <div className='flex-1'>Description</div>
                <div className='flex-1'>
                    Skill level: All Levels
                    Students: 659160
                    Languages: English
                    Captions: Yes</div>
                <div className='flex-1'>
                    Lectures: 19
                    Video: 2.5 total hours
                </div>
            </div>

            {/* INSTRUCTOR */}
            <div className="col-span-12 px-4 flex border-t border-b py-10">
                <div className='flex-1'>Instructor</div>
                <div className='flex-1'>
                    Skill level: All Levels
                    Students: 659160
                    Languages: English
                    Captions: Yes</div>
                <div className='flex-1'>
                    Lectures: 19
                    Video: 2.5 total hours
                </div>
            </div>

        </div>
    )
}

export default Overview