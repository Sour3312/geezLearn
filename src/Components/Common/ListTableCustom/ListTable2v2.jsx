//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - ListTable
//    DESCRIPTION - ListTable Component
//////////////////////////////////////////////////////////////////////////////////////
import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { CSVLink } from "react-csv";
import GlobalFilter from './GlobalFilter'
import { BsExclamationCircleFill } from 'react-icons/bs'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'


function ListTable2(props) {

    console.log('enter in normal table')

    const [bounce, setbounce] = useState('hidden')
    const columns = useMemo(() => props.columns, [])
    const data = useMemo(() => props.dataList, [props.dataList, props?.totalCount])
    const [pageInd, setpageInd] = useState(1)
    const [canNext, setcanNext] = useState(true)
    const [canPrev, setcanPrev] = useState(true)
    const [perPageC, setperPageC] = useState(10)
    const [pageNo, setpageNo] = useState(0)

    useEffect(() => {
        setpageInd(1)
        setpageNo(0)
    }, [props?.totalCount])

    useEffect(() => {
        setcanNext(true)
        setcanPrev(true)

        let rs = props?.totalCount / props?.perPage
        let rm = props?.totalCount % props?.perPage

        if (rm != 0) {
            setPageSize((parseInt(rs)) + 1)
        }
        else {
            setPageSize(parseInt(rs))
        }

        if (pageSize == pageInd) {
            setcanNext(false)
        }
        if (pageSize == pageInd || pageInd == 1) {
            setcanPrev(false)
        }
    }, [props?.totalCount, perPageC])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows,//since used pagination
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        rows,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex, pageSize } = state

    const goToPageFun = () => {
        if (parseInt(pageNo) > 0 && parseInt(pageNo) <= parseInt(props?.lastPage)) {
            props?.gotoPage(parseInt(pageNo))
        } else {
            return false
        }
    }

    const nextPageFun = () => {

        if (props?.lastPage != props?.currentPage) {
            setcanPrev(true)
            props.nextPage()
        }

        if (props?.lastPage == props?.currentPage) {
            setcanNext(false)
        }
    }

    const prevPageFun = () => {
        if (props?.currentPage != 1) {
            setcanNext(true)
            props.prevPage()
        }

        if (props?.currentPage == 1) {
            setcanPrev(false)
        }
    }

    return (
        <>


            <div className="flex mb-2 pb-2">
                <div className='flex-initial opacity-50'><GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /></div>
                <div className='flex-initial ml-2'><button className='bg-sky-400 px-3 pr-3  shadow-lg rounded py-1 text-white hover:shadow-2xl hover:bg-green-600 text-center relative' onMouseEnter={() => setbounce('')} onMouseLeave={() => setbounce('hidden')} onClick={props.exportDataF}>
                    Export
                    <div className={bounce + ' absolute h-full top-3 text-sm left-0 text-center animate-bounce'}><AiOutlineArrowDown /></div></button></div>
                <div className='flex-1'>{props.children}</div>

            </div>
            <div className="flex w-full">
                <div className='flex-1'><span className='opacity-50'>Total Result :&nbsp;</span><span className='font-semibold'>{props?.totalCount}</span> </div>
            </div>
            {props?.feedback != null && <div ><span className='text-xs bg-gray-200 opacity-50 pr-2 pl-1 py-1 rounded-sm'><BsExclamationCircleFill className="inline text-xs text-gray-400 mr-2" />{props.feedback}</span></div>}
            <div className=" py-2 overflow-x-auto bg-white">
                <div className="inline-block min-w-full rounded-lg overflow-hidden bg-white">
                    <table {...getTableBodyProps} className="min-w-full leading-normal">
                        <thead className='font-bold text-left text-sm bg-sky-50'>
                            {
                                headerGroups?.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={column?.className + " px-2 py-3 border-b border-gray-200 text-gray-800  text-left text-xs uppercase "}>{column.render('Header')}
                                                    <span>{column.isSorted ? (column.isSortedDesc ? '⬆️' : '⬇️') : ''}</span></th>

                                            ))
                                        }
                                    </tr>
                                ))
                            }

                        </thead>
                        <tbody {...getTableBodyProps()} className="text-sm">
                            {rows.map((row, index) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} className="bg-white shadow-lg border-b border-gray-200">
                                        {row?.cells?.map((cell, index) => {
                                            return <td {...cell.getCellProps()} className="px-2 py-2 text-sm text-left">{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='mt-3 grid grid-cols-12 items-center'>
                        <div className='sm:col-span-2 col-span-3 flex w-full ml-1 pr-10'>
                            <span><input className="h-10 w-[90%] placeholder:text-gray-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 " type="number" onChange={(e) => {
                                setpageNo(e.target.value)
                            }} placeholder='Go to page...' /></span>
                            <abbr className='cursor-pointer flex items-center w-[15%] no-underline' title='Go' onClick={() => goToPageFun()} > <span className="font-bold bg-green-300 text-xl px-2 pb-1 rounded-full hover:text-white hover:bg-green-500">&#x21E8;</span> </abbr>
                        </div>
                        <div className='col-span-2'>  <select className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={perPageC} onChange={(e) => {
                            setperPageC(Number(e.target.value))
                            props.perPageC(Number(e.target.value))
                        }}>
                            {[5, 10, 25, 50].map((pageSize) => (
                                <option key={pageSize} selected={(pageSize === 10) ? true : false} value={pageSize}>
                                    show {pageSize}
                                </option>
                            ))}

                        </select></div>
                        <div className='col-span-3 sm:col-span-4 text-center sm:col-start-5 col-start-7'>   <span >
                            page {''}
                            <strong>
                                {/* {pageIndex + 1} of {pageOptions.length} */}
                                {props?.currentPage} of {props?.lastPage}
                            </strong>{''}
                        </span></div>

                        <div className='col-span-3 sm:col-span-4 text-right'>
                            <abbr title="First Page"><button className='cursor-pointer hover:bg-sky-300 p-2 hover:text-white' onClick={() => (props?.goFirst(), setcanPrev(false), setcanNext(true))} disabled={props?.currentPage == 1 && true} ><AiOutlineDoubleLeft /> </button></abbr>
                            <abbr title="Previous Page"><button className={(props?.currentPage == 1 ? 'opacity-50' : 'opacity-100') + ' text-xl hover:bg-sky-300 hover:text-white cursor-pointer'} onClick={() => prevPageFun()} disabled={props?.currentPage == 1 && true}>⬅️</button></abbr>
                            <abbr title="Next Page"><button className={(props?.currentPage == props?.lastPage ? 'opacity-50' : 'opacity-100') + ' text-xl hover:bg-sky-300 hover:text-white cursor-pointer'} onClick={() => nextPageFun()} disabled={props?.currentPage == props?.lastPage && true}>➡️</button></abbr>
                            <abbr title="Last Page"><button className='cursor-pointer hover:bg-sky-300 p-2 hover:text-white' onClick={() => (props?.goLast(), setcanNext(false), setcanPrev(true))} disabled={props?.currentPage == props?.lastPage && true} >  <AiOutlineDoubleRight /></button></abbr>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default ListTable2
