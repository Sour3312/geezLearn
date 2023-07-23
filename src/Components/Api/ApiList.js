export default function ApiList() {

    // let baseUrl = "http://localhost:1337"  // This is strapi base url
    // let baseUrl = "https://lms-node-mysql.onrender.com"  // This is Live base url

    // let baseUrl = "http://localhost:8001"  // This is Local base url
    let baseUrl = "http://143.198.231.162:8001"  // LIVE SERVER IP

    const bearer = localStorage.getItem("token")
    const UserType = localStorage.getItem("UserType")

    const header = {
        headers: {
            Authorization: `Bearer ${bearer}`,
            Accept: 'application/json',
        }
    }

    console.log("bearerHeader", header)
    let ApiList = {
        baseUrl: baseUrl,
        bearerHeader: header,  //bearerHeader is used For Authentication
        userType: UserType, // This is User Type => Super Admin, Center Admin, Teacher and Student

        // loginApi: `${baseUrl}/api/auth/login`,
        // logOutApi: `${baseUrl}/api/auth/logout`,
        // registrationApi: `${baseUrl}/api/student/register`,  //POST

        // api_getAllCenterList: `${baseUrl}/api/crud/get-all-centers`,
        // api_addNewCenter: `${baseUrl}/api/crud/center`,

        // api_getAllCurrentAffairs: `${baseUrl}/api/crud/current-affairs/all-current-affairs`, // POST
        // api_AddNewCurrentAffairs: `${baseUrl}/api/crud/current-affairs/store`, // POST
        // api_getCurrentAffairsById: `${baseUrl}/api/crud/current-affairs/get-by-id`, // POST

        // api_getAllCouses: `${baseUrl}/api/crud/courses/get-list`, // POST
        // api_AddNewCourse: `${baseUrl}/api/crud/courses/store`, // POST

        // api_getAddNewCourseCategory: `${baseUrl}/api/crud/course-category/store`, // POST => Add New Course Category
        // api_updateCourseCategory: `${baseUrl}/api/crud/course-category/edit`, // Update Course Category
        // api_getCourseCategoryById: `${baseUrl}/api/crud/course-category/get-category-by-id`, // Get Course Category by Id
        // api_deleteCourse: `${baseUrl}/api/crud/courses/delete`, // Delete Course

        // api_getAllStudents: `${baseUrl}/api/student/get-all-students`, // POST

        // api_getAllTeachers: `${baseUrl}/api/teacher/get-all-teachers`, // POST
        // api_showCourseCategory: `${baseUrl}/api/crud/course-category/get-list`, // POST
        // api_showActiveCourseList: `${baseUrl}/api/crud/courses/get-active-list`, // POST => Show Active Course List
        // api_courseDetailsById: `${baseUrl}/api/crud/courses/show`, // POST => Get Course Details By Id

        // api_addToCart: `${baseUrl}/api/`, // POST

        // api_stripePayment: `${baseUrl}/api/payment/stripe-post`, // POST
        // api_RazorpayOrderIdGenerate: `${baseUrl}/api/payment/razorpay-post`, // POST

        // api_purchasedCourses: `${baseUrl}/api/student/purchased-courses`, // List of courses which student has purchesed
        // api_studentTransHistory: `${baseUrl}/api/student/tran-history`, // POST

        // // LATEST APIS ADDED BY TALIB
        // // API TO FETCH COURSE LIST
        // api_getCourseList: `${baseUrl}/api/course-lists`,


        // // API TO FETCH CATEGORY
        // api_getStudentList: `${baseUrl}/api/student-lists`,

        // ====================================================
        // NEW NODE APIS, GIVEN BY DIPU

        // LOGIN API
        api_login: `${baseUrl}/auth/login`,

        // REGISTER API
        api_register: `${baseUrl}/auth/register`,

        // REGISTER COURSE
        api_getAllCourse: `${baseUrl}/courses/view-all`,

        // REGISTER COURSE
        api_getAllCourseCategory: `${baseUrl}/master/course-category/view-all`,

        // REGISTER COURSE
        api_deleteCategory: `${baseUrl}/master/course-category/delete`,

        // REGISTER COURSE
        api_addCategory: `${baseUrl}/master/course-category/add`,

        // REGISTER COURSE
        api_getAllPendingCourses: `${baseUrl}/courses/view-all-pending`,

        // REGISTER COURSE
        api_approveRejectPendingCourse: `${baseUrl}/courses/approve-pending`,

        // STUDENT LIST
        api_getAllStudents: `${baseUrl}/users/student/view-all`,

        // STUDENT LIST
        api_getStudentById: `${baseUrl}/users/student/view-one`,

        // STUDENT LIST
        api_studentEnableDisable: `${baseUrl}/users/student/status-change`,

        // TEACHER LIST
        api_getAllTeachers: `${baseUrl}/users/teacher/view-all`,

        // TEACHER LIST
        api_getTeacherById: `${baseUrl}/users/teacher/view-one`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_orderDetails: `${baseUrl}/pay/chapa/verify-payment`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_createLecture: `${baseUrl}/lesson/lecture/create`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_createLessons: `${baseUrl}/lesson/add`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_viewLecture: `${baseUrl}/lesson/lecture/view`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_viewLesson: `${baseUrl}/lesson/view`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_courseDetailsById: `${baseUrl}/courses/view-one`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_addToCart: `${baseUrl}/cart/add`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_cartList: `${baseUrl}/cart/view-all`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_cartDelete: `${baseUrl}/cart/delete`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_chapaPay: `${baseUrl}/pay/chapa/pay`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_addWishList: `${baseUrl}/wishlist/add`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_getWishlist: `${baseUrl}/wishlist/view-all`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_deleteWishlist: `${baseUrl}/wishlist/delete`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_getStudentTransactions: `${baseUrl}/student/all-transactions`,

        // GET DETAILS WITH ORDER ID WITH CHAPA
        api_getPurchaseCourses: `${baseUrl}/student/my-courses`,

        // APIT TO FETCH PROFILE DETAILS
        api_getProfileDetails: `${baseUrl}/auth/profile`,

        // APIT TO UPDATE PROFILE DETAILS
        api_updateProfile: `${baseUrl}/auth/profile-update`,

        // APIT TO UPDATE PROFILE DETAILS
        api_updateProfileImage: `${baseUrl}/auth/profile-image-update`,

        // APIT TO GENERATE CERTIFICATE
        api_generateCertificate: `${baseUrl}/student/generate-certificates`,

        // APIT TO FETCH SINGLE CERTIFICATE
        api_getSingleCertificate: `${baseUrl}/student/certificate-view`,

        // APIT TO FETCH SINGLE CERTIFICATE
        api_getCertificates: `${baseUrl}/student/certificates`,

        // APIT TO POST CONTACTS
        api_postContact: `${baseUrl}/public/contact/add`,

        // API TO FETCH CONTACT LIST
        api_getContactList: `${baseUrl}/public/contact/view-all`,

        // API TO FETCH CONTACT LIST
        api_deleteContact: `${baseUrl}/public/contact/delete`,

        // API TO FETCH CONTACT LIST
        api_addReview: `${baseUrl}/review/course/add`,

        // API TO FETCH CONTACT LIST
        api_deleteReview: `${baseUrl}/review/course/delete`,

        // API TO FETCH CONTACT LIST
        api_fetchAllCourseReview: `${baseUrl}/review/course/view-all`,

        // API TO FETCH CONTACT LIST
        api_changePassword: `${baseUrl}/auth/change-password`,

        // API TO FETCH CONTACT LIST
        api_PaymentApproval: `${baseUrl}/commission/admin/approve-reject-withdraw`,

        // API TO FETCH CONTACT LIST
        api_postTeacherPercentage: `${baseUrl}/commission/admin/post-commission`,

        // API TO FETCH CONTACT LIST
        api_getTeacherEarning: `${baseUrl}/commission/teacher/earnings`,

        // API TO FETCH CONTACT LIST
        api_requestMoney: `${baseUrl}/commission/teacher/withdraw-request`,

        // API TO FETCH CONTACT LIST
        api_addCourse: `${baseUrl}/courses/add`,

        // API TO FETCH CONTACT LIST
        api_teacherAllTransactions: `${baseUrl}/commission/teacher/all-transaction-history`,

        // API TO FETCH CONTACT LIST
        api_getAllPaymentGateways: `${baseUrl}/pay/setting/payment/all-gateway-list`,

        // API TO FETCH CONTACT LIST
        api_udpatePaymentGateways: `${baseUrl}/pay/setting/payment/update-gateway`,

        // API TO FETCH CONTACT LIST
        api_fetchAllReview: `${baseUrl}/review/user/view-all`,

        api_initiatePaypalPayment: `${baseUrl}/pay/paypal/create-payment`,
        api_verifyPaypalPaymentAndFetchData: `${baseUrl}/pay/paypal/payment-verify`,

    }


    return ApiList
}