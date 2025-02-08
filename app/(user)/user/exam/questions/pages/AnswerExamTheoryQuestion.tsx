import { useState } from "react"
import { Modal } from "../../../../../../components/modal/Modal"
import { UseStore } from "../../../../../../state/store"


type AnswerExamTheoryQuestionProps = 
{
    onClick: () => void
    question: string
    OpenAnswerExamTheoryQuestion: boolean 
    courseId?: number
    questionId: number 
    currentPage: number
}

export const AnswerExamTheoryQuestion = ({ onClick, question, OpenAnswerExamTheoryQuestion, questionId, currentPage }: AnswerExamTheoryQuestionProps)  =>
{
   const advertState = UseStore((state) => state)        
   const [answerQuestion, setAnswerQuestion] = useState<string>('')

   const answerTheQuestion = async () => 
   {  
      const checkIfPresent = advertState.getSelectedExamTheoryOption().findIndex((x: any) => {
          return x.position === currentPage;
      });      
      if(checkIfPresent === -1)
      {          
        let answer = { exam_theory_question_id: questionId, answer: answerQuestion, position: currentPage }
        advertState.setSelectedExamTheoryOption(answer)     
      } else {        
        advertState.getSelectedExamTheoryOption().splice(checkIfPresent, 1);
        let answer = { exam_theory_question_id: questionId, answer: answerQuestion, position: currentPage }
        advertState.setSelectedExamTheoryOption(answer)             
      }
        onClick()   
   }

   return (
           <Modal 
             onClick={onClick} 
             isOpen={OpenAnswerExamTheoryQuestion} 
             wrapperWidth={900} 
             margin={'100px auto 0px auto'}
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
                      <h1 
                        className='font-bold text-lg mb-5'
                      >
                        Edit Answer
                      </h1>
                      <div 
                        className="w-full d-flex md:flex mt-1 gap-5 p-3 shadow-md mb-3 text-lg border border-solid border-gray-300"
                      >
                         {question}
                      </div>
                      <div 
                        className="w-full d-flex md:flex mt-1 gap-5"
                      >
                        <textarea 
                            onChange={
                              (e) => {
                                setAnswerQuestion(e.target.value)
                              }
                            } 
                            id="description" 
                            defaultValue={''}  
                            name="description" 
                            placeholder="Enter Description" 
                            rows={5}
                            className="w-full text-lg bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        >
                        </textarea>
                      </div>
                    </div>
                  </>
                </div>

                <div 
                   className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3"
                >
                  <button  
                    className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                    onClick={
                        () => {
                           onClick()
                        }
                    }
                  >
                     Cancel
                  </button>
                  <button
                     className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                     onClick={answerTheQuestion}
                  >                                                
                     Save
                  </button>
                </div>
             </div>
           </Modal>  
        );
}
