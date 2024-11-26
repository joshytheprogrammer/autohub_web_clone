"use client"

import { HiPhotograph, HiX } from "react-icons/hi"
import { Icons } from "../../../../../components/shared/Icons"


export default function WebControl({ product }: { product: ActiveProduct }) 
{

  return (
          <> 
            <div 
                className="w-full flex justify-left items-center text-center gap-5 mt-1 block"
            >
                <div 
                    className="w-4/12 flex justify-center items-center"
                >
                    <HiPhotograph className="w-6 h-6" />
                    <span className="text-xs ml-1">44&nbsp;Images</span>
                </div>
                <div 
                    className="w-4/12 flex justify-center items-center"
                >
                    <Icons iconName='edit' color="blue" width={4} height={4}/>
                    <span className="text-xs ml-1">Edit</span>
                </div>
                <div 
                    className="w-4/12 flex justify-center items-center"
                >
                    <Icons iconName='eye' color="red" width={4} height={4}/>
                    <span className="text-xs ml-1">55&nbsp;Images</span>
                </div>
            </div>
            
            <div 
                className="w-full flex justify-left items-center text-center gap-5 mt-2 block"
            >
                <div 
                    className="w-3/12 flex justify-left items-center"
                >
                    <Icons iconName='comment' color="black" width={5} height={5}/>
                    <span className="text-xs ml-1">55&nbsp;</span>
                </div>
                <div 
                    className="w-3/12 flex justify-center items-center"
                >
                    <Icons iconName='delete' color="red" width={4} height={4}/>
                    <span className="text-xs ml-1">Delete</span>
                </div>
                <div 
                    className="w-6/12 flex justify-center items-center"
                >
                    <HiX className="w-5 h-5" />
                    <span className="text-xs ml-1">Mark as Sold</span>
                </div>
            </div>
          </>
  )
}
