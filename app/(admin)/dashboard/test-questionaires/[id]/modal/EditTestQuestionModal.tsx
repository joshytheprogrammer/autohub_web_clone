import { BeatLoader, PuffLoader } from "react-spinners"
import { Modal } from "../../../../../../components/modal/Modal"
import { useEffect, useState } from "react"
import Message from "../../../../../../components/shared/Message"
import { UpdateTestObjectiveQuestion } from "../../../../../api/admin/academic/test"
import { useQuery } from "@tanstack/react-query"
import { GetCourses } from "../../../../../api/admin/academic/courses"


type UpdateQuestionaireProp =
{
    onClick: () => void
    openQuestionaire: boolean
    token: string
    questionaireId: number
    cData: { question_id: number, course_id: number, question: string, option_a: string, option_b: string, option_c: string, option_d: string, answer: string, assigned_mark: string }
}

export const EditTestQuestionModal = ({ onClick, openQuestionaire, cData, questionaireId, token }: UpdateQuestionaireProp)  =>
{
   const { data, isLoading } = useQuery({ queryKey: [`get-all-course-categories`, token], queryFn: () => GetCourses(token)})
   
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
   const [id] = useState<number>(cData?.question_id)
   const [courseId, setCourseId] = useState<number>(cData?.course_id)
   const [question, setQuestion] = useState<string>(cData?.question)
   const [optionA, setOptionA] = useState<string>(cData?.option_a)
   const [optionB, setOptionB] = useState<string>(cData?.option_b)
   const [optionC, setOptionC] = useState<string>(cData?.option_c)
   const [optionD, setOptionD] = useState<string>(cData?.option_d)
   const [answer, setAnswer] = useState<string>(cData?.answer)
   const [mark, setMark] = useState<string>(cData?.assigned_mark)

   const [errMsgStyle, setErrMsgStyle] = useState<string>('')
   const [errorMessage, setErrorMessage] = useState<string>("")
       
   useEffect(() => 
   {
      setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
   }, [])
   
   useEffect(() => 
   {
   }, [courseId, question, optionA, optionB, optionC, optionD, answer, mark]) 

   const UpdateQuestion = async () => 
   {
      setIsSubmitting(true)
      const updateTestQuestion = { id, questionaireId, courseId, question, optionA, optionB, optionC, optionD, answer, mark }
      const updateQues = UpdateTestObjectiveQuestion(updateTestQuestion, token)
      updateQues.then((response) => 
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
          setIsSubmitting(false)
        }).catch(() => {
       
       })
   }

     return (
               <Modal 
                  onClick={onClick} 
                  isOpen={openQuestionaire} 
                  wrapperWidth={700} 
                  margin={'85px auto 0px auto'}
               >
               {
                  isLoading &&  <div 
                        className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                     >
                        <PuffLoader className='w-12 h-12' color="black" />
                     </div>
               }
               { !isLoading && data?.data?.length > 0 &&
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
                              { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                              <h1 
                              className='font-bold text-lg mb-5'
                              >
                                 Update Question
                              </h1>

                              <div 
                                 className="py-2 w-full relative mb-2"
                              >
                                 <div 
                                    className="mb-1"
                                 >
                                    <span 
                                       className="w-full font-bold text-sm"
                                    >
                                       Course
                                    </span>
                                    <select 
                                       defaultValue={''} 
                                       onChange={(e) => { 
                                             setCourseId(Number(e.target.value))
                                          }                                                                                
                                       } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    >
                                       {       
                                          data?.data &&
                                          data?.data?.length != 0 &&
                                          data?.data?.map((opt: { id: number, name: string }, index: number) => (
                                             <option 
                                                key={index} 
                                                value={opt.id} 
                                                className='p-2'
                                                selected={(opt?.id === Number(courseId)) ? true : false}
                                             >
                                                {opt.name}
                                             </option>
                                          ))
                                       }
                                    </select>
                                    <div 
                                       className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                                    >
                                       <svg 
                                          className="fill-current h-4 w-4 mt-7" 
                                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                       >
                                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                       </svg>
                                    </div>
                                 </div>
                              </div>     
                              <div 
                                 className="w-full d-flex md:flex mt-1 gap-5 mb-5"
                              >
                                 <textarea onBlur={(e) => {
                                       setQuestion(e.target.value)
                                    }} id="question" defaultValue={question}  
                                    name="question" 
                                    placeholder="Enter question" 
                                    rows={3}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                 >
                                 </textarea>
                              </div>
                              
                              <div 
                                 className="w-full d-flex md:flex mt-1 gap-5 mb-5"
                              >
                                 <div 
                                    className='d-flex w-full'
                                 >
                                    <span 
                                       className='w-full p-3 -ml-2 font-bold'
                                    >
                                       A
                                    </span>
                                    <input 
                                       onChange={(e) => {
                                                setOptionA(e.target.value)
                                       }} type="text" id="optionA" 
                                       defaultValue={optionA}  name="optionA" 
                                       placeholder="Enter Option A" 
                                       className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                    />                                                                        
                                 </div>
                                 <div 
                                    className='d-flex w-full'
                                 >
                                    <span 
                                       className='w-full p-3 -ml-2 font-bold'
                                    >
                                       B
                                    </span>
                                    <input onChange={(e) => {
                                                      setOptionB(e.target.value)
                                          }} type="text" id="optionB" 
                                          defaultValue={optionB}  name="optionB" 
                                          placeholder="Enter Option B" 
                                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                    />
                                 </div>
                              </div>
                              <div 
                                 className="w-full d-flex md:flex mt-1 gap-5 mb-5"
                              >
                                 <div 
                                    className='d-flex w-full'
                                 >
                                    <span 
                                       className='w-full p-3 -ml-2 font-bold'
                                    >
                                       C
                                    </span>
                                    <input onChange={(e) => {
                                             setOptionC(e.target.value)
                                          }} type="text" id="optionC" 
                                          defaultValue={optionC}  
                                          name="optionC" placeholder="Enter Option C" 
                                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                    />
                                 </div>
                                 <div 
                                    className='d-flex w-full'
                                 >
                                    <span 
                                       className='w-full p-3 -ml-2 font-bold'
                                    >
                                       D
                                    </span>
                                    <input onChange={(e) => {
                                             setOptionD(e.target.value)
                                          }} 
                                          type="text" id="optionD" 
                                          defaultValue={optionD}  name="optionD" 
                                          placeholder="Enter Option D" 
                                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                    />
                                 </div>
                              </div>
                              <div 
                                 className="w-full d-flex md:flex mt-1 gap-5 mb-5"
                              >
                                 <div 
                                    className='d-flex w-full'
                                 >
                                    <span 
                                       className='w-full p-3 -ml-2 font-bold text-blue-600'
                                    >
                                       Answer
                                    </span>
                                    <input onChange={(e) => {
                                             setAnswer(e.target.value)
                                          }} type="text" id="answer" 
                                          defaultValue={answer}  name="answer" 
                                          placeholder="Enter Answer" 
                                          className="font-bold text-xl w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                    />
                                 </div>
                              </div>
                              
                              <div 
                                 className="w-full d-flex md:flex mt-1 gap-5 mb-5"
                              >
                                 <div 
                                    className='d-flex w-full'
                                 >
                                    <span 
                                       className='w-full p-3 -ml-2 font-bold text-blue-600'
                                    >
                                       Asigned Mark
                                    </span>
                                    <input onChange={(e) => {
                                             setMark(e.target.value)
                                          }} type="text" id="asignedMark" 
                                          defaultValue={mark}  name="asignedMark" 
                                          placeholder="Enter Mark For Question" 
                                          className="font-bold text-xl w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                    />
                                 </div>
                              </div>
                              
                              </div>
                        </>
                     
                     </div>
                                 
                     <div 
                     className="items-center gap-5 sm:flex flex justify-between mb-2 mx-1 -mt-2"
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
                        disabled={isSubmitting}
                        className="mt-2 py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl w-max"
                        onClick={() => UpdateQuestion()}
                     >                                                
                        {  isSubmitting ? ( <BeatLoader size={9} color="#fff" />) : ( "Update" )  }
                     </button>
                     </div>
                  </div>
               }  
            </Modal>
        );
}
