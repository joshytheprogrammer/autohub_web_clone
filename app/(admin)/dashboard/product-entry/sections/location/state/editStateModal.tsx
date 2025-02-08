import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Modal } from "../../../../../../../components/modal/Modal";
import { UpdateState } from "../../../../../../api/admin/market/states";
import toast from "react-hot-toast";
import Message from "../../../../../../../components/shared/Message";


type EditProductStateProps = 
{
    onClick: () => void,
    openStateProduct: boolean,
    token: string
    data: { id: number, country_id: number, name: string, rate: number }
}  

export const EditStateModal = ({onClick, openStateProduct, data, token}: EditProductStateProps)  =>
{
        const [loading, setIsLoading] = useState<boolean>(false)
        const [id] = useState<number>(data?.id)
        const [country_id] = useState<number>(data?.country_id)
        const [name, setName] = useState<string>(data?.name)
        const [stateRate, setStateRate] = useState<number>(data?.rate)
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
        

        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
           setErrorMessage("")
        }, []) 
        
        const UpdateCountri = () => 
        {
            setIsLoading(true)
            const updateFuel = UpdateState(id, country_id, name, stateRate, token)
            updateFuel.then((response) => 
            {
                if(response?.status === 200)
                {
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
                        onClick={onClick} isOpen={openStateProduct} wrapperWidth={800} margin={'120px auto 0px auto'}
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
                                                Edit State
                                        </h1>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        defaultValue={name}
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="State" id="State" placeholder="Enter State Name" 
                                                        onChange={(e) => {
                                                                setName(e.target.value) 
                                                        }}
                                                />
                                        </div> 
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        defaultValue={stateRate}
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