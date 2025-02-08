import { useEffect, useState } from "react"
import { Modal } from "../../../../../../components/modal/Modal"
import { BeatLoader } from "react-spinners"
import { DeleteCourseFaq } from "../../../../../api/admin/academic/faq"
import Message from "../../../../../../components/shared/Message"

type DeleteCourseFaqModalProps = 
{
    faqCourseModal: boolean,
    onClick: () => void
    token: string
    data: { id: number, course_id: number, questions: string }
}


export const DeleteCourseFaqQuestion  = ({onClick, faqCourseModal, data, token}: DeleteCourseFaqModalProps)  =>
{
    const [loading, setIsLoading] = useState<boolean>(false)
    const [id] = useState<number>(data?.id)
   //  const [question] = useState<string>(data?.questions)
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
    
    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, []) 

    const deleteCourseFaq = async () => 
    {            
       setIsLoading(true) 
       const updateuestionFaq = DeleteCourseFaq(id, token)
       updateuestionFaq.then((response) => 
       {
         if(response?.status === 200)
         {
            onClick()           
         } else {
            setErrorMessage(response?.message)
            setTimeout(() => 
            {
                setErrorMessage("")
            }, 5000)
         }
         setIsLoading(false)
       }).catch(() => {

       })       
    }
    return (
             <Modal 
                 onClick={onClick} 
                 isOpen={faqCourseModal} 
                 wrapperWidth={800} 
                 margin={'100px auto 0px auto'}
             >
                 <div 
                    className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                  >             
                     { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                     <h4 
                        className='font-bold text-lg mb-5 flex items-center text-red-500 p-3 rounded-md justify-center uppercase'
                     >
                        You are about to delete
                     </h4>
                     {/* <h1 
                        className='font-bold text-lg mb-5 flex items-center bg-blue-100 p-3 rounded-md justify-center'
                     >
                        {question}
                     </h1>    */}
                     <div 
                        className="items-center gap-10 mt-2 sm:flex flex justify-center mb-2 mx-1 mt-3"
                     >
                        <button  
                             className="py-3 px-4 bg-gray-600 hover:bg-gray-900 text-white font-semibold text-sm rounded-xl w-max"
                             onClick={() => {
                                  onClick()
                              }}
                        >
                           Cancel
                        </button>
                        <button
                             disabled={loading}
                             className="mt-1 py-3 px-4 bg-red-600 hover:bg-red-900 text-white font-semibold text-sm rounded-xl w-max"
                             onClick={deleteCourseFaq}
                        >                                                
                           {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Delete" )          }
                        </button>
                      </div>
                   </div>
                </Modal>  
        );
}
