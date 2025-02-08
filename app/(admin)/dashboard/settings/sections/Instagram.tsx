import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'


export default function Instagram({ handle }: { handle: string }) 
{
    const [instagram, setInstagram] = useState<string>(handle)
    
    const SaveInstagram = () => { setInstagram("") }

    return (        
      <div 
            className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
      >
            <input  
                  defaultValue={instagram}
                  className="w-full border rounded-md p-3 bg-opacity-75 mb-3 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                  type="text" name="twitter" id="twitter" placeholder="Enter Twitter Accoutn" 
            />                        
            <button 
                  className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                  onClick={() => SaveInstagram()}
            >
                  { instagram ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
            </button> 
      </div>
    )
}
