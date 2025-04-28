import React, { useState, useRef, useMemo } from 'react'
import JoditEditor from 'jodit-react'
import TextArea from '../Editor/TextArea'
import { BeatLoader } from 'react-spinners'
import Wysiwyg from '../wysiwyg/Editor'
import { UseStore } from '../../../../../state/store'


export default function IAgree() 
{
    const Agri = UseStore((state) => state)
    const DESCRIPTION_MESSAGE = 'Enter Prdoduct Description'
    const [iAgree, setIAgree] = useState<string>("")    
    const [iAgreeMessage, setIAgreeMessage] = useState<string>("")    
    const [description, setDescription] = useState<string>("")
    // const [description, setDescriptionErrorMsg] = useState<string>("") 
    const [descriptionMsg, setDescriptionMessage] = useState<string>("") 

    const SaveAuth = () => { setIAgree("") }

    const editor = useRef(null)
    const [content, setContent] = useState("")

    

    return (
        <>
            <div>
                <h1 
                    className='font-semibold text-blue-700 mb-5 uppercase'
                >
                  Agreement
                </h1>
                <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => { setContent(newContent) }}
                />
            </div>
            { /* <TextArea /> */}
            {/* <TextArea 
                onClickIt={
                    (agreement: string) => 
                    {
                        console.log(agreement)
                        if(agreement === "" || agreement === null || agreement === undefined)
                        {
                            setDescriptionErrorMsg(DESCRIPTION_MESSAGE)
                        } else {          
                            setDescriptionErrorMsg("")
                        }
                    }
                }
            /> */}
            {/* <Wysiwyg 
                id={'iagreement'} name={'iagreement'} content={Agri.getAgreement()} 
                onClick={(value: string) => {
                if(value === "<br>")
                {
                    setIAgree("")
                    Agri.setAgreement(value)
                    setIAgreeMessage("Kindly enter description")
                } else {
                    console.log(value)
                    setIAgree(value)
                    Agri.setAgreement(value)
                    setIAgreeMessage("")                                                        
                }
              }} 
            /> */}

            

            <button 
                 className="px-5 py-3 bg-blue-600 mt-5 mb-10 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                 onClick={() => SaveAuth()}
            >
                { iAgreeMessage ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
            </button>
            <div className='p-20'></div>
        </>
    )
}
