import { useState } from "react";
import { MakePayment } from "./MakePayment";
import { useRouter } from "next/navigation";

type clickOn =
{
    message: string
    startText: string
    goTo: string
}

export default function StartPage({ message, startText, goTo } : clickOn)  
{
    const router = useRouter()

    const start = () => 
    {
        router.push(goTo)
    }

    return (
        <>
          <div 
              className="col-span-12 h-[500px] d-flex justify-center items-center pt-52 justify-center items-center border-2 py-10 md:py-5 md:mb-0 mb-5 pb-10 shadow-md" 
              style={{ marginTop: '20px', paddingTop: '100px' }}
          >
              <p 
                 className="font-bold text-blue-600 md:text-2xl col-span-12 text-center uppercase mt-20"
              >
                 {message}
              </p>
                
              <div 
                 className="flex justify-center items-center mt-5"
              >                
                <div 
                    className="p-3 bg-green-600 hover:bg-green-900 text-white col-span-12 mx-auto rounded-lg cursor-pointer w-fit"
                    onClick={start}
                >
                   {startText}
                </div>
              </div>
          </div>
          <div className="p-5"></div>
        </>
      );
}
