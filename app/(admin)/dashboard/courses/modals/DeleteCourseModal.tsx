import React, { useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners";
import { Modal } from '../../../../../components/modal/Modal';
import { DeleteCourse } from '../../../../api/admin/academic/courses';
import Message from '../../../../../components/shared/Message';


type DeleteCourseModalProps = 
{
    deleteCourseModal: boolean,
    onClick: () => void
    token: string
    data: { id: number, name: string, description: string, objective_duration: number, file_name: string }
}

export const DeleteCourseModal = ({onClick, deleteCourseModal, data, token}: DeleteCourseModalProps)  =>
{
    const [loading, setIsLoading] = useState<boolean>(false)
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
       const data = { id: id, token: token }  
       const newCourse = DeleteCourse(data)
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
                        {/* <span 
                            className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto text-blue-600'
                        >
                           Material Under
                          <span 
                            className='text-red-600 mr-1 ml-1'
                          > 
                             ({data.name})
                          </span> 
                          will also be deleted
                        </span> */}
                                
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
