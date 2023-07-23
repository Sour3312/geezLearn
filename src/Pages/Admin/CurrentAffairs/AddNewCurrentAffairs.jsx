import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { FiAlertCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CgClose } from 'react-icons/cg';
import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
// import ApiList from '../../Components/Api/ApiList';
import { useState } from 'react';
import ApiList from '../../../Components/Api/ApiList';



const customStyles = {
    overlay: {
        background: "rgba(0, 0, 0, 0.5)",
        overflowY: "scroll"
    },
    content: {
        top: '60%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        border: 'none',
        height: "600px" //or maxHeight 
    },
};

function AddNewCurrentAffairs(props) {

    const { api_AddNewCurrentAffairs, bearerHeader } = ApiList()

    const [imageFileValue, setImageFileValue] = useState()
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    useEffect(() => {
        if (props.openAddPopUP > 0)
            setIsOpen(true);
    }, [props.openAddPopUP])


    function afterOpenModal() {
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        props.refetchList();
    }

    //Fromik Start From Here

    const validationSchema = yup.object({
        // heading: yup.string().required('Enter Center Code'),
        // description: yup.string().required('Require'),
        // featureImage: yup.string().required('Require'),
        // CenterPhone: yup.string().required('Require'),


    })

    const saveData = (data, e) => {

        // console.log("DATA", data)

        // data.preventDefault();

        let formData = new FormData();

        formData.append('heading', data.heading);
        formData.append('description', data.description,);
        formData.append('featureImage', imageFileValue);
        formData.append('tags', data.tags.replace(/[ ,]+/g, ","));

        const payload = {
            "heading": data.heading,
            "description": data.description,
            "featureImage": imageFileValue,
            "tags": data.tags.replace(/[ ,]+/g, ","),
        }

        console.log("=========formData", formData)

        axios.post(api_AddNewCurrentAffairs, formData, bearerHeader)
            .then((res) => {
                console.log("Current Affairs Added Successfully", res)
                closeModal()
            })
            .catch((err) => console.log("Exception while adding Current Affairs", err), closeModal())

    }


    const handleOnChange = (event) => { };

    const formik = useFormik({
        initialValues: {
            heading: '',
            description: '',
            featureImage: '',
            tags: '',
        },
        onSubmit: (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            saveData(values)
        }, validationSchema,
    });


    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='overflow-auto'>
                    <div className=" bg-white rounded-lg shadow-xl border-2 border-gray-50 md:p-2 p-5">
                        <div className='float-right'>
                            <div onClick={closeModal} className='hover:bg-gray-100 rounded-full w-5 cursor-pointer mr-3'>  <CgClose size={20} /></div>
                        </div>
                        <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>

                            <div className=''>
                                <div className=" lg:col-span-3 lg:p-6">
                                    <h1 className='mb-3 text-2xl text-center font-semibold'>Add New Currents Affairs</h1>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                                            <div className='relative'>
                                                <label>Heading</label>
                                                <input
                                                    onChange={formik.handleChange}
                                                    className="w-full rounded-md border-gray-500 p-1.5 text-base border shadow-sm outline-blue-300 outline-1"
                                                    placeholder="Current Affairs Title"
                                                    type="text"
                                                    name="heading"
                                                />
                                                <p className='text-red-500 text-xs absolute'>{formik.touched.heading && formik.errors.heading ? formik.errors.heading : null}</p>

                                            </div>
                                            <div>
                                                <label>Description</label>
                                                <textarea
                                                    onChange={formik.handleChange}
                                                    name="description"
                                                    className="w-full rounded-md border-gray-500 p-1.5 text-base border shadow-sm outline-blue-300 outline-1"
                                                    placeholder="Center Name"
                                                    type="text"
                                                />
                                                <p className='text-red-500 text-xs absolute'>{formik.touched.description && formik.errors.description ? formik.errors.description : null}</p>
                                            </div>

                                            <div>
                                                <p>File upload</p>
                                                <input
                                                    onChange={(e) => setImageFileValue(e.target.files[0])}
                                                    className="form-control"
                                                    name="docPath"
                                                    type="file"
                                                />

                                                {/* <Thumb file={values.file} /> */}
                                            </div>
                                            {/* <div>
                                                <label>Feature Image</label>
                                                <input
                                                    onChange={formik.handleChange}
                                                    name="featureImage"
                                                    className="w-full rounded-md border-gray-500 p-1.5 text-base border shadow-sm outline-blue-300 outline-1"
                                                    type="file"
                                                />
                                                <p className='text-red-500 text-xs absolute'>{formik.touched.featureImage && formik.errors.featureImage ? formik.errors.featureImage : null}</p>
                                            </div> */}
                                            <div>
                                                <label for="tags">tags</label>
                                                <input
                                                    onChange={formik.handleChange}
                                                    name="tags"
                                                    className="w-full rounded-md border-gray-500 p-1.5 text-base border shadow-sm outline-blue-300 outline-1"
                                                    placeholder="tags"
                                                    type="text"
                                                />
                                                <p className='text-red-500 text-xs absolute'>{formik.touched.tags && formik.errors.tags ? formik.errors.tags : null}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 md:space-x-3 space-y-2 ">
                                        <button type="submit"
                                            className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-white sm:w-auto">
                                            <span className="font-medium"> Save Data </span>
                                        </button>
                                        <button onClick={closeModal} className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-white sm:w-auto"><span className="font-medium">Cancel</span></button>
                                    </div>
                                </div>

                            </div>


                        </form>
                        {/* <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
                        <svg className="w-5 h-5" fill="currentColor" ><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div className="p-6 text-center">
                        <div className='w-full flex h-10'> <span className='mx-auto'><FiAlertCircle size={30} /></span></div>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to logout ?</h3>
                        <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={logOutUser}>
                            Yes, I'm sure
                        </button>

                    </div> */}
                    </div>
                </div>

            </Modal>
        </>
    );
}

export default AddNewCurrentAffairs