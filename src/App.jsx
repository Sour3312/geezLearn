import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Redirect from './Pages/404/Redirect';
import PageNotFound from './Pages/404/PageNotFound';
import HeaderIndex from './Components/Header/HeaderIndex';
import AboutUs from './Pages/PublicPages/AboutUs';
import ContactUs from './Pages/PublicPages/ContactUs';
import { useEffect, useState } from 'react';
import Logout from './Pages/Login/Logout';
import StudyCenterList from './Pages/StudyCenter/StudyCenterList';
import AuthIndex from './Components/Auth/AuthIndex';
import HideHeaderRoute from './Components/ProtectedRoute/FilterHeaderRoute';
import FilterHeaderRoute from './Components/ProtectedRoute/FilterHeaderRoute';
import FilterSidebar from './Components/ProtectedRoute/FilterSidebar';
import FilterSidebar2 from './Components/ProtectedRoute/FilterSidebar2';
import FilterFooterRoute from './Components/ProtectedRoute/FilterFooterRoute';
import StudentDahboard from './Pages/Student/StudentDahboard';
import CurrentAffairsList from './Pages/Admin/CurrentAffairs/CurrentAffairsList';
import CourseList from './Pages/Admin/ManageCourses/CourseList';
import StudentsList from './Pages/Admin/ManageStudents/StudentsList';
import TeachersList from './Pages/Admin/ManageTeachers/TeachersList';
import FilterStudentRoute from './Components/ProtectedRoute/FilterStudentRoute';
import Faq from './Pages/PublicPages/Faq';
import MainLandingPageIndex from './Pages/LandingPage/MainLandingPageIndex';
import CourseDetailsIndex from './Pages/Courses/CourseDetailsIndex';
import CartIndex from './Pages/Cart/CartIndex';
import { globalContextData } from './Components/Common/Context/GlobalContextFile';
import AllCourses from './Pages/Courses/AllCourses';
import OrderHistory from './Pages/Student/OrderHistory/OrderHistory';
import Profile from './Pages/Profile/Profile';
import Certification from './Pages/Certification/Certification';
import BoughtCoursesList from './Pages/Student/MyCourses/BoughtCoursesList';
import CertificateIndex from './Pages/Student/Cerificate/CertificateIndex';
import PlayCourse from './Pages/Student/MyCourses/PlayCourse';
import AddNewCourse from './Pages/Admin/ManageCourses/AddNewCourse';
import ViewCourse from './Pages/Admin/ManageCourses/ViewCourse';
import ReportIndex from './Pages/Admin/Report/ReportIndex';
import TransactionsIndex from './Pages/Admin/Transactions/TransactionsIndex';
import StripeIndex from './Pages/Payment/Stripe/StripeIndex';
import CourseCategoryIndex from './Pages/Admin/CourseCategory/CourseCategoryIndex';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SettingIndex from './Pages/Admin/Settings/SettingIndex';
import StudentList from './Pages/Student/StudentList';
import CourseForm from './Pages/Courses/CourseForm';
import { OrderConfirm } from './Pages/Cart/OrderConfirm';
import Receipt from './Pages/Cart/Receipt';
import { PurchasedCourses } from './Pages/Courses/PurchasedCourses';
import MyLearnings from './Pages/Student/MyLearnings';
import MyLearningsPage from './Pages/Student/MyLearningsPage';
import CertificateList from './Pages/Student/Cerificate/CertificateList';
import TeacherRegisterRequest from './Pages/Admin/ManageTeachers/TeacherRegisterRequest';
import TeacherPaymentApproval from './Pages/Admin/ManageTeachers/TeacherPaymentApproval';
import TeacherCourseApproval from './Pages/Admin/ManageCourses/TeacherCourseApproval';
import TransactionReport from './Pages/Admin/Transactions/TransactionReport';
import { CartPage } from './Pages/Cart/CartPage';
import { CheckoutPage } from './Pages/Cart/CheckoutPage';
import { Help } from './Pages/PublicPages/Help';
import ProfilePage from './Pages/Profile/ProfilePage';
import TeacherPaymentRequest from './Pages/Admin/ManageTeachers/TeacherPaymentRequest';
import PaypalPayment from './Pages/TEST/PaypalPayment';
import PaymentBifurcation from './Pages/Admin/ManageTeachers/PaymentBifurcation';
import QuizPage from './Pages/Courses/QuizPage';
import Whishlist from './Pages/Student/Whishlist';
import MyLearningCourses from './Pages/Student/MyLearningCourses';
import ProfileForm from './Pages/Profile/ProfileForm';
import ProfilePicture from './Pages/Profile/ProfilePicture';
import VideoCourseContent from './Pages/Student/MyCourses/VideoCourseContent';
import Overview from './Pages/Student/MyCourses/Overview';
import RatingPage from './Pages/Student/MyCourses/RatingPage';
import VideoPlayer2 from './Pages/Student/MyCourses/VideoPlayer2';
import { ConfirmOrderPage } from './Pages/Cart/ConfirmOrderPage';
import CourseBasicDetailsForm from './Pages/Admin/ManageCourses/CourseBasicDetailsForm';
import CourseContent from './Pages/Courses/CourseContent';
import CourseContentForm from './Pages/Admin/ManageCourses/CourseContentForm';
import OnlineStatus from './Components/Common/OnlineStatus';
import LoginModal from './Pages/Login/LoginModal';
import ChangePasswordCard from './Pages/Profile/ChangePasswordCard';
import ContactList from './Pages/Admin/Contacts/ContactList';
import MyRatings from './Pages/Student/MyCourses/MyRatings';
import PaymentGateways from './Pages/Admin/PaymentGateways/PaymentGateways';



