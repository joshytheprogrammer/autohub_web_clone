import { useState } from "react";
import { MakePayment } from "./MakePayment";

type clickOn =
{
    onClick: (e: boolean | string) => void
    refetch: () => void
    token: string
}

export default function PaymentPage({ onClick, refetch, token } : clickOn)  
{
    const [openCourseModal, setOpenCourseModal] = useState<boolean>(false)

    return (
        <>
            <p 
                className="font-bold text-lg col-span-12 p-3 bg-green-300 w-full rounded-xl mt-5 px-5"
            >
                Payment Option
            </p>

            <div 
               className="col-span-12 md:flex d-flex bg-white"
            >
              <div 
                className="md:w-1/2 w-full p-5 d-flex justify-center items-center border-2 py-10 md:py-5 md:mb-0 mb-5 pb-10 shadow-md"
              >
                <h3 
                   className="font-bold text-md text-green-700 mb-3 mt-0 -md:mt-20 text-center p-5"
                >
                    TRANSFER
                </h3>
                <div 
                    className="d-flex font-bold mb-2 justify-center items-center text-center"
                >
                    <h6 
                       className="font-bold text-sm text-red-600 text-center"
                    >
                        Bank Name 
                    </h6>
                    <h4 className="text-xl text-center">UBA</h4>
                </div>
                <div 
                    className="d-flex font-bold mb-2 text-center"
                >
                    <h6 
                       className="font-bold text-sm text-red-600"
                    >
                        Account Number 
                    </h6>
                    <span 
                        className="text-xl"
                    >
                        09887674672
                    </span>
                </div>
                <div 
                    className="d-flex font-bold mb-2 text-center"
                >
                    <h6 
                        className="font-bold text-sm text-red-600"
                    >
                        Account Name 
                    </h6>
                    <span 
                        className="text-xl"
                    >
                        AUTOHUB AUTOMOBILE
                    </span>
                </div>
                <div 
                    className="d-flex font-bold mb-2 text-center p-3 mb-5 mt-10"
                >
                    <a 
                        className="py-2 px-5 rounded-full text-white text-sm font-bold mb-2 text-center bg-green-700 cursor-pointer hover:bg-green-900"
                        onClick={
                            () => {
                                setOpenCourseModal(true)
                            }
                        }
                    >
                        Click to upload payment reciept
                    </a>
                </div>
              </div>
                                    
              <div 
                 className="md:w-1/2 w-full p-5 flex justify-center items-center border-2 py-10 md:py-0 md:mb-0 mb-40 shadow-md"
              >
                <div 
                  className=""
                >
                   <h3 
                     className="font-bold text-md text-center text-green-700 mb-10 md:-mt-20"
                   >
                     Online-Payment
                   </h3>
                   <div 
                     className="p-3 bg-green-600 border border-4 border-green-300 hover:border-green-500 hover:text-white rounded-xl cursor-pointer"
                   >
                      Make Payment
                   </div>
                </div>
            </div>
            </div>

            <MakePayment 
                openCourseModal={openCourseModal} 
                onClick={
                    (e) => {
                        onClick(e)
                        setOpenCourseModal(false)  
                    }
                } 
                refetch={
                    () => {
                        refetch()
                    }
                }
                token={token}
            />
        </>
    );
}
