import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../component/modal/Modal"
import Message from "../../../../../components/shared/Message"
import { RemoveExamTheoryQuestionaire } from "../../../../api/admin/academic/exam"


type DeleteCourseModalProps = 
{
   openQuestionaire: boolean,
   onClick: () => void
   token: string
   data: { id: number, name: string, description: string }
}

export const DeleteExamTheoryQuestionaireModal = ({onClick, data, openQuestionaire, token}: DeleteCourseModalProps)  =>
{
    const [loading, setIsLoading] = useState(false)
    const [id] = useState<number>(data?.id)
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
       
    useEffect(() => 
    {
      setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, []) 
            
    const deleteQuestionaire = () => 
    {
       setIsLoading(true)
       const newCourse = RemoveExamTheoryQuestionaire(id, token)
       newCourse.then((response) => 
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
                   isOpen={openQuestionaire} 
                   wrapperWidth={800} 
                   margin={'100px auto 0px auto'}
                >
                    <div 
                      className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'
                    >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                       <h1 
                         className='flex w-full justify-center items-center font-bold text-lg uppercase text-red-600 mx-auto'
                       >
                          You are about to delete Course {data?.name}
                       </h1>
                       <span 
                          className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto text-blue-600'
                       >
                         Every question under it will also be deleted
                       </span>
                       <div 
                          className="items-center gap-5 mt-2 sm:flex flex justify-center mb-2 mx-2 mt-5"
                       >
                         <button  
                            className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                            onClick={() => {
                                  onClick()
                            }}
                         >
                           Close
                         </button>
                         <button
                            disabled={loading}
                            className="mt-2 py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl w-max"
                            onClick={() => deleteQuestionaire() }
                         >
                            {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Delete" )          }
                         </button>
                       </div>
                    </div>
                </Modal>  
        );
}
