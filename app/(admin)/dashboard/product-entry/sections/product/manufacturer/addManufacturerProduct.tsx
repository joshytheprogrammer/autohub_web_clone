import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Message from "../../../../../../../components/shared/Message"
import { Modal } from "../../../../../../../components/modal/Modal"
import { AddManufacturer } from "../../../../../../api/admin/market/product-entry/manufacturer";
import toast from "react-hot-toast";
import { productsDB } from "../../../../../../model/Product";


type AddManufacturerProductProps = 
{
    onClick: () => void,
    openManufacturerProduct: boolean,
    token: string
} 

export const AddManufacturerProduct = ({onClick, openManufacturerProduct, token}: AddManufacturerProductProps)  =>
{
        const [loading, setIsLoading] = useState<boolean>(false)
        const [name, setName] = useState<string>("")
        const [manufacturerRate, setManufacturerRate] = useState<number>(-1)
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")

        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        }), []
        
        const AddManufacture = () => 
        {
            setIsLoading(true)
            const addFuel = AddManufacturer(name, manufacturerRate, token)
            addFuel.then(async (response) => 
            {
                if(response?.status === 200)
                {       
                   productsDB.clear()
                   productsDB.bulkAdd(response?.data)
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
                setIsLoading(false)
            }).then(() => {

            })
        }
        
        return (
                <Modal 
                        onClick={onClick} isOpen={openManufacturerProduct} wrapperWidth={800} margin={'120px auto 0px auto'}
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
                                                Add Manufacturer
                                        </h1>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        onChange={(e) => {
                                                                setName(e.target.value) 
                                                        }}
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="manufacturer" id="manufacturer" placeholder="Enter Manufacturer Name" 
                                                />
                                        </div>  
                                        <div 
                                            className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="colourRate" id="colourRate" placeholder="Enter Manufacturer Rating" 
                                                        onChange={(e) => {
                                                                setManufacturerRate(Number(e.target.value)) 
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
                                                                onClick={() => AddManufacture()}
                                                                        >
                                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Create" )          }
                                                </button>
                                                }
                                        </div>
                                </div>
                        </div>
                </Modal>  
        );
}