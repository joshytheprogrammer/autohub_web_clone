'use client'

import Pulsate from "../../../../components/Pulsate"
 
 
export default function Maketi({ ads }: { ads: any })
{

  return (
      <> 

        <div 
            className='grid grid-cols-12 gap-5 py-2 md:mt-0 mt-5 mb-20'
        >
            {  ads?.map((d: { title: string, figures: string, icon: string }, index: number) => <Pulsate key={index} titles={d.title} figures={d.figures} icons={d.icon} />) }
        </div>
           
        <div className="p-5"></div>
      </>
  )

}