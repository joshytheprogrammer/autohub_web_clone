import React from 'react'
import dynamic from 'next/dynamic'


export default function DealerAgreement() 
{
    const Jodit = dynamic(() => import('../JoEdit/DealerEditor'), { ssr: false })   


    return ( 
        // <Jodit dataz={data?.data} customOnChange={(event: any) => (contentRef.current = event)} />
        <Jodit />
    )
}

