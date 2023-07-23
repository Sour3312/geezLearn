import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
import { HiCurrencyRupee } from "react-icons/hi";
import { FiUpload } from 'react-icons/fi';
import { GrClose } from "react-icons/gr";
import axios from "axios";
import ApiList from "../../Components/Api/ApiList";
import NewLoginComponent from "./NewLoginComponent";


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

function LoginModal(props) {

    Modal.setAppElement('#root');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    // const actionModal = () => {
    //     if (props.openLoginModal > 0) {
    //         if (!loginModalDialog.open) {
    //             loginModalDialog.showModal()
    //         }
    //     }
    //     if (props.openLoginModal === -1) {
    //         if (loginModalDialog.open) {
    //             loginModalDialog.close()
    //         }
    //     };
    // }

    // useEffect(() => {
    //     actionModal()
    // }, [props.openLoginModal]);

    useEffect(() => {
        if (props.openLoginModal > 0) setIsOpen(true);
        if (props.openLoginModal === -1) setIsOpen(false);
    }, [props.openLoginModal]);

    function afterOpenModal() { }

    function closeModal() {
        setIsOpen(false);
        // props.refetchListOfRoles();
    }



    return (
        <div className="relative" style={{zIndex:1000}}>
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

                        <NewLoginComponent closeModal={closeModal} openPage={props?.openPage} />

                    </div>
                </div>

            </Modal>
        </div>
        // <dialog id="loginModalDialog" className="relative" style={{zIndex:1000}}>


        //     <div className=''>
        //         <div className="bg-white rounded-lg shadow-xl border-2 border-gray-50 md:p-2 p-5">
        //             <div className='float-right'>
        //                 <div onClick={closeModal} className='hover:bg-gray-100 rounded-full w-5 cursor-pointer mr-3'>  <CgClose size={20} /></div>
        //             </div>
        //             <NewLoginComponent closeModal={closeModal} openPage={props?.openPage} />
        //         </div>
        //     </div>
        // </dialog>
    );
}

// ReactDOM.render(<App />, appElement);

export default LoginModal;


/*
Exported to -
HeaderIndex2.js
*/