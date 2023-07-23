import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
import { HiCurrencyRupee } from "react-icons/hi";
import { FiUpload } from 'react-icons/fi';
import { GrClose } from "react-icons/gr";
import ApiList from "../../../Components/Api/ApiList";
import axios from "axios";


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

function ViewCurrentAffairs(props) {
    const [data, setData] = useState()

    const { api_getCurrentAffairsById, bearerHeader } = ApiList()

    Modal.setAppElement('#root');
    const [modalIsOpen, setIsOpen] = React.useState(false);



    useEffect(() => {
        if (props.openViewModal > 0) setIsOpen(true);
    }, [props.openViewModal]);

    function afterOpenModal() { }

    function closeModal() {
        setIsOpen(false);
        props.refetchListOfRoles();
    }

    useEffect(() => {

        axios.post(api_getCurrentAffairsById, {'id':props.viewBtnId}, bearerHeader)
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => console.log("Exception Error Current Addiar", err))

    }, [props.viewBtnId])



    return (
        <div className="">
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
                        <div className=" lg:col-span-3 lg:p-6">
                            <h1 className='mb-3 text-2xl text-center font-semibold'>View Detailed Current Affairs</h1>
                            <div className="space-y-4">
                                <div className="">
                                    <p>Button Id - {props?.viewBtnId}</p>
                                    <p>Heading : {data?.heading}</p>
                                    <p>description : {data?.description} </p>
                                    <p>feature_image : {data?.feature_image} </p>
                                    <p>relative_path : {data?.relative_path} </p>
                                    <p>tags : {data?.tags} </p>
                                    <p>created_at : {data?.created_at} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    );
}

// ReactDOM.render(<App />, appElement);

export default ViewCurrentAffairs;
