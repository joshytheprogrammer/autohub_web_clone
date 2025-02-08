import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import { useState } from "react"
import { ChangeUserTimeTestSchedule } from "../../../../api/admin/academic/student"


type ChangeCourseScheduleProps = 
{
   openChangeCourseSchedule: boolean,
   onClick: () => void
   token: string
   courseSchedule: { id: number, user_id: number, course_id: number, downloadable: string, start_date: string, start_date_to_edit: string, end_date: string, end_date_to_edit: string, completed: string, test_date: string, test_date_to_edit: string, name: string }
}


export const ChangeCourseSchedule = ({onClick, openChangeCourseSchedule, token, courseSchedule}: ChangeCourseScheduleProps)  =>
{
    // const [userId, setUserId] = useState(student.id)
    const [loading, setIsLoading] = useState(false)
    const [id, setId] = useState(courseSchedule?.id)
    const [userId, setUserId] = useState(courseSchedule?.user_id)
    const [dateStarted, setDateStarted] = useState(courseSchedule?.start_date_to_edit)
    const [dateEnded, setDateEnded] = useState(courseSchedule?.end_date_to_edit)
    const [dateForTest, setDateForTest] = useState(courseSchedule?.test_date_to_edit)

    const changeStudentSchedule = () => 
    {   
       setIsLoading(true)
       const data = { id: id, userId: userId, dateStarted: dateStarted, dateEnded: dateEnded, dateForTest: dateForTest }
       const changeDate = ChangeUserTimeTestSchedule(data, token)
       changeDate.then((response: any) => 
       { 
          if(response?.status === 200)
          {
             setIsLoading(false)
             onClick()
          }
       }).then(() => {
           setIsLoading(false)
       })
    }

   return (
        <Modal 
           onClick={onClick} 
           isOpen={openChangeCourseSchedule} 
           wrapperWidth={800} 
           margin={'80px auto 0px auto'}
        >        
           <div 
              className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'
           >
             <h1 
                className='flex w-full justify-center items-center font-bold text-2xl text-green-600 mb-10 mx-auto uppercase'
             >
                Change Course Schedule
             </h1>
             <div 
               className='d-flex hover:text-white'
             >
                <div 
                   className="w-12/12 p-1 d-flex justify-centent items-center"
                >
                  <span 
                    className='text-md font-bold mr-3 text-blue-600'
                  >
                    Course Start
                  </span>
                  <input 
                     key={`${Math.floor((Math.random() * 1000))}`} 
                     type='date' 
                     className='p-4 rounded-lg border border-3 border-gray-200 w-full text-black mb-3'
                     defaultValue={dateStarted}
                     onChange={
                        (e) => {
                          setDateStarted(e.target.value)
                        }
                       }
                  />
                   {/* <DatePicker selected={daty} /> */}
                </div>
                <div 
                  className="w-12/12 p-1 d-flex justify-centent items-center"
                >
                   <span 
                      className='text-md font-bold mr-3 text-blue-600'
                   >
                     Course End
                   </span>
                   <input 
                      key={`${Math.floor((Math.random() * 1000))}`} 
                      type='date' 
                      defaultValue={dateEnded}
                      onChange={
                          (e) => {
                             setDateEnded(e.target.value)
                          }
                      }
                      className='p-4 rounded-lg border border-3 border-gray-200 w-full text-black mb-3'
                   />        
                </div>
                <div 
                   className="w-12/12 p-1 d-flex justify-centent items-center"
                >
                   <span 
                     className='text-md font-bold mr-3 text-blue-600'
                   >
                     Course Test
                   </span> 
                   {/* x?.test_date.toLocaleDateString('en-CA') new Date().toISOString().subStr(0, 10) */}
                   {/* <input type='date' defaultValue={x?.test_date} className='p-2 rounded-lg border border-3 border-gray-200 w-full text-black mb-3' */}
                   <input 
                       key={`${Math.floor((Math.random() * 1000))}`} 
                       type='date' 
                       defaultValue={dateForTest}
                       onChange={
                          (e) => {
                            setDateForTest(e.target.value)
                        }
                       }
                       className='p-4 rounded-lg border border-3 border-gray-200 w-full text-black mb-3'
                    />        
                </div>
                {/* <div 
                      className="w-2/12 p-3 flex justify-center justify-start"
                 >
                   <input defaultChecked={true} type="radio" name="group" className='p-3 mt-1' />
                 </div> */}
                </div>
                                
                <div 
                   className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5"
                >
                  <button  
                    className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                    onClick={
                        () => {
                           onClick()
                        }
                    }
                  >
                    Close
                  </button>
                  <button
                      disabled={loading}
                      className="mt-2 py-3 px-4 bg-green-700 hover:bg-green-500 text-white font-semibold text-sm rounded-xl w-max"
                      onClick={
                        () => changeStudentSchedule()
                      }
                   >
                     { loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Change Date" )    }
                  </button>
                </div>
              </div>
           </Modal>  
        );
}
