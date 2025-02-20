import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Message from "../../../../../../../components/shared/Message"
import { Modal } from "../../../../../../../components/modal/Modal"
import { AddModel } from "../../../../../../api/admin/market/product-entry/model";
import toast from "react-hot-toast";
// import { useQuery } from "@tanstack/react-query";
import SelectManufacturer from "./SelectManufacturer";
// import { GetAllManufacturer } from "../../../../../../api/admin/market/product-entry/manufacturer";
import { manufacturerDB, productsDB } from "../../../../../../model/Product";


type AddModalProductProps = 
{
    onClick: () => void,
    openModelProduct: boolean,
    token: string
} 

export const AddModelProduct = ({onClick, openModelProduct, token}: AddModalProductProps)  =>
{
        // const { data, isLoading, isRefetching } = useQuery({ queryKey: [`get-all-model`, token], queryFn: () => GetAllManufacturer(token), refetchOnWindowFocus: true })        

        const [loading, setIsLoading] = useState<boolean>(false)
        const [manufacturerId, setManufacturerId] = useState<number>(-1)
        const [name, setName] = useState<string>("")
        const [manufacturerRate, setManufacturerRate] = useState<number>(-1)
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
        const [allManufactures, setAllManufactures] = useState<any>([])

        useEffect(() => 
        {
            
        }, [manufacturerId])

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
        
        const AddModeel = () => 
        {
            setIsLoading(true)
            const modelProduct = AddModel(manufacturerId, name, manufacturerRate, token)
            modelProduct.then((response) => 
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
                                           Add Model
                                        </h1>
                                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
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
                                                        <div className="w-full text-center text-lg">No model created yet</div>
                                                        </div>
                                                </div>
                                                </>
                                        }
                                        {  
                                        !isLoading && (data?.data?.length > 0) && <h1 
                                                className="text-black font-bold w-full flex justify-left text-center mb-5"
                                                >
                                                        Add Model
                                                </h1>
                                        } */}
                                        {  
                                           (allManufactures?.length > 0) &&  
                                           <>
                                                <div 
                                                        className="w-12/12 mb-4 border border-gray-200"
                                                >
                                                        <SelectManufacturer 
                                                                        placeholder={"-Select Manufacturer -"} 
                                                                        selectedManufacturer={""} 
                                                                        id={-1}
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
                                                                className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                                type="text" name="rate" id="rate" placeholder="Enter Manufacture Rate" 
                                                                onChange={(e) => {
                                                                        setManufacturerRate(Number(e.target.value)) 
                                                                }}
                                                        />
                                                </div>
                                                <div 
                                                   className="items-center gap-5 mt-5 sm:flex flex justify-between mx-1 mt-5"
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
                                                                        onClick={() => AddModeel()}
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