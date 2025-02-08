import React from 'react'
import { PuffLoader } from 'react-spinners'

export default function loading() 
{
  return (
      <div 
          className="ccontainer mx-auto h-screen flex justify-center items-center" style={{ marginTop: '0px', paddingTop: '0px' }}
      >
          <PuffLoader className='w-12 h-12' />
      </div>
  )
}
