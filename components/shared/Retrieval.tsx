import { useEffect, useState } from "react"
import { PuffLoader } from "react-spinners"
import { Modal } from "../../components/modal/Modal"
import { useRouter } from "next/navigation"


type PreloadProps = 
{
    onClick: () => void 
    preLoadModal: boolean
}    

export const Retrieval = ({onClick, preLoadModal}: PreloadProps)  =>
{
     useEffect(() => 
     {
        
     }, []) 

     return (
                <Modal 
                        onClick={onClick} isOpen={preLoadModal} wrapperWidth={200} margin={'320px auto 0px auto'}
                >
                        <div 
                            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                            <div 
                                className="items-center gap-5 mt-2 sm:flex flex justify-center mb-2 mx-5 mt-5 y-20"
                            >                 
                                {   true ? ( <PuffLoader size={50} className="text-black" />) : ( "" ) } 
                            </div>
                        </div>
                </Modal>  
     );
}
