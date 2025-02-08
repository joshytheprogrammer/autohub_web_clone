import { BeatLoader } from "react-spinners"
import { useEffect, useState } from "react"
import Message from "../../../../../../../components/shared/Message"
import { Modal } from "../../../../../../../components/modal/Modal"
import { NewExamObjectiveQuestion } from "../../../../../../api/admin/academic/exam"


type NewQuestionaireProp =
{
    onClick: () => void
    openQuestionaire: boolean
    token: string
    questionaireId: number
}

export const AddExamObjectiveQuestionModal = ({ onClick, openQuestionaire, token, questionaireId }: NewQuestionaireProp)  =>
{      
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>("")
    const [optionA, setOptionA] = useState<string>("")
    const [optionB, setOptionB] = useState<string>("")
    const [optionC, setOptionC] = useState<string>("")
    const [optionD, setOptionD] = useState<string>("")
    const [answer, setAnswer] = useState<string>("")
    const [mark, setMark] = useState<string>("")

    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
        
    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, [])
    
    useEffect(() => 
    {
    }, [question, optionA, optionB, optionC, optionD, answer, mark]) 

    const CreateQuestionaire = async () => 
    {
       setIsSubmitting(true)
       const data = { questionaireId, question, optionA, optionB, optionC, optionD, answer, mark } 
       const newObjExamQuestion = NewExamObjectiveQuestion(data, token)
       newObjExamQuestion.then((response) => 
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
                  wrapperWidth={800} 
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
                                Add Question
                             </h1>
                              <div 
                                 className="w-full d-flex md:flex mt-1 gap-5 mb-5"
                              >
                                  <textarea onBlur={(e) => {
                                        setQuestion(e.target.value)
                                     }} id="question" defaultValue={question}  
                                     name="question" 
                                     placeholder="Enter question" 
                                     rows={4}
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
                                       defaultValue={''}  name="optionA" 
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
                                           defaultValue={''}  name="optionB" 
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
                                          defaultValue={''}  
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
                                           defaultValue={''}  name="optionD" 
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
                                          defaultValue={''}  name="answer" 
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
                                          defaultValue={''}  name="asignedMark" 
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
                         onClick={() => CreateQuestionaire()}
                      >                                                
                         {  isSubmitting ? ( <BeatLoader size={9} color="#fff" />) : ( "Create" )  }
                      </button>
                    </div>
                </div>               
              </Modal>  
        );
}
