import React from 'react'
import { FiBook } from 'react-icons/fi'
import { BiPurchaseTagAlt } from 'react-icons/bi'
import { GiMoneyStack } from 'react-icons/gi'

function Dashboard() {
  const dashboardCards = [
    { title: 'Total Course Added', value: 200, icon: <div className='w-12 rounded-full h-12  flex justify-center items-center bg-indigo-50 text-indigo-600'><FiBook className="inline text-xl" /></div> },
    { title: 'Total Purchased Courses', value: 200, icon: <div className='w-12 rounded-full h-12  flex justify-center items-center bg-amber-50 text-amber-600'><BiPurchaseTagAlt className="inline text-xl" /></div> },
    { title: 'Total Earnings', value: 200, icon: <div className='w-12 rounded-full h-12  flex justify-center items-center bg-green-50 text-green-600'><GiMoneyStack className="inline text-xl" /></div> },
    { title: 'Total Teachers', value: 200, icon: <div className='w-12 rounded-full h-12  flex justify-center items-center bg-green-50 text-green-600'><GiMoneyStack className="inline text-xl" /></div> },
    { title: 'Total Teachers', value: 200, icon: <div className='w-12 rounded-full h-12  flex justify-center items-center bg-green-50 text-green-600'><GiMoneyStack className="inline text-xl" /></div> },
  ]
  return (
    <>
      <div className='bg-[#F9FAFB] h-screen w-full'>
        <div className='text-xl font-bold px-4'>Dashboard</div>
        <div className="grid grid-cols-12">
          {dashboardCards?.map((data, index) => (
            <div className="col-span-12 md:col-span-3 p-4">
              <div className='grid grid-cols-12 bg-white p-6 rounded-lg shadow-md'>
                <div className='col-span-9 flex-initial'>
                  <h1 className='font-semibold text-2xl font-sans'>{data?.value}</h1>
                  <p className='font-gray-700'>{data?.title}</p>
                </div>
                <div className='col-span-3 flex justify-center items-center float-right'>
                  {data?.icon}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Dashboard