"use client"

import { useEffect, useState } from "react"
import MultipleImageUpload from "../../../../components/shared/MultipleImageUpload"
import { UseStore } from "../../../../state/store"
import SelectCountry from "../../../../components/advert/SelectCountry"
import SelectState from "../../../../components/advert/SelectState"
import SelectManufacturer from "../../../../components/advert/SelectManufacturer"
import SelectModel from "../../../../components/advert/SelectModel"
import SelectTrim from "../../../../components/advert/SelectTrim"
import SelectEngine from "../../../../components/advert/SelectEngine"
import Message from "../../../../components/shared/Message"
import { useCreateAd } from "../../../hook/queries/useCreateAd"
import { BeatLoader, PuffLoader } from "react-spinners"
import SelectCategory from "../../../../components/SelectCategory"
import SelectFuel from "../../../../components/advert/SelectFuel"
import SelectYear from "../../../../components/advert/SelectYear"
import { Years } from "../../../../components/util/years"
import SelectColour from "../../../../components/advert/SelectColour"
import SelectTransmission from "../../../../components/advert/SelectTransmission"
import SelectCondition from "../../../../components/advert/SelectCondition"
import TextArea from "./Editor/TextArea"
import axios from "axios"
import { BASE_URL } from "../../../../constant/Path"
import { useRouter } from "next/navigation"


