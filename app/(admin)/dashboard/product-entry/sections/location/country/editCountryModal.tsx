import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Modal } from "../../../../../../../components/modal/Modal";
import { UpdateCountry } from "../../../../../../api/admin/market/country";
import toast from "react-hot-toast";
import Message from "../../../../../../../components/shared/Message";


type EditProductCountryProps = 
{
    onClick: () => void,
    openCountryProduct: boolean,
    token: string
    data: { id: number, name: string, rate: number }
} 

export const EditCountryModal = ({onClick, openCountryProduct, data, token}: EditProductCountryProps)  =>
{
        const [loading, setIsLoading] = useState<boolean>(false)
        const [id] = useState<number>(data?.id)
        const [name, setName] = useState<string>(data?.name)
        const [countryRate, setCountryRate] = useState<number>(data?.rate)
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
            const updateFuel = UpdateCountry(id, name, countryRate, token)
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
                        onClick={onClick} isOpen={openCountryProduct} wrapperWidth={800} margin={'120px auto 0px auto'}
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
                                                Edit Country
                                        </h1>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input 
                                                        onChange={(e) => {
                                                                setName(e.target.value) 
                                                        }}
                                                        defaultValue={name}
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="country" id="country" placeholder="Enter Country Name" 
                                                />
                                        </div>   
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        defaultValue={countryRate}
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="colourRate" id="colourRate" placeholder="Enter Category Rate" 
                                                        onChange={(e) => {
                                                                setCountryRate(Number(e.target.value)) 
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