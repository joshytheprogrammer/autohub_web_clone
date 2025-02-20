import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Message from "../../../../../../../components/shared/Message"
import { Modal } from "../../../../../../../components/modal/Modal"
import toast from "react-hot-toast";
import { AddEngine } from "../../../../../../api/admin/market/product-entry/engine";
import { manufacturerDB, modelDB, productsDB, trimDB } from "../../../../../../model/Product";
import SelectManufacturer from "../model/SelectManufacturer";
import SelectModel from "../model/SelectModel";
import SearchTrim from "../trim/SearchTrim";


type AddEngineProductProps = 
{
    onClick: (isOpen: boolean) => void,
    openEngineProduct: boolean,
    token: string
} 

export const AddEngineProduct = ({onClick, openEngineProduct, token}: AddEngineProductProps)  =>
{
        const [loading, setIsLoading] = useState<boolean>(false)
        const [manufacturerId, setManufacturerId] = useState<number>(-1)
        const [modelId, setModelId] = useState<number>(-1)
        const [trimId, setTrimId] = useState<number>(-1)
        const [name, setName] = useState<string>("")
        const [trimRate, setTrimRate] = useState<number>(-1)
        const [selectedModel, setSelectedModel] = useState<string>("")
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
        }, [selectedModel, selectedTrim])

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
                                   className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center px-5'
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
                                                                selectedModel={selectedModel} 
                                                                id={-1}
                                                                onClick={
                                                                   (x) => {
                                                                        if(x === -1)
                                                                        {
                                                                           setSelectedTrim("")
                                                                        } else {
                                                                            setTimeout(() =>  
                                                                            {
                                                                                setTheTrimOption('reset-trim')
                                                                                setSelectedTrim(x.toString())  
                                                                                setModelId(x) 
                                                                            })
                                                                        }
                                                                //       setTimeout(() => 
                                                                //       {
                                                                //         setModelId(x)
                                                                //       })
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
                                                                   (x: string | number) => {
                                                                      setTimeout(() => 
                                                                      {
                                                                        setTrimId(Number(x))
                                                                      })
                                                                   }
                                                                } 
                                                                trims={allTrims}
                                                                trimOption={theTrimOption}
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
                                                                type="text" name="trim" id="trim" placeholder="Enter Trim Name" 
                                                        />
                                                </div>     
                                                <div 
                                                        className="mb-4 md:w-full"
                                                >
                                                        <input  
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