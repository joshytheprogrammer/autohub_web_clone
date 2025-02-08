import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import { useEffect, useState } from "react"
import { AddCourse } from "../../../../api/admin/academic/courses"
import Message from "../../../../../components/shared/Message"


type AddCourseModalProps = 
{
    openCourseModal: boolean,
    onClick: () => void
    token: string
}

export const AddCourseModal = ({onClick, openCourseModal, token}: AddCourseModalProps)  =>
{
    const [loading, setIsLoading] = useState<boolean>(false)
    const [theTitle, setTitle] = useState<string>("")
    const [theContent, setTheContent] = useState<string>("")
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
    
    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, []) 
        
    const addCourse = async () => 
    {
       setIsLoading(true)
       const data = { name: theTitle, description: theContent, token: token }  
       const newCourse = AddCourse(data)
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
                onClick={onClick} isOpen={openCourseModal} wrapperWidth={800} margin={'100px auto 0px auto'}
             >
                <div 
                   className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                >
                   <div 
                        className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center -mt-5'
                   >
                        <>                                                
                          <div 
                             className="p-1 mt-1"
                           >
                                <h1 className='font-bold text-lg mb-5'>Create Course</h1>                                
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                <div 
                                   className="w-full d-flex md:flex mt-1 gap-5 mb-5"
                                >
                                   <input 
                                        onChange={(e) => {
                                          setTitle(e.target.value)
                                        }} 
                                        type="text" id="title" defaultValue={theTitle}  
                                        name="title"  placeholder="Enter Course Name" 
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                     />
                                </div>
                                <div 
                                   className="w-full d-flex md:flex mt-1 gap-5"
                                >
                                   <textarea 
                                        onBlur={(e) => {
                                                 setTheContent(e.target.value)
                                        }} id="description" defaultValue={theContent}  
                                        name="description" 
                                        placeholder="Enter Course Description" 
                                        rows={5}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    >
                                    </textarea>
                                </div>
                             </div>
                        </>
                     </div>
                                
                     <div 
                        className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3"
                     >
                        <button  
                             className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                             onClick={() => {
                                 onClick()
                              }}
                        >
                           Cancel
                        </button>
                        <button
                           disabled={loading}
                           className="mt-2 py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl w-max"
                           onClick={addCourse}
                        >                                                
                          {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Add" )          }
                        </button>
                     </div>
                </div>
           </Modal>  
        );
}
