import { useState, useEffect } from 'react'
import { SiMaterialdesignicons } from 'react-icons/si'
import design from './design.png'
import dev from './dev.png'
import algo from './algo.png'
import ApiList from '../../Components/Api/ApiList'
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors'
import { useNavigate } from 'react-router-dom'

function Categories() {

    const [isLoading, setisLoading] = useState(false);
    const [erroState, seterroState] = useState(false);
    const [erroMessage, seterroMessage] = useState(null);
    const [dataList, setdataList] = useState(null);

    const { api_getAllCourseCategory } = ApiList()
    const navigate = useNavigate()


    //3 Fetch list FUNCTION TO FETCH LIST DATA
    const fetchCourseCategoryList = () => {
        setisLoading(true)
        AxiosInterceptors.post(api_getAllCourseCategory, {})
            .then(function (response) {
                console.log('category list...', response)
                if (response?.data?.status === true) {
                    setdataList(response?.data?.data)
                } else {
                    setdataList(null)
                    // activateBottomErrorCard(true, 'Error occured while fetching data.')
                }
            })
            .catch(function (error) {
                console.log('==2 error list...', error)
                // activateBottomErrorCard(true, 'Error occured while fetching data.')
            }).finally(() => {
                setisLoading(false)
            })
    }

    useEffect(() => {
        fetchCourseCategoryList()
    }, [])

    const categories = [
        { category: 'Design', imageUrl: design },
        { category: 'Development', imageUrl: dev },
        { category: 'Design', imageUrl: algo },
        { category: 'Design', imageUrl: design },
        { category: 'Development', imageUrl: dev },
        { category: 'Design', imageUrl: algo },
        { category: 'Development', imageUrl: design },

    ]

    return (
        <>
            <div className='text-2xl md:text-3xl font-bold text-center'>Top Categories</div>
            <div className='text-sm text-gray-600 text-center font-custom-lora'>Choose your preferred categories</div>

            {/* SPACER */}
            <div className="w-full h-5"></div>

            <div className="grid grid-cols-12 w-4/5 mx-auto">
                {
                    dataList?.map((category, index) => (
                        <div onClick={() => navigate(`/courses/${category?.id}`)} className="col-span-12 md:col-span-3 mt-8 md:mt-0  md:px-0 mx-4 sm:pb-4 cursor-pointer">
                            <div class="w-full rounded-lg flex flex-col justify-center items-center ">
                                <div className='h-40 w-40 rounded-full overflow-hidden p-2 border flex justify-center items-center bg-white shadow-xl'> <img src={category?.courseImageFullPath} /></div>

                                <div class="w-full text-center text-md py-2 font-semibold tracking-tight text-gray-800 font-custom-lora mt-1  rounded-b-md">{category?.CategoryName}</div>
                            </div>


                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Categories