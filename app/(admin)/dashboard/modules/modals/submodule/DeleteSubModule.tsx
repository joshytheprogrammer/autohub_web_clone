import React, { useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners";
import { Modal } from '../../../../../../components/modal/Modal';
import Message from '../../../../../../components/shared/Message';
import { RemoveCourseSubModule } from '../../../../../api/admin/academic/courses';


type DeleteSubModuleProp = 
{
    deleteCourseModal: boolean,
    onClick: () => void
    token: string
    data: { id: number, module_id: number, name: string }
}

export const DeleteSubModule = ({onClick, deleteCourseModal, data, token}: DeleteSubModuleProp)  =>
{
    const [loading, setIsLoading] = useState(false)
    const [id] = useState<number>(data?.id)
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
    
    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, [])         

    const deleteCourse = () => 
    {
       setIsLoading(true)
       const newCourse = RemoveCourseSubModule(id, token)
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
                isOpen={deleteCourseModal} 
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
                            <span 
                                className='text-black mr-1'
                            >
                                You are about to delete Course 
                            </span> 
                            ({data.name})
                        </h1>
                                
                        <div 
                           className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5"
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
                                onClick={deleteCourse}
                            >                                                
                              {   (loading === true) ? ( <BeatLoader size={9} color="#fff" />) : ( "Delete" )          }
                            </button>
                        </div>
                    </div>
                </Modal>  
        );
}
