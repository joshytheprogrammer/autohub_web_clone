"use client"

import { useState } from "react";
import ActiveProduct from "./ActiveProduct";
import Pendingroduct from "./PendingProduct";
import DraftedProduct from "./DraftedProduct";
import SoldProduct from "./SoldProduct";
import WishListProduct from "./WishListProduct";


export default function Advert() 
{
  
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  
  const tabsData = [
    {
      label: "Active",
      content: <ActiveProduct />
    },    
    {
      label: "Pending",
      content: <Pendingroduct />
    },    
    {
      label: "Draft",
      content: <DraftedProduct />
    },    
    {
      label: "Sold",
      content: <SoldProduct />
    },    
    {
      label: "WishList",
      content: <WishListProduct />
    },
  ]
  
  return (
            <>
               <div 
                  className="flex space-x-20 w-12/12 h-16 -mt-2 overflow-x-scroll scrollbar-track-white scrollbar-thin overflow-y-hidden px-5 bg-green-300" 
                >
                      <div 
                            className="flex w-full mr-5 mt-1  mb-2" 
                      >
                        {
                            tabsData.map((tab, index) => {
                                return (
                                          <div
                                                  key={index}
                                                  className={`cursor-pointer rounded-none py-2 rounded-2xl flex justify-between items-center border-b-4 px-5 m-auto font-semibold transition-colors duration-300 text-md border-t-1 ${
                                                  index === activeTabIndex
                                                  ? "border-blue-700 bg-green-300 text-blue"
                                                  : "border-transparent hover:border-green-700 text-black"
                                                  }`}
                                                  style={{fontSize:"12px", paddingTop: '15px'}}
                                                  onClick={() => setActiveTabIndex(index)}>
                                                  {tab.label.toUpperCase()}
                                          </div>
                                        );
                                })
                          }
                </div>
                </div>
                      
                <div 
                    className="px-1 mt-3"
                >
                    <p>{tabsData[activeTabIndex].content}</p>
                </div>
                <div className="h-[0px]"></div>
            </>
  )
}
