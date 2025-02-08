import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Modal } from "../../../../../../../components/modal/Modal"
import { UpdateModel } from "../../../../../../api/admin/market/product-entry/model";
import toast from "react-hot-toast";
import Message from "../../../../../../../components/shared/Message";
import SelectManufacturer from "./SelectManufacturer";
import { manufacturerDB } from "../../../../../../model/Product";


type EditProductModelProps = 
{
    onClick: () => void,
    openModelProduct: boolean,
    token: string
    pdata: { id: number,  manufacturer_id: number, name: string, rate: number }
    selectedManufacture: string
} 

export const EditModelProduct = ({onClick, openModelProduct, pdata, selectedManufacture, token}: EditProductModelProps)  =>
{
        // const { data, isLoading, isRefetching } = useQuery({ queryKey: [`get-all-model`, token], queryFn: () => GetAllManufacturer(token), refetchOnWindowFocus: true })

        const [loading, setIsLoading] = useState<boolean>(false)
        const [id] = useState<number>(pdata?.id)
        const [manufacturerId, setManufacturerId] = useState<number>(pdata?.manufacturer_id)
        const [name, setName] = useState<string>(pdata?.name)
        const [modelRate, setModelRate] = useState<number>(pdata?.rate)
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
        const [allManufactures, setAllManufactures] = useState<any>([])


        useEffect(() => 
        {
            
        }, [manufacturerId, modelRate, name])

        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
           _Manufacturers()
        }, [])
        

        const _Manufacturers = async () => 
        {
            const mans = await manufacturerDB.toArray()
            setAllManufactures(mans)
        }
        
        const UpdateModeel = () => 
        {
            setIsLoading(true)
            const modelProduct = UpdateModel(id, manufacturerId, name, modelRate, token)
            modelProduct.then((response) => 
            {
                if(response?.status === 200)
                {
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
                setIsLoading(false)
            }).then(() => {

            })
        }
        return (
                <Modal 
                        onClick={onClick} isOpen={openModelProduct} wrapperWidth={800} margin={'120px auto 0px auto'}
                >
                        <div 
                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <div 
                                        className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center px-5'
                                >
                                        <h1 
                                           className="font-bold text-md uppercase text-blue-600 mb-3"
                                        >
                                           Update Model
                                        </h1>
                                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                        
                                        {  
                                                (allManufactures?.length > 0) &&  
                                                <>
                                                        <div 
                                                                className="w-12/12 mb-4 border border-gray-200"
                                                        >
                                                                <SelectManufacturer 
                                                                                placeholder={"-Select Manufacturer -"} 
                                                                                selectedManufacturer={selectedManufacture}
                                                                                id={manufacturerId} 
                                                                                onClick={
                                                                                     (x) => {
                                                                                        setTimeout(() => 
                                                                                        {
                                                                                           setManufacturerId(x)
                                                                                        })
                                                                                     }
                                                                                } 
                                                                                manufacturers={allManufactures} 
                                                                        />
                                                        </div>  
                                                        <div 
                                                                className="mb-4 md:w-full"
                                                        >
                                                                <input  
                                                                        defaultValue={name}
                                                                        onChange={(e) => {
                                                                                setName(e.target.value) 
                                                                        }}
                                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                                        type="text" name="model" id="model" placeholder="Enter Model Name" 
                                                                />
                                                        </div>     
                                                        <div 
                                                                className="mb-4 md:w-full"
                                                        >
                                                                <input  
                                                                        defaultValue={modelRate}
                                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                                        type="text" name="rate" id="rate" placeholder="Enter Manufacture Rate" 
                                                                        onChange={(e) => {
                                                                                setModelRate(Number(e.target.value)) 
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
                                                                                onClick={() => UpdateModeel()}
                                                                                        >
                                                                                {       (loading === true) ? ( <BeatLoader size={9} color="#fff" />) : ( "Update" )          }
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