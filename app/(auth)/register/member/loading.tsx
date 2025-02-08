import React from 'react'
import Logo from '../../../../components/shared/Logo'
import { PuffLoader } from 'react-spinners'

export default function loading() 
{
  return (
      <main 
        className="flex md:d-flex xl:flex-row h-screen bg-green-800"
        >
          <div 
                className="w-full md:w-6/12 mx-auto my-4 d-flex items-center justify-center p-10 md:-mt-30 mt-20 gap-5"
          >            
              <div 
                    className='w-full flex justify-center items-center mb-20'
                >
                    <Logo /> 
              </div>
              <div 
                    className='w-full d-flex gap-10'
              >
                  <div className="col-span-12 h-[50px] flex justify-center items-center" style={{ marginTop: '20px', paddingTop: '0px' }}
                    >
                        <PuffLoader className='w-12 h-12' />
                    </div>
                </div>
          </div>
      </main>
  )
}
