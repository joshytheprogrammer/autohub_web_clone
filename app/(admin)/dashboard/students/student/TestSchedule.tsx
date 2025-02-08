import React, { useEffect, useState } from 'react';
import { Modal } from '../../../../../components/modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { ChangeUserTestSchedule } from '../../../../api/admin/academic/student';
import { PuffLoader } from 'react-spinners';
import { ChangeCourseSchedule } from './ChangeCourseSchedule';


type TestScheduleProp = 
{
    openTestSchedule: boolean,
    onClick: () => void
    token: string
    student: { id: number, fullname: string, has_paid: string, access: string, user_id: number, passport: string, receipt: string }  
}

export const TestSchedule = ({onClick, openTestSchedule, token, student}: TestScheduleProp)  =>
{

   const { data, isLoading, refetch } = useQuery({ queryKey: [`get-student-test-schedule-${student?.user_id}`, token], queryFn: () => ChangeUserTestSchedule(student?.user_id, token)})

   // const [loading, setIsLoading] = useState(false)
   //  const [id, setId] = useState(student?.id)
   //  const [userId, setUserId] = useState(student?.user_id)
   //  const [dateStarted, setDateStarted] = useState(student?.start_date_to_edit)
   //  const [dateEnded, setDateEnded] = useState(student?.end_date_to_edit)
   //  const [dateForTest, setDateForTest] = useState(student?.test_date_to_edit)

   const [testChange, setTestChange] = useState<
                                                   { id: number, user_id: number, course_id: number, downloadable: string, start_date: string, start_date_to_edit: string, end_date: string, end_date_to_edit: string, completed: string, test_date: string, test_date_to_edit: string, name: string }
                                               >(
                                                   { id: -1, user_id: -1, course_id: -1, downloadable: '', start_date: '', start_date_to_edit: '', end_date: '', end_date_to_edit: '', completed: '', test_date: '', test_date_to_edit: '', name: '' }
                                               )   

   // const [userId, setUserId] = useState(student?.id)
   // const [schedulez, setschedulez] = useState("")
   const [changeCourseInfo, setChangeCourseInfo] = useState(false)
        
   // const [makeCurrent, setMakeCurrent] = useState("")
   // const [selection, setSelection] = useState("")

    useEffect(() => 
    {
      //  setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, []) 

   //  const changeStudentSchedule = () => 
   //  {   
   //     setIsLoading(true)
   //     const data = { id: id, userId: userId, dateStarted: dateStarted, dateEnded: dateEnded, dateForTest: dateForTest }
   //  }

    return (
         <>
           <Modal 
              onClick={onClick} 
              isOpen={openTestSchedule} 
              wrapperWidth={1000} 
              margin={'80px auto 0px auto'}
           > 
             {
                isLoading && 
                  <div 
                    className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" 
                    style={{ marginTop: '30px', paddingTop: '20px' }}
                  >
                     <PuffLoader />
                  </div>
             }
             {
                !isLoading && (data?.data?.length === 0) && 
                  <div 
                    className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" 
                    style={{ marginTop: '30px', paddingTop: '20px' }}
                  >
                     <h1 
                       className="font-bold"
                     >
                        No course created yet
                     </h1>
                  </div>
             }
             
             <div 
                 className="relative d-flex col-span-6 md:col-span-3 border rounded-lg p-4 bg-gray-200 shadow-sm mt-7 mb-5"
             >   
               {/* <img src={`${AVATAR}${student.avatar}`} className="col-span-2 rounded-sm w-fit h-[200px] mb-2 p-1 bg-green-300 flex justify-center m-auto items-center" /> */}
               <div 
                  className="w-full p-2 flex bg-white shadow-md text-black"
               >
                  <p 
                     className="font-bold w-2/2 text-xl text-black mb-1 text-black text-center mx-auto"
                  >
                     Test Schdule For:- { student?.fullname }
                  </p>
               </div>
            </div>
            <div 
               className='w-12/12 d-flex h-[600px] px-5 overflow-y-auto xm:overflow-y-scroll'
            >
               {
                  (data?.data?.length > 0) && 
                     data?.data?.map((x: { id: number, user_id: number, course_id: number, downloadable: string, start_date: string, start_date_to_edit: string, end_date: string, end_date_to_edit: string, completed: string, test_date: string, test_date_to_edit: string, name: string }, index: number) => 
                     {
                         return (
                                          <>
                                                <div 
                                                   key={index} 
                                                   className='d-flex justify-center items-center gap-10 text-left hover:text-white border border-1 border-gray-200 p-3 mb-3 hover:border-3 hover:border-green-300 hover:bg-green-800 hover:rounded-xl hover:p-2 hover:text-white hover:font-bold'
                                                >
                                                   <div 
                                                      className="w-12/12 p-3 rounded-xl -mt-3 -mb-3 text-lg font-bold"
                                                   >
                                                      {x.name}

                                                   </div>
                                                   <div 
                                                      className='flex hover:text-white'
                                                   >
                                                   <div 
                                                      className="w-4/12 p-1 flex justify-centent items-center"
                                                   >
                                                      <span 
                                                         className='text-xs font-bold text-gray-600 mr-3 text-green-600'
                                                      >
                                                         Start
                                                      </span>
                                                      <input 
                                                         key={`${Math.floor((Math.random() * 1000))}`} 
                                                         type='date' 
                                                         className='p-2 rounded-lg border border-3 border-gray-200 w-full text-black'
                                                         defaultValue={x?.start_date_to_edit}
                                                      />
                                                         {/* <DatePicker selected={daty} /> */}
                                                   </div>
                                                <div 
                                                   className="w-3/12 p-1 flex justify-centent items-center"
                                                >
                                                   <span 
                                                      className='text-xs font-bold text-gray-600 mr-3 text-green-600'
                                                   >
                                                      End
                                                   </span>
                                                   <input 
                                                      key={`${Math.floor((Math.random() * 1000))}`} 
                                                      type='date' 
                                                      defaultValue={x?.end_date_to_edit}
                                                      className='p-2 rounded-lg border border-3 border-gray-200 w-full text-black'
                                                   />        
                                                </div>
                                                <div 
                                                   className="w-3/12 p-1 flex justify-centent items-center"
                                                >
                                                   <span 
                                                      className='text-xs font-bold text-gray-600 mr-3 text-green-600'
                                                   >
                                                      Test
                                                   </span> 
                                                   {/* x?.test_date.toLocaleDateString('en-CA') new Date().toISOString().subStr(0, 10) */}
                                                   {/* <input type='date' defaultValue={x?.test_date} className='p-2 rounded-lg border border-3 border-gray-200 w-full text-black' */}
                                                   <input 
                                                      key={`${Math.floor((Math.random() * 1000))}`} 
                                                      type='date' 
                                                      defaultValue={x?.test_date_to_edit}
                                                      className='p-2 rounded-lg border border-3 border-gray-200 w-full text-black'
                                                   />        
                                                </div>
                                                {/* <div 
                                                   className="w-2/12 p-3 flex justify-center justify-start"
                                                >
                                                   <input 
                                                      defaultChecked={x?.test} 
                                                      type="radio" name="group" 
                                                      className='p-3 mt-1' 
                                                      onClick={
                                                         () => {
                                                           setSelection(x)
                                                           setMakeCurrent(true)
                                                         }
                                                      }
                                                   />
                                                </div> */}
                                                <div 
                                                   className="w-2/12 p-3 flex justify-center justify-start"
                                                >
                                                   <button  
                                                      className="py-3 px-4 bg-blue-600 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl w-max"
                                                      onClick={
                                                         (e) => {
                                                            setTestChange(x)
                                                            setChangeCourseInfo(true)
                                                         }
                                                      }
                                                   >
                                                      Change
                                                   </button>
                                                </div>
                                             </div>
                                             </div>
                                          </>
                                       )
                                 }
                           )
                        }
                        </div>
                        <div className="p-1"></div>
                                
                        <div 
                                className="items-center gap-5 mt-5 sm:flex flex justify-between mb-2 mx-2"
                        >
                                <button  
                                        className="py-3 px-4 bg-red-600 hover:bg-red-800 text-white font-semibold text-sm rounded-xl w-max"
                                        onClick={
                                          () => {
                                             onClick()
                                          }
                                       }
                                >
                                        Close
                                </button>
                                {/* <button  
                                        className="py-3 px-4 bg-green-600 hover:bg-green-800 text-white font-semibold text-sm rounded-xl w-max"
                                        onClick={
                                          () => {
                                             
                                          }
                                       }
                                >
                                        Set
                                </button> */}
                        </div>
           </Modal>

           { 
               changeCourseInfo && 
               <ChangeCourseSchedule 
                  openChangeCourseSchedule={changeCourseInfo} 
                  onClick={
                     () => {
                        refetch()
                        setChangeCourseInfo(false)
                     }
                  } 
                  token={token} 
                  courseSchedule={testChange}
              />
           }
         </>  
      );
}
