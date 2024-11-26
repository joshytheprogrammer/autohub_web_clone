"use client"

import React from 'react'
import SingleImageUpload from '../../../../../components/shared/SingleImageUpload'


export default function MoreImage() 
{

  return (
        <div 
            className='w-full'
        >
          <SingleImageUpload width={0} ICloudColour={''} space='w-full rounded-lg'
                  onClick={() => {
                    
                  }}
          />
        </div>
  )
}
