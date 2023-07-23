import React, { useEffect, useState } from 'react'
import LoginComponent from './Components/LoginComponent'
import ResetPasswordComponent from './Components/ResetPasswordComponent'
import SignUpComponent from './Components/SignUpComponent'
import login from './Assets/login.jpg'
import teacher from './Assets/teacher.jpg'


function NewLoginComponent(props) {
    const [showScreen, setShowScreen] = useState("login")

    const closeModal = () => {
        props.closeModal()
        setShowScreen(props?.openPage)
    }

    useEffect(() => {
        setShowScreen(props?.openPage)
    }, [props?.openPage])

    return (
        <>
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 sm:px-6 lg:px-8">
                        <div className="absolute inset-0">
                            <img
                                className="object-cover object-top w-full h-full"
                                src={showScreen === 'register-student' ? login : teacher}
                                alt=""
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                        <div className="relative">
                            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                                <h3 className="text-4xl font-bold text-white">
                                    Unleash Your Learning Journey, Enroll and Excel!
                                </h3>
                                <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                                    <li className="flex items-center space-x-3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg
                                                className="w-3.5 h-3.5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                        <span className="text-lg font-medium text-white">
                                            {" "}
                                            Expert Instructors{" "}
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg
                                                className="w-3.5 h-3.5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                        <span className="text-lg font-medium text-white">
                                            {" "}
                                            Interactive Experience{" "}
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg
                                                className="w-3.5 h-3.5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                        <span className="text-lg font-medium text-white">
                                            {" "}
                                            Flexible Learning{" "}
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg
                                                className="w-3.5 h-3.5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                        <span className="text-lg font-medium text-white">
                                            {" "}
                                            Comprehensive Courses{" "}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {showScreen == "login" && <LoginComponent closeModal={closeModal} setShowScreen={setShowScreen} />}

                    {showScreen == "register-teacher" && <SignUpComponent showScreen={showScreen} closeModal={closeModal} setShowScreen={setShowScreen} />}

                    {showScreen == "register-student" && <SignUpComponent showScreen={showScreen} closeModal={closeModal} setShowScreen={setShowScreen} />}

                    {showScreen == "forgot" && <ResetPasswordComponent closeModal={closeModal} setShowScreen={setShowScreen} />}


                </div>
            </section>
        </>
    )
}

export default NewLoginComponent

/*
Exported to -
LoginModal.js
*/