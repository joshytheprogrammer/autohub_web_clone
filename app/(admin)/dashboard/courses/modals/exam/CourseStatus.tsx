import { useState } from "react"
import { Modal } from "../../../../../../components/modal/Modal"
import { BeatLoader } from "react-spinners"



type CourseStatusProps = 
{
    openCourseStatus: boolean,
    onClick: () => void
    token: string
}

export const CourseStatus = ({onClick, openCourseStatus, token}: CourseStatusProps)  =>
{
        const [loading, setIsLoading] = useState(false)

        const OpenAcademicExamObjective = () => 
        {
           setIsLoading(true)    
           console.log(token)
        }

        return (
                <Modal 
                    onClick={onClick} 
                    isOpen={openCourseStatus} 
                    wrapperWidth={800} 
                    margin={'100px auto 0px auto'}
                >
                   <div 
                       className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'
                   >
                       <div 
                          className='flex w-full justify-center items-center font-bold text-md uppercase text-red-600 mx-auto in-line'
                       >
                          <span 
                               className='text-black mr-1'
                           >
                              You are about to remove the course material for 
                           </span> 
                           ({''})
                       </div>
                        {/* <span className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto text-blue-600'>Material Under<span className='text-red-600 mr-1 ml-1'> ({removeCourse.name})</span> will also be deleted</span> */}
                                
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
                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                onClick={OpenAcademicExamObjective}
                            >                                                
                              {   loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Set Open" )    }
                            </button>
                        </div>
                     </div>
                </Modal>  
        );
}
