import { Modal } from "../../../../../components/modal/Modal"
import { USAGE_PATH } from "../../../../../constant/Path"


type StudentReceiptProp = 
{
    seeResult: boolean,
    onClick: () => void
    student: { id: number, fullname: string, has_paid: string, access: string, user_id: number, passport: string, receipt: string }
}

export const StudentReceipt = ({ onClick, seeResult, student }: StudentReceiptProp)  =>
{
   
    return (
               <Modal 
                    onClick={onClick} 
                    isOpen={seeResult} 
                    wrapperWidth={800} 
                    margin={'80px auto 0px auto'}
                >        
                   <section 
                     className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'
                   >        
                       <div 
                           className="flex justify-center items-center font-bold text-lg text-center w-full p-5 bg-blue-200"
                        >
                           { student?.fullname }
                        </div>
                        <div 
                           className="flex justify-center items-center font-bold text-lg text-center w-full p-5 pb-10 border-2 border-gray-200"
                        >
                           <img 
                              src={`${USAGE_PATH?.AVATAR}${student?.passport}`} 
                              alt={`${student?.fullname}`} 
                              className="rounded-xl flex justify-center"
                           />
                        </div>                  
                                
                      <div 
                         className="items-center gap-5 mt-2 sm:flex flex justify-center items-center mb-2 mx-2 mt-5"
                      >
                        <button  
                            className="w-full py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                            onClick={
                                () => {
                                   onClick()
                                }
                            }
                        >
                          Close
                        </button>
                        
                      </div>
                  </section>
                </Modal>  
        );
}
