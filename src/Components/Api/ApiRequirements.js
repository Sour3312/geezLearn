


////************************************* 1 Student COURSE WATCH APIS **********************************////

const getCourseWatchDetails = {
    request: {
        courseId,
        type: 'watch' // type is watch or view. if watch then video url will come along.
    },

    response: {
        courseTitle,
        courseImg,
        courseDesc,
        instructorName,
        instructorImg,
        courseDuration,
        courseVideoUrl, // if type is watch then this key will come
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
        ],
        instructor: {
            iName: 'Avinash Jain',
            iDesignation: 'CEO of TheCodex.me - Teaching 500,000+ Students how to code',
            iRating: '4.3',
            iReviews: '76,398',
            iStudents: '929,579',
            iCourses: '16',
            iDescription: 'Avinash Jain is currently a senior at UC Berkeley majoring in Electrical Engineering and Computer Science.'
        },

    }
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

// 🅳🅾🅽🅴  Add review
const postReview = { // {{ _.url }}/review/course/add ==> done
    request: {
        "courseId": 8,
        "rating": 4.7,
        "comment": "very good."
    },

    response: {
        "status": true,
        "message": "Review Added to Course",
        "data": []
    }
}

// Delete Review => {{ _.url }}/review/course/delete
// {
// 	"courseId":10
// }

/*
View all Review of a course = > {{ _.url }}/review/course/view-all
req {
	"courseId":10
}
response{
	"status": true,
	"message": "All review of a course",
	"data": [
		{
			"comment": "very good.good",
			"rating": 3.7,
			"studentName": "Rame Kumar",
			"image_path": "uploads\\1688044951605-602846311.png",
			"created_at": "2023-06-29T12:08:36.000Z",
			"userProfile": "http://geezlearn.com:8001/uploads\\1688044951605-602846311.png"
		}
	]
}
*/

// View All Review added by a student => {{ _.url }}/review/user/view-all      // requrest none

////************************************* 2 POST COURSE DETAILS **********************************////
const postCourseBasicForm = {
    request: {
        courseTitle,
        courseSubTitle,
        courseDesc,
        language,
        level,
        category,
        subCategory,
        primaryTaught,
        courseImage,
        promoVideo
    },

    response: {
        status
    }
}

// ADD EDIT LECTURE , API DONE

////************************************* 3 Contacts APIS **********************************////  = > done
// 🅳🅾🅽🅴 
const postContactMessage = { // {{ _.url }}/public/contact/add
    request: {
        name,
        email,
        message
    },

    response: {
        status,
    }
}

// 🅳🅾🅽🅴 
const getContactMessageList = {/// {{ _.url }}/public/contact/view-all
    request: {
    },

    response: [{
        name,
        email,
        message,
        date
    }]
}

// delete {{ _.url }}/public/contact/delete
// {
// 	"id":2
// }

////************************************* 4 ADJUSTMENTS IN PROFILE API **********************************////  =>> Complete done
// 🅳🅾🅽🅴 
const updateProfileDetails = {  //{{ _.url }}/auth/profile-update  => done
    request: {
        "name": "Rame Kumar",
        "phone": 23432434,
        "headline": "okkddf",
        "biography": "this is my bio",
        "website": "abc.com",
        "twitter": "www.twitter.com",
        "facebook": "https://facebook/dipu",
        "linkedin": "www.linkedin/in",
        "youtube": "www.youtube.com"
    },

    response: {
        "status": true,
        "message": "Profile updated successfully",
        "data": null
    }
}

// 🅳🅾🅽🅴 
const getProfileDeails = { //{{ _.url }}/auth/profile => done
    request: {},

    response: {
        "status": true,
        "message": "Profile Details",
        "data": {
            "id": 53,
            "name": "Rame Kumar",
            "email": "student@gmail.com",
            "phone": 23432434,
            "headline": "okkddf",
            "website": "abc.com",
            "twitter": "www.twitter.com",
            "facebook": "https://facebook/dipu",
            "linkedin": "www.linkedin/in",
            "youtube": "www.youtube.com",
            "biography": "this is my bio",
            "status": "Active"
        }
    }
}


const updateProfilePic = { // {{ _.url }}/auth/profile-image-update => done
    request: {
        file
    },

    response: {
        "status": true,
        "message": "Profile Image updated successfully",
        "data": null
    }
}


////************************************* 5 TEACHER PAYMENT REQUEST APIS **********************************////

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

////************************************* 6 ADMIN PAYMENT APPROVAL APIS **********************************////

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


////************************************* 7 Student CERTIFICATION APIS **********************************//// =====>>  DONE ALL
//🅳🅾🅽🅴  INTEGRATION DONE, ERROR FROM BACKEND
const generateCertificate = { // done  =>{{ _.url }}/student/generate-certificates
    request: {
        courseId,
        courseName,
        studentName
    },

    response: [
        {
            status
        }
    ]
}

// 🅳🅾🅽🅴 
const getCertificationList = {  //done==> {{ _.url }}/student/certificates
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


//  🅳🅾🅽🅴 INTEGRATION DONE BUT DATA IS COMING IN ARRAY, WAITING FOR RESOLVE
const getCertificationById = { // done ==> {{ _.url }}/student/certificate-view
    request: {
        "certificateNo": "1QVF-AN65-L8XT-TQFX"
    },

    response: {
        name,
        courseName,
        completedOn
    }
}



////************************************* 8 ADMIN PAYMENT PERCENTAGE SETUP APIS **********************************////

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


////************************************* 9 ADMIN / TEACHER TRANSACTION REPORT API **********************************////

const getTransactionReport = {
    request: {

    },

    response: {
        status
    }
}


