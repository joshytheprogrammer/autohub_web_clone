import { useEffect, useState } from "react"
import { RemoveCourse } from "../../../../api/admin/academic/courses"
import { Modal } from "../../../../../components/modal/Modal"
import { BeatLoader } from "react-spinners"
import Message from "../../../../../components/shared/Message"




type RemoveCourseModalProps = 
{
    removeCourseModal: boolean
    onClick: () => void
    token: string
    data: { id: number, name: string, description: string, objective_duration: number, file_name: string }
}


export const RemoveCourseModal =  ({onClick, removeCourseModal, data, token}: RemoveCourseModalProps)  =>
{
    const [loading, setIsLoading] = useState<boolean>(false)
    const [id] = useState(Number(data?.id))

   const [errMsgStyle, setErrMsgStyle] = useState<string>('')
   const [errorMessage, setErrorMessage] = useState<string>("")
   
   useEffect(() => 
   {
      setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
   }, []) 

   const RemoveCoursesMaterial = () => 
   {
      setIsLoading(true)
      const data = { id: id, token: token }  
      const rmvCourse = RemoveCourse(data)
      rmvCourse.then((response) => 
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
                isOpen={removeCourseModal} 
                wrapperWidth={800} 
                margin={'100px auto 0px auto'}
             >
                <div 
                   className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'
                >
                  { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }   
                   <div 
                     className='flex w-full justify-center items-center font-bold text-md uppercase text-red-600 mx-auto in-line'
                   >
                      <span 
                         className='text-black mr-1'
                      >
                         You are about to remove the course material for 
                      </span> 
                        ({data?.name})
                    </div>
                    {/* <span className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto text-blue-600'>Material Under<span className='text-red-600 mr-1 ml-1'> ({removeCourse.name})</span> will also be deleted</span> */}
                                
                    <div 
                         className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5"
                    >
                        <button  
                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                onClick={() => {  onClick() }} > Cancel
                        </button>
                        <button
                                disabled={loading}
                               className="mt-2 py-3 px-4 bg-green-800 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl w-max"
                                onClick={RemoveCoursesMaterial}
                        >                                                
                                {   loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Remove Course Material" )          }
                        </button>
                    </div>
                </div>
            </Modal>  
        );
}
