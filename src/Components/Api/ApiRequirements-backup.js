////************************************* 1 COURSE APIS **********************************////

// 1 done
const AllCourseLst = {

}

// 2 done
const CourseDetailsById = {

}

// 3 done
const CourseAdd = {

}

// 4 done
const CourseEdit = {

}

// 5 done
const CourseDelete = {

}

////************************************* 2 STUDENT APIS **********************************////

// 6 done - INTEGRATED
const StudentList = {

}

// 7 done
const StudentDetailsById = {

}

// 8 done
const StudentUpdate = {

}

// 9 done
const StudentDelete = {

}
////************************************* 3 COURSE CATEGORY APIS **********************************////

// 6 done - Integrated
const CategoryList = {

}

// 7 done
const CategoryDetailsById = {

}

// 8 done
const CategoryAdd = {

}

// 8 done
const CategoryUpdate = {

}

// 9 done
const CategoryDelete = {

}
////************************************* 4 Auth APIS **********************************////

// 6 done - INTEGRATED
const Login = {
    request: {
        email,
        password
    },

    response: { // to update in login api ======>>> DONE

        status,
        token,
        userType,
        userImg,
        userName,
        userEmail
    }
}

// 7 done Integrated
const Register = {

}

// 8 done
const changePassword = {

}

// 8 done
const profileDetails = {

}

// 9 done
const updateProfile = {

}

////************************************* 5 WishList APIS **********************************////

// 6 done - integrated
const wishlist = {

}

// 7 done - integrated
const wishlistAdd = {

}

// 8 done - integrated
const wishlistDelete = {

}

////************************************* 6 Cart APIS **********************************////

// 6 done
const cartList = {

}

// 7 done
const cartAdd = {

}

// 8 done
const cartDelete = {

}

////************************************* 7 Teacher APIS **********************************////

// 6 done - integrated
const teacherList = {

}

// 7 done
const teacherDetailsById = {

}

// 8 done
const teacherApprove = {

}


////************************************* 8 Checkout APIS **********************************////

// done
const postCheckout = {
    request: {
      courseId:[1,2,3]
    },

    response: {
        status,
    }
}

////************************************* 9 Contacts APIS **********************************////

const postContactMessage = {
    request: {
        name,
        email,
        message
    },

    response: {
        status,
    }
}

const getContactMessageList = {
    request: {
    },

    response: [{
        name,
        email,
        message,
        date
    }]
}

// STUDENT

////************************************* 10 Student My Learnings APIS **********************************////
// done => {{ _.url }}/student/my-courses
const getMyLearnings = {
    request: {
        // from auth student id
    },

    response: [{
        courseName,
        courseTitle,
        author,
        date,
        imgUrl,
        duration,
        status
    }]
}

////************************************* 11 Student COURSE WATCH APIS **********************************////

const getCourseWatchDetails = {
    request: {
        courseId
    },

    response: {
        courseTitle,
        courseImg,
        courseDesc,
        instructorName,
        instructorImg,
        courseDuration,
        courseVideoUrl,
        courseContent: [
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

    }
    // course content
    // About this course
    // ratings
    // certification link
}

const showAllReviews = {
    request: {
        courseId
    },

    response: {
        totalRating: '4.3',
        userCount: '4k',
        cRatings: [
            { name: 'Seema S.', starRatings: '5', createdAt: 'a week ago', comment: 'Yes it was a good match and gave me a very broad overview of introduction to python' },
            { name: 'Seema S.', starRatings: '5', createdAt: 'a week ago', comment: 'Yes it was a good match and gave me a very broad overview of introduction to python' },
            { name: 'Seema S.', starRatings: '5', createdAt: 'a week ago', comment: 'Yes it was a good match and gave me a very broad overview of introduction to python' },
        ]
    }
}

const postReview = {
    request: {
        rating,
        review
    },

    response: {
        status
    }
}

////************************************* 12 Student CERTIFICATION APIS **********************************////

const getCertificationList = {
    request: {
        studentId
    },

    response: [
        {
            courseId,
            courseName,
            courseDesc,
            instructor,
            duration,
            imgUrl,
        }
    ]
}

const getCertificationById = {
    request: {
        courseId
    },

    response: {
        name,
        courseName,
        completedOn
    }
}

////************************************* 13 PURCHASE HISTORY APIS **********************************////
// Student purchage history done  => {{ _.url }}/student/all-transactions
const getPurchaseHistory = {
    request: {
        courseId
    },

    response: {
        courseId,
        courseName,
        orderId,
        purchaseDate,
        price,
        courseImgUrl
    }
}

////************************************* 14  QUIZ HISTORY APIS **********************************////

// DOUBT


////************************************* 15 TEACHER PAYMENT REQUEST APIS **********************************////

const getPaymentBifurcationDetails = {
    request: {
        teacherId
    },

    response: {
        totalAmount,
        teacherPercent,
        adminPercent,
    }
}

const postPaymentRequest = {
    request: {
        teacherId,
        comment
    },

    response: {
        status
    }
}

////************************************* 16 ADMIN PAYMENT PERCENTAGE SETUP APIS **********************************////

const postPaymentPercentage = {
    request: {
        teacherId,
        teacherPercent,
        adminPercent,
    },

    response: {
        status
    }
}

////************************************* 17 ADMIN PAYMENT APPROVAL APIS **********************************////

const getPaymentRequestList = {
    request: {
    },

    response: [{
        teacherName,
        userName,
        mobile,
        Amount
    }]
}

const approvePayment = {
    request: {
        teacherId
    },

    response: {
        status
    }
}

////************************************* 18 ADMIN REGISTER APPROVAL APIS **********************************////
// done================
const getTeacherRegisterRequestList = {
    request: {
    },

    response: [{
        teacherName,
        email,
        mobile,
    }]
}

const registerApproval = {
    request: {
        teacherId,
        approveStatus
    },

    response: {
        status
    }
}

////************************************* 19 ADMIN ADDED COURSE APPROVAL APIS **********************************////
// {{ _.url }}/courses/view-all-pending => Admin can viee all pending courses list
const getAddedCourseList = {
    request: {
    },

    response: {
        courseId,
        courseName,
        desc,
        author,
        regularPrice,
        discount,
        finalPrice,
        categoryId,
        courseImgUrl
    }
}
// {{ _.url }}/courses/approve-pending  => Admin can approve pending courses
const courseApproval = {
    request: {
        courseId,
        status   // 0 pending, 1 -approved, 2 - reject
    },

    response: {
        status
    }
}


