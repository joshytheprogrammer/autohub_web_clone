import React from 'react'
import { RotateLoader } from 'react-spinners'

export default function loading() 
{
  return (
      <div 
          className="ccontainer mx-auto h-screen flex justify-center items-center" style={{ marginTop: '0px', paddingTop: '0px' }}
      >
          <RotateLoader className='w-12 h-12' />
      </div>
  )
}
