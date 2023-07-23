import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ApiList from "../../Components/Api/ApiList"
import Footer from "../LandingPage/Footer"
import CouresHeader from "./CouresHeader"
import CourseContent from "./CourseContent"


function CourseDetailsIndex(props) {
  const [courseData, setCourseData] = useState()
  const [isLoading, setisLoading] = useState()
  const [stickyShow, setstickyShow] = useState(false)

  // THIS CODE MAKE THE SCROLL TOP WHEN LINK IS CLICKED
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { api_courseDetailsById, bearerHeader } = ApiList()

  const { courseName, courseId } = useParams()

  console.log("courseData", courseData)



  const getCourseDetailsById = () => {

    setisLoading(true)

    let requestBody = {
      courseId: atob(courseId)
    }

    axios.post(api_courseDetailsById, requestBody, bearerHeader)
      .then((res) => {
        console.log("Course Details data after resonse...", res?.data?.data)

        if (res.data.data) {
          setCourseData(res?.data?.data)
        } else {
          console.log("Error while getting single course data")
        }
      })
      .catch((err) => {
        console.log("exception while getting single course details", err)
      }).finally(() => {
        setisLoading(false)
      })
  }

  useEffect(() => {
    getCourseDetailsById()
  }, [])

  //THIS CODE BLOCK IS TO TOGGLE HIDE AND SHOW OF STICKY PRICE CARD VIA WINDOW SCROLL
  window.onscroll = function () {
    if (window.pageYOffset < 200) {
      setstickyShow(false)
    }
    if (window.pageYOffset > 200) {
      setstickyShow(true)

    }
  };


  const courseDetails = {
    courseTitle: courseData?.course_name,
    courseDescription: 'Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!',
    author: 'Avinash Jain, The Codex',
    ratings: 2245,
    students: 24144,
    contentBrief: ['Create their own Python Programs', 'Become an experienced Python Programmer', 'Parse the Web and Create their own Games'],
    contents: [
      {
        contentTitle: 'Up and Running with Python',
        contentTime: '4 lectures . 6min',
        contentList: [
          { contentHeading: 'Installing Python', contentDuration: '04:07' },
          { contentHeading: 'Hello World', contentDuration: '01:07' },
        ]
      },
      {
        contentTitle: 'The Basics (Data Types)',
        contentTime: '4 lectures . 6min',
        contentList: [
          { contentHeading: 'Installing Python', contentDuration: '04:07' },
          { contentHeading: 'Hello World', contentDuration: '01:07' },
        ]
      },
      {
        contentTitle: 'Conditions and Loops',
        contentTime: '4 lectures . 6min',
        contentList: [
          { contentHeading: 'Installing Python', contentDuration: '04:07' },
          { contentHeading: 'Hello World', contentDuration: '01:07' },
        ]
      },
    ],
    requirements: ['Macintosh (OSX)/ Windows(Vista and higher) Machine', 'Internet Connection'],
    description: {
      descriptionTitle: 'Do you want to become a programmer? Do you want to learn how to create games, automate your browser, visualize data, and much more?',
      descriptionText: 'If you’re looking to learn Python for the very first time or need'
    },
    instructor: {
      iName: 'Avinash Jain',
      iDesignation: 'CEO of TheCodex.me - Teaching 500,000+ Students how to code',
      iRating: '4.3',
      iReviews: '76,398',
      iStudents: '929,579',
      iCourses: '16',
      iDescription: 'Avinash Jain is currently a senior at UC Berkeley majoring in Electrical Engineering and Computer Science.'
    },
    commentContent: {
      cRating: '4.3',
      cRatingCount: '4k',
      cRatings: [
        { name: 'Seema S.', starRatings: '5', createdAt: 'a week ago', comment: 'Yes it was a good match and gave me a very broad overview of introduction to python' },
        { name: 'Seema S.', starRatings: '5', createdAt: 'a week ago', comment: 'Yes it was a good match and gave me a very broad overview of introduction to python' },
        { name: 'Seema S.', starRatings: '5', createdAt: 'a week ago', comment: 'Yes it was a good match and gave me a very broad overview of introduction to python' },
      ]
    },
    moreCourses: [
      { id: 1, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
      { id: 2, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
      { id: 3, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
      { id: 4, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
      { id: 5, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
      { id: 6, courseName: 'python', title: "Learn Python: The Complete Python.", author: 'Avinash Jain, The Codex', ratings: 450, price: 4254 },
    ],
    priceCard: {
      price: courseData?.final_price,
      imgPath: courseData?.image_full_path,
      vidRating: '4.3 Instructor Rating',
      vidArticle: '1 article',
      vidDownloads: '3 downloadable resources',
      vidLimit: 'Full lifetime access',
      vidAccess: 'Access on mobile and TV',
      vidCertificate: 'Certificate of completion'

    }
  }

  const courseDataForCart = {
    "id": courseData?.id,
    "img": courseData?.image_full_path,
    "name": courseData?.course_name,
    "price": courseData?.final_price,
  }



  return (
    <>
      <div>
        <CouresHeader setOpenLoginModal={props?.setOpenLoginModal} isLoading={isLoading} courseData={courseData} courseDetails={courseDetails} stickyShow={stickyShow} courseDataForCart={courseDataForCart} />

        {/* SPACER */}
        <div className="w-full h-10"></div>
        <CourseContent isLoading={isLoading} courseData={courseData} courseDetails={courseDetails} />

        {/* SPACER */}
        <div className="w-full h-20"></div>
        {/* <Footer /> */}

      </div>
    </>
  )
}

export default CourseDetailsIndex
/*
Exported to -
App.js
*/