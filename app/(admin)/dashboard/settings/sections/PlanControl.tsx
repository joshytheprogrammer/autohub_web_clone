import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'


export default function PlanControl({ option }: { option: string }) 
{
    const [plan, setPlan] = useState<string>("")
    const SavePlan = () => { setPlan("") }
    const PlanOption: string[] = ['yes', 'no']

    return (        
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
                              <option 
                                    key={index} 
                                    value={type} 
                                    selected={ type === option ? true : false }
                              >
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
                  { plan ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Save" ) } 
            </button> 
            </div>
      </div>
    )
}
