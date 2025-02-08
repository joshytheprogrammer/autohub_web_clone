"use client"

import { useEffect, useState } from "react"
import { UseStore } from "../../../../../state/store"
import { BASE_URL } from "../../../../../constant/Path"
import axios from "axios"
import { useRouter } from "next/navigation"
import { BeatLoader, PuffLoader } from "react-spinners"
import { SubmitExamQuestions } from "../../../../api/admin/academic/exam"
import CountDownTimerExam from "./CountDownTimerExam"
import ExamObjectiveQuestions from "./pages/ExamObjectiveQuestions"
import ExamTheoryQuestions from "./pages/ExamTheoryQuestions"
import delay from "delay"


export default function Exam() 
{
  const router = useRouter()
  const ExamQuestions = UseStore((state) => state)
  const token: string = ExamQuestions.getUserToken()
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [defaultDisplay, setDefaultDisplay] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // objective
  const [data, setObjectiveQuestionExamObj] = useState<[]>([])
  const [addition, setIsAdditionExamObj] = useState<any>([])
  const [duration, setDuration] = useState<number>(-1)
  const [questionId, setQuestionId] = useState<number>(-1)
  const [plus, setPlusExamObj] = useState<any>("")

  // theory
  const [dataTheory, setTheoryQuestion] = useState<[]>([])
  const [isAdditionExamTheory, setIsAdditionExamTheory] = useState<[]>([])
  const [theoryDuration, setTheoryDuration] = useState<number>(-1)
  const [plusTheory, setPlusTheory] = useState<number>(-1)
  const [isAttemptedTheoryExam, setAttemptedTheoryExam] = useState<number>(-1)
  const [isLoadingTheory, setIsLoadingTheory] = useState<boolean>(false)
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)  

  useEffect(() => 
  {
    const checkIfForcedToSubmit = ExamQuestions.getForceExamObj()
    if(checkIfForcedToSubmit === "yes")
    {
        router.push('/user/force-exam-submit')
    } else {
        setIsLoading(true)
        setIsLoadingTheory(true)   
        getQuestions(token)
    }
    
  }, [])

  useEffect(() => 
  {
     console.log({ questionId, plus, isAdditionExamTheory, theoryDuration, plusTheory, isAttemptedTheoryExam, isLoadingTheory })
  }, [token])

  useEffect(() => 
  {

  }, [questionId, plus, isAdditionExamTheory, theoryDuration, plusTheory, isAttemptedTheoryExam, isLoadingTheory])

  const getExamQuestions = (token: string) => 
  {
        if(ExamQuestions.getDataLoadedExamObj() === true || ExamQuestions.getDataLoadedExamTheory() === true )
        {
            //objective
            setObjectiveQuestionExamObj(ExamQuestions.getFirstDataLoadedExamObj())
            setIsAdditionExamObj(ExamQuestions.getAdditionExamObj())
            setDuration(ExamQuestions.getDurationExamObj().objective_duration)
            setQuestionId(ExamQuestions.getQuestionIdExamObj())
            setPlusExamObj(ExamQuestions.getPlusExamObj())
            
            //theory            
            setTheoryQuestion(ExamQuestions.getFirstDataLoadedExamTheory())
            setIsAdditionExamTheory(ExamQuestions.getAdditionExamTheory())
            setTheoryDuration(ExamQuestions.getDurationExamTheory().theory_duration)
            setQuestionId(ExamQuestions.getQuestionIdExamTheory())
            setPlusTheory(ExamQuestions.getPlusExamTheory())
            setAttemptedTheoryExam(ExamQuestions.getPlusExamTheory())
            
            setIsLoading(false)
            setIsLoadingTheory(false)
                              
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            console.log(ExamQuestions.getDataLoadedExamTheory())
            console.log(ExamQuestions.getFirstDataLoadedExamObj())
            console.log(ExamQuestions.getAdditionExamObj())
            console.log(ExamQuestions.getDurationExamObj())
            console.log(ExamQuestions.getQuestionIdExamObj())
            console.log(ExamQuestions.getPlusExamObj())
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
                              
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            // console.log(ExamQuestions.getDataLoadedExamTheory())
            // console.log(ExamQuestions.getFirstDataLoadedExamObj())
            // console.log(ExamQuestions.getAdditionExamObj())
            // console.log(ExamQuestions.getDurationExamObj())
            // console.log(ExamQuestions.getQuestionIdExamObj())
            // console.log(ExamQuestions.getPlusExamObj())
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                
        } else {
             getQuestions(token)
            //  getExamTheoryQuestion(token)
        }
  }

  const getQuestions = async (token: string) => 
  {
     setIsLoading(true)
        await axios.get(`${BASE_URL}academic/students/exam-questions`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                }
            }).then((response) => {
                console.log(response?.data)
                console.log(response?.data?.additions)
                // console.log(response?.data?.additions?.theory)
                // objective
                setObjectiveQuestionExamObj(response?.data?.data)
                setDuration(response?.data?.message?.obj_duration)

                // theory
                setTheoryQuestion(response?.data?.plus)

                setIsAdditionExamObj(response?.data?.additions)
                // console.log(response?.data?.message?.objective_duration)
                // setObjectiveDuration(response?.data?.data?.objective_duration)
                // setAttemptedExamObj(response?.data?.plus)

                ExamQuestions.setDataLoadedExamObj(true)                                      
                ExamQuestions.setFirstDataLoadedExamObj(response?.data?.data)
                ExamQuestions.setAdditionExamObj(Number(response?.data?.addition))
                ExamQuestions.setDurationExamObj(response?.data?.message?.obj_duration)
                ExamQuestions.setQuestionIdExamObj(response?.data?.message?.id)
                ExamQuestions.setPlusExamObj(response?.data?.plus)
                                  
                console.log("###########")
                console.log(ExamQuestions.getDataLoadedExamObj())
                console.log(ExamQuestions.getFirstDataLoadedExamObj())
                console.log(ExamQuestions.getAdditionExamObj())
                console.log(ExamQuestions.getDurationExamObj())
                console.log(ExamQuestions.getQuestionIdExamObj())
                console.log(ExamQuestions.getPlusExamObj())
                console.log("###########")

                setIsLoading(false)
        }).catch((error) => {
        })
        // return $this->sendSuccess(200, $exam, $objective, $theory, $journey);
  }
  
  const SubmitObjectiveTest = async () => 
  {
      setIsSubmitting(true)
      const ans = { userSubmitted : 'yes', answers: { objective: ExamQuestions.getSelectedExamObjectiveOption(), theory:  ExamQuestions.getSelectedExamTheoryOption()  } }
     
      if(ans.answers?.objective?.length > 0 || ans?.answers?.theory.length > 0)
      {     
         await delay(2000)
         // const data = { objective: objectiveAnswers, theory: theoryAanswers }
         const submitExamQues = SubmitExamQuestions(ans, token) 
         submitExamQues.then((res: any) => 
         {setIsSubmitting(false)
           if(res?.status === 200)
           {
             ExamQuestions.setSelectedExamObjectiveOption([])
             ExamQuestions.setEmptyExamObjective([])
             ExamQuestions.setForceExamObj('no')
             ExamQuestions.setDefaultExamObjectiveAnswer([])
             ExamQuestions.setExamObjectiveIdentifier('')
             ExamQuestions.setDataLoadedExamObj(false)
             ExamQuestions.setFirstDataLoadedExamObj('')
             ExamQuestions.setAdditionExamObj('')
             ExamQuestions.setDurationExamObj('')
             ExamQuestions.setQuestionIdExamObj('')
             // theory
             ExamQuestions.setSelectedExamTheoryOption([])
             ExamQuestions.setEmptyExamTheory([])
             ExamQuestions.setSelectedExamTheoryAnswerValue('')
             ExamQuestions.setForceExamTheory('')
             ExamQuestions.setDefaultExamTheoryAnswer([])
             ExamQuestions.setExamTheoryIdentifier('')
             ExamQuestions.setDataLoadedExamTheory(false)

             setIsSubmitting(false)
             router.push('/user/dashbaord')
             // alert("Submitted")
             // return false
           } else {
              setErrorMsg("Submitting Result Failed")
              setIsSubmitting(false)
              setTimeout(
                () => {
                   setErrorMsg("")
                }, 3000)
           }

          }).catch(() => {
            setTimeout(() => {
                setIsSubmitting(false)
            }, 2000)
          })
      } else {
         setErrorMsg("Answer at least one question from either the objective or theory")
         setTimeout(
           () => {
              setIsSubmitting(false)
              setErrorMsg("")
           }, 5000)
           return false
      }
  }


  return (
          <div 
            className='md:col-span-9 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-3 md:px-10 py-5 mt-3 md:rounded-2xl -mb-24 md:mb-0'
          >     
              {
                !isLoading && 
                    <div 
                      className="col-span-12 h-[550px] flex justify-center items-center" 
                      style={{ marginTop: '30px', paddingTop: '20px' }}
                    >
                      <PuffLoader color="#1c9236" />
                </div>
              }              
              
              {
                isLoading && ((data?.length > 0) || (dataTheory?.length > 0))  && ((addition?.theory > 0) || (addition?.objective > 0)) && <>
                    <div 
                      className="d-flex justify-center text-center items-center text-lg h-[630px] pt-52 mb-20"
                    >
                       <div className="font-bold text-blue-700 pr-5 text-md mb-5 text-green-700 text-md text-red-600">You Already Sat for exam</div>
                       <br />
                       <div
                         onClick={
                            () => {
                              router.push("/dashboard/summary")
                            }
                         }
                         className="inline-block px-5 py-3 mt-6 text-sm font-semibold text-white bg-brandGreen rounded cursor-pointer"
                       >
                         Go Dashboard
                       </div>
                    </div>
                </>
              }
              {/* {dataTheory?.length} - {addition?.theory} - {addition?.objective} */}
              {
                  // !loading && (data?.addition?.theory > 0) &&  <> 
                  isLoading && ((data?.length > 0)) && (addition?.before === true) && (addition?.between === false) && (addition?.after === false) && <> 
                      <div 
                          className="d-flex justify-center text-center items-center text-lg h-[300px] pt-52 mb-20"
                      >
                         <span 
                            className="text-blue-800 font-bold mr-1"
                          >
                            ExAM 
                         </span>  
                         is 
                         <span 
                           className="text-red-500 ml-1 mr-1"
                        >
                          between 
                        </span> 
                        <span 
                          className="text-blue-800 font-bold mr-1"
                        >
                          {addition?.beforeDate}
                        </span>
                        and
                        <span 
                          className="text-blue-800 font-bold mr-1 ml-1"
                        >
                          {addition?.afterDate}
                        </span>
                          <br />
                        <div
                          onClick={
                             () => {
                               router.push("/dashboard/summary")
                             }
                          }
                          className="inline-block px-5 py-3 mt-6 text-sm font-semibold text-white bg-brandGreen rounded cursor-pointer"
                        >
                          Go Dashboard
                        </div>
                      </div>
                  </>
              }
              
              {
                // !loading && (data?.plus > 0) &&  <> d
                // (loading === false)  && ((addition?.theory > 0) || (addition?.objective > 0)) &&  ((addition?.notYet === 1) || (addition?.hasPassed === 1)) && <> 
                isLoading && (((data?.length > 0) || (dataTheory?.length > 0)) || (dataTheory?.length > 0))  && ((addition?.theory === 0) || (addition?.objective === 0)) && (addition?.before === false) && (addition?.between === false) && (addition?.after === true) && <> 
                    <section 
                        className="d-flex justify-center text-center items-center text-lg h-[600px] pt-52 mb-20"
                    >
                      <div 
                        className="font-bold text-blue-700 pr-5 text-md mb-5 text-green-700 text-md">
                            <span 
                              className="text-blue-500 mr-2"
                            >
                              EXAM
                            </span>  
                            is 
                            <span 
                              className="text-red-500 mx-2"
                            >
                              between
                            </span> 
                              {addition?.beforeDate} and {addition?.afterDate}
                          </div>
                        <div
                          onClick={
                             () => {
                               router.push("/dashboard/summary")
                             }
                          }
                          className="inline-block px-5 py-3 mt-6 text-sm font-semibold text-white bg-brandGreen rounded cursor-pointer"
                        >
                          Go Dashboard
                        </div>
                    </section>
                </>
              }
              {/* {
                isLoading && ((data?.length === 0) || (dataTheory?.length === 0)) && 
                  <div 
                    className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" 
                    style={{ marginTop: '30px', paddingTop: '20px' }}
                  >
                    <h1 
                        className="font-bold"
                    >
                      Exam Questions Not Yet Prepared
                    </h1>
                </div>
              } */}

              {  
                  isLoading &&  ((data?.length > 0) || (dataTheory?.length > 0)) && ((addition?.theory === 0) || (addition?.objective === 0)) && (addition?.before === false) && (addition?.between === true) && (addition?.after === false) &&
                      <div 
                        className="grid grid-cols-12 p-3 bg-green-100 text-green-600 rounded-lg md:mb-2 mb-5"
                      >
                        <div 
                          className="col-span-2 uppercase flex items-center text-black font-bold items-center"
                        >
                          <span 
                             className="hover:bg-green-700 cursor-pointer px-3 py-2 text-md hover:text-white rounded-lg border-2 border-blue-300"
                             onClick={
                                () => {
                                  setDefaultDisplay(0)
                                }
                              }
                          >
                             Objective
                          </span>
                        </div>
                        <div 
                          className="col-span-9 uppercase flex justify-center items-center"
                        >          
                           <CountDownTimerExam
                                //  from={'test-objective'} 
                                message="Upon Time Elapsed, Application will ask you to submit" 
                                // seconds={5}  
                                seconds={duration} 
                                question=""
                            />
                        </div>
                        <div 
                          className="col-span-1 uppercase flex text-black font-bold justify-end"
                        >
                          <span 
                             className="hover:bg-green-700 flex justify-end items-center cursor-pointer px-3 py-2 text-md hover:text-white rounded-lg border-2 border-blue-300"
                             onClick={
                                () => {
                                  setDefaultDisplay(1)
                                }
                              }
                          >
                            Theory
                          </span>
                        </div>
                      </div>
              }       

              { 
                 errorMsg &&  
                   <div 
                      className="w-full text-lg font-md text-white bg-red-600 rounded-md mb-5 p-3"
                    >
                       { errorMsg }
                   </div>
              }

              { 
                    isLoading && 
                        ((data?.length > 0) || (dataTheory?.length > 0))  &&
                        (defaultDisplay === 0) && 
                        ((addition?.theory === 0) || (addition?.objective === 0)) && (addition?.before === false) && (addition?.between === true) && (addition?.after === false) &&
                        <ExamObjectiveQuestions data={data} /> 
              }

              { 
                    isLoading && ((data?.length > 0) || (dataTheory?.length > 0)) && (defaultDisplay === 1) && 
                    ((addition?.theory === 0) || (addition?.objective === 0)) && (addition?.before === false) && (addition?.between === true) && (addition?.after === false) &&
                    <ExamTheoryQuestions data={dataTheory} question={''} /> 
              }

              { 
                  isLoading && 
                  ((data?.length > 0) || (dataTheory?.length > 0))  &&
                  (defaultDisplay === 0) && 
                  ((addition?.theory === 0) || (addition?.objective === 0)) && (addition?.before === false) && (addition?.between === true) && (addition?.after === false) && <>
                    <div 
                      className="w-full flex justify-center py-3 mt-5 bg-blue-200 border border-dotted border-4 border-red-300 items-center text-black text-md hover:text-white hover:bg-blue-600 cursor-pointer"
                      onClick={
                        () => {
                          setDefaultDisplay(1)
                        }
                      }
                    >
                        <div 
                            className={`p-1 font-bold rounded-md`}
                        >
                          Answer Theory Questions
                        </div>
                    </div>               
                  </> 
              }

              { 
                isLoading && 
                ((data?.length > 0) || (dataTheory?.length > 0))  &&
                (defaultDisplay === 1) && 
                ((addition?.theory === 0) || (addition?.objective === 0)) && (addition?.before === false) && (addition?.between === true) && (addition?.after === false) && <>
                  <div 
                    className="w-full flex justify-center py-3 mt-10 bg-blue-200 border border-dotted border-4 border-red-300 items-center text-black text-md hover:text-white hover:bg-blue-600 cursor-pointer"
                    onClick={
                      () => {
                        setDefaultDisplay(0)
                      }
                    }
                  >
                    <button 
                      className={`p-1 font-bold rounded-md`}
                    >
                      Answer Objective Questions
                      </button>
                  </div>               
                </> 
              }      

              <div className="p-2"></div>    
              
              {  
                 isLoading && 
                 ((data?.length > 0) || (dataTheory?.length > 0))  && 
                 ((addition?.theory === 0) || (addition?.objective === 0)) && (addition?.before === false) && (addition?.between === true) && (addition?.after === false) &&
                   <div 
                      className="col-span-12 flex justify-center items-center mx-auto px-4 mt-5"
                   >
                     <button
                        disabled={isSubmitting}
                        className={`p-3 text-white text-sm font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'bg-red-600 hover:text-red-600 hover:bg-red-900'}`}
                        onClick={SubmitObjectiveTest}
                      >
                        {   isSubmitting ? ( <BeatLoader size={9} color="#fff" className="" />) : ( "Sumbit" )     }
                      </button> 
                     
                     {/* <button 
                        disabled={isSubmitting}
                        className={`p-3 mb-4 text-white text-md font-bold rounded-md bg-red-600 hover:bg-red-800`}
                        onClick={SubmitObjectiveTest}
                     >
                       Submit
                     </button> */}
                 </div>
              }

          

          <div 
              className="p-5"
          >

          </div>
      
      </div>
  )
}
