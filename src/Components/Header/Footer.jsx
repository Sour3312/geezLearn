import React from 'react'
import { Link } from 'react-router-dom'
import MenuLinks from '../../Assets/JSON/MenuLinks.json'
import { CgFacebook } from 'react-icons/cg'

function Footer() {
    return (
        <>
            <footer class="text-gray-200 body-font bg-[#1A1A1A] border-b border-t-gray-700 border-black shadow-2xl shadow-gray-500 py-10">
                <div class="w-full">
                    {/* <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                            <span class="ml-3 text-xl">DipTech eLearning</span>
                        </a>
                        <p class="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro adaptogen indego</p>
                    </div> */}
                    <div class="grid grid-cols-12 w-4/5 mx-auto">

                        <div class="col-span-12 md:col-span-2 px-4 mx-auto">
                            <h2 class="title-font font-medium text-white tracking-widest text-sm mb-3">Follow Us!</h2>
                            <div class="title-font font-medium text-white tracking-widest text-sm mb-3"><span className='border rounded-lg px-4 py-2 mt-10'>Refer & Earn</span></div>
                            <div class="flex justify-between px-2">
                                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-700"><CgFacebook className="inline" /></div>
                                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-700"><CgFacebook className="inline" /></div>
                                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-700"><CgFacebook className="inline" /></div>
                            </div>
                            <div class="flex justify-between px-2 mt-1">
                                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-700"><CgFacebook className="inline" /></div>
                                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-700"><CgFacebook className="inline" /></div>
                                <div className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-700"><CgFacebook className="inline" /></div>
                            </div>
                        </div>

                        <div class="col-span-12 md:col-span-2 px-4 mx-auto">
                            <h2 class="title-font font-medium text-white tracking-widest text-sm mb-3">Company</h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">About us</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Careers</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Newsroom</a>
                                </li>

                            </nav>
                        </div>
                        <div class="col-span-12 md:col-span-2 px-4 mx-auto">
                            <h2 class="title-font font-medium text-white tracking-widest text-sm mb-3">Work with us</h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Become an instructor</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Blog as guest</a>
                                </li>

                            </nav>
                        </div>
                        <div class="col-span-12 md:col-span-2 px-4 mx-auto">
                            <h2 class="title-font font-medium text-white tracking-widest text-sm mb-3">Discover</h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Skillup</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Skillup Sitemap</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Resources</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">RSS feed</a>
                                </li>
                            </nav>
                        </div>
                        <div class="col-span-12 md:col-span-2 px-4 mx-auto">
                            <h2 class="title-font font-medium text-white tracking-widest text-sm mb-3">For Businesses</h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Corporate training</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Partners</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Digital Transformation</a>
                                </li>
                            </nav>
                        </div>
                        <div class="col-span-12 md:col-span-2 px-4 mx-auto">
                            <h2 class="title-font font-medium text-white tracking-widest text-sm mb-3">Learn On the Go!</h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">First Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Second Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Third Link</a>
                                </li>
                                <li>
                                    <a class="text-gray-500 text-sm font-semibold hover:text-gray-800">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                        <div className='col-span-12 border border-b-white'></div>
                        <div class="col-span-12 px-4 mx-auto mt-10">
                            <h2 class="title-font font-medium text-white tracking-widest text-sm mb-3">Trending Post Graduate Programs</h2>
                            <div className='text-gray-500 text-xs'>
                                <span className='px-2'>Artificial Intelligence Course</span>
                                <span className='px-2'>| &nbsp;Cloud Computing Certification Cours</span>
                                <span className='px-2'>| &nbsp;Cloud Computing Certification Cours</span>
                                <span className='px-2'>| &nbsp;Cloud Computing Certification Cours</span>
                                <span className='px-2'>| &nbsp;Cloud Computing Certification Cours</span>
                                <span className='px-2'>| &nbsp;Cloud Computing Certification Cours</span>
                                <span className='px-2'>| &nbsp;Cloud Computing Certification Cours</span>
                                <span className='px-2'>| &nbsp;Cloud Computing Certification Cours</span>
                            </div>
                        </div>
                        <div class="col-span-12 px-4 mx-auto mt-10">
                            <div className='text-gray-100 text-sm'>
                                <span className='px-2'>Artificial Intelligence Course</span>
                                <span className='px-2'>Privacy Policy</span>
                                <span className='px-2'>Refund Policy</span>
                                <span className='px-2'>Reschedule Policy</span>
                                <span className='px-2'>Country</span>

                            </div>
                        </div>
                        
                    </div>
                  
                    {/* <div className="bg-white">
                        <div class=" mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                            <p class="text-gray-500 text-sm text-center sm:text-left">© 2023 DipTech eLearning —
                                <a href="https://twitter.com/diputony" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@diputony</a>
                            </p>
                            <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                                <a class="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a class="ml-3 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                    </svg>
                                </a>
                                <a class="ml-3 text-gray-500">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                    </svg>
                                </a>
                                <a class="ml-3 text-gray-500">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                                        <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                        <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                    </svg>
                                </a>
                            </span>
                        </div>
                    </div> */}
                </div>
            </footer>
        </>
    )
}

export default Footer