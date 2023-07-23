import {useEffect} from 'react'
import Courses from '../LandingPage/Courses'
import Footer from '../LandingPage/Footer'

function AllCourses() {
  // THIS CODE MAKE THE SCROLL TOP WHEN LINK IS CLICKED
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <div className='px-2 md:px-20 mt-20'>
        <Courses />
      </div>

      {/* SPACER */}
      <div className="w-full h-20"></div>
      {/* <Footer /> */}
    </>
  )
}

export default AllCourses