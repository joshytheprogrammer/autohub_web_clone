import React from 'react'
import { PuffLoader } from 'react-spinners'

export default function loading() 
{
  return (
      <main 
        className="flex md:d-flex xl:flex-row h-screen bg-green-800"
        >
          <div 
              className='w-full d-flex gap-10'
          >
              <div 
                  className="col-span-12 h-[50px] flex justify-center items-center" style={{ marginTop: '20px', paddingTop: '0px' }}
              >
                  <PuffLoader className='w-12 h-12' />
              </div>
          </div>
      </main>
  )
}
