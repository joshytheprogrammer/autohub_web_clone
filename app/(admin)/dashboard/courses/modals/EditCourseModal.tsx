import { useEffect, useState } from "react"
import { UpdateCourse } from "../../../../api/admin/academic/courses"
import Message from "../../../../../components/shared/Message"
import { Modal } from "../../../../../components/modal/Modal"
import { BeatLoader } from "react-spinners"


type UpdateCourseModalProps = 
{
    editCourseModal: boolean,
    onClick: () => void
    token: string
    data: { id: number, name: string, description: string, objective_duration: number, file_name: string }
}

export const EditCourseModal = ({onClick, editCourseModal, data, token}: UpdateCourseModalProps)  =>
{
   const [loading, setIsLoading] = useState(false)
   const [id] = useState(data?.id)
   const [theTitle, setTitle] = useState(data?.name)
   const [theContent, setTheContent] = useState(data?.description)
   const [errMsgStyle, setErrMsgStyle] = useState<string>('')
   const [errorMessage, setErrorMessage] = useState<string>("")

   useEffect(() => 
   {
      setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
   }, []) 
        
   const updateCourse = async () => 
   {
      setIsLoading(true)
      const data = { id: id, name: theTitle, description: theContent, token: token }  
      const newCourse = UpdateCourse(data)
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
                   isOpen={editCourseModal} 
                   wrapperWidth={800} 
                   margin={'100px auto 0px auto'}
                >
                   <div 
                        className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                   >
                     <div 
                         className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center'
                     >
                        <>                                                
                          <div 
                             className="p-1 mt-1"
                          >
                             <h1 className='font-bold text-lg mb-5'>Edit Course</h1>
                             <div 
                                className="w-full d-flex md:flex gap-5 mb-5"
                             >
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                <input 
                                        onChange={(e) => {
                                                setTitle(e.target.value)
                                        }} 
                                        type="text" id="title" defaultValue={theTitle}  
                                        name="title" 
                                        placeholder="Enter Course Name" 
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                           </div>
                           <div 
                                className="w-full d-flex md:flex mt-1 gap-5"
                           >
                              <textarea onBlur={(e) => {
                                        setTheContent(e.target.value)
                                     }} 
                                     id="description" defaultValue={theContent}  
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
                        className="items-center gap-5 mt-2 sm:flex flex justify-between mx-1 -mb-4"
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
                         onClick={updateCourse}
                      >                                                
                        {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Update" )          }
                      </button>
                   </div>
                </div>
            </Modal>  
        );
}
