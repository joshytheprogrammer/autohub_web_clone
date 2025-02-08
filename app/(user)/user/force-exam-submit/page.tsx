"use client"

import { useEffect, useState } from "react"
import { UseStore } from "../../../../state/store"
import { useRouter } from "next/navigation"
import { SubmitObjectiveTestQuestion } from "../../../api/admin/academic/test"
import { BeatLoader } from "react-spinners"
import delay from "delay"
import { SubmitExamQuestions } from "../../../api/admin/academic/exam"


// export default function ForceSubmit({ from, message }: { from: string, message: string }) 
export default function ForceExamObjectiveSubmit()
{
    const router = useRouter()
    const ExamObjectiveQuestions = UseStore((state) => state)
    const token: string = ExamObjectiveQuestions.getUserToken()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<boolean>(false)
    const [emptyAnswer, setEmptyAnswer] = useState<[]>([])
    const [toBeSubmitted, setToBeSubmitted] = useState<[]>([])
        
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')

       if((ExamObjectiveQuestions.getSelectedExamTheoryOption().length === 0) && (ExamObjectiveQuestions.getSelectedExamObjectiveOption().length === 0))
       {            
          const systemAnswer = { userSubmitted : 'no', answers: { objective: '', theory: '' } }
          ExamObjectiveQuestions.setDefaultExamObjectiveAnswer(systemAnswer)
       } else {
          const systemAnswer = { userSubmitted : 'yes', answers: { objective: ExamObjectiveQuestions.getSelectedExamObjectiveOption(), theory: ExamObjectiveQuestions.getSelectedExamTheoryOption() } }
          ExamObjectiveQuestions.setDefaultExamObjectiveAnswer(systemAnswer)
       }
    }, [])

    const SubmitObjectiveTest = async () => 
    {
      setIsSubmitting(true)
      await delay(3000)
      //  console.log(ExamObjectiveQuestions.getDefaultTestObjectiveAnswer())
       const submitObjTest = SubmitExamQuestions(ExamObjectiveQuestions.getDefaultExamObjectiveAnswer(), token)
       submitObjTest.then((response: any) => 
       {
          if(response?.status === 200)
          {
            ExamObjectiveQuestions.setSelectedExamObjectiveOption([])
            ExamObjectiveQuestions.setEmptyExamObjective([])
            ExamObjectiveQuestions.setForceExamObj('no')
            ExamObjectiveQuestions.setDefaultExamObjectiveAnswer([])
            ExamObjectiveQuestions.setExamObjectiveIdentifier('')
            ExamObjectiveQuestions.setDataLoadedExamObj(false)
            ExamObjectiveQuestions.setFirstDataLoadedExamObj('')
            ExamObjectiveQuestions.setAdditionExamObj('')
            ExamObjectiveQuestions.setDurationExamObj('')
            ExamObjectiveQuestions.setQuestionIdExamObj('')
            // theory
            ExamObjectiveQuestions.setSelectedExamTheoryOption([])
            ExamObjectiveQuestions.setEmptyExamTheory([])
            ExamObjectiveQuestions.setSelectedExamTheoryAnswerValue('')
            ExamObjectiveQuestions.setForceExamTheory('')
            ExamObjectiveQuestions.setDefaultExamTheoryAnswer([])
            ExamObjectiveQuestions.setExamTheoryIdentifier('')
            ExamObjectiveQuestions.setDataLoadedExamTheory(false)
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
      ExamObjectiveQuestions.setForce("no")     
      ExamObjectiveQuestions.setEmptyTestObjective([])
      ExamObjectiveQuestions.setDataLoaded([])
    }
    

    return (
      <>
        <div 
            className="col-span-12 h-[700px] d-flex justify-center items-center bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg" 
            style={{ marginTop: '10px', paddingTop: '100px' }}
        >
            {/* { isSubmitting && <p className="font-bold text-green-700 text-lg col-span-12 text-center text-red-700">Exam Ended</p> } */}

            <span 
                className="p-20 mt-20"
            >

            </span>

            <p 
              className="font-bold text-green-700 text-lg col-span-12 text-center text-red-700 mt-20"
            >
                Exam Ended, Submit to have your result
            </p>

            <div 
              className="flex justify-center items-center mt-5"
            >                
              {/* <button type="sumbit" 
                disabled={isSubmitting}
                className={`p-3 text-white text-md font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'cursor-pointer bg-green-600 hover:text-red-300 hover:bg-red-900'}`}
                onClick={SubmitObjectiveTest}
              >
                Submit
              </button> */}

              <div
                onClick={
                  () => {
                      SubmitObjectiveTest()
                    }
                  }
                className={`md:p-3 p-5 hover:text-xs text-white text-sm font-bold rounded-md cursor-pointer bg-green-600 hover:text-gray-300 hover:bg-green-700`}
              >
                  { isSubmitting ? ( <BeatLoader size={9} color="#fff" />) : ( "Submit Answers" )  }                
              </div>
            </div>
        </div>
        <div className="p-5"></div>
      </>
    );
}
