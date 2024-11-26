import React from 'react'
import { useRouter } from 'next/navigation'
import { UseStore } from '../../state/store'


export default function IsUserAuthenticated() 
{
    const router = useRouter()
    const authenticatedUser = UseStore((state) => state)
    
    if(!authenticatedUser.getUserToken())
    {
        router.push('/login')
    }
    
    return (
      <div>
        
      </div>
    )
}
