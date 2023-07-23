import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
import { HiCurrencyRupee } from "react-icons/hi";
import { FiUpload } from 'react-icons/fi';
import { GrClose } from "react-icons/gr";
import axios from "axios";
import ApiList from "../../../Components/Api/ApiList";
import { ThreeDots } from "react-loader-spinner";


const customStyles = {
    overlay: {
        background: "rgba(0, 0, 0, 0.5)",
        overflowY: "scroll"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        border: 'none',
        height: "maxHeight" //or maxHeight / 600px
    },
};

function EditCategoryModal(props) {
    const [categoryNameInput, setCategoryNameInput] = useState()
    const [selectedRadio, setSelectedRadio] = useState()
    const [errorMsg, setErrorMsg] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [oldData, setOldData] = useState()

    const [loadingOldData, setLoadingOldData] = useState(false)

    const { api_updateCourseCategory, api_getCourseCategoryById, bearerHeader } = ApiList()

    Modal.setAppElement('#root');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const btnId = props.editBtnId;

    useEffect(() => {
        if (props.openEditModal > 0) setIsOpen(true);
    }, [props.openEditModal]);

    // useEffect(() => {
    //     getCourseDataById()
    // }, [])

    const getCourseDataById = () => {
        setLoadingOldData(true)
        axios.post(api_getCourseCategoryById, { 'id': btnId }, bearerHeader)
            .then((res) => {
                if (res.data.status) {
                    setLoadingOldData(false)
                    console.log("Data fetched Successfully.", res)
                    setOldData(res.data.data)
                    setCategoryNameInput(res.data.data.category)
                    setSelectedRadio(res.data.data.status)
                } else {
                    setLoadingOldData(false)
                    console.log("Failed to fetched data", res)
                }
            })
            .catch((err) => {
                setLoadingOldData(false)
                console.log("Exception while fetching old data", err)
            })
    }



    function afterOpenModal() { getCourseDataById() }

    function closeModal() {
        setIsOpen(false);
        setCategoryNameInput()
        setSelectedRadio()
    }




    const formSubmit = () => {
        setErrorMsg()
        console.log("Form submit", categoryNameInput, selectedRadio, btnId)


        if (categoryNameInput == undefined || categoryNameInput == "" || selectedRadio == undefined) {
            return setErrorMsg("Please enter correct value.")
        }
        setIsLoading(true)
        axios.post(api_updateCourseCategory, { 'id': btnId, 'status': selectedRadio, 'category': categoryNameInput }, bearerHeader)
            .then((res) => {
                if (res.data.status) {
                    setIsLoading(false)
                    console.log("Data update Successfully.", res)
                    closeModal()
                    props.refetchList()
                } else {
                    setIsLoading(false)
                    setErrorMsg("Failed update.")
                    console.log("Failed update data", res)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                setErrorMsg("Something Went Wrong.")
                console.log("Exception while updating data", err)
            })

    }

    return (
        <div className="z-50 relative">

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className=''>
                    <div className="bg-white rounded-lg shadow-xl border-2 border-gray-50 md:p-2 p-5">
                        <div className='float-right'>
                            <div onClick={closeModal} className='hover:bg-gray-100 rounded-full w-5 cursor-pointer mr-3'>  <CgClose size={20} /></div>
                        </div>

                        {loadingOldData ?
                            <div className="flex justify-center">
                                <ThreeDots
                                    height="80"
                                    width="80"
                                    radius="9"
                                    color="#4fa94d"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            </div> :
                            <form action="">
                                <div className="space-y-7 m-5">

                                    <div>
                                        <label className="text-sm" htmlFor="catName">Category Name <span className="text-red-700">*</span></label>
                                        <div>
                                            <input value={categoryNameInput} onChange={(e) => setCategoryNameInput(e.target.value)} type="text" name="catName" id="" className="border border-gray-400 rounded" />
                                        </div>
                                        <p className="py-2"></p>
                                        <label className="text-sm" htmlFor="catStatus">Status <span className="text-red-700">*</span></label>
                                        <div>
                                            <input type="radio" checked={selectedRadio == 1} onChange={(e) => setSelectedRadio(e.target.value)} value="1" name="catStatus" id="" /> Active
                                            <input type="radio" checked={selectedRadio == 0} onChange={(e) => setSelectedRadio(e.target.value)} value="0" name="catStatus" id="" /> Deactivate
                                        </div>
                                        <div className="flex justify-center">
                                            {errorMsg && <p className="text-red-600 absolute text-sm">{errorMsg}</p>}
                                        </div>
                                    </div>
                                    {isLoading ?
                                        <div className="flex justify-center">
                                            <ThreeDots
                                                height="80"
                                                width="80"
                                                radius="9"
                                                color="#4fa94d"
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                wrapperClassName=""
                                                visible={true}
                                            />
                                        </div>
                                        :
                                        <div className="flex justify-center">
                                            <button onClick={() => formSubmit()} type="button" className="border px-5 py-1 bg-indigo-700 hover:bg-indigo-600 rounded shadow text-white">Update</button>
                                        </div>
                                    }
                                </div>

                            </form>
                        }

                    </div>
                </div>


            </Modal>
        </div>
    );
}

// ReactDOM.render(<App />, appElement);

export default EditCategoryModal;
