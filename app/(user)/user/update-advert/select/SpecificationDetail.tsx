import { useEffect, useState } from "react"
import { PuffLoader } from "react-spinners"
import { useRouter } from "next/navigation"
import { Modal } from "../../../../component/modal/Modal"


type PreloadProps = 
{
    onClick: () => void 
    openSpecification: boolean
    detail: any 

}    

export const SpecificationDetail = ({onClick, openSpecification, detail}: PreloadProps)  =>
{
     useEffect(() => 
     {
     }, []) 

     return (
                <Modal 
                        onClick={onClick} isOpen={openSpecification} wrapperWidth={1000} margin={'240px auto 0px auto'}
                >
                    <div 
                        className='w-full pt-1 pb-5 pb-2 overflow-auto overflow-y-scroll justify-center h-[550px] px-1 md:px-3 item-center border border-b-8 border-t-8 border-gray-100 px-2'
                    >        
                        <div 
                            className="grid grid-cols-12 gap-2"
                        >
                            {
                                  detail?.map((specification : { name: string, value: string }, index: number) => 
                                  {
                                     return (
                                            <>  
                                                <div key={index}
                                                    className="mb-2 col-span-12 md:col-span-6 gap-5 border-2 border-shadow rounded-lg py-2 px-1 md:px-3 md:mb-2"
                                                >
                                                    <span 
                                                        className="font-bold text-blue-600 mr-3"
                                                    >
                                                        {specification?.name}
                                                    </span>
                                                    -
                                                    <span 
                                                        className="ml-3"
                                                    >
                                                        {specification?.value}
                                                    </span>
                                                </div>
                                            </>
                                     )
                                  })
                            }
                        </div>
                    </div>
                    <div
                        className="p-4 mt-8 px-5 bg-blue-600 hover:bg-blue-800 rounded-xl text-white cursor-pointer text-center"
                        onClick={
                            () => {
                                onClick()
                            }
                        }
                    >
                        Close
                    </div>
                </Modal>  
     );
}
