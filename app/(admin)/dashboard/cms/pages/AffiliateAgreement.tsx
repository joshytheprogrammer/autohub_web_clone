import React from 'react'
import dynamic from 'next/dynamic'


export default function AffiliateAgreement() 
{
    const Jodit = dynamic(() => import('../JoEdit/AffiliateEditor'), { ssr: false })   


    return ( 
        // <Jodit dataz={data?.data} customOnChange={(event: any) => (contentRef.current = event)} />
        <Jodit />
    )
}

