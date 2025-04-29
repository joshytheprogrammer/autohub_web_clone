import React, { useState, useRef, useMemo, useEffect } from 'react'
import JoditEditor from 'jodit-react'
import TextArea from '../Editor/TextArea'
import { BeatLoader } from 'react-spinners'
import Wysiwyg from '../wysiwyg/Editor'
import { UseStore } from '../../../../../state/store'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'
import { AgreementRegistration, RegistrationAgreement } from '../../../../api/home/cms'



export default function IAgree() 
{
    const user = UseStore((state) => state)
    const token: string = user.getUserToken()

    const { data, isLoading, refetch } = useQuery({ queryKey: [`agreement-detail`, token], queryFn: () => AgreementRegistration(token)})

    const [loading, setIsLoading] = useState<boolean>(false) 
    const [errorMessage, setErrorMessage] = useState<string>("")

    const [content, setContent] = useState("")

    const Jodit = dynamic(() => import('../JoEdit/jedit'), { ssr: false })
     
            
    const SaveAgreement = async () => 
    {
        setIsLoading(true) 
        const newCourse = RegistrationAgreement(token, user.getAgreement())
        newCourse.then((response: any) => 
        {
           if(response?.status === 200)
           {
              refetch()                    
              setIsLoading(false)    
           } else {
               setErrorMessage(response?.message)
               setIsLoading(false)
               setTimeout(() => 
               {
                  setErrorMessage("")
               }, 5000)
            }
        }).catch(() => {
         
        })
    }
    

    return (
        <>
            <div>
                <h1 
                    className='font-semibold text-blue-700 mb-5 uppercase'
                >
                  Agreement
                </h1>
                <Jodit 
                    content={data?.data} 
                    setContent={(data: string) => 
                        {
                            setContent(data)
                        }
                    } 
                />
            </div>

            <button 
                 className="px-5 py-3 bg-blue-600 mt-5 mb-10 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                 onClick={() => SaveAgreement()}
            >
                { loading ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
            </button>
            <div className='p-20'></div>
        </>
    )
}
