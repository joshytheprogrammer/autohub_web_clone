import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Message from "../../../../../../../components/shared/Message"
import { Modal } from "../../../../../../../components/modal/Modal"
import { manufacturerDB, modelDB } from "../../../../../../model/Product";
import { UpdateTrim } from "../../../../../../api/admin/market/product-entry/trim";
import toast from "react-hot-toast";
import SelectManufacturer from "../model/SelectManufacturer";
import SelectModel from "../model/SelectModel";


type EditProductTrimProps = 
{
    onClick: (x: boolean) => void,
    openTrimProduct: boolean,
    pdata: { id: number, tb_id: number, manufacturer_id: number,  model_id: number, model_name: string, manufacturer_name: string, name: string, rate: number }
    token: string
} 

export const EditTrimProduct = ({onClick, openTrimProduct, pdata, token}: EditProductTrimProps)  =>
{
        const [loading, setIsLoading] = useState<boolean>(false)
        const [id] = useState<number>(pdata?.id)
        const [manufacturerId, setManufacturerId] = useState<number>(pdata?.manufacturer_id)
        const [modelId, setModelId] = useState<number>(pdata?.model_id)
        const [name, setName] = useState<string>(pdata?.name)
        const [manufacturerName] = useState<string>(pdata?.manufacturer_name)
        const [modelName] = useState<string>(pdata?.model_name)
        const [trimRate, setTrimRate] = useState<number>(pdata?.rate)
        const [selectedModel, setSelectedModel] = useState<string>("")
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
        const [allManufactures, setAllManufactures] = useState<any>([])
        const [allModels, setAllModels] = useState<any>([])
        const [theModelOption, setTheModelOption] = useState<string>('invalid')
        
        useEffect(() => 
        {
            _Models(manufacturerId)           
        }, [manufacturerId])

        useEffect(() => 
        {
        }, [modelId])

        useEffect(() => 
        {
        }, [allModels])

        useEffect(() => 
        {
            setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
            _Manufacturers()
            _Models(pdata?.model_id)  
        }, [])

        const _Manufacturers = async () => 
        {
            const man = await manufacturerDB.toArray()
            setAllManufactures(man)            
        }

        const _Models = async (x: number) => 
        {
            const mods = await modelDB.where("manufacturer_id").equals(x).toArray()
            setAllModels(mods)
        }
        
        const UpdateTriim = () => 
        {
            setIsLoading(true)
            const modelProduct = UpdateTrim(id, manufacturerId, modelId, name, trimRate, token)
            modelProduct.then((response) => 
            {
                if(response?.status === 200)
                {
                   toast.success('Updated', {
                       position: "top-center",
                   });
                   onClick(false)  
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
                        onClick={onClick} isOpen={openTrimProduct} wrapperWidth={800} margin={'120px auto 0px auto'}
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
                                   Update Trim
                                </h1>
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                {  
                                   (
                                      allManufactures?.length > 0) &&  
                                      <>
                                        <div 
                                                className="w-12/12 mb-4 border border-gray-200"
                                        >
                                                <SelectManufacturer 
                                                        placeholder={"-Select Manufacturer -"} 
                                                        selectedManufacturer={manufacturerName} 
                                                        id={-1}
                                                        onClick={
                                                            (x) => {
                                                                if(x === -1)
                                                                {
                                                                   setSelectedModel("")
                                                                } else {
                                                                    setTimeout(() =>  
                                                                    {
                                                                        setTheModelOption('reset-state')
                                                                        setSelectedModel(x.toString())  
                                                                        setManufacturerId(x) 
                                                                    })
                                                                }
                                                            }
                                                          } 
                                                        manufacturers={allManufactures} 
                                                />
                                        </div>  
                                        <div 
                                                className="w-12/12 mb-4 border border-gray-200"
                                        >
                                                <SelectModel
                                                        placeholder={"-Select Model -"} 
                                                        selectedModel={modelName} 
                                                        id={-1}
                                                        onClick={
                                                           (x) => {
                                                              setTimeout(() => 
                                                              {
                                                                setModelId(x)
                                                              })
                                                           }
                                                        } 
                                                        models={allModels}
                                                        modelOption="" 
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
                                                        type="text" name="trim" id="trim" placeholder="Enter Trim Name" 
                                                />
                                        </div>     
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        defaultValue={trimRate}
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="rate" id="rate" placeholder="Enter Trim Rate" 
                                                        onChange={(e) => {
                                                                setTrimRate(Number(e.target.value)) 
                                                        }}
                                                />
                                        </div>
                                        <div 
                                           className="items-center gap-5 mt-5 sm:flex flex justify-between mx-1 mt-5"
                                        >                                       
                                                {
                                                        <button 
                                                                className="py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-semibold text-sm rounded-xl w-max"
                                                                onClick={() => onClick(false) }
                                                        >
                                                                        Close
                                                        </button>
                                                }
                                                {
                                                <button 
                                                                className="py-3 px-4 bg-green-800 hover:bg-green-700 text-white font-semibold text-sm rounded-xl w-max"
                                                                onClick={() => UpdateTriim()}
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