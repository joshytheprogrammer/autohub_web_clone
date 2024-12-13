"use client"

import { useState } from "react"
import { BeatLoader } from "react-spinners"


export default function Settings() 
{

   const [auth, setAuth] = useState<string>("")
   const [plan, setPlan] = useState<string>("")
   const [contactOne, setContactOne] = useState<string>("")
   const [contactTwo, setContactTwo] = useState<string>("")
   const [addressOne, setAddressOne] = useState<string>("")
   const [addressTwo, setAddressTwo] = useState<string>("")
   const [x, setX] = useState<string>("")
   const [facebook, setFacebook] = useState<string>("")
   const [tiktok, setTiktok] = useState<string>("")
   const [instagram, setInstagram] = useState<string>("")
   const [blogComment, setBlogComment] = useState<string>("")
   const [postComment, setPostComment] = useState<string>("")

   const SaveAuth = () => { setAuth("") }
   const SavePlan = () => { setPlan("") }
   const SaveContactOne = () => { setContactOne("") }
   const SaveContactTwo = () => { setContactTwo("") }
   const SaveAddressOne = () => { setAddressOne("") }
   const SaveAddressTwo = () => { setAddressTwo("") }
   const SaveX = () => { setX("") }
   const SaveFacebook = () => { setFacebook("") }
   const SaveInstagram = () => { setInstagram("") }
   const SaveTiktok = () => { setTiktok("") }

   const AuthOption: string[] = ['yes', 'no']
   const PlanOption: string[] = ['yes', 'no']
   const Option: string[] = ['yes', 'no']
   const Status: string[] = ['open', 'closed']

   return (
        <div               
             className="w-full"
        > 
            <div 
                 className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-7'
            >
               Settings
            </div> 
            <div 
                className="shadow-md border-2 border-gray-100 p-5 mb-3 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
            >   
               
                <div 
                  className="mb-4 md:w-full d-flex md:flex gap-5"
                >
                  <div 
                     className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
                  >
                     <div 
                        className="relative"
                     >
                        <select 
                              defaultValue={auth}
                              className="block appearance-none mb-3 w-full bg-white border border-gray-200 text-gray-700 py-5 px-4 pr-8 text-lg rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              onChange={(e: any) => {
                                    // const selected = e.target.value
                              }}
                        >
                        { <option value={"none"}> - Allow email to be sent on authentication phases -  </option> }
                        {
                              AuthOption.map((type:string, index:number) =>  {
                              return (
                                          <option key={index} value={type} >
                                                {type}
                                          </option>
                                    )
                              })
                        }
                        </select> 
                        <div 
                           className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -mt-14"
                        >
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>                      
                        <button 
                              className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                              onClick={() => SaveAuth()}
                        >
                              { auth ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                        </button>
                     </div> 
                  </div>
                  <div 
                     className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
                  >
                     <div 
                        className="relative"
                     >
                        <select 
                              defaultValue={plan}
                              className="block appearance-none mb-3 w-full bg-white border border-gray-200 text-gray-700 py-5 px-4 pr-8 text-lg rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              onChange={(e: any) => {
                                    // const selected = e.target.value
                              }}
                        >
                        { <option value={"none"}> - Enable Plan users -  </option> }
                        {
                              PlanOption.map((type:string, index:number) =>  {
                              return (
                                          <option key={index} value={type} >
                                                {type}
                                          </option>
                                    )
                              })
                        }
                        </select>              
                        <div 
                           className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -mt-14"
                        >
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>           
                        <button 
                              className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                              onClick={() => SavePlan()}
                        >
                              { auth ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                        </button> 
                     </div>
                  </div>
                </div>
               
               <div 
                  className="mb-4 md:w-full d-flex md:flex gap-5"
               >
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
               </div> 

               <div 
                  className="mb-4 md:w-full d-flex md:flex gap-5"
               >
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
               </div> 
               
               <div 
                  className="mb-4 md:w-full d-flex md:flex gap-5"
               >
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
                  <div 
                        className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
                  >
                        <input  
                              defaultValue={facebook}
                              className="w-full border rounded-md p-3 bg-opacity-75 mb-3 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                              type="text" name="facebook" id="facebook" placeholder="Enter Facebook Contact" 
                        />
                        <button 
                              className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                              onClick={() => SaveFacebook()}
                        >
                            { facebook ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                        </button> 
                  </div>
               </div> 
               
               <div 
                  className="mb-4 md:w-full d-flex md:flex gap-5"
               >
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
                  <div 
                        className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
                  >
                        <input  
                              defaultValue={tiktok}
                              className="w-full border rounded-md p-3 bg-opacity-75 mb-3 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                              type="text" name="tiktok" id="tiktok" placeholder="Enter TikTok Account" 
                        />
                        <button 
                              className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                              onClick={() => SaveTiktok()}
                        >
                            { tiktok ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                        </button> 
                  </div>
               </div> 

               
               <div 
                  className="mb-4 md:w-full d-flex md:flex gap-5"
                >
                  <div 
                     className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
                  >
                     <div 
                        className="relative"
                     >
                        <select 
                              defaultValue={auth}
                              className="block appearance-none mb-3 w-full bg-white border border-gray-200 text-gray-700 py-5 px-4 pr-8 text-lg rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              onChange={(e: any) => {
                                    // const selected = e.target.value
                              }}
                        >
                        { <option value={"none"}> - Vacancy Status -  </option> }
                        {
                              Status.map((type:string, index:number) =>  {
                              return (
                                          <option key={index} value={type} >
                                                {type}
                                          </option>
                                    )
                              })
                        }
                        </select> 
                        <div 
                           className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -mt-14"
                        >
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>                      
                        <button 
                              className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                              onClick={() => SaveAuth()}
                        >
                              { auth ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                        </button>
                     </div> 
                  </div>
                  <div 
                     className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
                  >
                     <div 
                        className="relative"
                     >
                        <select 
                              defaultValue={plan}
                              className="block appearance-none mb-3 w-full bg-white border border-gray-200 text-gray-700 py-5 px-4 pr-8 text-lg rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              onChange={(e: any) => {
                                    // const selected = e.target.value
                              }}
                        >
                        { <option value={"none"}> - Career Status -  </option> }
                        {
                              Status.map((type:string, index:number) =>  {
                              return (
                                          <option key={index} value={type} >
                                                {type}
                                          </option>
                                    )
                              })
                        }
                        </select>              
                        <div 
                           className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -mt-14"
                        >
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>           
                        <button 
                              className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                              onClick={() => SavePlan()}
                        >
                              { auth ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                        </button> 
                     </div>
                  </div>
                </div>


                <div 
                  className="mb-4 md:w-full d-flex md:flex gap-5"
                >
                  <div 
                     className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
                  >
                     <div 
                        className="relative"
                     >
                        <select 
                              defaultValue={auth}
                              className="block appearance-none mb-3 w-full bg-white border border-gray-200 text-gray-700 py-5 px-4 pr-8 text-lg rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              onChange={(e: any) => {
                                    // const selected = e.target.value
                                    setPostComment(e.target.value)
                              }}
                        >
                        { <option value={"none"}> - Select Post Comment Status -  </option> }
                        {
                              Option.map((type:string, index:number) =>  {
                              return (
                                          <option key={index} value={type} >
                                                {type}
                                          </option>
                                    )
                              })
                        }
                        </select> 
                        <div 
                           className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -mt-14"
                        >
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>                      
                        <button 
                              className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                              onClick={() => SaveAuth()}
                        >
                              { postComment ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                        </button>
                     </div> 
                  </div>
                  <div 
                     className="w-full md:w-1/2 rounded-lg mb-5 md:mb-5"
                  >
                     <div 
                        className="relative"
                     >
                        <select 
                              defaultValue={plan}
                              className="block appearance-none mb-3 w-full bg-white border border-gray-200 text-gray-700 py-5 px-4 pr-8 text-lg rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              onChange={(e: any) => {
                                    // const selected = e.target.value
                                    setBlogComment(e.target.value)
                              }}
                        >
                        { <option value={"none"}> - Select Blog Comment Status -  </option> }
                        {
                              Option.map((type:string, index:number) =>  {
                              return (
                                          <option key={index} value={type} >
                                                {type}
                                          </option>
                                    )
                              })
                        }
                        </select>              
                        <div 
                           className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -mt-14"
                        >
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>           
                        <button 
                              className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                              onClick={() => SavePlan()}
                        >
                              { blogComment ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
                        </button> 
                     </div>
                  </div>
                </div>


            </div>
      </div>
   )
}
