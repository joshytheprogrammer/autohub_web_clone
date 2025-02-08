import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Modal } from "../../../../../../components/modal/Modal";
import { AddFuel } from "../../../../../api/admin/market/fuel";
import Message from "../../../../../../components/shared/Message";
import toast from "react-hot-toast";

type AddFuelProductProps = 
{
    onClick: () => void,
    openFuelProduct: boolean,
    token: string
} 

export const AddFuelProduct = ({onClick, openFuelProduct, token}: AddFuelProductProps)  =>
{
        const [loading, setIsLoading] = useState<boolean>(false)
        const [name, setName] = useState<string>("")
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")

        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
           setErrorMessage("")
           setIsLoading(false)
        }), []
        
        const AddFueel = () => 
        {
            setIsLoading(true)
            const addFuel = AddFuel(name, token)
            addFuel.then((response) => 
            {
                if(response?.status === 200)
                {
                   toast.success('Created', {
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
                        onClick={onClick} isOpen={openFuelProduct} wrapperWidth={800} margin={'120px auto 0px auto'}
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
                                                Add Fuel
                                        </h1>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input   
                                                        onChange={(e) => {
                                                                setName(e.target.value) 
                                                        }}
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="fuel" id="fuel" placeholder="Enter Fuel Name" 
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
                                                                onClick={() => AddFueel()}
                                                                        >
                                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Add" )          }
                                                </button>
                                                }
                                        </div>
                                </div>
                        </div>
                </Modal>  
        );
}