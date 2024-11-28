"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { UseStore } from '../../state/store'


export default function IsAdmin({ children } : { children: React.ReactNode }) 
{
    const router = useRouter()
    const authenticatedUser = UseStore((state) => state)
    
    if(!authenticatedUser.getUserToken())
    {
        router.replace('/login')
    }
    
    return children
}
