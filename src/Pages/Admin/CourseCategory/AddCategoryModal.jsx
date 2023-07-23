import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
import { HiCurrencyRupee } from "react-icons/hi";
import { FiUpload } from 'react-icons/fi';
import { GrClose } from "react-icons/gr";
import axios from "axios";
import ApiList from "../../../Components/Api/ApiList";
import { RotatingLines } from "react-loader-spinner";



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

function AddCategoryModal(props) {
    const [errorMsg, setErrorMsg] = useState(false)

    const { api_getAddNewCourseCategory, bearerHeader } = ApiList()

    Modal.setAppElement('#root');
    const [modalIsOpen, setIsOpen] = React.useState(false);



    useEffect(() => {
        if (props.openAddModal > 0) setIsOpen(true);
        if (props.openAddModal <= 0) setIsOpen(false);
    }, [props.openAddModal]);

    function afterOpenModal() { }

    function closeModal() {
        props?.setCategoryNameInput('')
        setIsOpen(false);
        // props.refetchList();
    }

    const formSubmit = () => {
        setErrorMsg()
        console.log("Form submit", categoryNameInput.length)

        if (categoryNameInput.length.toString() < 3) {
            return setErrorMsg("Please enter correct value.")
        }

        axios.post(api_getAddNewCourseCategory, { 'category': categoryNameInput }, bearerHeader)
            .then((res) => {
                if (res.data.status) {
                    console.log("Data Saved.", res)
                    props.refetchList()
                    closeModal()
                } else {
                    setErrorMsg("Failed to add data.")
                    console.log("Failed to save dat", res)
                }
            })
            .catch((err) => {
                setErrorMsg("Something Went Wrong.")
                console.log("Exception while data saving", err)
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

                        <form action="">
                            <div className="space-y-7 m-5">

                                <div>
                                    <label className="form-label inline-block mb-1 text-gray-600 text-sm font-semibold" htmlFor="catName">Category Name <span className="text-red-700">*</span></label>
                                    <div>
                                        <input value={props?.categoryNameInput} required onChange={(e) => {
                                            setErrorMsg('')
                                            props?.setCategoryNameInput(e.target.value)
                                        }} type="text" name="catName" id="" className="form-control block w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md    " />
                                        <span className="text-red-600 absolute text-xs">{ }</span>
                                    </div>
                                    <div className="flex justify-center">
                                        {errorMsg && <p className="text-red-600 absolute text-sm">{errorMsg}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    {props?.isLoadingAddUpdateCategory ?
                                        <button type="button" className="w-full border px-5 py-1 bg-black hover:bg-black rounded shadow text-white flex justify-center items-center"> <RotatingLines
                                            strokeColor="white"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="25"
                                            visible={true}
                                        /></button> :
                                        <button onClick={() => {
                                            if (props?.categoryNameInput?.length.toString() < 3) {
                                                return setErrorMsg("Plsease enter proper category")
                                            }
                                            props?.postCategory()
                                        }} type="button" className="w-full border px-5 py-1 bg-black hover:bg-black rounded shadow text-white">Add Category</button>
                                    }

                                </div>
                            </div>

                        </form>

                    </div>
                </div>

            </Modal>
        </div>
    );
}

// ReactDOM.render(<App />, appElement);

export default AddCategoryModal;
