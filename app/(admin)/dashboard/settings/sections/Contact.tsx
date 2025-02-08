import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'


export default function Contact({ optionOne, optionTwo }: { optionOne: string, optionTwo: string }) 
{
    const [contactOne, setContactOne] = useState<string>(optionOne)
    const [contactTwo, setContactTwo] = useState<string>(optionTwo)

    const SaveContactOne = () => { setContactOne("") }
    const SaveContactTwo = () => { setContactTwo("") }

    return (        
        <>            
            <div 
                     className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
               >
                     <input  
                           defaultValue={contactOne}
                           className="w-full border rounded-md p-3 bg-opacity-75 mb-3 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                           type="text" name="contact_1" id="contact_1" placeholder="Enter Contact" 
                     />                        
                     <button 
                           className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                           onClick={() => SaveContactOne()}
                     >
                         { contactOne ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                     </button> 
               </div>
               <div 
                     className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
               >
                     <input  
                           defaultValue={contactTwo}
                           className="w-full border rounded-md p-3 bg-opacity-75 mb-3 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                           type="text" name="contact_2" id="contact_2" placeholder="Enter Another Contact" 
                     />
                     <button 
                           className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                           onClick={() => SaveContactTwo()}
                     >
                         { contactTwo ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                     </button> 
               </div>
        </>
    )
}
