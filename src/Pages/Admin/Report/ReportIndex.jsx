import { useState, useEffect } from 'react'
import { useFormik, Formik, Form, ErrorMessage } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import { Navigate, useNavigate } from 'react-router-dom'
import { FcComboChart } from 'react-icons/fc';


function ReportIndex() {



  const validationSchema = yup.object({

    searchType: yup.string().required('Require'),


    // propertyType: yup.string().required('Require'),
    // categoryType: yup.string().when('propertyType', {
    //     is: '1',
    //     then: yup.string().required('Field is required')
    // }),


  })

  const navigate = useNavigate()

  const initialValues = {
    searchType: '',
    fromDate: '',
    toDate: '',
  }


  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values, resetForm) => {

      console.log("Value.....", values)
      // finalSubmitData(values)
    }, validationSchema
  })

  const handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value

    // { name === 'propertyType' && ((value == '1') ? setpropertyTypeStatusToggle(true) : setpropertyTypeStatusToggle(false)) }
    // { name === 'propertyType' && ((value == '7') ? setFlatCountToggle(true) : setFlatCountToggle(false)) }


    // //allow restricted inputs

    // { name == 'khataNo' && formik.setFieldValue("khataNo", allowNumberInput(value, formik.values.khataNo, 100)) }
    // { name == 'totalArea' && formik.setFieldValue("totalArea", totalAreaInSqFt) }
  };

  //Styles

  const inputFieldStyle = "border rounded p-1"
  const labelStyle = "text-sm"

  return (
    <>
      <div className='flow-root bg-white border-b-2 rounded-t-md md:px-5 p-2'>
        <div className='float-left text-lg font-semibold flex'> <FcComboChart className='mt-1.5 mr-2' /> Reports</div>
        {/* <button onClick={() => goBack()} className='float-right border bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-sm'>Back </button> */}
      </div>
      <div className="block mt-3 p-4 md:py-6 shadow-lg bg-white border border-gray-200 rounded-md mx-auto">

        <form onSubmit={formik.handleSubmit} onChange={handleChange}>

          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="col-span-4 grid grid-cols-1 md:grid-cols-4">

              <div className="">
                <p className={`${labelStyle}`}>Search Type<small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></p>
                <select {...formik.getFieldProps('searchType')} className={`${inputFieldStyle}`}>
                  <option value=""> Select </option>
                  <option value="1">Holding No.</option>
                  <option value="2">SAF No.</option>
                </select>
                <p className='text-red-500 text-xs'>{formik.touched.searchType && formik.errors.searchType ? formik.errors.searchType : null}</p>
              </div>

              <div className="">
                <p className={`${labelStyle}`}>From Date <small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></p>
                <input type="date"  {...formik.getFieldProps('fromDate')} className={`${inputFieldStyle}`} />
                <p className='text-red-500 text-xs'>{formik.touched.fromDate && formik.errors.fromDate ? formik.errors.fromDate : null}</p>
              </div>
              <div className="">
                <p className={`${labelStyle}`}>To Date <small className="mt-1 text-sm font-semibold text-red-600 inline ">*</small></p>
                <input type="date"  {...formik.getFieldProps('toDate')} className={`${inputFieldStyle}`} />
                <p className='text-red-500 text-xs'>{formik.touched.toDate && formik.errors.toDate ? formik.errors.toDate : null}</p>
              </div>



              <div className=''>
                <button type='submit' className='bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded'>Search</button>
              </div>
            </div>
          </div>


        </form>
      </div>

    </>
  )
}

export default ReportIndex