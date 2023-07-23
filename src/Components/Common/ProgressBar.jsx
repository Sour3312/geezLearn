import React from "react";
const ProgressBar = ({ percentage }) => {

    // let a = `w-[${percentage}%]`

    // let c = percentage
    // let c = `[${percentage}%]`
    let c = `w-[${percentage}%]`
    console.log("c", c, typeof(c))

    return (
        <div className="relative h-6 bg-gray-300 rounded-full">
            {/* <div className={`bg-blue-500 absolute left-0 top-0 bottom-0 rounded-full h-full transition-all duration-300 ease-in-out ${percentage > 50 ? "w-full" : `w-${percentage * 2}%`}`} ></div> */}

            <div className="w-full h-1 bg-blue-200 rounded-full">
                <div className={`${c} h-full text-center text-xs text-white bg-blue-600 rounded-full transition-all duration-300 ease-in-out`}></div>
            </div>

            <div className="text-center absolute inset-0 flex items-center">
                <span className="text-white text-sm font-medium">{percentage}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;