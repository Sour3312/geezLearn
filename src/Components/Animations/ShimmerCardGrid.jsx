import React from 'react'
import ShimmerCard from './ShimmerCard'

function ShimmerCardGrid() {
  return (
   <div className="grid grid-cols-12 space-x-4">
    <div className="col-span-12 md:col-span-3"><ShimmerCard/></div>
    <div className="col-span-12 md:col-span-3"><ShimmerCard/></div>
    <div className="col-span-12 md:col-span-3"><ShimmerCard/></div>
    <div className="col-span-12 md:col-span-3"><ShimmerCard/></div>
   </div>
  )
}

export default ShimmerCardGrid