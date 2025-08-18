import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "./modal/Modal"
import Message from "./shared/Message"
import { UseStore } from "../state/store"
import { useRouter } from "next/navigation"
import delay from "delay"
import api from "../app/api/api"
import Cookies from 'js-cookie';


type SaveDraftProps = 
{
    onClick: () => void 
    deleteModal: boolean 
}    

export const Logout = ({onClick, deleteModal}: SaveDraftProps)  =>
{
        console.log(Cookies.get('user-in-use'))
        const router = useRouter()
        const UserPics = UseStore((state) => state)
        const [loading, setIsLoading] = useState<boolean>(false)
    
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
   
        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-blue-600 rounded-lg py-3 px-5')
           setErrorMessage("")
           LogUserOut()
        //    callIt()
        }, []) 

        const callIt = async () => 
        {            
           let ApiUrl = '/api/auth/logout'
           await api.post(ApiUrl)
           .then((response: any) => 
            {
               if(response?.data?.status === 200)
               {
                  setIsLoading(false)
                  setErrorMessage("")
                  UserPics.setUserToken("")
                  UserPics.setFName("")
                  UserPics.setSName("")
                  UserPics.setUType("")
                  router.push('/login')   
                //   window.location.href = '/'                    
               } else {
                  setIsLoading(false)
                  setErrorMessage("User session ended, click away")
                  setTimeout(() => 
                  {
                    setErrorMessage("")                                
                  }, 10000)                 
               }
            })
        }
        

        const LogUserOut = async () => 
        { 
           await delay(1000)
           UserPics.setSName("")
           UserPics.setUType("")
           UserPics.setUserToken("")           

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

           UserPics.setProductId(-1)
           UserPics.setOnEdit("no")
           UserPics.setUserToken("")
           UserPics.setCountry(-1)
           UserPics.setCountryName("")
           UserPics.setStates(-1)
           UserPics.setStateName("")
           UserPics.setLGA(-1)
           UserPics.setLgaName("")
           UserPics.setOurLgaName("")
           UserPics.setCategory(-1)
           UserPics.setCategoryName("")
           UserPics.setManufacturer(-1)
           UserPics.setManufacturerName("")
           UserPics.setModel(-1)
           UserPics.setModelName("")
           UserPics.setTrim(-1)
           UserPics.setTrimName("")
           UserPics.setGeneration(-1)
           UserPics.setGenerationName("")
           UserPics.setColour(-1)
           UserPics.setColourName("")
           UserPics.setYear("")
           UserPics.setYearName("")
           UserPics.setSerie(-1)
           UserPics.setSerieName("")
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


           UserPics.setCategories([])
           UserPics.setCountries([])
           UserPics.setStatess([])
           UserPics.setLGAS([])
           UserPics.setManufactuers([])
           UserPics.setModels([])
           UserPics.setGenerations([])
           UserPics.setSeries([])
           UserPics.setTrims([])
           UserPics.setColours([])
           UserPics.setFuels([])
           UserPics.setTransmissions([])
           UserPics.setConditions([])
           UserPics.setProductDetail([])

           UserPics.setTheSerieName("")
           UserPics.setTheGenerationName("")

           UserPics.setImagePosition(-1)
           UserPics.setSaveOption("")


           UserPics.setForce("no")     
           UserPics.setEmptyTestObjective([])
           UserPics.setDataLoaded(false)

           
           UserPics.setFirstDataLoadedExamObj([])
        //    UserPics.setAdditionExamObj('')
           UserPics.setDurationExamObj('')
           UserPics.setQuestionIdExamObj('')

           // objective
           UserPics.setSelectedExamObjectiveOption([])
           UserPics.setEmptyExamObjective([])
           UserPics.setDefaultExamObjectiveAnswer([])
           UserPics.setExamObjectiveIdentifier('')
           UserPics.setDataLoadedExamObj(false)
           UserPics.setFirstDataLoadedExamObj('')
        //    UserPics.setAdditionExamObj('')
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

        //    UserPics.setPlusExamObj('')
        //    window.location.href = '/' 
                     
           let ApiUrl = '/api/auth/logout'
           await api.post(ApiUrl)
           .then((response: any) => 
            {
               if(response?.data?.status === 200)
               {
                  setIsLoading(false)
                  setErrorMessage("")
                  UserPics.setUserToken("")
                  UserPics.setFName("")
                  UserPics.setSName("")
                  UserPics.setUType("")                  
                  Cookies.remove('user-in-use')
                  router.push('/login')   
                //   window.location.href = '/'                    
               } else {
                  setIsLoading(false)
                  setErrorMessage("User session ended, click away")
                  setTimeout(() => 
                  {
                    setErrorMessage("")                                
                  }, 10000)                 
               }
            })
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
