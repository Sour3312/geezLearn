import React from 'react'

function QuestionComponent() {
    return (
        <>
            <div>
                <div className="text-2xl">Question 1 of 40</div>
                <div className="text-4xl font-semibold text-gray-700 my-10">What does HTML stand for?</div>

                <div className="flex items-center mb-4 bg-gray-200 py-3 px-2">
                    <input id="default-radio-1" type="radio" defaultValue name="default-radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer" />
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">HTML stands for Hyper Tail Marup Language</label>
                </div>
                <div className="flex items-center bg-gray-200 py-3 px-2">
                    <input defaultChecked id="default-radio-2" type="radio" defaultValue name="default-radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer" />
                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">HTML stands for Hyper Tail Marup Language</label>
                </div>
            </div>


        </>
    )
}

export default QuestionComponent