"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// import SingleImageUpload from '../../../../../components/shared/SingleImageUpload'
import { UseStore } from '../../../../../state/store'
import { USAGE_PATH } from '../../../../../constant/Path'


export default function ProfilePicture() 
{
    const Passport = UseStore((state) => state)
    const token = Passport.getUserToken()
    const [picture, setPicture] = useState<string>(Passport.getPassport())

    useEffect(() => 
    {
      // setPicture(Passport.getPassport())
      // alert(USAGE_PATH.CLOUD_AVATAR)
    }, [])

    useEffect(() => 
    {
      setPicture(Passport.getPassport())
    }, [picture])

    return (
          <>
            {
              token &&           
                <div 
                    className='w-full md:w-7/12 mx-auto'
                >
                  {
                    picture && <img src={`${USAGE_PATH.CLOUD_AVATAR}${Passport.getPassport()}`} alt={`${Passport.getPassport()}`} width={120} height={150} className='rounded-full mt-4 mb-4' /> 
                    // <img src={`${USAGE_PATH.AVATAR}${Passport.getPassport()}`} width={400}  className='mt-5 mb-5 rounded-lg' />
                    // picture && <img src={`${Passport.getPassport()}`} width={400}  className='mt-5 mb-5 rounded-lg' />
                  }
                  {/* {
                    !picture &&
                      <SingleImageUpload width={0} ICloudColour={''} space='w-full rounded-lg'
                          onClick={() => {
                            
                          }}
                    />
                  } */}
                </div>
            }
          </>
    )
}
