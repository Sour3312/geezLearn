import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { GrFormClose } from "react-icons/gr";
import { HiCurrencyRupee } from "react-icons/hi";
import { FiUpload } from 'react-icons/fi';


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
        height: "600px" //or maxHeight 
    },
};

function EditCenter(props) {
    // Modal.setAppElement('#yourAppElement');
    const [modalIsOpen, setIsOpen] = React.useState(false);



    useEffect(() => {
        if (props.openEditModal > 0) setIsOpen(true);
    }, [props.openEditModal]);

    function afterOpenModal() { }

    function closeModal() {
        setIsOpen(false);
        props.refetchListOfRoles();
    }

    const saveFileSelected = (e) => {
        console.log("Updated", e.target.files[0]);
        // setFileSelected(e.target.files[0]);
    };

    const docList = [
        { 'docid': 1, 'docName': 'Permanent Address Proof', 'docUrl': '/dd', 'docStatus': 'Not Uploaded' },
        { 'docid': 2, 'docName': 'Local Address Proof', 'docUrl': '/dd', 'docStatus': 'Uploaded' },
        // { 'docid': 3, 'docName': 'Specially Abled Proof', 'docUrl': '/dd', 'docStatus': 'Uploaded' },
        // { 'docid': 4, 'docName': 'Armed Force Document', 'docUrl': '/dd', 'docStatus': 'Not Uploaded' },
    ]

    return (
        <div className="">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="bg-white shadow-2xl border border-sky-200 p-5 m-2 rounded-md">
                    <div className="md:inline-block min-w-full overflow-hidden hidden">
                        Action Button Id : {props?.editBtnId}
                        <table className="min-w-full leading-normal border">
                            <thead className='bg-sky-100'>
                                <tr className='font-semibold '>
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        #
                                    </th>
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        Document Name
                                    </th>
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        Document Type
                                    </th>
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        View
                                    </th>
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800 text-center text-sm uppercase">
                                        Status
                                    </th>
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        Upload
                                    </th>
                                    <th scope="col" className="px-5 py-2 border-b border-gray-200 text-gray-800  text-left text-sm uppercase">
                                        Submit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    docList.map((e, i = 1) => (
                                        <tr key={i}>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {i + 1}
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {e.docName}
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    <select className=' outline-blue-600 border border-gray-400'>
                                                        <option>Select Documet</option>
                                                        <option value="B">Aadhar</option>
                                                        <option value="C">PAN</option>
                                                        <option value="C">Rasan Card</option>
                                                        <option value="C">Kishan Credit Card</option>
                                                    </select>
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm" > {/*onClick={() => props.openModal('http://192.168.0.16:822/RMCDMC/public/assets/img/pdf_logo.png')}*/}
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <a href="#" className="block relative">
                                                            <img alt="profil" src="http://192.168.0.16:822/RMCDMC/public/assets/img/pdf_logo.png" className="mx-auto object-cover rounded-none h-10 w-10 " />
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-center text-black font-medium">
                                                    {e.docStatus == "Not Uploaded" && <p className='bg-red-400 rounded-xl px-2 py-0.5'>{e.docStatus}</p>}
                                                    {e.docStatus == "Uploaded" && <p className='bg-green-400 rounded-xl py-0.5'>{e.docStatus}</p>}
                                                </p>
                                            </td>

                                            <td className="px-5 border-b border-gray-200 bg-white text-sm">
                                                <span className="relative inline-block ">
                                                    <span aria-hidden="true" className="absolute inset-0 "></span>
                                                    <span className="relative ">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                            id="contained-button-file"
                                                            onInput={saveFileSelected}
                                                        // onChange={() => importFile(e.docName)}
                                                        />
                                                        <label className='bg-blue-500 hover:bg-blue-600 hover:ring-1 hover:ring-blue-800 rounded-sm hover:rounded-md hover:shadow-2xl shadow-lg cursor-pointer flex pl-4 pr-5 py-2  text-white font-semibold' htmlFor="contained-button-file"><FiUpload size={16} className='mt-0 ml-0 mr-2 font-semibold' />Upload</label>
                                                    </span>
                                                </span>
                                            </td>
                                            <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                                <button className="border px-4 py-2">Submit</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                        <div className='my-5 flex justify-center'>
                            <div className='mx-2'><button onClick={closeModal} className='bg-red-400 hover:bg-red-500 px-5 py-2 shadow-xl rounded-md text-black text-base'>Cancel</button></div>
                            <div className='mx-2'><button className='bg-green-400 hover:bg-green-500 px-5 py-2 shadow-xl rounded-md text-black text-base float-right'>Submit</button></div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

// ReactDOM.render(<App />, appElement);

export default EditCenter;
