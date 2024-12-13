"use client"

import { BsJustify, BsListCheck } from "react-icons/bs"
import LikeRow from "./mode/LikeRow"
import Thumbnail from "./mode/Thumbnail"
import { useEffect, useState } from "react"
import { UseStore } from "../../../../state/store"


export default function Adverts() 
{
      const SwithShow = UseStore((state) => state)
      const [show, setShow] = useState<string>(SwithShow.getShowType())

      useEffect(() => 
      {

      }, [show])

      return (
            
            <div 
                  className="w-full"
            > 
                  <div 
                        className='font-bold text-2xl ml-5 mb-7 mt-7 flex justify-left items-center gap-10'
                  >
                        <span 
                              className="text-lg text-black"
                        >
                              All Products
                        </span>
                        <span       
                              className='mt-1 cursor-pointer space-x-1 flex justify-ceter items-center'
                        >
                              <BsJustify 
                                    className="w-20 text-blue-700 hover:text-green-600" 
                                    onClick={() => {
                                          SwithShow.setShowType("thumbnail")
                                          setShow("thumbnail")
                                    }}
                              />
                        </span>
                        <span       
                              className='mt-1 cursor-pointer space-x-1 flex justify-ceter items-center'
                        >
                              <BsListCheck 
                                    className="w-20 text-red-700 hover:text-green-600 mt-1" 
                                    onClick={() => {
                                          SwithShow.setShowType("list")
                                          setShow("list")
                                    }}
                              />
                        </span>
                  </div>

                  { (show === 'list') && <LikeRow /> }

                  { (show === 'thumbnail') && <Thumbnail /> }

            </div>
            
      )
}
