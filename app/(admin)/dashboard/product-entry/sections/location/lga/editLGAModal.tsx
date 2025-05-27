import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Modal } from "../../../../../../../components/modal/Modal";
import toast from "react-hot-toast";
import Message from "../../../../../../../components/shared/Message";
import { countryDB, lgaDB, stateDB } from "../../../../../../model/Product";
import { UpdateLGA } from "../../../../../../api/admin/market/lga";
import EditSelectCountry from "./EditSelectCountry";
import EditLGAState from "./EditSelectState";


type EditProductLGAProps = 
{
    onClick: () => void,
    openStateProduct: boolean,
    token: string
    data: { id: number, name: string, country_id: number, country_name: string, state_id: number, state_name: string, rate: number }
}  

export const EditLGAModal = ({onClick, openStateProduct, data, token}: EditProductLGAProps)  =>
{
        const COUNTRY_MESSAGE = 'Select Country'
        const STATE_MESSAGE = 'Select State'

        const [loading, setIsLoading] = useState<boolean>(false)
        const [id, setId] = useState<number>(data?.id)

        const [countryId, setCountryId] = useState<number>(data?.country_id)
        const [countryName, setCountryName] = useState<string>(data?.country_name)
        const [countryMessage, setCountryMessage] = useState<string>("")

        const [stateId, setTheStateId] = useState<number>(data?.state_id)
        const [stateName, setStateName] = useState<string>(data?.state_name)
        const [stateMessage, setStateMessage] = useState<string>("") 

        const [lgId, setLgaId] = useState<number>(data?.id)
        const [lgaName, setLgaName] = useState<string>(data?.name)

        const [lgaRate, setLGARate] = useState<number>(data?.rate)
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")

        const [allCountry, setAllCountry] = useState<any>([])
        const [allState, setAllState] = useState<any>([])

        const [theCountryOption, setTheCountryOption] = useState<string>('invalid')
        const [theStateOption, setTheStateOption] = useState<string>('invalid')

               
        useEffect(() => 
        {
           setErrMsgStyle('text-md text-red-400 font-bold rounded-lg py-1 px-5')
           setErrorMessage("")
           setCountryId(data?.country_id)
           setCountryName(data?.country_name)
           setTheStateId(data?.state_id)
           setStateName(data?.state_name)
           setLgaName(data?.name)
           setLgaId(data?.id)
           setLGARate(data?.rate)
            _getAllCountry();
        }, []) 
        
        useEffect(() => 
        {
            _State(countryId)           
        }, [countryId])

        useEffect(() => 
        {
                           
        }, [lgaName])

        const _getAllCountry = async ()  => 
        {
            const country = await countryDB.toArray()
            setAllCountry(country)  
        }
        
        const _State = async (id: number)  => 
        {
            const state = await stateDB.where("country_id").equals(Number(id)).toArray()
            setAllState(state)   
        }

        const UpdateCountri = () => 
        {
            setIsLoading(true)
        //     console.log({id, countryId, stateId, countryName, lgaRate, token})
        //     setIsLoading(false)
        //     return false
            const updateFuel = UpdateLGA(id, countryId, stateId, lgaName, lgaRate, token)
            updateFuel.then((response) => 
            {
                if(response?.status === 200)
                {
                   lgaDB.clear()
                   lgaDB.bulkAdd(response?.data)
                   setIsLoading(false)
                   toast.success('Updated', {
                      position: "top-center",
                   });
                   onClick()  
                } else {
                   setErrorMessage(response?.message)
                   setTimeout(() => 
                   {
                      setErrorMessage("")
                   }, 5000)
                }
            }).then(() => {

            })
        }

        return (
                <Modal 
                        onClick={onClick} isOpen={openStateProduct} wrapperWidth={600} margin={'120px auto 0px auto'}
                >
                        <div 
                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                <div 
                                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >
                                        <h1 
                                                className="text-black font-bold w-full flex justify-left text-center mb-5"
                                        >
                                                Edit LGA
                                        </h1>
        
                                        <div 
                                            className="w-12/12 mb-4"
                                        >
                                            <div 
                                               className="relative text-gray-800 bg-white col-span-3 md:col-span-2"
                                            >
                                               <div 
                                                   className="w-12/12 mb-4"
                                                >
                                 
                                                   <EditSelectCountry
                                                       countries={allCountry} 
                                                       countryName={countryName} 
                                                       countryId={countryId}
                                                       edit={true}  
                                                       placeholder={"- Select Country -"} 
                                                       onClick={
                                                          (selectedX: string, cId: number) => 
                                                          {
                                                            if(cId === -1)
                                                            {
                                                               setCountryId(cId)
                                                               setCountryName("")
                                                               setTheStateId(-1)
                                                               setStateName("")
                                                               setCountryMessage(COUNTRY_MESSAGE)
                                                               setTheStateOption('reset-state')
                                                             } else {
                                                               setCountryId(cId)
                                                               setCountryName(selectedX)
                                                               setTheStateId(-1)
                                                               setStateName("")
                                                               setCountryMessage("")
                                                               setTheStateOption('reset-state')
                                                             }
                                                           }
                                                        } 
                                                     />                                                     
                                                    {/* { countryMessage && <Message msg={COUNTRY_MESSAGE} status={errMsgStyle} /> } */}
                                                </div>

                                                <div 
                                                   className="w-12/12 mb-4"
                                                >
                                                        {/* {countryId} - {stateId} */}

                                                        {/* <label className="font-semibold text-xs">State</label> */}
                                                        <EditLGAState 
                                                            countryId={countryId} 
                                                            countryName={countryName}
                                                            selectedStateName={stateName}
                                                            stateOption={theStateOption} 
                                                            states={allState}
                                                            edit={true}  
                                                               placeholder={"- Select State -"} 
                                                               onClick={
                                                                  (cId) => 
                                                                  {
                                                                    if(cId === -1)
                                                                    {                                            
                                                                       setTheStateId(cId)
                                                                       setStateMessage(STATE_MESSAGE)
                                                                    } else {            
                                                                       setTheStateId(cId)
                                                                       setStateMessage("")                                          
                                                                    }
                                                                   }
                                                                } 
                                                        />
                                                    { stateMessage && <Message msg={STATE_MESSAGE} status={errMsgStyle} /> }                                                        
                                                </div> 

                                              </div>
                                           </div> 
                                        <div 
                                           className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        defaultValue={lgaName}
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="lga" id="lga" placeholder="Enter LGA Name" 
                                                        onChange={(e) => {
                                                                setLgaName(e.target.value) 
                                                        }}
                                                />
                                        </div> 
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                        </div>     
                                        <div 
                                            className="mb-4 md:w-full"
                                        >
                                            <input  
                                                defaultValue={lgaRate}
                                                className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                type="text" name="lgaRate" id="lgaRate" placeholder="Enter LGA Rate" 
                                                onChange={(e) => {
                                                        setLGARate(Number(e.target.value)) 
                                                }}
                                            />
                                         </div>  
                                        <div 
                                        className="items-center gap-5 mt-2 sm:flex flex justify-between mx-1 mt-5"
                                        >                                       
                                                {
                                                        <button 
                                                                className="py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-semibold text-sm rounded-xl w-max"
                                                                onClick={() => onClick() }
                                                        >
                                                                        Close
                                                        </button>
                                                }
                                                {
                                                <button 
                                                                className="py-3 px-4 bg-green-800 hover:bg-green-700 text-white font-semibold text-sm rounded-xl w-max"
                                                                onClick={() => UpdateCountri()}
                                                                        >
                                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Update" )          }
                                                </button>
                                                }
                                        </div>
                                </div>
                        </div>
                </Modal>   
        );
}