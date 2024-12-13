import React, { useState } from 'react'
import TextArea from '../Editor/TextArea'
import { BeatLoader } from 'react-spinners'

export default function ContactUs() 
{
    const [contact, setContact] = useState<string>("")
    const SaveAuth = () => { setContact("") }

    return (
        <>
            <div>
                <h1 
                    className='font-semibold text-blue-700 mb-5 uppercase'
                >
                  Contact Us
                </h1>
            </div>
            <TextArea />                    
            <button 
                 className="px-5 py-3 bg-blue-600 mt-5 mb-10 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                 onClick={() => SaveAuth()}
            >
                { contact ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
            </button>
            <div className='p-20'></div>
        </>
    )
}
