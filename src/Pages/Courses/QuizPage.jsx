import React from 'react'
import QuestionComponent from './QuestionComponent'
import {BiChevronRight} from 'react-icons/bi'

function QuizPage() {
    return (
        <>
            <div className='w-2/3 mx-auto'>
                <div className="flex mb-10">
                    <div className='flex-1'>
                        <div className='text-4xl font-semibold text-gray-700'>Student Quiz</div>
                        <div className='text-gray-600 text-sm'>List of the student enrolled in programme</div>
                    </div>
                    <div className='flex-1 flex justify-end'>
                    </div>
                </div>

                <QuestionComponent />

                <div className='col-span-12 mt-10'>
                    <button type="submit" className="cypress_next1_button px-10 py-2.5 bg-green-400 text-white font-medium text-sm leading-tight    hover:bg-green-400 hover:shadow-lg focus:bg-green-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-400 active:shadow-lg transition duration-150 ease-in-out shadow-md flex justify-center items-center">Next <BiChevronRight className="inline text-2xl font-semibold" /></button>
                </div>
            </div>
        </>
    )
}

export default QuizPage