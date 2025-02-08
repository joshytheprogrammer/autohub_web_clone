import { useEffect, useState } from "react"
import { UpdateTestDuration } from "../../../../api/admin/academic/courses"
import { Modal } from "../../../../../components/modal/Modal"
import Message from "../../../../../components/shared/Message"
import { BeatLoader } from "react-spinners"



type TestDurationChangeProps = 
{
    openCourseModal: boolean,
    onClick: () => void
    token: string
    data: { id: number, name: string, description: string, objective_duration: number }
}

export const TestExamDuration = ({onClick, openCourseModal, data, token}: TestDurationChangeProps)  =>
{
    const [loading, setIsLoading] = useState<boolean>(false)
    const [id] = useState<number>(data?.id)
    const [testObjectiveDuration, setTestObjectiveDuration] = useState<number>(data?.objective_duration)

    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
    
    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, [])     

    const EnterExamTheoryDuration = () => 
    {
       setIsLoading(true)
       const data = { id: id, duration: testObjectiveDuration, token: token }  
       const newCourse = UpdateTestDuration(data)
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
                  isOpen={openCourseModal} 
                  wrapperWidth={900} 
                  margin={'100px auto 0px auto'}
              >
                        <div 
                           className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'
                        >                
                           { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                           <div 
                              className='flex w-full justify-center items-center font-bold text-md uppercase text-blue-900 text-xl mx-auto in-line'
                           >
                              Enter Exam Duration For Objective Questions
                           </div>
                           {/* <span className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto text-blue-600'>Material Under<span className='text-red-600 mr-1 ml-1'> ({removeCourse.name})</span> will also be deleted</span> */}
                           <div 
                              className="w-full items-center mt-10 sm:flex flex justify-center gap-5 item-center"
                           >
                              <div 
                                className="w-1/2 md:flex gap-5 mb-5"
                              >
                                  <input 
                                     onChange={(e) => {
                                        setTestObjectiveDuration(Number(e.target.value))
                                     }} 
                                     type="number" id="objDuration" defaultValue={testObjectiveDuration}  name="objDuration" 
                                     placeholder="Enter Exam Duration" 
                                     className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                  />
                              </div>
                              <button
                                 disabled={loading}
                                 className="w-1/2 py-3 px-4 -mt-5 bg-green-700 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl w-max"
                                 onClick={EnterExamTheoryDuration}
                              >                                                
                                {   loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Set Time For Theory Exam" )          }
                              </button>
                           </div>
                        </div>
                </Modal>  
        );
}
