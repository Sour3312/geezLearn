import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import ApiList from '../../Components/Api/ApiList';
import { globalContextData } from '../../Components/Common/Context/GlobalContextFile';

function Logout() {
    const { logOutApi, bearerHeader } = ApiList();
    const { notify } = useContext(globalContextData)

    const navigate = useNavigate()

    console.log("--1 ---Logout.js is Called");



    // localStorage.removeItem('token');
    navigate('/')
    localStorage.clear()

    useEffect(() => {
        axios.post(logOutApi, {}, bearerHeader)  // Must be logged in for Logout From server
            .then((res) => {
                if (res.data.status) {
                    console.log("---2 --- AXIOS Logout", res)
                    localStorage.removeItem('token');
                    localStorage.removeItem('UserType');
                    localStorage.removeItem('LoginStatus');
                    navigate('/')
                    notify("Logout Successfully", "success")
                }
            })
            .catch((err) => {
                console.log("--- 2 ---AXIOS Error in Logout", err)
                localStorage.removeItem('token');
                localStorage.removeItem('UserType');
                localStorage.removeItem('LoginStatus');
                navigate('/')
                // notify("Logout Successfully","success")
            })

    }, [])

    return <Navigate to='/' />
    return;


}

export default Logout