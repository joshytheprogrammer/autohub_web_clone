import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { UseStore } from "../../../../../../state/store";
import { useRouter } from "next/navigation";
import { AnswerExamTheoryQuestion } from "./AnswerExamTheoryQuestion";
import { ChangeExamTheoryQuestion } from "./ChangeExamTheoryQuestion";


export default function ExamTheoryQuestions({ data, question }: { data: any, question: string }) 
{
  const router = useRouter()
  const advertState = UseStore((state) => state)
  localStorage.setItem("text-exam-objective-thoeory-ques", question)
  // const { data, isLoading, refetch, isRefetching } = useQuery(["get-all-questions"], () => ExamCourseTheoryQuestions(), { staleTime: Infinity })

  const [selectedOptions, selectedTestTheoryOptions] = useState<[]>([])
  const [answer, setAnswer] = useState<string>('')
  const [typedAnswer, setTypedAnswer] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [nextQuestion, setNextQuestion] = useState<number>(-1)

  const [loading, setIsLoading] = useState<boolean>(false)
  const [currentQuestion, setcurrentQuestion] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [courseId, setCourseId] = useState<string>('')
  const [studentValue, setStudentValue] = useState<string>("")
  const [questionId, setQuestionId] = useState<number>(-1)
  const [tempSave, setTempSave] = useState<boolean>(false)
  const [tempSaveName, setTempSaveName] = useState<string>('Save')
  const [success, setSuccess] = useState<string>('')
  const [openExamTheoryAnswerToEdit, setOpenExamTheoryAnswerToEdit] = useState<boolean>(false)
  const [OpenAnswerExamTheoryQuestion, setOpenAnswerExamTheoryQuestion] = useState<boolean>(false)

  const [fakeRefresh, setFakeRefresh] = useState<number>(-1)
  const [choosen, setChoosen] = useState<any>(advertState.getSelectedExamTheoryOption())

  useEffect(() => 
  {
    const checkIfForcedToSubmit = advertState.getForceExamTheory()
    if(checkIfForcedToSubmit === "yes")
    {
        router.push('/dashboard/force-submit-exam')
    }
  }, [])

  const SubmitExamTheoryQuestionn = () => 
  {
      setIsSubmitting(true)
      const objectiveAnswers = { userSubmitted : 'yes', answers: advertState.getSelectedExamObjectiveOption() }
      const theoryAanswers = { userSubmitted : 'yes', answers: advertState.getSelectedExamTheoryOption() }
      console.log({objectiveAnswers, theoryAanswers})
      if(objectiveAnswers.answers.length > 0 || theoryAanswers.answers.length > 0)
      {
        // SubmitExamObjectiveTheory(objectiveAnswers, theoryAanswers)
        // .then((res) => {
        //     if(res === "submitted")
        //     {
        //         advertState.setEmptyExamObjective([])
        //         advertState.setEmptyExamTheory([])
        //         navigate('/dashboard/summary')
        //         // alert("Submitted")
        //         // return false
        //     } else {
        //         setErrorMsg("Submitting Result Failed")
        //         setIsSubmitting(false)
        //         setTimeout(() => {
        //             setErrorMsg("")
        //         }, 3000)
        //     }
        // })
        // .catch(() => {
        //     setTimeout(() => {
        //         setIsSubmitting(false)
        //     }, 2000)
        // })          
      } else {
        setErrorMsg("Answer at least one question from either the objective or theory")
          setTimeout(() => {
              setIsSubmitting(false)
              setErrorMsg("")
          }, 2000)
          return false
      }
  }
  
  useEffect(() => 
  {      
  }, [currentQuestion, fakeRefresh])

  const showQuestion = (pst: number) => 
  {
      setCurrentPage(pst)
      const checkIfPresent = advertState.getSelectedExamTheoryOption().find((x: any) => x.position === currentPage); 
      if(checkIfPresent)
      {
          let inputField = document.querySelector("answering")!
          if(inputField === null)
          {
            
          } else {            
            inputField.textContent = ''
          }
      } else {
      }
  }

   const EnteredAnswer = () => 
  {
      setTempSave(true)
      const checkIfPresent = advertState.getSelectedExamTheoryOption().findIndex((x: any) => {
        return x.position === currentPage;
      });      
      if(checkIfPresent === -1)
      {          
          let answerz = {exam_theory_id: questionId, answer: studentValue, position: currentPage }
          advertState.setSelectedExamTheoryOption(answerz)     
      } else {        
          advertState.getSelectedExamTheoryOption().splice(checkIfPresent, 1);
          let answerz = {exam_theory_id: questionId, answer: studentValue, position: currentPage }
          advertState.setSelectedExamTheoryOption(answerz)             
      }
      setSuccess('Saved')
      setTimeout(() => {
        setTempSave(false)
        setSuccess('')
      }, 2000)
  }

  const isSelected = (id: number) => 
  {
      const answeredOption = advertState.getSelectedExamTheoryOption()
      const numbers = answeredOption.map((x: any) => x.position)
       if(numbers.includes(id))
       {
          return "yes"
       } else {
          return "no"
       }
  }

  const theTypedAnswer = () => 
  {
      let enteredValue;
      const theChoosen = advertState.getSelectedExamTheoryOption()
      if(theChoosen.length === 0)
      {
         enteredValue = ''
      } else
      {
        const x = theChoosen.find((p: any) => p.position === currentPage)
        if(x === '' || x === undefined ||x === null)
        {
          enteredValue = ''
        } else {
          enteredValue = x.answer
        }
      }      
      // advertState.getSelectedAnswerValue(enteredValue)
      return enteredValue
  }
  
  return (
          <>
                <div 
                  className="col-span-12"
                >
                    {/* { !isLoading && !isRefetching && (data?.data.length > 0) && (data?.plus < 1) && (data?.message?.theory === 'open') &&  */}
                    { 
                      (data?.length > 0) &&
                        <div 
                          className="w-full mb-5"
                        >
                          {/* <div className="font-bold text-xl mb-4 text-green-700 mt-28 md:mt-0 p-3 bg-green-100">{data?.plus}</div>  */}

                         { 
                            errorMsg &&  
                              <div 
                                className="w-full text-lg font-md text-white bg-red-600 rounded-md mb-5 p-3"
                              >
                                 { errorMsg }
                              </div>
                        }

                        <div 
                          className="d-flex -mb-3 col-span-12 p-3"
                        >
                          <div 
                            className="w-full flex justify-between items-center"
                          >
                            <span 
                              className="font-bold text-blue-700 pr-5 text-lg" 
                              style={{ fontSize: '15px' }}
                            >
                              Theory Question {currentPage+1} of {data?.length}
                            </span> 
                            <span 
                              className="w-fit"
                            >
                              {/* <CountDownTimerExamTheory seconds={data?.message?.theory_duration} question={data?.addition} /> */}
                            </span>
                            {/* <button 
                              disabled={isSubmitting}
                              className={`p-3 text-white text-sm font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'bg-red-600 hover:text-red-600 hover:bg-red-900'}`}
                              onClick={SubmitExamTheoryQuestionn}
                            >
                              {   isSubmitting ? ( <BeatLoader size={9} color="#fff" className="" />) : ( "Sumbit" )     }
                            </button> */}
                          </div>
                                  
                          <h1 
                            className="w-full font-bold text-blue-900 mt-3 shadow-md px-2 py-4 border border-3 text-lg border-gray-300 bg-white"
                          >
                            {data?.[currentPage]['question']}
                          </h1>
                                  
                          <div 
                            className="flex flex-wrap -m-2 mt-4 mb-2 px-2"
                          >
                            {
                              <textarea 
                                id="answering"
                                onChange={ (e) => {
                                    setStudentValue(e.target.value)
                                    setQuestionId(data[currentPage]['id'])
                                    setCurrentPage(currentPage)
                                  } 
                                } 
                                name="answerings"
                                className="shadow form-textarea mb-2 block w-full border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline text-lg" 
                                rows={6} 
                                placeholder="Your answer appears here"
                                value={theTypedAnswer()}
                              >
                              </textarea>
                            }
                          </div>
                          <div 
                            className="flex justify-between -mb-20"
                          >
                             <button
                                disabled={tempSave}
                                className={`p-3 text-white text-sm font-bold rounded-md ${(tempSave === true) ? 'bg-gray-600' : 'bg-green-600 hover:text-white hover:bg-green-900 cursor-pointer'}`}
                                onClick={
                                  () => {
                                     setOpenAnswerExamTheoryQuestion(true)
                                  }
                                }
                             >
                               Answer Question
                             </button> 
                             <div
                                className={`p-3 text-white text-sm font-bold rounded-md bg-blue-600 hover:text-white hover:bg-blue-900 cursor-pointer`}
                                onClick={
                                    () => {
                                       setOpenExamTheoryAnswerToEdit(true)
                                    }
                                }
                             >
                               Edit Answer
                             </div>          
                          </div>
                          { 
                            success && <>
                               <span className="font-bold text-lg text-green-600">{success}</span>
                            </> 
                          }
                        </div>          
                      </div>
                    }

                    
                    <div 
                      className="col-span-12 flex justify-center items-center mx-auto px-4 mt-1"
                    >
                      <nav 
                        className="flex flex-row flex-nowrap justify-between md:justify-center items-center overflow-auto overflow-y-scroll py-10" 
                        aria-label="Pagination"
                      >
                        {
                          data &&              
                            data?.map((num: any, index: number) => {
                              const isAnswered = (isSelected(index) === "yes") ? "bg-green-700 border border-solid border-green-700" : "bg-white-600"
                              const currentAnswer = (currentPage === index) ? "bg-blue-600 text-white text-green-500 disabled" : `${isAnswered} border border-gray-700 cursor-pointer hover:border-gray-300 hover:bg-green-800 hover:text-white`
                              const style = `${currentAnswer} md:flex py-1 px-3 mx-1 justify-center items-center rounded-full font-bold text-black` 
                              return (
                                <a 
                                  key={index}
                                  className={style} 
                                  title="Page 1" 
                                  onClick={
                                      () => showQuestion(index)
                                  }
                                >
                                  {index+1}
                                </a>  
                              )
                            }
                          )
                        }
                      </nav>
                    </div>

                </div>

                {
                    openExamTheoryAnswerToEdit && 
                        <ChangeExamTheoryQuestion 
                            question={data?.[currentPage]['question']} 
                            questionId={data?.[currentPage]['id']} 
                            studentValue={theTypedAnswer()} 
                            currentPage={currentPage} 
                            openExamTheoryAnswerToEdit={openExamTheoryAnswerToEdit} 
                            onClick={
                              () => {
                                setOpenExamTheoryAnswerToEdit(false)
                              }
                            } 
                        />
                }
                {
                    OpenAnswerExamTheoryQuestion && 
                        <AnswerExamTheoryQuestion 
                            question={data?.[currentPage]['question']} 
                            questionId={data?.[currentPage]['id']} 
                            currentPage={currentPage} 
                            OpenAnswerExamTheoryQuestion={OpenAnswerExamTheoryQuestion} 
                            onClick={
                              () => {
                                setOpenAnswerExamTheoryQuestion(false)
                              }
                            } 
                        />
                }
          </>
  );
}
