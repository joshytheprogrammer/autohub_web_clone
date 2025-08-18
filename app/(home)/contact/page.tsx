"use client"


import { HiLocationMarker } from "react-icons/hi"
import { HiMiniPhoneArrowUpRight } from "react-icons/hi2"
import { Select } from "./Select"
import { useState } from "react"


export default function ContactUs() 
{

  return (
      <>
        <div 
              className='container w-full d-flex justify-center mt-7 mb-4 mx-auto my-10'
        > 
            <div 
              className="w-full d-flex px-5"
            >
                <div 
                    className='font-bold text-lg md:text-2xl mt-10 text-blue-600 flex justify-center text-center'
                >
                    Contact Us
                </div>

                <div 
                  className="text-xl md:text-xl border-shadow py-10 text-center"
                >
                    <div 
                      className="mt-10 text-[40px] w-full flex justify-center items-center"
                    >
                      <HiMiniPhoneArrowUpRight className="text-green-800 mr-5 text-[30px] mt-2" /> 
                      <p>09133333357</p>
                    </div>
                    <div 
                      className="mt-10 text-[40px] w-full flex justify-center items-center leading-10"
                    >
                      <HiLocationMarker className="text-red-600 mr-5 md:text-[30px] text-[100px] mt-1" /> 
                      <p>Plot 2015, Festac Link Road, Amuwo Odofin, Lagos.</p>                       
                    </div>
                </div>
            </div>

            <div className="h-[170px] md:h-[370px]"></div>
        </div>
      </>
  )
}
