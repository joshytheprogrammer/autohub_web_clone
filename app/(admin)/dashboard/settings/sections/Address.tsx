import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'


export default function Address({ optionOne, optionTwo }: { optionOne: string, optionTwo: string }) 
{
    const [addressOne, setAddressOne] = useState<string>(optionOne)
    const [addressTwo, setAddressTwo] = useState<string>(optionTwo)

    const SaveAddressOne = () => { setAddressOne("") }
    const SaveAddressTwo = () => { setAddressTwo("") }

    return (        
        <>
            <div 
                  className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
            >
                  <textarea  
                        defaultValue={addressOne}
                        className="w-full border mb-3 rounded-md p-3 bg-gray-100 bg-opacity-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                        name="addressOne" id="addressOne" placeholder="Enter Address One" 
                        rows={2}
                  >
                  </textarea>                        
                  <button 
                        className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                        onClick={() => SaveAddressOne()}
                  >
                        { addressOne ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                  </button> 
            </div>
            <div 
                  className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
            >
                  <textarea  
                        defaultValue={addressTwo}
                        className="w-full border mb-3 rounded-md p-3 bg-gray-100 bg-opacity-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                        name="addressTwo" id="addressTwo" placeholder="Enter Address Two" 
                        rows={2}
                  >
                  </textarea>
                  <button 
                        className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                        onClick={() => SaveAddressTwo()}
                  >
                        { addressTwo ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                  </button> 
            </div>
        </>
    )
}
