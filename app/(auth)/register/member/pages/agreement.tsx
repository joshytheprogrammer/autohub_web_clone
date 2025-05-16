"use client"

import { useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { UseStore } from "../../../../../state/store"
import { useRouter } from "next/navigation"
// import '../member.module.css'

type AgreementProp = 
{
    data: string
    onClick: (currentSection: number) => void
}

export function Agreement({data, onClick}: AgreementProp) 
{
    const router = useRouter()
    const AGREE = `Agree`
    
    const advertState = UseStore((state) => state)  

    const [agree, setAgree] = useState<string>("")
    
    const [dom, setDom] = useState<boolean>(false)
  

    useEffect(() => 
    {
        setAgree(AGREE)
        advertState.setRegistered("")
        setDom(true)
    }, [])


  return (
    <>
      { dom &&
        <div 
            className="w-full mx-auto my-4 d-flex items-center justify-center md:pl-10 md:pr-10 pb-10 md:-mt-30 mt-1 gap-5"
        >   
            <section 
                  className="max-h-[calc(100vh-280px)] w-full bg-white rounded-[10px] relative flex flex-col justify-between overflow-hidden"
              >
                <div 
                    className="h-full overflow-y-auto p-10 relative"
                >
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data!) }} ></div>
                </div>

                {/* Action */}
                <div 
                  className="shrink-0 h-20 w-full px-10 pb-14 pt-10 justify-between flex px-4 items-center bg-blue-600"
                >
                    <button
                        onClick={() => {
                           router.back()
                        }}
                        className="text-white px-4 font-semibold hover:text-red-400 hover:font-bold"
                      >
                          Back
                    </button>
                    <button
                        className="h-[50px] bg-green-600 text-white px-4 rounded-lg font-semibold border-2 border-blue-300 hover:bg-green-800 mt-2"
                        onClick={() => 
                        { 
                          advertState.setMemberAgreement(1)
                          onClick(1)
                        }}
                      >
                        {agree}
                   </button>
                </div>
                
            </section>
        </div>
      }
   </>
  )
}
