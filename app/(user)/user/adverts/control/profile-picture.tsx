"use client"

import React from 'react'
import SingleImageUpload from '../../../../../components/shared/SingleImageUpload'
import { UseStore } from '../../../../../state/store'
import { USAGE_PATH } from '../../../../../constant/Path'


export default function ProfilePicture() 
{
  const Passport = UseStore((state) => state)

  return (
        <div 
            className='w-full'
        >
          {
             Passport.getPassport() && <img src={`${USAGE_PATH.AVATAR}${Passport.getPassport()}`} width={300}  className='mt-5 mb-5' />
          }
          {
             !Passport.getPassport() &&
              <SingleImageUpload width={0} ICloudColour={''} space='w-full rounded-lg'
                  onClick={() => {
                    
                  }}
            />
          }
        </div>
  )
}
