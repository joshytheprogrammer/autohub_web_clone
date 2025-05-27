import { useEffect, useState } from "react";
import { BeatLoader, PuffLoader } from "react-spinners";
import { Modal } from "../../../../../../../components/modal/Modal";
import toast from "react-hot-toast";
import Message from "../../../../../../../components/shared/Message";
// import { useQuery } from "@tanstack/react-query";
import delay from "delay";
import { countryDB, lgaDB, stateDB } from "../../../../../../model/Product";
import SelectCountry from "./SelectCountry";
import SelectState from "./SelectState";
import { AddLGA } from "../../../../../../api/admin/market/lga";
// import { GetLGA } from "../../../../../../api/admin/market/lga";
// import { GetCountry } from "../../../../../../api/admin/market/country";


type AddLGAProductProps = 
{
    onClick: () => void,
    openStateProduct: boolean,
    token: string
    callAgain: () => void
}  


export const AddLGAModal = ({onClick, openStateProduct, callAgain, token}: AddLGAProductProps)  =>
{
    // const { data, isLoading, isRefetching } = useQuery({ queryKey: [`get-all-lgas`, token], queryFn: () => GetCountry(token), refetchOnWindowFocus: true })
   
    const COUNTRY_MESSAGE = 'Select Country'
    const STATE_MESSAGE = 'Select State'
    
//     const [theCountry, setTheCountry] = useState<number>(-1)
    const [countryId, setCountryId] = useState<number>(-1)
    const [countryName, setCountryName] = useState<string>("")
    const [countryMessage, setCountryMessage] = useState<string>("")
    
    const [stateName, setStateName] = useState<string>("")
    const [stateId, setTheStateId] = useState<number>(-1)
    const [stateMessage, setStateMessage] = useState<string>("") 

    const [theStateOption, setTheStateOption] = useState<string>('invalid')
    
        const [loading, setIsLoading] = useState<boolean>(false)
        const [name, setName] = useState<string>("")
        const [stateRate, setStateRate] = useState<number>(-1)
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
        const [allCountry, setAllCountry] = useState<any>([])
        const [allState, setAllState] = useState<any>([])

        useEffect(() => 
        {
           setErrMsgStyle('text-md text-red-600 font-bold rounded-lg py-3 px-5')
           _Country() 
           _State()   
        }, [])
                        
        const _Country = async ()  => 
        {
           const country = await countryDB.toArray()
           setAllCountry(country)   
        }
                        
        const _State = async ()  => 
        {
           const state = await stateDB.toArray()
           setAllState(state)   
        }
        
        useEffect(() => 
        {
           _ChangeState(countryId)             
        }, [countryName, countryId])
                        
        const _ChangeState = async (id: number)  => 
        {
           const state = await stateDB.where("country_id").equals(id).toArray()
           console.log(state)
           setAllState(state)   
        }
        
        useEffect(() => 
        {

        }, [stateName, stateId])
        
        useEffect(() => 
        {

        }, [errorMessage])
        
        const newLga = async () => 
        {
            setIsLoading(true)
            await delay(1000)
            const addLGA = AddLGA(countryId, stateId, name, stateRate, token)
            addLGA.then((response) => 
            {
                if(response?.status === 200)
                {
                   lgaDB.clear()
                   lgaDB.bulkAdd(response?.data)
                   toast.success(response?.message, {
                       position: "top-center",
                   });
                   setIsLoading(false)
                   callAgain()  
                } else {
                    setErrorMessage(response?.message)
                  setTimeout(() => 
                  {
                     setErrorMessage("")
                  }, 3000)
                  setIsLoading(false)
                }
            }).then(() => {
            })
        }

        return (
                <Modal 
                        onClick={onClick} isOpen={openStateProduct} wrapperWidth={800} margin={'120px auto 0px auto'}
                >
                        <div 
                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                <div 
                                                className='col-span-12 px-5 h-[450px] pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >
                                        {/* {
                                                isLoading && !isRefetching &&  <div 
                                                        className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                                                        >
                                                        <PuffLoader className='w-12 h-12' color="black" />
                                                        </div>
                                        }
                                        {
                                                isLoading && isRefetching  &&  <div 
                                                        className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                                                        >
                                                        <PuffLoader className='w-12 h-12' color="black" />
                                                        </div>
                                        }
                                                
                                        {  !isLoading && (data?.length === 0) && <>
                                                <div 
                                                        className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                                                >
                                                        <div 
                                                        className="w-full d-flex justify-center items-center"
                                                        >
                                                        <div className="w-full text-center text-lg">No lga created yet</div>
                                                        </div>
                                                </div>
                                                </>
                                        }
                                        {  
                                            !isLoading && (data?.data?.length > 0) && <h1 
                                                className="text-black font-bold w-full flex justify-left text-center mb-5"
                                                >
                                                        Add LGA
                                                </h1>
                                        } */}
                                        {  
                                        //     !isLoading && (data?.data?.length > 0) && 
                                            (allCountry?.length > 0) &&  
                                            <>
                                                <div 
                                                        className="w-12/12 mb-4 border border-gray-200"
                                                >
                                 
                                                   <SelectCountry 
                                                       countries={allCountry} 
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
                                                    { countryMessage && <Message msg={COUNTRY_MESSAGE} status={errMsgStyle} /> }
                                                </div>
                                                <div 
                                                        className="w-12/12 mb-4 border border-gray-200"
                                                >
                                                        <label className="font-semibold text-xs">State</label>
                                                        <SelectState 
                                                            countryId={countryId} 
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
                                                <div 
                                                        className="mb-4 md:w-full"
                                                >
                                                        <input  
                                                                onChange={(e) => {
                                                                        setName(e.target.value) 
                                                                }}
                                                                className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                                type="text" name="state" id="state" placeholder="Enter State Name" 
                                                        />
                                                </div>     
                                                <div 
                                                        className="mb-4 md:w-full"
                                                >
                                                        <input  
                                                                className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                                type="text" name="colourRate" id="colourRate" placeholder="Enter Category Rate" 
                                                                onChange={(e) => {
                                                                        setStateRate(Number(e.target.value)) 
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
                                                                        onClick={() => newLga()}
                                                                                >
                                                                        {       (loading === true) ? ( <BeatLoader size={9} color="#fff" />) : ( "Create" )          }
                                                        </button>
                                                        }
                                                </div>
                                            </>     
                                        }
                                </div>
                        </div>
                </Modal>  
        );
}