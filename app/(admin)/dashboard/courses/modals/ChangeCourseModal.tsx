import { useEffect, useState } from "react"
import { BASE_URL } from "../../../../../constant/Path"
import axios from "axios"
import { Modal } from "../../../../../components/modal/Modal"
import { BeatLoader } from "react-spinners"
import Message from "../../../../../components/shared/Message"

type ChangeCourseModalProps = 
{
    openCourseModal: boolean,
    onClick: () => void
    token: string
    data: { id: number, name: string, description: string, objective_duration: number, file_name: string }
}

export const ChangeCourseModal = ({onClick, openCourseModal, data, token}: ChangeCourseModalProps)  =>
{      
    const [loading, setIsLoading] = useState<boolean>(false)
    const [courseId, setCourseId] = useState<string>(data?.id.toString())
    const [courseFile, setCourseFile] = useState<string>("")
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
        
    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, []) 
        
    const uploadCourseFile = async () =>
    {
        setIsLoading(true)         
        let fileDocument = new FormData();
        fileDocument.append('id', courseId)
        fileDocument.append('material', courseFile)
        // return false
        await axios.post(`${BASE_URL}academic/course/change-course-document`, fileDocument, {
           headers: {
                       'Content-Type': 'multipart/form-data',
                       'Authorization': token ? `Bearer ${token}` : "",
                    }
           }).then((response) => {  
                        // setUrl("")
                if(response?.status === 200)
                {
                   onClick()
                } else {
                   setIsLoading(false)
                }
           }).catch(() => { 
                 
           })
        }

        const uploadDocument = (file: any) => 
        {
                const course = file[0]
                setCourseFile(course)
        }

        return (
                <>
                   <Modal 
                        onClick={onClick} 
                        isOpen={openCourseModal} 
                        wrapperWidth={500} 
                        margin={'90px auto 0px auto'} 
                        color='green'
                    >
                        <div 
                            className="grid grid:col-12 gap-5 mt-5 mb-5 justify-center items-center"
                        >  
                           { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }  
                           <h1 
                              className="p-5 bg-blue-500 rounded-lg text-white font-bold"
                           >
                              Change Document
                           </h1>   
                           <div 
                                className="drag-area p-3 items-center text-center mx-auto"
                           >
                               <span 
                                    className="flex select justify-center items-center text-xs block" 
                                    role="button"
                                >
                                     <b className="px-10 py-5">Browse</b>
                                     <input type="file" 
                                            id="product" 
                                            name="product" 
                                            className="file" 
                                            onChange={ (e) => { uploadDocument(e.target.files) } } />
                                </span>
                            </div>
                        </div>
                                
                        <div 
                            className="items-center gap-5 mt-2 sm:flex flex justify-between items-center mb-2 mx-5 mt-1 -ml-1 md:pl-10 flexx"
                        >       
                           <button  
                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                onClick={() => {  onClick() }} 
                           >
                              Cancel
                           </button>
                           <button
                               disabled={loading}
                               className="mt-2 py-3 px-4 bg-green-800 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl w-max"
                               onClick={uploadCourseFile}
                           >                                                
                             { loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Change" ) }
                           </button>
                        </div>
                    </Modal>
                </> 
        );
}