function App() {
  const [cartItemCount, setCartItemCount] = useState(null)
  const [openLoginModal, setOpenLoginModal] = useState(0)
  const [userData, setuserData] = useState(null)
  const [userImage, setuserImage] = useState(null)

  //This is global data
  const contextData = {
    //Mange currency
    currency: { symbol: '₹', name: 'INR' },
    //Update Cart Count
    updateCartCount: (value) => { setCartItemCount(value) },
    cartCount: cartItemCount,
    //Mange Tost Notification
    notify: (value, type) => {
      return
      if (type == "success") toast.success(value)
      if (type == "info") toast.info(value)
      if (type == "warn") toast.warn(value)
      if (type == "error") toast.error(value)
      if (type == "none") toast(value)
    },
    cartItemCount,
    setCartItemCount,
    userData,
    setuserData,
    userImage,
    setuserImage

  }

  return (
    <>
      {/* <OnlineStatus /> */}

      <globalContextData.Provider value={contextData}>
        <ToastContainer />
        <LoginModal openLoginModal={openLoginModal} openPage={'login'} />
        <div className='grid grid-cols-12 bg-white'>
          <div className={`col-span-12  h-full`}>

            <Routes>
              <Route element={<FilterHeaderRoute />}>  {/* Show Header */}

                <Route element={<FilterSidebar2 />} > {/* Show Sidebar */}

                  {/* 1 ADMIN ROUTES ONLY */}
                  <Route element={<ProtectedRoute />} > {/* Admin Private Routes */}

                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/CenterList" element={<StudyCenterList />} />
                    <Route exact path="/CurrentAffairs" element={<CurrentAffairsList />} />

                    <Route exact path="/CourseList" element={<CourseList />} />
                    <Route path="/CourseCategory" element={<CourseCategoryIndex />} />
                    <Route exact path="/add-course" element={<AddNewCourse />} >
                      <Route exact path="basic-details" element={<CourseBasicDetailsForm />} />
                      <Route exact path="basic-details/:id" element={<CourseBasicDetailsForm />} />
                      <Route exact path="course-content/:id" element={<CourseContentForm />} />
                    </Route>
                    <Route exact path="/CourseList/view/:id" element={<ViewCourse />} />\

                    {/* dummy route */}
                    <Route exact path="/StudentsList" element={<StudentList />} />
                    <Route exact path="/course-form" element={<CourseForm />} />
                    <Route exact path="/order-confirm" element={<OrderConfirm />} />
                    <Route exact path="/receipt" element={<Receipt />} />
                    <Route exact path="/pur-course" element={<PurchasedCourses />} />


                    {/* <Route exact path="/StudentsList" element={<StudentsList />} /> */}
                    <Route exact path="/TeachersList" element={<TeachersList />} />
                    <Route exact path="/contact-list" element={<ContactList />} />
                    <Route exact path="/teacher-register-request" element={<TeacherRegisterRequest />} />
                    <Route exact path="/teacher-payment-approval" element={<TeacherPaymentApproval />} />
                    <Route exact path="/admin-payment-bifurcation" element={<PaymentBifurcation />} />
                    <Route exact path="/payment-gateways" element={<PaymentGateways />} />
                    <Route exact path="/course-approval" element={<TeacherCourseApproval />} />
                    {/* <Route exact path="/cd" element={<CourseBasicDetailsForm />} /> */}
                    <Route exact path="/transaction-report" element={<TransactionReport />} />
                    <Route exact path="/payment-request" element={<TeacherPaymentRequest />} />
                    <Route exact path="/Settings" element={<SettingIndex />} />
                    <Route exact path="/Report" element={<ReportIndex />} />
                    <Route path="/change-password-teacher" element={<ChangePasswordCard />} />

                  </Route>


                  {/* 2 STUDENTS ROUTES ONLY */}
                  <Route element={<FilterStudentRoute />} > {/*Student Private Routes*/}
                    <Route path="/StudentDahboard" element={<StudentDahboard />} />
                    <Route path="/order-history" element={<OrderHistory />} />
                    <Route path="/my-courses" element={<BoughtCoursesList />} />
                    <Route path="/student-quiz" element={<QuizPage />} />
                    {/* <Route exact path="/my-learnings" element={<MyLearningIndex />} /> */}
                    <Route exact path="/my-learnings" element={<MyLearningsPage />} >
                      <Route path="mycourse" element={<MyLearningCourses />} />
                      <Route path="wishlist" element={<Whishlist />} />
                    </Route>
                    {/* <Route path="/play" element={<PlayCourse />} > */}
                    <Route path="/play" element={<VideoPlayer2 />} >
                      <Route path="course-content/:courseId" element={<VideoCourseContent />} />
                      <Route path="overview/:courseId" element={<Overview />} />
                      <Route path="ratings/:courseId" element={<RatingPage />} />
                    </Route>
                    <Route path="/my-ratings" element={<MyRatings />} />
                    <Route path="/certificates" element={<CertificateIndex />} />
                    <Route path="/certificate-list" element={<CertificateList />} />
                  </Route>
                </Route>

                {/* 3 OPEN ROUTES */}
                <Route element={<FilterFooterRoute />} > Show Footer
                  {/* ADDED ROUTES BY TALIB FOR LANDING PAGE*/}
                  <Route path="/" element={<MainLandingPageIndex setOpenLoginModal={setOpenLoginModal} />} />
                  <Route exact path="/course-details/:courseName/:courseId" element={<CourseDetailsIndex setOpenLoginModal={setOpenLoginModal} />} />
                  <Route path="/courses" element={<AllCourses />} />
                  <Route path="/courses/:filterBy" element={<AllCourses />} />
                  <Route path="/profile" element={<ProfilePage />} >
                    <Route path="basic-details" element={<ProfileForm />} />
                    <Route path="picture" element={<ProfilePicture />} />
                  </Route>
                  <Route path="/change-password" element={<ChangePasswordCard />} />
                  <Route path="/certification/:certificateId" element={<Certification />} />

                  <Route path="/test" element={<StripeIndex />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/payment-success" element={<ConfirmOrderPage />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/contact" element={<ContactUs />} />
                </Route>
              </Route>

              {/* </Route> Show Header */}

              <Route path="/logout" element={<Logout />} />

              {/* Page Not Found Pages */}
              {/* <Route path="*" element={<Redirect />} />
              <Route path="/error" element={<PageNotFound />} /> */}


              {/* This is Test Route Added by Dipu , will be deleted */}
              <Route path="/pay" element={<PaypalPayment />} />

            </Routes>
          </div>
        </div>
      </globalContextData.Provider>
    </>
  )
}

export default App
