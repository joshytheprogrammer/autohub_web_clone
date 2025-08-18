import { useEffect, useState } from "react"
import { Modal } from "../../../../../components/modal/Modal"
// import { USAGE_PATH } from "../../../../../constant/Path"
// import Message from "../../../../../components/shared/Message"


type ViewImageSlideProps = 
{
    onClick: () => void 
    toogleImageSlider: boolean 
    data: { id: number, image_url: string }
}    

export const ViewImageSlide = ({onClick, toogleImageSlider, data}: ViewImageSlideProps)  =>
{
    
    return (
                <Modal 
                        onClick={onClick} isOpen={toogleImageSlider} wrapperWidth={1000} margin={'100px auto 0px auto'}
                >
                        {/* { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  } */}
                            
                            <div 
                               className="items-center gap-5 mt-5 sm:flex flex justify-between mb-2 mx-0 mt-5"
                            >                                       
                                <button 
                                   className="p-3 bg-red-600 hover:bg-red-800 -mt-5 text-white font-semibold text-sm rounded-xl w-max"
                                   onClick={() => onClick() }
                                >
                                  Cancel
                                </button>                                        
                            </div>
                        <div 
                            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                            <div 
                               className="mb-4 md:w-full d-flex md:flex border-2 border-shadow rounded-lg px-5 py-2 mb-5 md:mb-0"
                            >
                               <img src={data?.image_url}    />                                      
                            </div>
                        </div>
                </Modal> 
        );
}
