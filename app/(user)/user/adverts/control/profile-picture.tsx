"use client"

import React, { useEffect, useState } from 'react'
import SingleImageUpload from '../../../../../components/shared/SingleImageUpload'
import { UseStore } from '../../../../../state/store'
import { USAGE_PATH } from '../../../../../constant/Path'


export default function ProfilePicture() 
{
  const Passport = UseStore((state) => state)
  const [picture, setPicture] = useState<string>("")

  useEffect(() => 
  {
     setPicture(Passport.getPassport())
  }, [])

  return (
        <div 
            className='w-full'
        >
          {
             picture && <img src={`${USAGE_PATH.AVATAR}${picture}`} width={300}  className='mt-5 mb-5 rounded-lg' />
          }
          {
             !picture &&
              <SingleImageUpload width={0} ICloudColour={''} space='w-full rounded-lg'
                  onClick={() => {
                    
                  }}
            />
          }
        </div>
  )
}
