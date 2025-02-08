import { useEffect, useState } from "react"
import { Modal } from "../../../../../../components/modal/Modal"
import { BeatLoader } from "react-spinners"
import Message from "../../../../../../components/shared/Message"
import { UpdateCourseFaq } from "../../../../../api/admin/academic/faq"


type EditCourseFaqModalProps = 
{
    editAddCourseFaqQuestion: boolean,
    onClick: () => void
    token: string
    data: { id: number, course_id: number, questions: string }
}


export const EditCourseFaqQuestion  = ({ onClick, data, editAddCourseFaqQuestion, token }: EditCourseFaqModalProps)  =>
{
    const [loading, setIsLoading] = useState<boolean>(false)
    const [id] = useState<number>(data?.id)
    const [theQuestion, setTheQuestion] = useState<string>(data?.questions)
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
    
    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, []) 

    useEffect(() => 
    {

    }, [theQuestion])

    const addCourseFaq = async () => 
    {            
       setIsLoading(true)
       const cdata = { id: id, question: theQuestion, token: token } 
       const updateuestionFaq = UpdateCourseFaq(cdata)
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
                  onClick={onClick} isOpen={editAddCourseFaqQuestion} wrapperWidth={800} margin={'100px auto 0px auto'}>
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
                             <h1 className='font-bold text-lg mb-5'>Edit Question To Course That Could Be Asked </h1>              
                             { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                             <div className="w-full d-flex md:flex mt-1 gap-5">
                                <textarea 
                                     onBlur={(e) => {
                                        setTheQuestion(e.target.value)
                                     }} 
                                     id="description" 
                                     defaultValue={theQuestion}  
                                     name="description" 
                                     placeholder="Enter Description" 
                                     rows={4}
                                     className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-lg py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                >
                                </textarea>
                            </div>
                          </div>
                        </>
                      </div>
                                
                      <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3">
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
                              className="mt-2 py-3 px-4 bg-green-500 hover:bg-green-700 text-white font-semibold text-sm rounded-xl w-max"
                              onClick={addCourseFaq}
                           >                                                
                             {   loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Update" )          }
                           </button>
                        </div>
                      </div>
                </Modal>  
        );
}
