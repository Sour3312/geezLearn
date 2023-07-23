import { useEffect } from "react"
import { useState } from "react"
import { getLocalStorageItem, getLocalStorageItemJsonParsed } from "../Common/localstorage"

export default function AuthIndex() {

    const [login, setLogin] = useState()

    let token = getLocalStorageItem("token")
    let userType = getLocalStorageItemJsonParsed("UserType")
    let loginStatus = getLocalStorageItemJsonParsed("LoginStatus")

    let user;

    // If userType == Student the user = 1
    // If userType == Admin the user = 9

    if (userType === 1) {
        user = 1;
    } else if (userType === 2) {
        user = 2;
    }
    else if (userType === 9) {
        user = 9;
    } else {
        user = 0;
    }

    console.log('=====userType', typeof (userType))
    console.log('=====token', token)
    console.log('=====loginStatus', typeof (loginStatus))

    if (loginStatus === true) {

        let AuthIndex1 = { isLogedIn: true, userIs: user, bearerHeader: token }
        return AuthIndex1;
    } else {
        let AuthIndex1 = { isLogedIn: false, userIs: false, bearerHeader: false }
        return AuthIndex1;
    }

}