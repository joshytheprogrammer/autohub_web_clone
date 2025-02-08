import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'


export default function Twitter({ handle }: { handle: string }) 
{
    const [x, setX] = useState<string>(handle)
    
    const SaveX = () => { setX("") }

    return (        
      <div 
            className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
      >
            <input  
                  defaultValue={x}
                  className="w-full border rounded-md p-3 bg-opacity-75 mb-3 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                  type="text" name="x" id="x" placeholder="Enter X Account" 
            />                        
            <button 
                  className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                  onClick={() => SaveX()}
            >
            { x ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
            </button> 
      </div>
    )
}
