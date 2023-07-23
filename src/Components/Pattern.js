import ApiHeader from "./Api/ApiHeader"
import { RotatingLines } from "react-loader-spinner";
import AxiosInterceptors from "./Api/AxiosInterceptors";


//1 approve FUNCTION TO DELETE ITEM FROM LIST
const approve = (approveId) => {
    setisLoading(true)
    let requestBody = {
        id: approveId
    }

    AxiosInterceptors.post('', requestBody, ApiHeader())
        .then(function (response) {
            console.log('delete response..', response?.data)
            if (response?.data?.status) {
                fetchMasterList()
            } else {
                activateBottomErrorCard(true, 'Error occured in deletion.')
            }
        })
        .catch(function (error) {
            activateBottomErrorCard(true, 'Error occured in deletion.')
        }).finally(() => {
            setisLoading(false)
        })
}
//2 delete FUNCTION TO DELETE ITEM FROM LIST
const deleteItem = (deleteId) => {
    setisLoading(true)

    let requestBody = {
        id: deleteId
    }

    AxiosInterceptors.post('', requestBody, ApiHeader())
        .then(function (response) {
            console.log('delete response..', response?.data?.data)
            if (response?.data?.status) {
                fetchMasterList()
            } else {
                activateBottomErrorCard(true, 'Error occured in deletion.')
            }
        })
        .catch(function (error) {
            activateBottomErrorCard(true, 'Error occured in deletion.')
        }).finally(() => {
            setisLoading(false)
        })
}


//3 Fetch list FUNCTION TO FETCH LIST DATA
const fetchMasterList = () => {
    setisLoading(true)
    AxiosInterceptors.post('', {}, ApiHeader())
        .then(function (response) {
            console.log('student list...', response)
            if (response?.data?.status === true) {
                setdataList(response?.data?.data)
            } else {
                activateBottomErrorCard(true, 'Error occured while fetching data.')
            }
        })
        .catch(function (error) {
            console.log('==2 error list...', error)
            activateBottomErrorCard(true, 'Error occured while fetching data.')
        }).finally(() => {
            setisLoading(false)
        })
}

//4 by id FUNCTION TO FECTH DATA TO EDIT
const fetchDataById = (passedId) => {
    setisLoading(true)
    let requestBody = {
        id: passedId
    }
    AxiosInterceptors.post('', requestBody, ApiHeader())
        .then(function (response) {
            console.log('fetch view data response..', response?.data?.data)
            if (response?.data?.status) {
                setdataToView(response?.data?.data)
            } else {
                activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
            }
        })
        .catch(function (error) {
            activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
        }).finally(() => {
            setisLoading(false)
        })
}

//5 post form
const postForm = (data) => {
    setisLoading(true)
    let requestBody = {
        email: data?.email,
        password: data?.password
    }

    console.log('before login...', requestBody)
    AxiosInterceptors.post('', requestBody, ApiHeader())
        .then((response) => {
            console.log("--2-- After Login data", response)
            if (response?.data?.status) {
                console.log('success')
            } else {
                activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
            }
        })
        .catch((err) => {
            activateBottomErrorCard(true, 'Error occured in submitting deactivation application. Please try again later.')
        }).finally(() => {
            setisLoading(false)
        })

}

const [isLoading, setisLoading] = useState(false);
const [erroState, seterroState] = useState(false);
const [erroMessage, seterroMessage] = useState(null);

useEffect(() => {
    fetchMasterList()
}, [])


// FUNCTION FOR CUSTOM ERROR MESSAGE CARD
const activateBottomErrorCard = (state, msg) => {
    seterroMessage(msg)
    seterroState(state)
}

{ erroState && <BottomErrorCard activateBottomErrorCard={activateBottomErrorCard} errorTitle={erroMessage} /> }
{ isLoading && <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="25" visible={true} /> }