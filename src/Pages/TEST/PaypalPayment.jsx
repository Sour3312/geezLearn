import axios from 'axios';
import React, { useState } from 'react'
import ApiList from '../../Components/Api/ApiList';

const PaypalPayment = () => {
    const [trnNo, setTrnNo] = useState()

    const { baseUrl } = ApiList();
    console.log("baseUrl", baseUrl)

    const createPayment = async () => {
        try {
            const response = await axios.post(`${baseUrl}/pay/paypal/create-payment`);
            const { data } = response;
            window.location.href = data.links[1].href; // Redirect the user to PayPal payment approval URL
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };
    const chapaPayment = async () => {

        axios.post(`${baseUrl}/pay/chapa/pay`)
            .then((res) => {
                console.log("CHAPA Api respinse", res)
                if (res?.data?.data?.status == "success") {
                    console.log("success", res?.data?.data?.data?.checkout_url)
                    window.location.href = res?.data?.data?.data?.checkout_url
                }
            })
            .catch((err) => {
                console.log("Error while Chapa payment")
            })
    };
    const verifyChapa = async () => {

        axios.post(`${baseUrl}/pay/chapa/verify-payment/`, { id: trnNo })
            .then((res) => {
                console.log("CHAPA Verify respinse", res)
                if (res?.data?.data?.status == "success") {
                    console.log("success", res?.data?.data?.data?.checkout_url)
                    // window.location.href = res?.data?.data?.data?.checkout_url
                }
            })
            .catch((err) => {
                console.log("Error while Chapa payment")
            })
    };
    // tx-1686684205299
    return (

        <>

            <div className='space-y-5 m-5'>
                <button className='border bg-green-500 px-5 py-3 font-semibold' onClick={createPayment}>Pay with PayPal</button>
                <button className='border bg-green-500 px-5 py-3 font-semibold' onClick={chapaPayment}>Pay with Chapa</button>

                <div>
                    <input type="text" className='border' onChange={(e) => setTrnNo(e.target.value)} />
                    <button onClick={verifyChapa}>Chapa Verify</button>
                </div>

            </div>

        </>
    )
}

export default PaypalPayment