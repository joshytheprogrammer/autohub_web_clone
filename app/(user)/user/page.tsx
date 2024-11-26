"use client"

import { useEffect, useState } from 'react'


export default function User() 
{

    let sidebar: HTMLDivElement
    let sidebar_content: HTMLDivElement

    useEffect(() => 
    {
        sidebar = document.querySelector('.sidebar')!
        sidebar_content = document.querySelector('.contentArea')!
    }, [])
    
  return (

          <>
          
          </>
  )
}
