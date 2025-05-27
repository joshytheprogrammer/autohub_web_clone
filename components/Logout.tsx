import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "./modal/Modal"
import Message from "./shared/Message"
import { UseStore } from "../state/store"
// import { LogOutUser } from "../app/api/home/home"
import { useRouter } from "next/navigation"
import delay from "delay"


type SaveDraftProps = 
{
    onClick: () => void 
    deleteModal: boolean 
    token: string 
}    

export const Logout = ({onClick, deleteModal, token}: SaveDraftProps)  =>
{
        const router = useRouter()
        const UserPics = UseStore((state) => state)
        const [loading, setIsLoading] = useState<boolean>(false)
    
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
   
        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
           setErrorMessage("")
           LogUserOut()
        }, []) 

        const LogUserOut = async () => 
        { 
           await delay(2000)
           UserPics.setUserToken("")
           UserPics.setFName("")
           UserPics.setSName("")
           UserPics.setUType("")

           UserPics.setForce("no")     
           UserPics.setEmptyTestObjective([])
           UserPics.setDataLoaded(false)

           
           UserPics.setFirstDataLoadedExamObj([])
           UserPics.setAdditionExamObj('')
           UserPics.setDurationExamObj('')
           UserPics.setQuestionIdExamObj('')

           // objective
           UserPics.setSelectedExamObjectiveOption([])
           UserPics.setEmptyExamObjective([])
           UserPics.setDefaultExamObjectiveAnswer([])
           UserPics.setExamObjectiveIdentifier('')
           UserPics.setDataLoadedExamObj(false)
           UserPics.setFirstDataLoadedExamObj('')
           UserPics.setAdditionExamObj('')
           UserPics.setDurationExamObj('')
           UserPics.setQuestionIdExamObj('')
           
           // theory
           UserPics.setSelectedExamTheoryOption([])
           UserPics.setEmptyExamTheory([])
           UserPics.setSelectedExamTheoryAnswerValue('')
           UserPics.setForceExamTheory('')
           UserPics.setDefaultExamTheoryAnswer([])
           UserPics.setExamTheoryIdentifier('')
           UserPics.setDataLoadedExamTheory(false)
           UserPics.setForceExamObj('no')
           UserPics.setUserRoles([])

           UserPics.setSideType('member')

           UserPics.setCompanyName(""),
           UserPics.setCompanyAddress(""),
           UserPics.setRCNumber(""),
           UserPics.setFirstname(""),
           UserPics.setSurname(""),
           UserPics.setMiddlename(""),
           UserPics.setPhone(""),
           UserPics.setEmail(""),
           UserPics.setPassword("")
           UserPics.setMemberAgreement(0)

           UserPics.setOnEdit("no")
           UserPics.setCountry(-1)
           UserPics.setCountryName("")
           UserPics.setStates(-1)
           UserPics.setLGA(-1)
           UserPics.setLgaName("")
           UserPics.setStateName("")
           UserPics.setCategory(-1)
           UserPics.setCategoryName("")
           UserPics.setManufacturer(-1)
           UserPics.setManufacturerName("")
           UserPics.setModel(-1)
           UserPics.setModelName("")
           UserPics.setTrim(-1)
           UserPics.setTrimName("")
           UserPics.setEngine(-1)
           UserPics.setEngineName("")
           UserPics.setColour(-1)
           UserPics.setColourName("")
           UserPics.setYear("x")
           UserPics.setYearName("")
           UserPics.setTransmission(-1)
           UserPics.setTransmissionName("")
           UserPics.setCondition(-1)
           UserPics.setConditionName("")
           UserPics.setFuel(-1)
           UserPics.setFuelName("")
           UserPics.setMileage("")
           UserPics.setLocation("")
           UserPics.setChasisNo("")
           UserPics.setDescription("")
           UserPics.setPrice("")
           UserPics.setOthers("no")
           UserPics.setTheManufacturerName("")
           UserPics.setTheModelName("")
           UserPics.setTheTrimName("")
           UserPics.setTheEngineName("")
           UserPics.setTheMakerModels([])
           UserPics.setTheModelTrim([])
           UserPics.setTrimEngine([])
           UserPics.setStateModel([])
           UserPics.setLGAModel([])
           UserPics.setImagePosition(-1)
           UserPics.setSaveOption("")

        //    UserPics.setPlusExamObj('')
           window.location.href = '/'
        //    router.push('/')
        //    const loggingUserOut = LogOutUser(token)
        //    loggingUserOut.then((response) => 
        //    {
        //         setErrorMessage("")
        //       if(response?.status === 200)
        //       {
        //          setIsLoading(false)
        //          setErrorMessage("")
        //          UserPics.setUserToken("")
        //          UserPics.setFName("")
        //          UserPics.setSName("")
        //          UserPics.setUType("")
        //          router.push('/login')                 
        //       } else {
        //          setIsLoading(false)
        //          setErrorMessage("Difficulty logging you out")
        //          setTimeout(() => 
        //          {
        //              setErrorMessage("")                                
        //          }, 10000)
        //       }
        //     }).then(() => {
                
        //     })
        }

        return (
                <Modal onClick={onClick} isOpen={deleteModal} wrapperWidth={500} margin={'240px auto 0px auto'}>
                        <div 
                             className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} /> }                            
                                
                                <div 
                                    className="items-center gap-5 mt-2 sm:flex d-flex justify-center items-center mb-2 mx-5 mt-5"
                                >               
                                        <button 
                                             className="py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                                        >
                                            {       (loading === false) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Logging Out" ) } 
                                        </button>
                                        <div className="whitespace-unwrap">
                                                Loggin 
                                                <span 
                                                        className="text-blue-500 font-bold ml-1 mr-1"
                                                >
                                                        {UserPics.getFName()} {UserPics.getSName()}
                                                </span>
                                                <span 
                                                        className="font-bold text-red-600"
                                                >
                                                        Out
                                                </span>
                                        </div>
                                </div>
                        </div>
                </Modal>  
        );
}
