import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Message from "../../../../../../../components/shared/Message"
import { Modal } from "../../../../../../../components/modal/Modal"
import toast from "react-hot-toast";
import { AddEngine } from "../../../../../../api/admin/market/product-entry/engine";
import { manufacturerDB, modelDB, productsDB, trimDB } from "../../../../../../model/Product";
import SelectManufacturer from "./SelectManufacturer";
import SelectModel from "./SelectModel";
import SearchTrim from "./SearchTrim";


type AddEngineProductProps = 
{
    onClick: (isOpen: boolean) => void,
    openEngineProduct: boolean,
    token: string
} 

export const AddEngineProduct = ({onClick, openEngineProduct, token}: AddEngineProductProps)  =>
{
        const [loading, setIsLoading] = useState<boolean>(false)
        
        const [name, setName] = useState<string>("")
        const [trimRate, setTrimRate] = useState<number>(-1)

        const [manufacturerId, setManufacturerId] = useState<number>(-1)
        const [manufacturerName, setManufacturerName] = useState<string>("")

        const [modelId, setModelId] = useState<number>(-1)
        const [modelName, setModelName] = useState<string>("")

        const [trimId, setTrimId] = useState<number>(-1)
        const [trimName, setTrimName] = useState<string>("")

        const [selectedTrim, setSelectedTrim] = useState<string>("")
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
        const [allManufactures, setAllManufactures] = useState<any>([])
        const [allModels, setAllModels] = useState<any>([])
        const [allTrims, setAllTrims] = useState<any>([])
        const [theModelOption, setTheModelOption] = useState<string>('invalid')
        const [theTrimOption, setTheTrimOption] = useState<string>('invalid')

        useEffect(() => 
        {
            _Models(manufacturerId)           
        }, [manufacturerId])

        useEffect(() => 
        {
           _Trim(modelId) 
        }, [modelId])

        useEffect(() => 
        {
                
        }, [selectedTrim])

        useEffect(() => 
        {
        }, [modelName])

        useEffect(() => 
        {
        }, [trimId])

        useEffect(() => 
        {
        }, [trimName])

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

        const _Models = async (x: number) => 
        {
            if(x === -1)
            {
                setAllModels([])
            } else {
                const mods = await modelDB.where("manufacturer_id").equals(x).toArray()
                setAllModels(mods)
            }
        }

        const _Trim = async (x: number) => 
        {
            if(x === -1 || x === undefined)
            {
                setAllTrims([])
            } else {
                const trms = await trimDB.where("model_id").equals(x).toArray()
                setAllTrims(trms)
            }
        }
        
        const AddEnginee = () => 
        {
            setIsLoading(true)
            console.log({manufacturerId, modelId, trimId, name, trimRate, token})
            const productTrim = AddEngine(manufacturerId, modelId, trimId, name, trimRate, token)
            productTrim.then((response: any) => 
            {
                if(response?.status === 200)
                {
                   productsDB.clear()
                   productsDB.bulkAdd(response?.data)
                   toast.success('Created', {
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
                        onClick={onClick} isOpen={openEngineProduct} wrapperWidth={800} margin={'120px auto 0px auto'}
                >
                        <div 
                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <div 
                                   className='col-span-12 pt-1 pb-1 h-[565px] justify-center item-center px-5'
                                >
                                        <h1 
                                           className="font-bold text-md uppercase text-blue-600 mb-3"
                                        >
                                           Add Engine
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
                                                                selectedManufacturer={""} 
                                                                id={-1}
                                                                onClick={
                                                                    (manId: number, manName: string) => {
                                                                        if(manId === -1)
                                                                        {
                                                                           setTheModelOption('reset-model')
                                                                           setManufacturerId(manId)
                                                                           setManufacturerName("")
                                                                           setModelId(-1)   
                                                                           setModelName("") 
                                                                           setTrimId(-1)   
                                                                           setTrimName("") 
                                                                        } else {
                                                                            setTimeout(() =>  
                                                                            {
                                                                                setTheModelOption('reset-model')
                                                                                setManufacturerId(manId) 
                                                                                setManufacturerName(manName)
                                                                                setModelId(-1)   
                                                                                setModelName("") 
                                                                                setTrimId(-1)   
                                                                                setTrimName("") 
                                                                            }, 100)
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
                                                                selectedManufacturerName={manufacturerName} 
                                                                id={-1}
                                                                onClick={
                                                                   (modelId: number, modelName: string) => {
                                                                        if(modelId === -1)
                                                                        {
                                                                           setTheTrimOption('reset-trim')   
                                                                           setModelId(-1)   
                                                                           setModelName("") 
                                                                           setTrimId(-1)   
                                                                           setTrimName("") 
                                                                        } else {
                                                                            setTimeout(() =>  
                                                                            {  
                                                                                setModelId(modelId)   
                                                                                setModelName(modelName) 
                                                                                setTheTrimOption('re-reset')                                                                                
                                                                                setTrimId(-1)   
                                                                                setTrimName("") 
                                                                            }, 100)
                                                                        }
                                                                   }
                                                                } 
                                                                models={allModels}
                                                                modelOption={theModelOption}
                                                        />
                                                </div> 
                                                <div 
                                                        className="w-12/12 mb-4 border border-gray-200"
                                                >
                                                        <SearchTrim
                                                                placeholder={"-Select Trim -"} 
                                                                selectedTrim={selectedTrim} 
                                                                onClick={
                                                                   (trimId: number, trimName: string) => {
                                                                        if(trimId === -1)
                                                                        {
                                                                           setTrimId(-1)   
                                                                           setTrimName("") 
                                                                        } else {
                                                                            setTimeout(() =>  
                                                                            {  
                                                                                setTrimId(trimId)   
                                                                                setTrimName(trimName) 
                                                                            }, 100)
                                                                        }
                                                                   }
                                                                } 
                                                                modelId={modelId}
                                                                trims={allTrims}
                                                                trimOption={theTrimOption}
                                                                selectedManufacturerName={manufacturerName} 
                                                                selectedModelName={modelName} 
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
                                                                type="text" name="engine" id="engine" placeholder="Enter Engine Name" 
                                                        />
                                                </div>     
                                                <div 
                                                        className="mb-4 md:w-full"
                                                >
                                                        <input  
                                                                className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                                type="text" name="rate" id="rate" placeholder="Enter Engine Rate" 
                                                                onChange={(e) => {
                                                                        setTrimRate(Number(e.target.value)) 
                                                                }}
                                                        />
                                                </div>
                                                <div 
                                                   className="items-center gap-5 sm:flex flex justify-between mx-1 mt-20"
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
                                                                        onClick={() => AddEnginee()}
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