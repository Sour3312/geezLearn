import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
import { HiCurrencyRupee } from "react-icons/hi";
import { FiUpload } from 'react-icons/fi';
import { GrClose } from "react-icons/gr";


// const customStyles = {
//     content: {
//         top: "50%",
//         left: "50%",
//         right: "auto",
//         bottom: "auto",
//         marginRight: "-50%",
//         transform: "translate(-50%, -50%)",
//         background: "transparent",
//         border: "none",
//     },
// };

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

function ViewCenter(props) {
    // Modal.setAppElement('#yourAppElement');
    const [modalIsOpen, setIsOpen] = React.useState(false);



    useEffect(() => {
        if (props.openViewModal > 0) setIsOpen(true);
    }, [props.openViewModal]);

    function afterOpenModal() { }

    function closeModal() {
        setIsOpen(false);
        props.refetchListOfRoles();
    }


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
                            <h1 className='mb-3 text-2xl text-center font-semibold'>Center Details</h1>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <p>Button Id - {props.viewBtnId}</p>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>
                                    <div>Lorem ipsum dolor sit amet.</div>
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

export default ViewCenter;
