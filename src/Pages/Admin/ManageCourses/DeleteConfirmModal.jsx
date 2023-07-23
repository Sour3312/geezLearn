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

function DeleteConfirmModal(props) {
    const [categoryNameInput, setCategoryNameInput] = useState()
    const [selectedRadio, setSelectedRadio] = useState()
    const [errorMsg, setErrorMsg] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [oldData, setOldData] = useState()

    const [loadingOldData, setLoadingOldData] = useState(false)

    const { api_deleteCourse, api_getCourseCategoryById, bearerHeader } = ApiList()

    Modal.setAppElement('#root');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const btnId = props.deleteBtnID;

    useEffect(() => {
        if (props.openDeleteModal > 0) setIsOpen(true);
    }, [props.openDeleteModal]);


    function afterOpenModal() { }

    function closeModal() {
        setIsOpen(false);
    }

    const handleDelete = () => {
        console.log("dekte", btnId)

        axios.post(api_deleteCourse, {id:btnId}, bearerHeader)
        .then((res)=>{
            console.log("Course deleted", res)
            closeModal()
            props.refetch()
        })
        .catch((err)=>{
            console.log("Failed to delete course", err)
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
                        <div>
                            <p className="w-full">Do You Want to Delete ?</p>
                            <div className="flex space-x-5">
                                <button onClick={handleDelete} type="button" className="px-5 py-1 bg-red-500 rounded text-white">Yes</button>
                                <button onClick={closeModal} type="button" className="px-5 py-1 bg-indigo-500 rounded text-white">No</button>
                            </div>
                        </div>

                    </div>
                </div>


            </Modal>
        </div>
    );
}

// ReactDOM.render(<App />, appElement);

export default DeleteConfirmModal;
