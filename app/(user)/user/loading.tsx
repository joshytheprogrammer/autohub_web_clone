import React from 'react'
import { PuffLoader } from 'react-spinners'

export default function loading() 
{
  return (
      <div 
          className="col-span-12 h-[500px] flex justify-center items-center" 
          style={{ marginTop: '60px', paddingTop: '0px' }}
      >
          <PuffLoader className='w-12 h-12' />
      </div>
  )
}