export default function CreateAdvert() 
{
    const router = useRouter()
    const advertState = UseStore((state) => state)
    const token: string = advertState.getUserToken()
    const userType: string = advertState.getUType()
    const years = Years()
    
    const { data,  isLoading, completed } = useCreateAd()
    ///
    const COUNTRY_MESSAGE = 'Select Country'
    const STATE_MESSAGE = 'Select State'
    const CATEGORY_MESSAGE = 'Select Category'
    const MANUFACTURER_MESSAGE = 'Select Manufacturer'
    // const RESET_MANUFACTURER_MESSAGE = 'Reset Manufacture'
    const MODEL_MESSAGE = 'Select Model'
    // const RESET_MODEL_MESSAGE = 'Reset Model'
    const TRIM_MESSAGE = 'Select Trim'
    // const TRIM_MODEL_MESSAGE = 'Reset Trim'
    const ENGINE_MESSAGE = 'Select Engine'
    // const ENGIEN_MODEL_MESSAGE = 'Reset Trim'
    const FUEL_MESSAGE = 'Select Engine'
    const YEAR_MESSAGE = 'Select Year'
    const COLOUR_MESSAGE = 'Select Colour'
    const TRANSMISSION_MESSAGE = 'Select Transmission'
    const CONDITION_MESSAGE = 'Select Condition'
    const MILEAGE_MESSAGE = 'Select Mileage'
    const LOCATION_MESSAGE = 'Select Location'
    const CHAISIS_NO_MESSAGE = 'Select Chasis Number'
    const PRICE_MESSAGE = 'Select price'
    const MANUFACTURER_NAME_MESSAGE = 'Enter Manufacturer Name'
    const MODEL_NAME_MESSAGE = 'Enter Model Name'
    const TRIM_NAME_MESSAGE = 'Enter Trim Name'
    const ENGINE_NAME_MESSAGE = 'Enter Engine Name'
    const DESCRIPTION_MESSAGE = 'Enter Prdoduct Description'
    const IMAGE_POSITION_MESSAGE = 'Select any of the image as the main image (the image marked main will be what will appear on the home page)'
    const ERROR_MESSAGE = 'Ensure all compulsory fields are attended to'
    ///
    const [countryId, setCountryId] = useState<number>(advertState.getCountry())
    const [countryMessage, setCountryMessage] = useState<string>("")
    const [stateId, setTheStateId] = useState<number>(advertState.getStates())
    const [stateMessage, setStateMessage] = useState<string>("")
    ///
    const [theCountry] = useState<number>(advertState.getCountry())
    const [theState, setTheState] = useState<any[]>(advertState.getStateModel())
    const [theStateOption, setTheStateOption] = useState<string>('invalid')

    const [category, setCategory] = useState<number>(advertState.getCategory())
    const [categoryMessage, setCategoryMessage] = useState<string>("")
    const [theCategoryOption, setTheCategoryOption] = useState<string>('invalid')
    
    const [theManufacturer, setTheManufacturer] = useState<number>(advertState.getManufacturer())
    const [manufacturerMessage, setManufacturerMessage] = useState<string>("")
    const [theDescription, setTheDescription] = useState(advertState.getDescription())
    // const [theManufacturerOption, setTheManufacturerOption] = useState<string>('invalid')

    const [theModel, setTheModel] = useState<any[]>(advertState.getTheMakerModels())
    const [modelMessage, setModelMessage] = useState<string>("")
    const [theModelOption, setTheModelOption] = useState<string>('invalid')
    
    const [theModelId, setTheModelId] = useState<number>(advertState.getModel())
    const [theTrim, setTheTrim] = useState<any[]>(advertState.getTheModelTrim())
    const [trimMessage, setTrimMessage] = useState<string>("")
    const [theTrimOption, setTheTrimOption] = useState<string>('invalid')
    
    const [theTrimId, setTheTrimId] = useState<number>(advertState.getTrim())
    const [theEngine, setTheEngine] = useState<any[]>(advertState.getTrimEngine())
    const [theEngineOption, setTheEngineOption] = useState<string>('invalid')

    const [theEngineId, setTheEngineId] = useState<number>(-1)
    
    const [fuelMessage, setFuelMessage] = useState<string>("")
    const [yearMessage, setYearMessage] = useState<string>("")
    const [colourMessage, setColourMessage] = useState<string>("")
    const [transmissionMessage, setTransmissionMessage] = useState<string>("")
    const [engineMessage, setEngineMessage] = useState<string>("")
    const [conditionMessage, setConditionMessage] = useState<string>("")
    const [mileageMessage] = useState<string>("")
    const [locationMessage, setLocationMessage] = useState<string>("")
    const [chasisNoMessage, setChasisNoMessage] = useState<string>("")
    const [priceMessage, setPriceMessage] = useState<string>("")    
    const [description, setDescriptionErrorMsg] = useState<string>("")  

    const [theManufacturerName] = useState("")
    const [theModelName] = useState("")
    const [theTrimName] = useState("")
    const [theEngineName] = useState("")

    const [theManufacturerNameMessage, setTheManufacturerNameMessage] = useState("")
    const [theModelNameMessage, setTheModelNameMessage] = useState("")
    const [theTrimNameMessage, setTheTrimNameMessage] = useState("")
    const [theEngineNameMessage, setTheEngineNameMessage] = useState("")
    const [imagePosition, setImagePositionMessage] = useState("")
    

    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [advertImages, setAdvertImages] = useState<string[]>([])
  
    const [value] = useState(advertState.getDescription())
    const [type, setType] = useState("x")

    const [errorMessage, setErrorMessage] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)
    
    useEffect(() => 
    {
       setErrMsgStyle('text-md text-red-600 font-bold')
       setErrorMessage("")
    }, [])    

    useEffect(() => 
    {
        setTheDescription(value)   
        advertState.setDescription(value)
    }, [value])

    useEffect(() => 
    {
        setTimeout(() => 
        {
            setErrorMessage("")
        }, 5000)
    }, [errorMessage])

    useEffect(() => 
    {

    }, [type])

    useEffect(() => 
    {
        console.log({ theTrimId, theEngineId, yearMessage, theCountry, theCategoryOption, category, theManufacturer, theDescription, theModelId, theManufacturerName, theModelName, theTrimName, theTrimNameMessage, theEngineName})
    }, [theState, stateId])

    const SaveAdvert = async (option: string) => 
    {
        setLoading(true)
        setType(option)
        const checkFields: string = allFields()
        if(checkFields === 'valid')
        {
            const data = {
                country: Number(advertState.getCountry()), state: Number(advertState.getStates()), category: Number(advertState.getCategory()),
                others: advertState.getOthers(), manufacturer: Number(advertState.getManufacturer()), model: Number(advertState.getModel()), trim: Number(advertState.getTrim()), engine: Number(advertState.getEngine()),
                theManufacturer:  advertState.getTheManufacturerName(), theModel: advertState.getTheModelName(), theTrim: advertState.getTheTrimName(), theEngine: advertState.getTheEngineName(),
                fuel: Number(advertState.getFuel()), year: advertState.getYear(), colour: Number(advertState.getColour()), transmission: Number(advertState.getTransmission()), 
                condition: Number(advertState.getCondition()), milage: advertState.getMileage(), location: advertState.getLocation(), imagePosition: Number(advertState.getImagePosition()),
                chasis_no: advertState.getChasisNo(), price: advertState.getPrice(), description: advertState.getDescription(), mileage: advertState.getMileage(), address: advertState.getLocation(),
                images: advertImages,
                draft: option
            }
            console.log(data)
            
            let endPoint = `${userType}/create`
            let ApiUrl = `${BASE_URL}${endPoint}`
            await axios.post(`${ApiUrl}`, data, 
            { 
                headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`,
                }
            }).then((response) => 
                {
                    if(response?.data?.status === 200)
                    {
                        clearFields()
                        clearFields()
                        router.push('/user/adverts')
                    } else {
                        setLoading(false)
                        setErrorMessage(response?.data?.message)
                        setTimeout(() => 
                        {
                            setErrorMessage("")
                        }, 5000)
                    }
                }).catch(() => {           
                    return false
                })
        } else {
            setLoading(false)
            setErrorMessage(ERROR_MESSAGE)
            setTimeout(() => 
            {
                setErrorMessage("")
            }, 5000)
            return false
        }
    }

    const clearFields = () => 
    {    
        advertState.setProductId(-1)
        advertState.setOnEdit("no")
        advertState.setCountry(-1)
        advertState.setCountryName("")
        advertState.setStates(-1)
        advertState.setStateName("")
        advertState.setCategory(-1)
        advertState.setCategoryName("")
        advertState.setManufacturer(-1)
        advertState.setManufacturerName("")
        advertState.setModel(-1)
        advertState.setModelName("")
        advertState.setTrim(-1)
        advertState.setTrimName("")
        advertState.setEngine(-1)
        advertState.setEngineName("")
        advertState.setColour(-1)
        advertState.setColourName("")
        advertState.setYear("x")
        advertState.setYearName("")
        advertState.setTransmission(-1)
        advertState.setTransmissionName("")
        advertState.setCondition(-1)
        advertState.setConditionName("")
        advertState.setFuel(-1)
        advertState.setFuelName("")
        advertState.setMileage("")
        advertState.setLocation("")
        advertState.setChasisNo("")
        advertState.setDescription("")
        advertState.setPrice("")
        advertState.setOthers("no")
        advertState.setTheManufacturerName("")
        advertState.setTheModelName("")
        advertState.setTheTrimName("")
        advertState.setTheEngineName("")
        advertState.setTheMakerModels([])
        advertState.setTheModelTrim([])
        advertState.setTrimEngine([])
        advertState.setStateModel([])
        advertState.setImagePosition(-1)
        advertState.setSaveOption("")
    }

    const allFields = () => 
    {
        let validity: string = 'valid'
        if(advertState.getCountry() === -1){ setCountryMessage(COUNTRY_MESSAGE); validity = 'invalid'; console.log("1") }
        if(advertState.getStates() === -1){ setStateMessage(STATE_MESSAGE); validity = 'invalid'; console.log("2")  }
        if(advertState.getCategory() === -1){ setCategoryMessage(CATEGORY_MESSAGE); validity = 'invalid'; console.log("3")  }
        if(advertState.getOthers() === "no")
        {
            if(advertState.getManufacturer() === -1){ setManufacturerMessage(MANUFACTURER_MESSAGE); validity = 'invalid'; console.log("4")  }
            if(advertState.getModel() === -1){ setModelMessage(MODEL_MESSAGE); validity = 'invalid'; console.log("5")  }
            // if(advertState.getTrim() === -1){ setTrimMessage(TRIM_MESSAGE); validity = 'invalid' }
            // if(advertState.getEngine() === -1){ setEngineMessage(ENGINE_MESSAGE); validity = 'invalid' }
        } else {
            if(advertState.getTheManufacturerName() === ""){ setTheManufacturerNameMessage(MANUFACTURER_NAME_MESSAGE); validity = 'invalid'; console.log("6")  }
            if(advertState.getTheModelName() === -1){ setTheModelNameMessage(MODEL_NAME_MESSAGE); validity = 'invalid'; console.log("7")  }
            if(advertState.getTheTrimName() === -1){ setTheTrimNameMessage(TRIM_NAME_MESSAGE); validity = 'invalid'; console.log("8")  }
            if(advertState.getTheEngineName() === -1){ setTheEngineNameMessage(ENGINE_NAME_MESSAGE); validity = 'invalid'; console.log("9")  }            
        }

        if(advertState.getFuel() === -1){ setFuelMessage(FUEL_MESSAGE); validity = 'invalid'; console.log("10")  }
        if(advertState.getYear() === "x"){ setYearMessage("Select Year"); validity = 'invalid'; console.log("11")  }
        if(advertState.getColour() === -1){ setColourMessage(COLOUR_MESSAGE); validity = 'invalid'; console.log("12")  }
        if(advertState.getTransmission() === -1){ setTransmissionMessage(TRANSMISSION_MESSAGE); validity = 'invalid'; console.log("13")  }
        if(advertState.getCondition() === -1){ setConditionMessage(CONDITION_MESSAGE); validity = 'invalid'; console.log("14")  }
        // if(advertState.getMileage() === ""){ setMileageMessage(MILEAGE_MESSAGE); validity = 'invalid' }
        if(advertState.getLocation() === ""){ setLocationMessage(LOCATION_MESSAGE); validity = 'invalid'; console.log("15")  }
        // if(advertState.getChasisNo() === ""){ setChasisNoMessage(MILEAGE_MESSAGE); validity = 'invalid' }
        if(advertState.getPrice() === ""){ setPriceMessage(PRICE_MESSAGE); validity = 'invalid'; console.log("16")  }
        if(advertState.getDescription() === ""){ setDescriptionErrorMsg(DESCRIPTION_MESSAGE); validity = 'invalid'; console.log("17")  }
        if(advertImages.length < 5)
        { 
            setImagePositionMessage('Upload at least 5 images'); validity = 'invalid'; console.log("18")  
        } else if(advertImages.length > 15){
            setImagePositionMessage("You can`t upload more than 15 images")
            validity = 'invalid'
            console.log("19") 
        } else {            
            if(Number(advertState.getImagePosition()) === -1)
            { 
                setImagePositionMessage(IMAGE_POSITION_MESSAGE); validity = 'invalid' 
                console.log("20") 
            }
        }
        return validity
    }


    return (
        <>
            {
                ((isLoading === false) && ((completed === "no") || (completed === ""))) &&  <div 
                                className="flex md:d-flex xl:flex-row w-full h-[500px] justify-center items-center"
                    >
                        { isLoading && <PuffLoader className='w-12 h-12' color="white" /> }
                    </div>
            }
            {
                ((isLoading === true) && ((completed === "no") || (completed === ""))) &&  <div 
                                className="flex md:d-flex xl:flex-row w-full h-[500px] justify-center items-center"
                            >
                                { isLoading && <PuffLoader className='w-12 h-12' color="white" /> }
                            </div>
            }
            {   ((isLoading === false) && (completed === "yes")) && 
                <div 
                    className='md:col-span-9 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-5 md:px-10 py-5 mt-3 rounded-2xl -mb-24 md:mb-0'
                > 
                        <h1 
                            className='font-bold uppercase mb-5'
                        >
                            Post An Advert
                        </h1>
                        { (errorMessage) && <Message msg={errorMessage} status={errMsgStyle} /> }

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Country</label>
                                <SelectCountry 
                                    countries={data?.['country']} 
                                    states={data?.['state']} 
                                    selectedCountry={advertState.getCountryName()} 
                                    edit={true}  
                                    placeholder={"- Select Country -"} 
                                    onClick={
                                    (selectedX, cId) => 
                                      {
                                         if(cId != -1)
                                         {
                                           setTheState(selectedX)
                                           setCountryId(cId)
                                           setTheStateId(-1)
                                           setCountryMessage("")
                                           setTheStateOption('reset-state')
                                         } else {
                                           setCountryId(-1)
                                           setTheState([])
                                           setCountryMessage(COUNTRY_MESSAGE)
                                         }
                                       }
                                    } 
                                    />
                                { countryMessage && <Message msg={COUNTRY_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">State</label>
                                <SelectState countryId={countryId} stateOption={theStateOption} selectedState={advertState.getStateName()} incomingData={theState} edit={true}  placeholder={"- Select State -"} onClick={
                                    (cId) => 
                                    {
                                        if(cId === -1)
                                        {                                            
                                            setTheStateId(cId)
                                            setStateMessage(STATE_MESSAGE)
                                        } else {
                                            setStateMessage("")                                            
                                        }
                                    }
                                } />
                                { stateMessage && <Message msg={STATE_MESSAGE} status={errMsgStyle} /> }
                            </div>
                        </div>

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Category</label>
                                <SelectCategory incomingData={data?.['category']} selectedCategory={advertState.getCategoryName()}  placeholder={"Select Category"} edit={true} onClick={
                                                    (cId) => 
                                                    {
                                                        if(cId === -1)
                                                        {
                                                            setCategory(-1)
                                                            setCategoryMessage(CATEGORY_MESSAGE)
                                                        } else {
                                                            setCategory(cId)
                                                            setCategoryMessage("")
                                                            setTheCategoryOption('reset-category')
                                                        }
                                                    }
                                                } 
                                />
                                { categoryMessage && <Message msg={CATEGORY_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Manufacturer</label>
                                <SelectManufacturer manufacturers={data?.['manufacturer']} models={data?.['model']} selectedManufacturer={advertState.getManufacturerName()} edit={true} placeholder={"- Select Manufacturer -"} onClick={
                                    (selectedX, cId) => 
                                    {
                                        if(cId === -1)
                                        {
                                            setTheModelId(-1)
                                            setTheTrimId(-1)
                                            setTheEngineId(-1)
                                            setTheModelOption('')
                                            setManufacturerMessage(MANUFACTURER_MESSAGE)
                                            // setModelMessage(MODEL_MESSAGE)
                                            // setTrimMessage(TRIM_MESSAGE)
                                            // setEngineMessage(ENGINE_MESSAGE)
                                        } else {
                                            setTheModel(selectedX)
                                            setTheManufacturer(cId)
                                            setTheModelOption('reset-model')
                                            setManufacturerMessage("")
                                        }
                                    }
                                } />
                            { manufacturerMessage && <Message msg={MANUFACTURER_MESSAGE} status={errMsgStyle} /> }
                            </div>
                        </div>

                        { (advertState.getOthers() === "no") && 
                            <>
                                <div 
                                    className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                                >
                                    <div 
                                        className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                                    >
                                        <label className="font-semibold text-xs">Model</label>
                                        <SelectModel manufacturerId={advertState.getManufacturer()} modelOption={theModelOption} models={theModel} selectedModel={advertState.getModelName()} edit={true} trims={data?.['trim']} placeholder={"- Select Model -"} 
                                                    onClick={
                                                        (selectedX, cId) => 
                                                        {
                                                            if(cId === -1)
                                                            {
                                                                setTheTrimId(-1)
                                                                setTheEngineId(-1)
                                                                setTheTrimOption('')
                                                                // setModelMessage(MODEL_MESSAGE)
                                                                // setTrimMessage(TRIM_MESSAGE)
                                                                // setEngineMessage(ENGINE_MESSAGE)
                                                            } else {
                                                                setTheTrim(selectedX)
                                                                setTheModelId(cId)
                                                                setTheTrimOption('reset-trim')
                                                                setModelMessage("")
                                                            }
                                                        }
                                                    }
                                        />
                                    { modelMessage && <Message msg={MODEL_MESSAGE} status={errMsgStyle} /> }
                                    </div>
                                    <div 
                                        className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                                    >
                                        <label className="font-semibold text-xs">Trim</label>
                                        <SelectTrim manufacturerId={advertState.getManufacturer()} modelId={advertState.getModel()} trimOption={theTrimOption} trims={theTrim} selectedTrim={advertState.getTrimName()} edit={true} engine={data?.['engine']} placeholder={"Select Trim"} 
                                                    onClick={
                                                        (selectedX, cId) => 
                                                        {
                                                            if(cId === -1)
                                                            {
                                                                setTheEngineId(-1)
                                                                setTheEngineOption('')
                                                                setTrimMessage(TRIM_MESSAGE)
                                                                // setEngineMessage(ENGINE_MESSAGE)
                                                            } else {                                                                
                                                                setTheEngine(selectedX)
                                                                setTheEngineId(cId)
                                                                setTheTrimId(cId)
                                                                setTheEngineOption('reset-engine')
                                                                setTrimMessage("")
                                                            }
                                                        }
                                                    }
                                        />
                                    { trimMessage && <Message msg={TRIM_MESSAGE} status={errMsgStyle} /> }
                                    </div>
                                </div>

                                <div 
                                    className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                                >
                                    <div 
                                        className="w-full mb-5 md:mb-0"
                                    >
                                        <label className="font-semibold text-xs">Engine</label>
                                        <SelectEngine manufacturerId={advertState.getManufacturer()} modelId={advertState.getModel()} trimId={advertState.getTrim()} edit={true} engineOption={theEngineOption} selectedEngine={advertState.getEngineName()} engine={theEngine} placeholder={"Select Engine Type"} 
                                                    onClick={
                                                        (cId) => 
                                                        {
                                                            if(cId === -1)
                                                            {
                                                                setEngineMessage(ENGINE_MESSAGE)
                                                            } else {
                                                                setEngineMessage("")
                                                            }
                                                        }
                                                    }
                                        />
                                    {  engineMessage && <Message msg={ENGINE_MESSAGE} status={errMsgStyle} /> }
                                    </div>
                                </div>
                            </>
                        }                           

                        { 
                            (advertState.getOthers() === "yes") && 
                            < div className="border-2 border-gray-200 px-5 pt-5 rounded-lg mt-5 mb-5 border-shadow bg-blue-100">
                                <div 
                                    className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                                >
                                    <div 
                                        className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                                    >
                                        <div 
                                            className="mb-4 md:w-full"
                                        >
                                            <label className="font-semibold text-xs">Manufacturer Name</label>
                                            <input 
                                                className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                type="text" name="location" id="location" placeholder="Enter Manufacturer Name" 
                                                onChange={(e: any) => 
                                                {
                                                    let selected: string = e.target.value
                                                    advertState.setTheManufacturerName(selected)
                                                }}
                                                onBlur={(e: any) => 
                                                {
                                                    let selected: string = e.target.value
                                                    if(selected === "" || selected === undefined || selected === null)
                                                    {
                                                        setTheManufacturerNameMessage(MANUFACTURER_NAME_MESSAGE)
                                                    }
                                                }}
                                            />
                                        { theManufacturerNameMessage && <Message msg={MANUFACTURER_NAME_MESSAGE} status={errMsgStyle} /> }
                                        </div>
                                    </div>
                                    <div 
                                        className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                                    >
                                        <div 
                                            className="mb-4 md:w-full"
                                        >
                                            <label className="font-semibold text-xs">Model Name</label>
                                            <input 
                                                className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                type="text" name="location" id="location" placeholder="Enter Model Name" 
                                                onChange={(e: any) => 
                                                {
                                                    let selected: string = e.target.value
                                                    advertState.setTheModelName(selected)
                                                }}
                                                onBlur={(e: any) => 
                                                {
                                                    let selected: string = e.target.value
                                                    if(selected === "" || selected === undefined || selected === null)
                                                    {
                                                        setTheModelNameMessage(MODEL_NAME_MESSAGE)
                                                    }
                                                }}
                                            />
                                        { theModelNameMessage && <Message msg={MODEL_NAME_MESSAGE} status={errMsgStyle} /> }
                                        </div>
                                    </div>
                                </div>
                                
                                <div 
                                    className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                                >
                                    <div 
                                        className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                                    >
                                        <div 
                                            className="mb-4 md:w-full"
                                        >
                                            <label className="font-semibold text-xs">Trim Name</label>
                                            <input 
                                                className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                type="text" name="location" id="location" placeholder="Enter Trim Name" 
                                                onChange={(e: any) => 
                                                {
                                                    let selected: string = e.target.value
                                                    advertState.setTheTrimName(selected)
                                                }}
                                                onBlur={(e: any) => 
                                                {
                                                    let selected: string = e.target.value
                                                    if(selected === "" || selected === undefined || selected === null)
                                                    {
                                                        setTheTrimNameMessage(TRIM_NAME_MESSAGE)
                                                    }
                                                }}
                                            />
                                        { trimMessage && <Message msg={TRIM_NAME_MESSAGE} status={errMsgStyle} /> }
                                        </div>
                                    </div>
                                    <div 
                                        className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                                    >
                                        <div 
                                            className="mb-4 md:w-full"
                                        >
                                            <label className="font-semibold text-xs">Engine Name</label>
                                            <input 
                                                className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                type="text" name="location" id="location" placeholder="Enter Engine Name" 
                                                onChange={(e: any) => 
                                                {
                                                    let selected: string = e.target.value
                                                    advertState.setTheEngineName(selected)
                                                }}
                                                onBlur={(e: any) => 
                                                {
                                                    let selected: string = e.target.value
                                                    if(selected === "" || selected === undefined || selected === null)
                                                    {
                                                        setTheEngineNameMessage(ENGINE_NAME_MESSAGE)
                                                    }
                                                }}
                                            />
                                        { theEngineNameMessage && <Message msg={ENGINE_NAME_MESSAGE} status={errMsgStyle} /> }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        } 

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Fuel</label>
                                <SelectFuel incomingData={data?.['fuel']} 
                                            placeholder={"Select Fuel"} 
                                            selectedFuel={advertState.getFuelName()} 
                                            onClick={
                                                () => {

                                                }
                                            }
                                            edit={true}
                                />
                                { fuelMessage && <Message msg={FUEL_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Year</label>
                                <SelectYear 
                                            incomingData={years} 
                                            placeholder={"Select Year"} 
                                            selectedYear={advertState.getYearName()} 
                                            onClick={(yr) => 
                                            {
                                                const selected: string | number = yr
                                                if(selected != -1)
                                                {
                                                    setYearMessage("")
                                                } else {
                                                    setYearMessage(YEAR_MESSAGE)
                                                }
                                            }}
                                            edit={true}
                                />
                                { (advertState.getYear() === -1) && <Message msg={YEAR_MESSAGE} status={errMsgStyle} /> }
                            </div>
                        </div>

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Colour</label>
                                <SelectColour 
                                        incomingData={data?.['colour']} 
                                        selectedColour={advertState.getColourName()}  
                                        placeholder={"Select Colour"}
                                        onClick={(clr) => 
                                        {
                                            const selected: string | number = clr
                                            if(selected != -1)
                                            {
                                               setColourMessage(YEAR_MESSAGE)
                                            } else {
                                               setColourMessage("")
                                            }
                                        }}
                                        edit={true}
                                />
                                { colourMessage && <Message msg={COLOUR_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Transmission</label>
                                <SelectTransmission 
                                                incomingData={data?.['transmission']} 
                                                selectedTransmission={advertState.getTransmissionName()}  
                                                placeholder={"Select Transmission"}
                                                onClick={(trans) => 
                                                {
                                                    const selected: string | number = trans
                                                    if(selected != -1)
                                                    {
                                                        setTransmissionMessage(TRANSMISSION_MESSAGE)
                                                    } else {
                                                        setTransmissionMessage("")
                                                    }
                                                }}
                                                edit={true}
                                />
                                { transmissionMessage && <Message msg={TRANSMISSION_MESSAGE} status={errMsgStyle} /> }
                            </div>
                        </div>
                        

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Condition</label>
                                <SelectCondition 
                                                    incomingData={data?.['condition']}  
                                                    selectedCondition={advertState.getConditionName()} 
                                                    placeholder={"Select Condition"} 
                                                    onClick={(cndt) => 
                                                    {
                                                        const selected: string | number = cndt
                                                        if(selected != -1)
                                                        {
                                                            setConditionMessage(CONDITION_MESSAGE)
                                                        } else {
                                                            setConditionMessage("")
                                                        }
                                                    }}
                                                    edit={true}
                                />
                                { conditionMessage && <Message msg={CONDITION_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <div 
                                    className="mb-4 md:w-full"
                                >
                                    <label className="font-semibold text-xs">Mileage</label>
                                    <input 
                                        defaultValue={advertState.getMileage()}
                                        className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        type="text" name="milage" id="milage" placeholder="Enter Milage" 
                                        onChange={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            advertState.setMileage(selected)
                                        }}
                                        // onBlur={(e: any) => 
                                        // {
                                        //     let selected: string = e.target.value
                                        //     if(selected === "" || selected === undefined || selected === null)
                                        //     {
                                        //         setMileageMessage(MILEAGE_MESSAGE)
                                        //     }
                                        // }}
                                    />
                                    { mileageMessage && <Message msg={MILEAGE_MESSAGE} status={errMsgStyle} /> }
                                </div>
                            </div>
                        </div>
                        

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="mb-4 md:w-full"
                            >
                                <label className="font-semibold text-xs">City/Location</label>
                                <input 
                                    defaultValue={advertState.getLocation()}
                                    className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                    type="text" name="location" id="location" placeholder="Enter City/Location" 
                                    onChange={(e: any) => 
                                    {
                                        let selected: string = e.target.value
                                        advertState.setLocation(selected)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                        let selected: string = e.target.value
                                        if(selected === "" || selected === undefined || selected === null)
                                        {
                                            setLocationMessage(LOCATION_MESSAGE)
                                        }
                                    }}
                                />
                            { locationMessage && <Message msg={LOCATION_MESSAGE} status={errMsgStyle} /> }
                            </div>
                        </div>
                        

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <div 
                                    className="mb-4 md:w-full"
                                >
                                    <label className="font-semibold text-xs">Chasis Number</label>
                                    <input 
                                        defaultValue={advertState.getChasisNo()}
                                        className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        type="text" name="location" id="location" placeholder="Enter Chasis_no" 
                                        onChange={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            advertState.setChasisNo(selected)
                                        }}
                                        onBlur={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            if(selected === "" || selected === undefined || selected === null)
                                            {
                                                setChasisNoMessage(CHAISIS_NO_MESSAGE)
                                            }
                                        }}
                                    />
                                { chasisNoMessage && <Message msg={CHAISIS_NO_MESSAGE} status={errMsgStyle} /> }
                                </div>
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <div 
                                    className="mb-4 md:w-full"
                                >
                                    <label className="font-semibold text-xs">Price</label>
                                    <input 
                                        defaultValue={advertState.getPrice()}
                                        className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        type='number' name="price" id="price" placeholder="Enter Price" 
                                        onChange={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            advertState.setPrice(selected)
                                        }}
                                        onBlur={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            if(selected === "" || selected === undefined || selected === null)
                                            {
                                                setPriceMessage(PRICE_MESSAGE)
                                            }
                                        }}
                                    />
                                { priceMessage && <Message msg={PRICE_MESSAGE} status={errMsgStyle} /> }
                                </div>
                            </div>
                        </div>                        

                        <div 
                            className="w-full flex flex-wrap mt-5 md:mb-10 mb-20 py-2"
                        >
                            <span className="w-full font-bold text-sm mb-3">Description</span>
                            <TextArea />
                        </div>
                        <div className="text-red-500 font-bold text-sm">{ (value === "") ?  description : "" }</div>

                                        
                        { (imagePosition) && <Message msg={imagePosition} status={errMsgStyle} /> } 
                        <MultipleImageUpload width={0} ICloudColour={""} 
                            onClick={(img: any,) => 
                            {
                                setAdvertImages(img)
                            }} 
                        />


                        { (errorMessage) && <Message msg={errorMessage} status={errMsgStyle} /> }              

                        <div 
                            className="w-full d-flex md:flex mb-3 mt-14 hidden md:block"
                        >
                            <div 
                                className="w-2/2 mb-5 md:mb-0"
                            >
                            <div 
                                className="dropdown inline-block relative"
                            >
                                <button 
                                    className="bg-blue-600 text-white font-semibold py-3 px-5 rounded inline-flex items-center"
                                >
                                    {/* <span 
                                        className="mr-1 text-white"
                                    >
                                        Save
                                    </span> */}
                                    { loading ? <BeatLoader size={10} color="white" className="py-2" /> : "Save"}
                                    { !loading &&
                                    <svg 
                                        className="fill-current h-4 w-4 text-white mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> 
                                    </svg>
                                    }
                                </button>
                                { !loading &&
                                    <ul 
                                        className="dropdown-menu absolute hidden text-blue-700 pt-1 absolute"
                                    >
                                        <li className=""
                                            onClick={() => {
                                                SaveAdvert('no')
                                            }}    
                                        >
                                            <a 
                                                className="text-white font-bold -t bg-green-800 hover:bg-blue-700 text-[14px] py-3 px-4 block whitespace-no-wrap cursor-pointer"
                                            >
                                                Publish Advert 
                                            </a>
                                        </li>
                                        <li className=""
                                            onClick={() => {
                                                SaveAdvert('yes')
                                            }}  
                                        >
                                            <a 
                                                className="text-white font-bold bg-green-800 hover:bg-blue-700 text-[12px] py-3 px-4 w-[150px] block whitespace-no-wrap cursor-pointer"
                                            >
                                                Save Advert in Draft
                                            </a>
                                        </li>
                                    </ul>
                                }
                            </div>
                            </div>
                        </div>

                        <div 
                            className="w-full flex mb-3 mt-14 justify-between md:hidden"
                        >
                            <div 
                                className="text-white font-bold bg-green-800 hover:bg-blue-700 py-3 px-4 block whitespace-no-wrap cursor-pointer w-fit rounded-lg"
                                    onClick={() => {
                                      SaveAdvert('no')
                                    }}    
                            >
                                { loading && (type === 'no') ? <BeatLoader size={10} color="white" className="py-2" /> : "Save"} 
                            </div>
                            <div 
                                className="text-white font-bold bg-blue-800 hover:bg-green-700 py-3 px-4 w-[150px] block whitespace-no-wrap cursor-pointer w-fit rounded-lg"
                                    onClick={() => {
                                        SaveAdvert('yes')
                                    }}  
                            >
                                { loading && (type === 'yes') ? <BeatLoader size={10} color="white" className="py-2" /> : "Save Adver in Draft"}
                            </div>
                            
                            
                        </div>

                </div>
            }
        </>
    )
}
