import React, { useState } from 'react';
import Modal from 'react-modal';
import { FiAlertCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { Navigate } from 'react-router-dom';
import LoginModal from '../../Pages/Login/LoginModal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none'
  },
};

// Modal.setAppElement('#HeaderIcons');

function HeaderIcons(props) {
  const [openLoginModal, setOpenLoginModal] = useState(0)
  const [openPage, setOpenPage] = useState()

  const navigate = useNavigate();




  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const logOutUser = () => {
    closeModal()
    // localStorage.removeItem('token')
    // localStorage.removeItem('UserType')
    navigate('/logout')
  }

  const handleLoginModal = (page) => {
    setOpenLoginModal(prev => prev + 1)
    setOpenPage(page)
  }



  return (
    <>
      <LoginModal openLoginModal={openLoginModal} openPage={openPage} />
      <div className='flex space-x-2 md:space-x-5 float-right'>
        <div onClick={() => handleLoginModal("login")} className='bg-gray-100 hover:bg-gray-200 p-1 md:p-2 cursor-pointer rounded-lg'><CgProfile size={20} /></div>
        <div className='bg-gray-100 hover:bg-gray-200 p-1 md:p-2 cursor-pointer rounded-lg'><RiLockPasswordLine size={20} /></div>
        <div onClick={() => openModal()} className='bg-gray-100 hover:bg-gray-200 p-1 md:p-2 cursor-pointer rounded-lg'><FiLogOut size={20} /></div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <div className="relative bg-white rounded-lg shadow-xl border-2 border-gray-50">
          <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
            <svg className="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
          <div className="p-6 text-center">
            <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to logout ?</h3>
            <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={logOutUser}>
              Yes, I'm sure
            </button>

          </div>
        </div>

      </Modal>
    </>
  );
}

export default HeaderIcons