import React from 'react'
import jerry from '../assets/jerry.jpeg'

function Logo({width = '50px'}) {
  return (
    <div className='flex items-center gap-3'> <img src={jerry} alt='Jerry' width={width} className='rounded-2xl'/>  </div>
  )
}

export default Logo