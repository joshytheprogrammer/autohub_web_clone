"use client"

import { useEffect, useState } from "react"
import { UseStore } from "../../../../../state/store"
import { BASE_URL } from "../../../../../constant/Path"
import axios from "axios"
import { Router } from "lucide-react"
import { useRouter } from "next/navigation"
import { SubmitObjectiveTestQuestion, SubmitTestObjective } from "../../../../api/admin/academic/test"
import { PuffLoader } from "react-spinners"
import CountDownTimer from "../../CountDownTimer"
import Message from "../../../../../components/shared/Message"



export default function Test() 
{
  const router = useRouter()
  const TestQuestions = UseStore((state) => state)
  const token: string = TestQuestions.getUserToken()

  const [selectedOptions, setSelectedOptions] = useState<[]>([])
  const [courseId, setCourseId] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [nextQuestion, setNextQuestion] = useState<number>(-1)

  const [loading, setIsLoading] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [fakeRefresh, setFakeRefresh] = useState<number>(-1)
  const [thePlus, setThePlus] = useState<number>(0)
  const [choosen, setChoosen] = useState<[]>(TestQuestions.getSelectedOption())
  const [data, setData] = useState([])
  const [addition, setAddition] = useState<number>(-1)
  const [duration, setDuration] = useState<any>(-1)
  const [plus, setPlus] = useState<any>('')
  const [questionId, setQuestionId] = useState<number>(-1)    
        
  const [errMsgStyle, setErrMsgStyle] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => 
  {
     const checkIfForcedToSubmit = TestQuestions.getForce()
     if(checkIfForcedToSubmit === "yes")
     {
        router.push('/user/force-submit')
     }
     getTestObjectiveQuestion(token)
  }, [])

  const getTestObjectiveQuestion = async (token: string) => 
  {
    if(TestQuestions.getDataLoaded() === true)
    {
        setIsLoading(true)
        setData(TestQuestions.getFirstDataLoaded())
        console.log(TestQuestions.getFirstDataLoaded())
        setAddition(TestQuestions.getAddition())
        setDuration(TestQuestions.getDuration())
        setQuestionId(TestQuestions.getQuestionId())
        setPlus(TestQuestions.getPlus())
        
        console.log(TestQuestions.getFirstDataLoaded())
        console.log(TestQuestions.getAddition())
        console.log(TestQuestions.getDuration())
        console.log(TestQuestions.getQuestionId())
        console.log(TestQuestions.getPlus())     
        setIsLoading(false)
    } else {        
        setIsLoading(true)
        await axios.get(`${BASE_URL}academic/students/test-objective-questions`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                }
            }
            ).then((response: any) => {
                if(response?.status === 200)
                {
                  console.log(response)
                  setData(response?.data?.data)
                  setAddition(response?.data?.addition)
                  setDuration(response?.data?.message)
                  setQuestionId(response?.data?.message?.id)
                  setPlus(response?.data?.plus)

                  TestQuestions.setDataLoaded(false)                                      
                  TestQuestions.setFirstDataLoaded(response?.data?.data)
                  TestQuestions.setAddition(response?.data?.addition)
                  TestQuestions.setDuration(response?.data?.message)
                  TestQuestions.setQuestionId(response?.data?.message?.id)
                  TestQuestions.setPlus(response?.data?.plus)
                                    
                  console.log(TestQuestions.getFirstDataLoaded())
                  console.log(TestQuestions.getAddition())
                  console.log(TestQuestions.getDuration())
                  console.log(TestQuestions.getQuestionId())
                  console.log(TestQuestions.getPlus())
                  setIsLoading(false)
                }
        }).catch(() => 
        {
          setIsLoading(false)  
          TestQuestions.setDataLoaded(false)          
        })
    }
  }

  const SubmitObjectiveTest = () => 
  {
      setIsSubmitting(true)       
      const userAnswers = { userSubmitted : 'yes', answers: TestQuestions.getSelectedOption() }
      console.log(userAnswers)
      if(userAnswers.answers.length === 0)
      {
          setErrorMsg("Answer at least one question")
          setTimeout(() => {
              setIsSubmitting(false)
              setErrorMsg("")
          }, 5000)
          return false
      } else {
        const submitObjTest = SubmitObjectiveTestQuestion(userAnswers, token)
        submitObjTest.then((response: any) => 
        {
           if(response?.status === 200)
           {
             TestQuestions.setForce("no")     
             TestQuestions.setEmptyTestObjective([])
             TestQuestions.setDataLoaded([])
             router.push(`/user/dashboard`)
           } else {
             setErrMsgStyle("Submitting Result Failed")
             setTimeout(() => 
             {
                setErrMsgStyle("")
             }, 3000)
           }
         }).then(() => {
         })
      }
  }

  useEffect(() => 
    {      
        isChecked()
    }, [currentQuestion, fakeRefresh])
  
    const showQuestion = (position: number) => 
    {
        deselectAll()
        setCurrentQuestion(position)
    }
  
    const deselectAll = () => 
    {
        setChoosen(TestQuestions.getSelectedOption())
        let allOptions = document.querySelectorAll('.theOption')
        allOptions.forEach((value: any) => value.checked = false)
    }
  
    useEffect(() => 
    {
    }, [selectedOptions, answer, courseId])
  
  
    const selectOption = (course_id: number, question_id: number, selected: string, position: number) => 
    {
        const checkIfPresent = TestQuestions.getSelectedOption().findIndex((x: any) => {
          return x.position === position;
        });      
        if(checkIfPresent === -1)
        {          
            let answer = { course_id: course_id, test_question_id: question_id, selected: selected, position: position }
            console.log(answer)
            TestQuestions.setSelectedOption(answer)     
        } else {        
            TestQuestions.getSelectedOption().splice(checkIfPresent, 1);
            let answer = { course_id: course_id, test_question_id: question_id, selected: selected, position: position }
            console.log(answer)
            TestQuestions.setSelectedOption(answer)               
        }
        setCurrentQuestion(position)
        setFakeRefresh(Math.random() * position)
        // refetch()
    }
  
    const isSelected = (id: number) => 
    {
        const answeredOption = TestQuestions.getSelectedOption()
        const numbers = answeredOption.map((x: any) => x.position)
        if(numbers.includes(id))
        {
           return "yes"
        } else {
           return "no"
        }
    }
  
    const isChecked = () => 
    {
        let checkedValue;
        const theChoosen = TestQuestions.getSelectedOption()
        if(theChoosen.length === 0)
        {
           checkedValue = false
        } else
        {
          const x = theChoosen.find((p: any) => p.position === currentQuestion)
          if(x === undefined)
          {
            checkedValue = false
          } else {
            checkedValue = x.selected
          }
        }      
        return checkedValue
    }


  return (
      <div 
        className='md:col-span-9 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-3 md:px-10 py-5 mt-3 md:rounded-2xl -mb-24 md:mb-0'
      > 
        {/* <div
          className="w-full gap-5 text-xl font-bold"
        >
            START TEST                        
        </div> */}

        {
           (loading === true) && <div 
                        className="col-span-12 h-[300px] flex justify-center items-center" 
                        style={{ marginTop: '30px', paddingTop: '20px' }}
              >
                <PuffLoader color="#1c9236" />
            </div>
        }
        {
            (loading === false)  && (plus?.attended === 1) &&  <>  
                <div 
                    className="d-flex justify-center text-center items-center text-lg h-[450px] pt-52 mb-20"
                >
                   <div 
                        className="font-bold text-blue-700 pr-5 text-md mb-5 text-green-700 text-md"
                    >
                        You Already Sat for <span className="text-red-500 font-bold text-lg">{plus?.courseName}</span> Test
                    </div>
                    <span
                       className="inline-block px-5 py-3 mt-6 text-sm font-semibold text-white bg-green-600 hover:bg-green-800 rounded cursor-pointer"
                       onClick={
                            () => {
                                router.push('/user/dashboard')
                            }
                       }
                    >
                      Go Dashboard
                    </span>
                </div>
                <div
                    className="h-[200px]"
                >
                </div>
            </>
        }
        {
            (loading === false) && (plus?.attended === 0) && (plus?.before === true) && (plus?.between === false) && (plus?.after === false) && <> 
                <section 
                    className="d-flex justify-center text-center items-center text-lg h-[300px] pt-52 mb-20"
                >
                    <div 
                        className=""
                    >
                        <span 
                            className="text-blue-800 font-bold"
                        >
                            {plus?.courseName}  TEST is 
                        </span> 
                        <span 
                            className="text-red-500 mx-2"
                        >
                            between
                        </span> 
                          {plus?.beforeDate} and {plus?.afterDate}
                        <br />
                        <span
                           className="inline-block px-5 py-3 mt-6 text-sm font-semibold text-white bg-brandGreen rounded cursor-pointer"
                           onClick={
                             () => {
                                 router.push('/user/dashboard')
                              }
                          }
                        >
                            Go Dashboard
                        </span>
                    </div>
                </section>
            </>
        }

        { 
            (loading === false)  && (data.length > 0) && (plus?.attended === 0) && (plus?.before === false) && (plus?.between === true) && (plus?.after === false) &&
            // (loading === false)  && (data.length > 0) &&
                 <div 
                    className="w-full mb-1"
                 >
                    { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                    <div  
                        className="font-bold text-xl mb-4 text-green-700 -mt-7 md:mt-0 p-3 bg-green-100"
                    >
                        {plus?.courseName}
                    </div> 
                     {
                          errorMsg &&  
                          <div className="w-full text-lg font-md text-white bg-red-600 rounded-md mb-5 p-3">
                              { errorMsg }
                          </div>
                      }
                      <div 
                        className="w-full flex justify-between items-center mb-5 mt-5"
                      >
                          <span 
                            className="font-bold text-blue-700 pr-5 text-lg" style={{ fontSize: '15px' }}
                          >
                            Question {currentQuestion+1} of {data?.length}
                          </span> 
                          <span 
                            className="w-fit"
                          >
                              <CountDownTimer 
                                //  from={'test-objective'} 
                                 message="Upon Time Elapsed, Application will ask you to submit" 
                                 seconds={duration?.objective_duration}  
                                //  seconds={10} 
                              />
                          </span>
                          <button                              
                              disabled={isSubmitting}
                              className={`p-3 text-white text-sm font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'bg-red-600 hover:text-red-600 hover:bg-red-900'}`}
                              onClick={SubmitObjectiveTest}
                              >
                                SUBMIT
                          </button> 
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
                                </div>
                                <input 
                                    type="radio"
                                    // defaultChecked={true}
                                    defaultChecked={(isChecked() === 'a') ? true : false}
                                    onChange={ (e) => selectOption(Number(data[currentQuestion]['course_id']), Number(data[currentQuestion]['id']), e.target.value, Number(currentQuestion)) }
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
                                    onChange={ (e) => selectOption(Number(data[currentQuestion]['course_id']), Number(data[currentQuestion]['id']), e.target.value, Number(currentQuestion)) }
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
                                    onChange={ (e) => selectOption(Number(data[currentQuestion]['course_id']), Number(data[currentQuestion]['id']), e.target.value, Number(currentQuestion)) }
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
                                    onChange={ (e) => selectOption(Number(data[currentQuestion]['course_id']), Number(data[currentQuestion]['id']), e.target.value, Number(currentQuestion)) }
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
          }
          
          {  
            (loading === false) && data && (data.length > 0)  && (plus?.attended === 0) &&  (plus?.before === false) && (plus?.between === true) && (plus?.after === false) &&  
            // (loading === false) && data && (data.length > 0) &&   
              <div className="col-span-12 flex justify-center items-center mx-auto px-4 mt-1">
                  <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center overflow-auto overflow-y-scroll py-10" aria-label="Pagination">
                    
                    {
                      
                      data && (plus?.attended === 0) &&    
                        data.map((num, index) => {
                          const isAnswered = (isSelected(index) === "yes") ? "bg-green-700 border border-solid border-green-700" : "bg-white-600"
                          const currentAnswer = (currentQuestion === index) ? "bg-blue-600 text-white text-green-500 disabled" : `${isAnswered} ${num} border border-gray-700 cursor-pointer hover:border-gray-300 hover:bg-green-800 hover:text-white`
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
                        })
                    }
                
                  </nav>
              </div>
          }

          {  
            (loading === false) && data && (data.length > 0)  && (plus?.attended === 0) &&  (plus?.before === false) && (plus?.between === true) && (plus?.after === false) &&
            // (loading === false) && data && (data.length > 0) &&
            <div 
                className="col-span-12 flex justify-center items-center mx-auto px-4 mt-3"
            >
                <button
                  disabled={isSubmitting}
                  className={`p-3  text-white text-md font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'bg-red-600 hover:text-red-600 hover:bg-red-900'}`}
                  onClick={SubmitObjectiveTest}
                >
                    SUBMIT
                </button>
            </div>
          }
          
        <div 
            className="p-5"
        >

        </div>
      
      </div>
  )
}
