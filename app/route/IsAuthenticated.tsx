"use client"

import React, { useEffect, useState } from 'react'
import { UseStore } from '../../state/store'
import Access from '../(auth)/login/access'


export default function IsAuthenticated({ children } : { children: React.ReactNode }) 
{

  const authenticatedUser = UseStore((state) => state)
  const userTypes: string[] = ['member', 'dealer']
  const [token, setToken] = useState<string>("")
  const [userType, setUserType] = useState<string>("")

  useEffect(() => 
  {
      setToken(authenticatedUser.getUserToken())
      setUserType(authenticatedUser.getUType())
  }, [])
    
    if(!token)
    {
        return <div className='-mt-20'
        >
          <Access showLogo={false} goTo='' />
        </div>
    }

    if(!userTypes.includes(userType))
    {
        return <div className='-mt-20'
        >
           <Access showLogo={false} goTo=''/>
        </div>
    }
    
    return children
}
