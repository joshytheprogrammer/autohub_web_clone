import { useEffect, useState } from "react"
import { Modal } from "../../../../../components/modal/Modal"
import { useQuery } from "@tanstack/react-query"
import { ExamScheduleChange, ExamUserTimeTable } from "../../../../api/admin/academic/student"
import toast from "react-hot-toast"
import { BeatLoader } from "react-spinners"
import Message from "../../../../../components/shared/Message"


type ExamScheduleProps = 
{
   examSchedule: boolean,
   onClick: () => void
   token: string
   student: { id: number, fullname: string, has_paid: string, access: string, user_id: number, passport: string, receipt: string }
}

export const ExamSchedule = ({onClick, examSchedule, student, token}: ExamScheduleProps)  =>
{
   const [userId] = useState<number>(student?.id)
   const [loading] = useState<boolean>(false) 
   const [errMsgStyle, setErrMsgStyle] = useState<string>('')
   const [errorMessage, setErrorMessage] = useState<string>("")

   useEffect(() => 
   {
     setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
   }, []) 

   const { data, refetch } = useQuery({ queryKey: [`get-student-time-table-${student?.user_id}`, token], queryFn: () => ExamUserTimeTable(student?.user_id, token)})
   
   const [isSubmitting, setIsSubmiting] = useState<boolean>(false)
   const [selection, setSelection] = useState<string>(data?.plus)
   const [message] = useState<string>("")


   const ChangeExamTime = () => 
   {  
      if(!selection)
      {
         setErrorMessage('Kindly change Date')
         setTimeout(
            () => {
               setErrorMessage("")
            }, 5000
         )
         return false
      }
      setIsSubmiting(true)
      const data = { user_id: userId, exam_date: selection } 
      const score = ExamScheduleChange(data, token)
      score.then((response: any) => 
      {
         if(response?.status === 200)
         {
            refetch()
           toast.success(response?.message, 
           {
              position: "top-center",
           });
           setIsSubmiting(false)
         } else {
            toast.error(`Error, could not change date`, { position: "top-right" });
         }
      }).catch(() => {

      })
   }

   return (
        <Modal 
            onClick={onClick} 
            isOpen={examSchedule} 
            wrapperWidth={700} 
            margin={'100px auto 0px auto'}
        >        
            {
                message && <div 
                                className="col-span-12 flex justify-center items-center border border-3 border-shadow border-green-700 bg-[#f5fbf7] px-3 py-2"
                        >
                          <h1 
                            className="font-bold"
                          >
                            {message}
                          </h1>
                        </div>
            }
            <div 
               className="relative d-flex col-span-6 md:col-span-3 border rounded-lg p-4 bg-gray-200 shadow-sm mt-7 mb-5"
            >   
               <div 
                  className="w-full p-2 flex bg-white shadow-md text-black"
               >
                  <p 
                    className="font-bold w-2/2 text-xl text-black mb-1 text-black text-center mx-auto"
                  >
                     Modify Exam Date For:- <span className='text-blue-600'>{ student?.fullname}</span>
                  </p>
               </div>
             </div>
             <div 
                className='w-12/12 d-flex h-[140px] overflow-y-auto xm:overflow-y-scroll'
             >
                <div 
                   className="w-12/12 p-3 rounded-xl -mt-3 -mb-3 text-2xl py-3 font-bold text-green-600 flex justify-center items-center"
                >
                  {/* {data?.data?.exam_date} */}
                </div>
                <div 
                   className='grid grid-cols-12 w-full justify-center items-center text-left hover:text-white p-3 hover:rounded-xl hover:p-2 hover:text-white hover:font-bold'
                >
                  <input  
                      type='date' 
                      className='p-5 rounded-lg border border-3 border-gray-200 w-full text-black mb-3 text-xl col-span-12'
                      defaultValue={data?.plus}
                      onChange={
                         (e) => {
                          setErrorMessage("")
                          setSelection(e.target.value)
                        }
                      }
                  />
                </div>
              </div>
              <div className="p-1"></div>
                                
              <div 
                 className="items-center gap-5 -mt-10 pb-5 sm:flex flex justify-between mb-2 mx-2"
              >
                 <button  
                     className="py-3 px-4 bg-red-600 hover:bg-red-800 text-white font-semibold text-sm rounded-xl w-max"
                     onClick={
                        () => {
                           onClick()
                        }
                     }
                  >
                    Close
                  </button>
         
                  <button
                     disabled={loading}
                     className="mt-2 py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl w-max"
                     onClick={
                        () => ChangeExamTime()
                     }
                  >
                    {   isSubmitting ? ( <BeatLoader size={9} color="black" />) : ( "Change Date" )    }
                  </button>
                </div>
                
              { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
            </Modal>  
        );
}
