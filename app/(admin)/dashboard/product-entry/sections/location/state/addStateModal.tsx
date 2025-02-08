import { useEffect, useState } from "react";
import { BeatLoader, PuffLoader } from "react-spinners";
import { Modal } from "../../../../../../../components/modal/Modal";
import { AddState } from "../../../../../../api/admin/market/states";
import toast from "react-hot-toast";
import Message from "../../../../../../../components/shared/Message";
import { useQuery } from "@tanstack/react-query";
import { GetCountry } from "../../../../../../api/admin/market/country";
import delay from "delay";


type AddStateProductProps = 
{
    onClick: () => void,
    openStateProduct: boolean,
    token: string
    callAgain: (countryId: number) => void
}  


export const AddStateModal = ({onClick, openStateProduct, callAgain, token}: AddStateProductProps)  =>
{
        const { data, isLoading, isRefetching } = useQuery({ queryKey: [`get-all-country`, token], queryFn: () => GetCountry(token), refetchOnWindowFocus: true })

        const [loading, setIsLoading] = useState<boolean>(false)
        const [countryId, setCountryId] = useState<number>(-1)
        const [name, setName] = useState<string>("")
        const [stateRate, setStateRate] = useState<number>(-1)
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")

        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        }), []

        useEffect(() => 
        {

        }, [errorMessage])

        // const customStyle = 
        // {
        //    backgroundColor: "red",
        //    color: "#FFFFFF",
        //    fontWeight: "bold",
        //    width: '100%'
        // }
        
        const addState = async () => 
        {
            setIsLoading(true)
            await delay(1000)
            const addState = AddState(countryId, name, stateRate, token)
            addState.then((response) => 
            {
                if(response?.status === 200)
                {
                   toast.success(response?.message, {
                       position: "top-center",
                   });
                   setIsLoading(false)
                   callAgain(countryId)  
                } else {
                //     toast.error(response?.message,
                //       {
                //          position: "top-center",
                //          style: customStyle
                //        },
                //     );
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
                                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >
                                        {
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
                                                        <div className="w-full text-center text-lg">No country created yet</div>
                                                        </div>
                                                </div>
                                                </>
                                        }
                                        {  
                                            !isLoading && (data?.data?.length > 0) && <h1 
                                                className="text-black font-bold w-full flex justify-left text-center mb-5"
                                                >
                                                        Add State
                                                </h1>
                                        }
                                        {  
                                            !isLoading && (data?.data?.length > 0) &&  
                                            <>
                                                <div 
                                                        className="w-12/12 mb-4 border border-gray-200"
                                                >
                                                        <div 
                                                        className="relative border text-gray-800 bg-white col-span-3 md:col-span-2"
                                                        >
                                                        <select
                                                                onChange={(e) => {
                                                                   setCountryId(Number(e.target.value));
                                                                }} 
                                                                className="appearance-none w-full py-4 pl-3 md:pr-20 pr-14 bg-white" name="whatever" id="frm-whatever">
                                                                <option value={-1}>- Select Country -</option>
                                                                {
                                                                data?.data.map((country: { id: number, name: string }, index: number) => {
                                                                        return (
                                                                        <option 
                                                                                key={index} value={country?.id}
                                                                        >
                                                                                {country?.name}
                                                                        </option>
                                                                        )
                                                                })
                                                                }
                                                        </select>
                                                        <div 
                                                                className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l"
                                                        >
                                                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                                </svg>
                                                        </div>
                                                        </div>
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
                                                                        onClick={() => addState()}
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