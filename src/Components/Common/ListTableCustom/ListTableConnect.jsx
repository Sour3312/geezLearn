import React, { useEffect, useState } from 'react'
import ListTable2 from './ListTable2v2'
import { CSVDownload } from 'react-csv'
import ListTableMargin from './ListTableMargin'
import AxiosInterceptors from '../../Api/AxiosInterceptors'
import ApiHeader from '../../Api/ApiHeader'

const ListTableConnect = (props) => {


    // ============List Table=========

    const [perPageCount, setperPageCount] = useState(10)
    const [pageCount, setpageCount] = useState(1)
    const [currentPage, setcurrentPage] = useState(0)
    const [lastPage, setlastPage] = useState(0)
    const [totalCount, settotalCount] = useState(0)
    const [exportData, setexportData] = useState()
    const [csvStatus, setcsvStatus] = useState(false)
    const [errorState, seterrorState] = useState(false)

    const [dataList, setdataList] = useState()
    const [loader, setloader] = useState(false)

    const searchOldFun = () => {

        seterrorState(false)

        setloader(true)

        console.log(`data before hitting api (${props?.api}) => `, { ...props?.requestBody, perPage: perPageCount, page: pageCount })

        AxiosInterceptors.post(
            props?.api, { ...props?.requestBody, perPage: perPageCount, page: pageCount }, ApiHeader())
            .then((res) => {
                if (res?.data?.status == true) {
                    console.log('search success => ', res)
                    props?.getData && props?.allData(res?.data?.data)
                    setdataList(res?.data?.data?.data)
                    settotalCount(res?.data?.data?.total)
                    setcurrentPage(res?.data?.data?.current_page)
                    setlastPage(res?.data?.data?.last_page)
                } else {
                    console.log('error while search => ', res)
                    seterrorState(true)
                }

                setloader(false)
            })
            .catch((err) => (console.log('error while search => ', err), setloader(false), seterrorState(true)))

    }

    useEffect(() => {

        if (props?.requestBody != null) {
            setpageCount(1)
            setperPageCount(10)
            searchOldFun()
        }
    }, [props?.changeData])

    const nextPageFun = () => {
        setpageCount(currentPage + 1)
    }

    const prevPageFun = () => {
        setpageCount(currentPage - 1)
    }

    const perPageFun = (val) => {

        let checkPage = parseInt(totalCount / val)
        let checkPageRemainder = parseInt(totalCount % val)

        // console.log("total count => ", totalCount,
        // "\n Per page => ", val,
        // "\n checkPage => ", checkPage,
        // "\n check page remainder => ", checkPageRemainder)

        if (checkPageRemainder == 0) {
            checkPage < currentPage && setpageCount(checkPage)
            setperPageCount(val)
            return
        }

        if (checkPageRemainder != 0) {
            (checkPage + 1) < currentPage && setpageCount(checkPage + 1)
            setperPageCount(val)
            return
        }

        // setperPageCount(val)
    }

    useEffect(() => {
        setloader(true)
        searchOldFun()
    }, [pageCount, perPageCount])

    const firstPageFun = () => {
        setpageCount(1)
    }

    const lastPageFun = () => {
        setpageCount(lastPage)
    }

    const gotoPageFun = (val) => {
        setpageCount(val)
    }

    const exportDataFun = () => {

        setloader(true)
        setcsvStatus(false)

        AxiosInterceptors.post(
            props?.api, { ...props?.requestBody, perPage: totalCount }, ApiHeader())
            .then((res) => {
                if (res?.data?.status == true) {
                    setexportData(res?.data?.data?.data)
                    downloadFun()
                } else {
                }

                setloader(false)
            })
            .catch((err) => {
                setloader(false)
            })

    }

    const downloadFun = () => {
        setcsvStatus(true)
    }

    return (
        <>

            {errorState &&
                <div className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center" role="alert">
                    <strong className="font-bold">Sorry! </strong>
                    <span className="block sm:inline">Some error occured while fetching list. Please try again later.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    </span>
                </div>
            }

            {
                csvStatus && <CSVDownload data={exportData} />
            }

            {
                loader && <div>loading....</div>
            }

            {
                (dataList != undefined && dataList?.length != 0) ?

                    <>
                        {props?.margin ?

                            <ListTableMargin currentPage={currentPage} lastPage={lastPage} goFirst={firstPageFun} goLast={lastPageFun} count1={totalCount} columns={props?.columns} dataList={dataList} exportStatus={true} perPage={perPageCount} perPageC={perPageFun} totalCount={totalCount} nextPage={nextPageFun} prevPage={prevPageFun} exportDataF={exportDataFun} exportData={exportData} />

                            :
                            <ListTable2 currentPage={currentPage} lastPage={lastPage} goFirst={firstPageFun} goLast={lastPageFun} count1={totalCount} columns={props?.columns} dataList={dataList} exportStatus={true} perPage={perPageCount} perPageC={perPageFun} totalCount={totalCount} nextPage={nextPageFun} prevPage={prevPageFun} exportDataF={exportDataFun} exportData={exportData} gotoPage={(val) => gotoPageFun(val)} />

                        }
                    </>

                    :

                    <>{(!loader && !errorState) && 
                    <div className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-3 rounded relative text-center" role="alert">
                        <span className="block sm:inline">Oops! No data available.</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        </span>
                    </div>}</>

            }

        </>
    )
}

export default ListTableConnect