import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { SubmitExamQuestions } from "../../../../../api/admin/academic/exam";
import { UseStore } from "../../../../../../state/store";

export default function ExamObjectiveQuestions({ data }: { data: any }) 
{
  const router = useRouter()
  const ExamQuestions = UseStore((state) => state)
  const token: string = ExamQuestions.getUserToken()
  
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)  
  const [selectedOptions, setSelectedExamObjectiveOptions] = useState<[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [fakeRefresh, setFakeRefresh] = useState<number>(-1)
  const [choosen, setChoosen] = useState<[]>(ExamQuestions.getSelectedExamObjectiveOption())  
  const [courseId, setCourseId] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [nextQuestion, setNextQuestion] = useState<number>(-1)
  
  useEffect(() => 
  {      
     isChecked()
  }, [currentQuestion, fakeRefresh])

  const SubmitObjectiveTest = () => 
  {
      setIsSubmitting(true)
      
      const objectiveAnswers = { userSubmitted : 'yes', answers: ExamQuestions.getSelectedExamObjectiveOption() }
      const theoryAanswers = { userSubmitted : 'yes', answers: ExamQuestions.getSelectedExamTheoryOption() }
      if(objectiveAnswers.answers.length > 0 || theoryAanswers.answers.length > 0)
      {       
        const examQues = SubmitExamQuestions('x', token)
        examQues.then((res: any) => 
        {
          if(res?.status === "submitted")
          {
            ExamQuestions.setEmptyExamObjective([])
            ExamQuestions.setEmptyExamTheory([])
            router.push('/dashboard/summary')
          } else {
            setErrorMsg("Submitting Result Failed")
            setIsSubmitting(false)
            setTimeout(
              () => {
                 setErrorMsg("")
            }, 3000)
          }
        }).catch(() => {
            setTimeout(
             () => {
                setIsSubmitting(false)
             }, 2000)
        })
      } else {
            setErrorMsg("Answer at least one question from either the objective or theory")
            setTimeout(() => {
                setIsSubmitting(false)
                setErrorMsg("")
            }, 2000)
        return false
      }
  }

  const isChecked = () => 
  {
      let checkedValue;
      const theChoosen = ExamQuestions.getSelectedExamObjectiveOption()
      if(theChoosen.length === 0)
      { 
        //  console.log("It is zero")
         checkedValue = false
      } else
      {
        // console.log("Has Value")
        // console.log(currentQuestion)
        const x = theChoosen.find((p: any) => p.position === currentQuestion)
        if(x === undefined)
        {
          checkedValue = false
        } else {
          checkedValue = x.selected
        }
      }      
      // console.log(checkedValue)
      return checkedValue
  }

  const selectOption = (question_id: number, selected: string, position: number) => 
  {
      // console.log({ question_id, selected, position })

      const checkIfPresent = ExamQuestions.getSelectedExamObjectiveOption().findIndex((x: any) => {
        return x.position === position;
      });   
      // alert(checkIfPresent)
      // return false   
      if(checkIfPresent === -1)
      {          
        //  console.log("Not Present")
         let answer = { exam_question_id: question_id, selected: selected, position: position }
         ExamQuestions.setSelectedExamObjectiveOption(answer)  
        //  console.log(ExamQuestions.getSelectedExamObjectiveOption())  
      } else {   
        //  console.log("In it")      
         ExamQuestions.getSelectedExamObjectiveOption().splice(checkIfPresent, 1);
         let answer = { exam_question_id: question_id, selected: selected, position: position }
         ExamQuestions.setSelectedExamObjectiveOption(answer)      
        //  console.log(ExamQuestions.getSelectedExamObjectiveOption())   
      }
      // console.log(position)
      setCurrentQuestion(position)
      setFakeRefresh(Math.random() * position)
  }

  const showQuestion = (position: number) => 
  {
      deselectAll()
      setCurrentQuestion(position)
  }

  const deselectAll = () => 
  {
      setChoosen(ExamQuestions.getSelectedExamObjectiveOption())
      let allOptions = document.querySelectorAll('.theOption')
      allOptions.forEach((value: any) => value.checked = false)
  }

  useEffect(() => {
  }, [selectedOptions, answer, courseId])

  const isSelected = (id: number) => 
  {
      const answeredOption = ExamQuestions.getSelectedExamObjectiveOption()
      const numbers = answeredOption.map((x: any) => x.position)
       if(numbers.includes(id))
       {
          // console.log(id)
          // console.log(numbers)
          return "yes"
       } else {
          // console.log(id)
          // console.log(numbers)
          return "no"
       }
  }


  return (
            <>
                <div 
                    className="w-full mb-1 md:mt-3"
                >
                    <div 
                        className="mb-2 text-white cursor-pointer grid grid-cols-12 justify-between rounded-lg"
                    >                              
                         {/* <div className="font-bold text-xl mb-4 text-green-700 mt-28 md:mt-0 p-3 bg-green-100 col-span-12">Course:  Artificial Intelligence</div> */}
                    </div>

                    { 
                      errorMsg &&  
                          <div 
                              className="w-full text-lg font-md text-white bg-red-600 rounded-md mb-5 p-3"
                          >
                            { errorMsg }
                          </div>
                    }

                    <div 
                        className="w-full flex justify-between items-center"
                    >
                      <span 
                          className="font-bold text-blue-700 pr-5 text-lg" 
                          style={{ fontSize: '15px' }}
                      >
                        Objective Question {currentQuestion+1} of {data?.length}
                      </span> 
                      <span 
                        className="w-fit"
                      >
                         {/* <CountDownTimerExamObjective seconds={data?.message?.objective_duration} question={data?.addition} code={data?.message?.exam_code} /> */}
                      </span>
                      {/* <button
                          disabled={isSubmitting}
                          className={`p-3 text-white text-sm font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'bg-red-600 hover:text-red-600 hover:bg-red-900'}`}
                          onClick={SubmitObjectiveTest}
                      >
                        {   isSubmitting ? ( <BeatLoader size={9} color="#fff" className="" />) : ( "Sumbit" )     }
                      </button>  */}
                    </div>

                    <div 
                        className="d-flex -mb-3 col-span-12 py-1"
                      >
                          {/* <h1 className="font-bold -mb-1 ml-1">Question: {((data?.data?.length))}</h1> */}
                          <div 
                            className="p-5 shadow-md bg-white border border-2 border-green-200 my-2"
                          >                             
                            <h1 
                               className="w-full font-bold text-blue-900 mb-4"
                            >
                                {data[currentQuestion]['question']}
                            </h1>

                            <div 
                                className="flex mt-2 justify-left space-between-5 mb-3"
                            >
                               <div 
                                  className="p-1 font-bold text-blue-300"
                                >
                                  (a)
                                   {/* - {(isChecked() === 'a') ? "Yes" : "No"} */}
                                </div>
                                <input 
                                    type="radio"
                                    // defaultChecked={true}
                                    defaultChecked={(isChecked() === 'a') ? true : false}
                                    onChange={ (e) => selectOption(Number(data[currentQuestion]['id']), e.target.value, Number(currentQuestion)) }
                                    className="peer relative appearance-none w-5 h-5 border border-red-400 border-2 cursor-pointer rounded-full checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                    id="theOption11" name="theOption1" value={'a'}
                                    checked={(isChecked() === 'a') ? true : false }
                                /> 
                                <div 
                                   className="p-1 text-lg -mt-1"
                                >
                                    {data[currentQuestion]['option_a']}
                                </div>
                            </div>
                            
                            <div 
                                className="flex mt-2 justify-left space-between-5 mb-3"
                            >
                               <div 
                                    className="p-1 font-bold text-blue-300"
                                >
                                    (b)
                                </div>
                                <input 
                                    type="radio"
                                    // defaultChecked={false}
                                    defaultChecked={(isChecked() === 'b') ? true : false }
                                    onChange={ (e) => selectOption(Number(data[currentQuestion]['id']), e.target.value, Number(currentQuestion)) }
                                    className="peer relative appearance-none w-5 h-5 border border-red-400 border-2 cursor-pointer rounded-full checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                    id="theOption22" name="theOption2" value={'b'}
                                    checked={(isChecked() === 'b') ? true : false }
                                /> 
                                <div 
                                    className="p-1 text-lg -mt-1"
                                >
                                    {data[currentQuestion]['option_b']}
                                </div>
                            </div>
                            
                            <div 
                                className="flex mt-2 justify-left space-between-5 mb-3"
                            >
                                <div 
                                    className="p-1 font-bold text-blue-300"
                                >
                                    (c)
                                </div>
                                <input 
                                    type="radio"                                 
                                    // defaultChecked={false}    
                                    defaultChecked={(isChecked() === 'c') ? true : false }           
                                    onChange={ (e) => selectOption(Number(data[currentQuestion]['id']), e.target.value, Number(currentQuestion)) }
                                    className="peer relative appearance-none w-5 h-5 border border-red-400 border-2 cursor-pointer rounded-full checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                    id="theOption33" name="theOption3" value={'c'}
                                    checked={(isChecked() === 'c') ? true : false }
                                /> 
                                <div 
                                    className="p-1 text-lg -mt-1"
                                >
                                    {data[currentQuestion]['option_c']}
                                </div>
                            </div>
                            
                            <div 
                                className="flex mt-2 justify-left space-between-5 mb-3"
                            >
                               <div 
                                    className="p-1 font-bold text-blue-300"
                               >
                                (d)
                               </div>
                               <input 
                                    type="radio"
                                    // defaultChecked={false}
                                    defaultChecked={(isChecked() === 'd') ? true : false }
                                    onChange={ (e) => selectOption(Number(data[currentQuestion]['id']), e.target.value, Number(currentQuestion)) }
                                    className="peer relative appearance-none w-5 h-5 border border-red-400 border-2 cursor-pointer rounded-full checked:bg-blue-600 mt-1 ml-3 mr-1 theOption"
                                    id="theOption44" name="theOption4" value={'d'}
                                    checked={(isChecked() === 'd') ? true : false }
                                /> 
                               <div 
                                    className="p-1 text-lg -mt-1"
                                >
                                    {data[currentQuestion]['option_d']}
                                </div>
                            </div>

                          </div>
                      </div>


                </div>
                {  
              (
                data?.length > 0) && 
                <>
                  <div 
                     className="col-span-12 flex justify-center items-center mx-auto px-4 mt-1"
                  >
                    <nav 
                      className="flex flex-row flex-nowrap justify-between md:justify-center items-center overflow-auto overflow-y-scroll py-10" 
                      aria-label="Pagination"
                    >
                      {                            
                          data &&          
                              data?.map((num: any, index: number) => 
                              {
                                  const isAnswered = (isSelected(index) === "yes") ? "bg-green-700 border border-solid border-green-700" : "bg-white-600"
                                  const currentAnswer = (currentQuestion === index) ? "bg-blue-600 text-white text-green-500 disabled" : `${isAnswered} border border-gray-700 cursor-pointer hover:border-gray-300 hover:bg-green-800 hover:text-white`
                                  const style = `${currentAnswer} md:flex py-1 px-3 mx-1 justify-center items-center rounded-full font-bold text-black` 
                                  return (
                                      <a 
                                        key={index}
                                        className={style} title={`Page ${num}`} onClick={() => showQuestion(index)}
                                      >
                                        {index+1}
                                      </a>  
                                    )
                                  }
                              )
                      }                            
                    </nav>
                  </div>
                </>
          }
            </>
  )
}
