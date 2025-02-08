import { useEffect, useState } from "react"
import Message from "../../../../../../components/shared/Message"
import { Modal } from "../../../../../../components/modal/Modal"
import { BeatLoader } from "react-spinners"
import { UpdateCourseSubModule } from "../../../../../api/admin/academic/courses"


type UpdateSubModuleProp = 
{
    editCourseModal: boolean,
    onClick: () => void
    token: string
    data: { id: number, module_id: number, name: string }
}

export const EditSubModule = ({onClick, editCourseModal, data, token}: UpdateSubModuleProp)  =>
{
   const [loading, setIsLoading] = useState(false)
   const [id] = useState(data?.id)
   const [moduleName, setName] = useState<string>(data?.name)
   const [errMsgStyle, setErrMsgStyle] = useState<string>('')
   const [errorMessage, setErrorMessage] = useState<string>("")

   useEffect(() => 
   {
      setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
   }, []) 

   useEffect(() => 
   {
     
   }, [moduleName]) 
       
        
   const updateCourse = async () => 
   {
      setIsLoading(true) 
      const newCourse = UpdateCourseSubModule(id, moduleName, token)
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
                             <h1 className='font-bold text-lg mb-5'>Edit</h1>
                             { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                             <div 
                                className="w-full d-flex md:flex mt-1 gap-5 mb-5"
                             >
                               <input 
                                   defaultValue={moduleName}
                                   onChange={(e) => {
                                      setName(e.target.value)
                                   }} 
                                 type="text" id="submodule"
                                 name="submodule"  placeholder="Enter Name" 
                                 className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                               />
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
