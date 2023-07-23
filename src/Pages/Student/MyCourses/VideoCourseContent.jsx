import React from 'react'
import CourseContentCard from '../../Courses/CourseContentCard'
import { useParams } from 'react-router-dom'

function VideoCourseContent() {
  const { courseId } = useParams()

  const CourseContent = [
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
  ]

  return (
    <CourseContentCard contents={CourseContent} />

  )
}

export default VideoCourseContent