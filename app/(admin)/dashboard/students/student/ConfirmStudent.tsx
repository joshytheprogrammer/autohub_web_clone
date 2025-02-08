import { useEffect, useState } from "react"
import { Modal } from "../../../../../components/modal/Modal"
import { BeatLoader } from "react-spinners"
import { USAGE_PATH } from "../../../../../constant/Path"
import { EnrollStudent } from "../../../../api/admin/academic/exam"
import Message from "../../../../../components/shared/Message"

type ConfirmStudentProp = 
{
    confirmAccess: boolean,
    onClick: () => void
    token: string
    student: { id: number, fullname: string, has_paid: string, access: string, user_id: number, passport: string, receipt: string }
}

export const ConfirmStudent = ({ onClick, confirmAccess, student, token }: ConfirmStudentProp)  =>
{
    const [userId] = useState<number>(student?.id)
    const [loading, setIsLoading] = useState<boolean>(false)
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, []) 

    const allowStudent = () => 
    {     
       setIsLoading(true)
       const confirm = EnrollStudent(userId, token)
       confirm.then((response) => 
       {
         if(response?.status === 200)
         {
           onClick()
         } else {
           setIsLoading(false)
           setErrorMessage(response?.message)
           setTimeout(() => 
           {
               setErrorMessage("") 
           }, 5000)
           
         }
       }).catch(() => {

      })
    }   

    return (
               <Modal 
                    onClick={onClick} 
                    isOpen={confirmAccess} 
                    wrapperWidth={800} 
                    margin={'80px auto 0px auto'}
                >        
                   <section 
                     className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'
                   >        
                       { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
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
                              width={400}
                              height={400}
                              className="rounded-xl flex justify-center"
                           />
                        </div>
                      {/* <Image 
                           src={`${USAGE_PATH?.AVATAR}${student?.passport}`} 
                           alt={`${student?.fullname}`} 
                           width={140}
                           height={140}
                       /> */}                        
                                
                      <div 
                         className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5"
                      >
                        {
                            (student?.has_paid  === "paid") && <>
                                <span 
                                   className='w-full flex justify-center text-center text-2xl font-bold text-blue-700'
                                >
                                   Payment Already Done
                                </span>
                             </>
                        }
                        <button  
                            className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                            onClick={
                                () => {
                                   onClick()
                                }
                            }
                        >
                          Close
                        </button>
                        {
                           (student?.has_paid != "paid") && <>
                             <button
                                disabled={loading}
                                className="px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                                onClick={allowStudent}
                             >
                                {   loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Confirm Student" )    }
                             </button>
                          </>
                        }
                      </div>
                  </section>
                </Modal>  
        );
}
