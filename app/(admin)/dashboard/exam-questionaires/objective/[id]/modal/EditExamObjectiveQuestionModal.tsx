import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../../../components/modal/Modal"
import { useEffect, useState } from "react"
import Message from "../../../../../../../components/shared/Message"
import { UpdateExamObjectiveQuestion } from "../../../../../../api/admin/academic/exam"


type UpdateQuestionaireProp =
{
    onClick: () => void
    openQuestionaire: boolean
    token: string
    questionaireId: number
    cData: { question_id: number, question: string, option_a: string, option_b: string, option_c: string, option_d: string, answer: string, assigned_mark: string }
}

export const EditExamObjectiveQuestionModal = ({ onClick, openQuestionaire, cData, questionaireId, token }: UpdateQuestionaireProp)  =>
{
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
   const [id] = useState<number>(cData?.question_id)
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
   }, [question, optionA, optionB, optionC, optionD, answer, mark]) 

   const UpdateQuestion = async () => 
   {
      setIsSubmitting(true)
      const updateTestQuestion = { id, questionaireId, question, optionA, optionB, optionC, optionD, answer, mark }
      const updateQues = UpdateExamObjectiveQuestion(updateTestQuestion, token)
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
                
            </Modal>
        );
}
