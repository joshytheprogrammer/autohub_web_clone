"use client"

import { useEffect, useRef, useState } from "react"
import { UseStore } from "../../../../state/store"
import Message from "../../../../components/shared/Message"
import { BeatLoader, PuffLoader } from "react-spinners"
import { BASE_URL } from "../../../../constant/Path"
import { useRouter, useSearchParams } from "next/navigation"
import currencyFormatter from "../../../../components/util/currency-formatter"
import api from "../../../api/api"
import { SelectCountries } from "./select/SelectCountries"
import { SelectStates } from "./select/SelectStates"
import { Retrieval } from "../../../../components/shared/Retrieval"
import { SelectLGA } from "./select/SelectLGA"
import { SelectCategories } from "./select/SelectCategories"
import { SelectManufacturers } from "./select/SelectManufacturers"
import { SelectModels } from "./select/SelectModels"
import { SelectGenerations } from "./select/SelectGeneration"
import { SelectSerie } from "./select/SelectSerie"
import { SelectTrim } from "./select/SelectTrim"
import { SelectFuel } from "./select/SelectFuel"
import { SelectTransmission } from "./select/SelectTransmission"
import { SelectCondition } from "./select/SelectCondition"
import { SelectColour } from "./select/SelectColour"
import { SpecificationDetail } from "./select/SpecificationDetail"
import { SelectYear } from "./select/SelectYear"
import years from '../../../model/year.json'
import delay from "delay"
import dynamic from "next/dynamic"
    

const ProductDescriptioinEditor = dynamic(
  () => import('./JoEdit/ProductDescriptioinEditor'),
  {
    ssr: false
  }
)

export default function UpdateAdvert() 
{
    const router = useRouter()
    const searchParams = useSearchParams()
    const pam = searchParams.get('ytedpfpiemfi986emgogietwbfmvlvjedd')
    const pid = searchParams.get('kfiirnmoeiuuyyh3u4i5pfmnvijurmfjvhrfyfhufyfb')
    const advertState = UseStore((state) => state)
    
    const token: string = advertState.getUserToken()
    const userType: string = advertState.getUType()
    
    ///
    const COUNTRY_MESSAGE = 'Select Country'
    const STATE_MESSAGE = 'Select State'
    const LGA_MESSAGE = 'Select Local Government Area'
    const CATEGORY_MESSAGE = 'Select Category'
    const MANUFACTURER_MESSAGE = 'Select Manufacturer'
    const GENERATION_MESSAGE = 'Select Generation'
    // const RESET_MANUFACTURER_MESSAGE = 'Reset Manufacture'
    const MODEL_MESSAGE = 'Select Model'
    const SERIE_MESSAGE = 'Select Serie'
    // const RESET_MODEL_MESSAGE = 'Reset Model'
    const TRIM_MESSAGE = 'Select Trim'
    // const TRIM_MODEL_MESSAGE = 'Reset Trim'
    const ENGINE_MESSAGE = 'Select Engine'
    // const ENGIEN_MODEL_MESSAGE = 'Reset Trim'
    const FUEL_MESSAGE = 'Select Fuel'
    const YEAR_MESSAGE = 'Select Year'
    const COLOUR_MESSAGE = 'Select Colour'
    const TRANSMISSION_MESSAGE = 'Select Transmission'
    const CONDITION_MESSAGE = 'Select Condition'
    const MILEAGE_MESSAGE = 'Select Mileage'
    // const LOCATION_MESSAGE = 'Select Location'
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

    const [category, setCategory] = useState<number>(-1)
    const [categoryMessage, setCategoryMessage] = useState<string>("")
    const [categoryName, setCategoryName] = useState<string>("")

    const [countryId, setCountryId] = useState<number>(advertState.getCountry())
    const [countryName, setCountryName] = useState<string>("")
    const [countryMessage, setCountryMessage] = useState<string>("")
    
    const [stateId, setTheStateId] = useState<number>(advertState.getStates())
    const [stateMessage, setStateMessage] = useState<string>("")
    const [stateName, setStateName] = useState<string>(advertState.getStateName())
    ///
    const [theCountry] = useState<number>(-1)
    
    const [LGAId, setTheLGAId] = useState<number>(advertState.getLGA())
    const [lgaeMessage, setLGAMessage] = useState<string>("")
    const [lgaName, setLgaName] = useState<string>(advertState.getOurLgaName())
    
    const [theManufacturer, setTheManufacturer] = useState<number>(advertState.getManufacturer())
    const [manufacturerMessage, setManufacturerMessage] = useState<string>("")
    const [manufacturerName] = useState<string>(advertState.getManufacturerName())
    
    const [modelMessage, setModelMessage] = useState<string>("")   
    const [theModelId, setTheModelId] = useState<number>(advertState.getModel())
    const [modelName, setModelName] = useState<string>(advertState.getModelName())

    const [generationMessage, setGenerationMessage] = useState<string>("") 
    const [theGenerationId, setTheGenerationId] = useState<number>(advertState.getGeneration())
    const [generationName] = useState<string>(advertState.getGenerationName())

    const [serieMessage, setSerieMessage] = useState<string>("") 
    const [theSerieId, setTheSerieId] = useState<number>(advertState.getSerie())
    const [serieName] = useState<string>(advertState.getSerieName())

    const [trimMessage, setTrimMessage] = useState<string>("")    
    const [theTrimId, setTheTrimId] = useState<number>(advertState.getTrim())
    const [theTrimName] = useState<string>(advertState.getTrimName())
    
    const [theFuelId, setFuelId] = useState<number>(-1)
    const [theFuelName] = useState<string>("")
    const [fuel] = useState<[]>(advertState.getFuels())
    const [fuelMessage, setFuelMessage] = useState<string>("")
    
    const [theTransmissionId, setTransmissionId] = useState<number>(-1)
    const [transmissionMessage, setTransmissionMessage] = useState<string>("")
    const [theTransmissionName, setTheTransmissionName] = useState<string>("")
    
    const [conditionMessage, setConditionMessage] = useState<string>("")
    const [theConditionId, setTheConditionId] = useState<number>(-1)
    const [theConditionName, setTheConditionName] = useState<string>("")

    const [yearId, setYearId] = useState<number>(-1)
    const [yearName, setYearName] = useState<string>(advertState.getYear())
    const [yearMessage, setYearMessage] = useState<string>("")

    const [colourMessage, setColourMessage] = useState<string>("")
    const [theColourId, setColourId] = useState<number>(-1)
    const [theColourName, setTheColourName] = useState<string>("")

    const [mileage, setMileage] = useState<number>(advertState.getMileage())
    const [mileageMessage] = useState<string>("")

    const [chasisNo, setChasisNo] = useState<string>(advertState.getChasisNo())
    const [chasisNoMessage, setChasisNoMessage] = useState<string>("")
    // const [locationMessage, setLocationMessage] = useState<string>("")

    const [priceMessage, setPriceMessage] = useState<string>("")
    const [price, setPrice] = useState<number>(Number(advertState.getPrice()))        

    const [theDescription, setTheDescription] = useState<string>("")
    const [descriptionMessage, setDescriptionMessage] = useState<string>(advertState.getDescription()) 

    //others
    const [theManufacturerNameMessage, setTheManufacturerNameMessage] = useState("")
    const [theModelNameMessage, setTheModelNameMessage] = useState("")
    const [theTrimNameMessage, setTheTrimNameMessage] = useState("")
    const [theEngineNameMessage, setTheEngineNameMessage] = useState("")
    const [imagePosition, setImagePositionMessage] = useState("")
    
     const [checking, setCheck] = useState<boolean>(false)

    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [advertImages, setAdvertImages] = useState<string[]>([])
  
    const [type, setType] = useState("x")

    const [loading, setLoading] = useState<boolean>(false)

    
    const [description, setDescriptionErrorMsg] = useState<string>("") 

    const [errorMessage, setErrorMessage] = useState<string>("")

    const onInVIew = useRef<any>()
    const onResetVIew = useRef<any>()
         
    useEffect(() => 
    {
       setErrMsgStyle('text-md text-red-600 font-bold')
       setErrorMessage("")
    //    advertState.setImagePosition(-1)
       console.log({ theTrimId, yearMessage, theCountry, category, theManufacturer, theDescription, theModelId, theTrimName, theTrimNameMessage})
       console.log(advertState.getColours())

       onInVIew.current = Math.random()*333
       setTimeout(() => 
       {
          onResetVIew.current = onInVIew.current
          console.log(onInVIew.current)
          console.log(onResetVIew.current)
          if(onInVIew.current === onResetVIew.current)
          {
             console.log("Yes")
          } else {
             console.log("NO")
          }
       }, 500)
    }, [])   

    // useEffect(() => 
    // {
    //    setCheck(checking)
    //    console.log("ggggggggggg")
    // }, [checking])

    useEffect(() => 
    {
        setTimeout(() => 
        {
            setErrorMessage("")
        }, 5000)
    }, [errorMessage])

    useEffect(() => 
    {

    }, [type, imagePosition])

    useEffect(() => 
    {

    }, [countryId, countryName])

    useEffect(() => 
    {

    }, [LGAId])

    useEffect(() => 
    {

    }, [theColourId])

    useEffect(() => 
    {

    }, [theFuelId])

    useEffect(() => 
    {
        
    }, [theDescription])

    useEffect(() => 
    {         
       let thePrice = currencyFormatter(price)     
       setPrice(Number(thePrice))  
    }, [price])

    const UpdateProductAdvert = async (option: string) => 
    {
        setCheck(true)
        await delay(2000)
        const datas = {
            country: Number(advertState.getCountry()), state: Number(advertState.getStates()),  lga: Number(advertState.getLGA()), category: Number(advertState.getCategory()),
            others: advertState.getOthers(), manufacturer: Number(advertState.getManufacturer()), model: Number(advertState.getModel()), trim: Number(advertState.getTrim()),
            theManufacturer:  advertState.getTheManufacturerName(), theModel: advertState.getTheModelName(), theTrim: advertState.getTheTrimName(),
            fuel: Number(advertState.getFuel()), colour: Number(advertState.getColour()), transmission: Number(advertState.getTransmission()), 
            condition: Number(advertState.getCondition()), location: advertState.getLocation(), id: advertState.getProductId(), slug: pam,
            chasis_no: advertState.getChasisNo(), price: advertState.getPrice(), description: advertState.getDescription(), mileage: advertState.getMileage(),
            images: advertImages, generation: Number(advertState.getGeneration()), serie: Number(advertState.getSerie()),
            draft: option, year: advertState.getYear()
        }
        console.log(datas)
        console.log(option)
        // setCheck(false)
        // return false
        const checkFields: string = allFields()
        if(checkFields === 'valid')
        {
            const data = {
                country: Number(advertState.getCountry()), state: Number(advertState.getStates()),  lga: Number(advertState.getLGA()), category: Number(advertState.getCategory()),
                others: advertState.getOthers(), manufacturer: Number(advertState.getManufacturer()), model: Number(advertState.getModel()), trim: Number(advertState.getTrim()),
                theManufacturer:  advertState.getTheManufacturerName(), theModel: advertState.getTheModelName(), theTrim: advertState.getTheTrimName(),
                fuel: Number(advertState.getFuel()), colour: Number(advertState.getColour()), transmission: Number(advertState.getTransmission()), 
                condition: Number(advertState.getCondition()), location: advertState.getLocation(), id: advertState.getProductId(), slug: pam,
                chasis_no: advertState.getChasisNo(), price: advertState.getPrice(), description: advertState.getDescription(), mileage: advertState.getMileage(),
                images: advertImages, generation: Number(advertState.getGeneration()), serie: Number(advertState.getSerie()),
                draft: option, year: advertState.getYear()
            }
            
            let endPoint = `${userType}/update`
            let ApiUrl = `${BASE_URL}${endPoint}`
            await api.put(`${ApiUrl}`, data, 
            { 
                headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                }
            }).then((response) => 
                {
                    if(response?.data?.status === 200)
                    {
                        clearFields()
                        clearFields()
                        setCheck(false)
                        router.push('/user/adverts')
                    } else {
                        setCheck(false)
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
            setCheck(false)
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
        advertState.setLGA(-1)
        advertState.setLgaName("")
        advertState.setOurLgaName("")
        advertState.setCategory(-1)
        advertState.setCategoryName("")
        advertState.setManufacturer(-1)
        advertState.setManufacturerName("")
        advertState.setModel(-1)
        advertState.setModelName("")
        advertState.setTrim(-1)
        advertState.setTrimName("")
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
        advertState.setImagePosition(-1)
        advertState.setSaveOption("")
        //        
        advertState.setTheGenerationName("")
        advertState.setTheSerieName("")
    }

    const allFields = () => 
    {
        let validity: string = 'valid'
        if(advertState.getCountry() === -1){ setCountryMessage(COUNTRY_MESSAGE); validity = 'invalid'; console.log("1") }
        if(advertState.getStates() === -1){ setStateMessage(STATE_MESSAGE); validity = 'invalid'; console.log("2")  }
        if(advertState.getLGA() === -1){ setLGAMessage(LGA_MESSAGE); validity = 'invalid'; console.log("211")  }
        if(advertState.getCategory() === -1){ setCategoryMessage(CATEGORY_MESSAGE); validity = 'invalid'; console.log("3")  }
        if(advertState.getManufacturer() === -1){ setManufacturerMessage(MANUFACTURER_MESSAGE); validity = 'invalid'; console.log("4")  }
        if(advertState.getModel() === -1){ setModelMessage(MODEL_MESSAGE); validity = 'invalid'; console.log("5")  }
        // if(advertState.getGeneration() === -1){ setGenerationMessage(GENERATION_MESSAGE); validity = 'invalid' }
        // if(advertState.getSerie() === -1){ setSerieMessage(SERIE_MESSAGE); validity = 'invalid' }
        // if(advertState.getTrim() === -1){ setTrimMessage(TRIM_MESSAGE); validity = 'invalid' }

        if(advertState.getFuel() === -1){ setFuelMessage(FUEL_MESSAGE); validity = 'invalid'; console.log("10")  }
        // if(advertState.getYear() === "x"){ setYearMessage("Select Year"); validity = 'invalid'; console.log("11")  }
        if(advertState.getColour() === -1){ setColourMessage(COLOUR_MESSAGE); validity = 'invalid'; console.log("12")  }
        if(advertState.getTransmission() === -1){ setTransmissionMessage(TRANSMISSION_MESSAGE); validity = 'invalid'; console.log("13")  }
        if(advertState.getCondition() === -1){ setConditionMessage(CONDITION_MESSAGE); validity = 'invalid'; console.log("14")  }
        // if(advertState.getMileage() === ""){ setMileageMessage(MILEAGE_MESSAGE); validity = 'invalid' }
        // if(advertState.getLocation() === ""){ setLocationMessage(LOCATION_MESSAGE); validity = 'invalid'; console.log("15")  }
        if(advertState.getChasisNo() === ""){ setChasisNoMessage(MILEAGE_MESSAGE); validity = 'invalid' }
        if(advertState.getPrice().toString() === "" || advertState.getPrice().toString() === "0" || advertState.getPrice() === 0){ setPriceMessage(PRICE_MESSAGE); validity = 'invalid'; console.log("16")  }
        if(advertState.getDescription() === "" || advertState.getDescription() === "<p><br></p>" || advertState.getDescription() === "<p></p>"){ setDescriptionMessage(DESCRIPTION_MESSAGE); validity = 'invalid'; console.log("17")  }
        return validity
    } 

     const [productCategories, setProductCategories] = useState<any>(advertState.getCategories())
     const [productCountryes, setProductCountries] = useState<any>(advertState.getCountries())
     const [productStates, setProductStates] = useState<any>(advertState.getStatess())
     const [productLGA, setProductLGA] = useState<any>(advertState.getLGAS())
     const [productManufacturer, setProductManufacturer] = useState<any>(advertState.getManufacturers())
     const [productModels, setProductModels] = useState<any>(advertState.getModels())
     const [productGenerations, setProductGeneration] = useState<any>(advertState.getGenerations())
    //  const [productYear, setProductYear] = useState<any>(advertState.getCategories())
     const [productSeries, setProductSeries] = useState<any>(advertState.getSeries())
     const [productTrim, setProductTrim] = useState<any>(advertState.getTrims())
     const [productSpecificationDetail, setProductSpecificationDetail] = useState<any>(advertState.getProductDetail())
     const [productFuel, setProductFuel] = useState<any>(advertState.getFuels())
     const [productTransmission, setProductTransmission] = useState<any>(advertState.getTransmissions())
     const [productCondition, setProductCondition] = useState<any>(advertState.getConditions())
     const [productColour, setProductColour] = useState<any>(advertState.getColours())
     const [openSpecification, setOpenSpecification] = useState<boolean>(false)
     const [loaded, setLoaded] = useState<boolean>(false)
     const [retrieved, setRetrieve] = useState<boolean>(false)


    useEffect(() => 
    {

    }, [stateId, stateName])

    useEffect(() => 
    {
        if(theManufacturer === -1)
        {
            setProductSpecificationDetail([])
            advertState.setProductDetail([])
        }
    }, [theManufacturer])

    useEffect(() => 
    {
        if(theModelId === -1)
        {
            setProductSpecificationDetail([])
            advertState.setProductDetail([])
        }
    }, [theModelId])

    useEffect(() => 
    {
        if(theGenerationId === -1)
        {
            setProductSpecificationDetail([])
            advertState.setProductDetail([])
        }
    }, [theGenerationId])

    useEffect(() => 
    {
        if(theSerieId === -1)
        {
            setProductSpecificationDetail([])
            advertState.setProductDetail([])
        }
    }, [theSerieId])

    useEffect(() => 
    {
        if(theTrimId === -1)
        {
            setProductSpecificationDetail([])
            advertState.setProductDetail([])
        }
    }, [theTrimId])

     useEffect(() => 
     {
     }, [productStates, productLGA, productModels, productGenerations])

    const getStates = (id: number) => 
    {
        api.get(`${BASE_URL}advert/states/${id}`)
        .then((response: any) => 
        { 
            setTimeout(() => 
            {                
                setProductStates(response?.data?.data)
                advertState.setStatess(response?.data?.data)
                setRetrieve(false)
            }, 500)
        }).catch((error: any) => {
            console.log(error)
            setRetrieve(false)
        })        
    }

    const getLGA = (id: number) => 
    {
        api.get(`${BASE_URL}advert/lgas/${id}`)
        .then((response: any) => 
        { 
            setProductLGA(response?.data?.data)
            advertState.setLGAS(response?.data?.data)
            setRetrieve(false)
        }).catch((error: any) => {
            console.log(error)
            setRetrieve(false)
        })        
    }

    const getModels = (id: number) => 
    {
        api.get(`${BASE_URL}advert/models/${id}`)
        .then((response: any) => 
        { 
            setProductModels(response?.data?.data)
            advertState.setModels(response?.data?.data)
            setRetrieve(false)
        }).catch((error: any) => {
            console.log(error)
            setRetrieve(false)
        })        
    }

    const getProductGeneration = (id: number) => 
    {
        api.get(`${BASE_URL}advert/generations/${id}`)
        .then((response: any) => 
        { 
            setProductGeneration(response?.data?.data)
            advertState.setGenerations(response?.data?.data)
            setRetrieve(false)
        }).catch((error: any) => {
            console.log(error)
            setRetrieve(false)
        })        
    }

    // const getProductYear = () => 
    // {
    //     api.get(`${BASE_URL}advert/year/${theManufacturer}/${theModelId}/${theGenerationId}`)
    //     .then((response: any) => 
    //     { 
    //         setProductGeneration(response?.data?.data)
    //         advertState.setSeries(response?.data?.data)
    //         setRetrieve(false)
    //     }).catch((error: any) => {
    //         console.log(error)
    //         setRetrieve(false)
    //     })        
    // }

    const getProductSeriesAndProductYear = (manufacturer: number, model: number, generation: number) =>
    {
        api.get(`${BASE_URL}advert/series/${manufacturer}/${model}/${generation}`)
        .then((response: any) => 
        { 
            setProductSeries(response?.data?.data)
            advertState.setSeries(response?.data?.data)
            setRetrieve(false)
        }).catch((error: any) => {
            console.log(error)
            setRetrieve(false)
        })        
    }

    const getProductTrim = (model: number, serie: number) => 
    {
        api.get(`${BASE_URL}advert/trim/${theModelId}/${serie}`)
        .then((response: any) => 
        { 
            setProductTrim(response?.data?.data)
            advertState.setTrims(response?.data?.data)
            setRetrieve(false)
        }).catch((error: any) => {
            console.log(error)
            setRetrieve(false)
        })        
    }

    const getProductSpecificationDetail = (trim: number) => 
    {
        api.get(`${BASE_URL}advert/specification-detail/${trim}`)
        .then((response: any) => 
        { 
            setProductSpecificationDetail(response?.data?.data)
            advertState.setProductDetail(response?.data?.data)
            setRetrieve(false)
        }).catch((error: any) => {
            console.log(error)
            setRetrieve(false)
        })        
    }

    return (
        <>
            {/* {
                (loaded === false) &&   
                    <div 
                        className="flex md:d-flex xl:flex-row w-full h-[450px] mt-20 justify-center items-center"
                    >
                        <PuffLoader className='w-12 h-12' color="green" />
                    </div>
            } */}

            {/* {
                !loaded && productCountryes &&   <div 
                                className="flex md:d-flex xl:flex-row w-full h-[500px] justify-center items-center"
                            >
                                { isLoading && <PuffLoader className='w-12 h-12' color="green" /> }
                            </div>
            } */}
            {  
                (true === true)  &&
                <div 
                    className='md:col-span-9 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-5 md:px-10 py-5 mt-3 rounded-2xl -mb-24 md:mb-0'
                > 
                        <h1 
                            className='font-bold uppercase mb-5 border-b-4 border-blue-300'
                        >
                          Edit Advert
                        </h1>
                        { (errorMessage) && <Message msg={errorMessage} status={errMsgStyle} /> }

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Categories</label>
                                <SelectCategories
                                    categories={productCategories} 
                                    selectedCategoryName={advertState.getCategoryName()}
                                    onChange={
                                        (name: string, id: number) => {
                                            setTimeout(() => 
                                            {                                                
                                               if(id != -1)
                                               {
                                                  setCategory(id)
                                                  setCategoryName(name)
                                                  setCategoryMessage("")
                                               } else {
                                                  setCategory(id)       
                                                  setCategoryMessage(CATEGORY_MESSAGE)                                      
                                               }
                                            }, 100)
                                        }
                                    } 
                                />
                                { categoryMessage && <Message msg={CATEGORY_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-1/2"
                            >
                                <label className="font-semibold text-xs">Countries</label>
                                <div 
                                    className="mb-5 md:mb-0"
                                >
                                    <SelectCountries                                        
                                        countries={productCountryes}
                                        selectedCountryName={advertState.getCountryName()}
                                        onChange={
                                           (name: string, id: number) => 
                                           {
                                             setTimeout(() => 
                                            {                                                              
                                              if(id != -1)
                                              {
                                                setCountryId(id)
                                                setTheStateId(-1)
                                                setTheLGAId(-1)
                                                setCountryName(name)
                                                setCountryMessage("")
                                                getStates(id)
                                                setRetrieve(true)
                                              } else {
                                                setCountryId(-1)
                                                setTheStateId(-1)
                                                setTheLGAId(-1)
                                                setCountryMessage(COUNTRY_MESSAGE)
                                              }
                                            })
                                           }
                                        } 
                                    />
                                </div>
                                
                                { countryMessage && <Message msg={COUNTRY_MESSAGE} status={errMsgStyle} /> }
                            </div>
                        </div>

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-1/2"
                            >
                                <label className="font-semibold text-xs">States</label>            
                                <div 
                                    className="mb-5 md:mb-0"
                                >
                                    <SelectStates        
                                        selectedCountry={advertState.getCountry()}                                
                                        states={productStates}
                                        selectedState={advertState.getStates()}
                                        selectedStateName={stateName}
                                        onChange={
                                           (name: string, id: number) => 
                                           {
                                              if(id != -1)
                                              {        
                                                 setTimeout(() => 
                                                 {                                                           
                                                    setStateMessage("")
                                                    setTheStateId(id)
                                                    setTheLGAId(-1)
                                                    setLgaName("")
                                                    setStateName(name)
                                                    getLGA(id) 
                                                    setRetrieve(true)
                                                 }, 100)
                                              } else {   
                                                 setTimeout(() => 
                                                 {                                                      
                                                    setTheStateId(-1)         
                                                    setTheLGAId(-1)     
                                                    setLgaName("")                                
                                                    setStateMessage(STATE_MESSAGE)
                                                 }, 100)              
                                              }
                                           }
                                        } 
                                    />
                                </div>
                                
                                { stateMessage && <Message msg={STATE_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-1/2"
                            >
                                <label className="font-semibold text-xs">Local Government</label>
                                <div 
                                    className="mb-5 md:mb-0"
                                >
                                    <SelectLGA        
                                        selectedCountry={advertState.getCountry()} 
                                        selectedState={advertState.getStates()}
                                        selectedLGAName={lgaName}                              
                                        lgas={productLGA}
                                        onChange={
                                           (name: string, id: number) => 
                                           {  
                                             setTimeout(() => 
                                             {                                                             
                                                if(id != -1)
                                                {                                            
                                                    setTheLGAId(id)
                                                    setLGAMessage("")
                                                } else {              
                                                    setTheLGAId(-1)  
                                                    setLGAMessage(LGA_MESSAGE)                                                                 
                                                }
                                             }, 100)
                                          }
                                        } 
                                    />
                                </div>
                                
                                { lgaeMessage && <Message msg={LGA_MESSAGE} status={errMsgStyle} /> }
                            </div>
                        </div>

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-1/2"
                            >
                                <label className="font-semibold text-xs">Manufacturers</label>   
                                <SelectManufacturers               
                                    selectedManufacturer={theManufacturer}   
                                    selectedManufacturerName={manufacturerName}                      
                                    manufacturers={productManufacturer}
                                    onChange={
                                      (name: string, id: number) => 
                                      {              
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => {                     
                                                setTheManufacturer(id)
                                                setManufacturerMessage("")
                                                setTheModelId(-1)
                                                setTheGenerationId(-1)
                                                setTheSerieId(-1)
                                                setTheTrimId(-1)
                                                getModels(id) 
                                                setRetrieve(true)
                                            }, 100)
                                        } else {   
                                            setTimeout(
                                            () => 
                                             {                                              
                                               setTheManufacturer(-1)
                                               setTheModelId(-1)
                                               setTheGenerationId(-1)
                                               setTheSerieId(-1)
                                               setTheTrimId(-1)
                                               setManufacturerMessage(MANUFACTURER_MESSAGE)
                                             }, 100)
                                        }
                                      }
                                    } 
                                />
                                { manufacturerMessage && <Message msg={MANUFACTURER_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-1/2"
                            >
                                <label className="font-semibold text-xs">Models</label>   
                                <SelectModels                                        
                                    models={productModels}
                                    selectedManufacturer={theManufacturer}
                                    selectedModelName={modelName}
                                    selectedModel={theModelId}
                                    onChange={
                                      (name: string, id: number) => 
                                      {
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => {                     
                                                setTheModelId(id)
                                                setTheGenerationId(-1)
                                                setTheSerieId(-1)
                                                setTheTrimId(-1)
                                                setModelMessage("")        
                                                setYearId(-1)         
                                                setYearName("")
                                                getProductGeneration(id)
                                                setRetrieve(true)
                                            }, 100)
                                        } else {
                                            setTimeout(() => 
                                            {                                                
                                               setTheModelId(id)
                                               setTheGenerationId(-1)
                                               setTheSerieId(-1)
                                               setTheTrimId(-1)        
                                               setYearId(-1)         
                                               setYearName("")
                                               setModelMessage(MODEL_MESSAGE)
                                            }, 100)
                                        }
                                      }
                                    } 
                                />
                                { modelMessage && <Message msg={MODEL_MESSAGE} status={errMsgStyle} /> }
                            </div>
                        </div>

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-1/2"
                            >
                                <label className="font-semibold text-xs">Generation</label>   
                                <SelectGenerations
                                    selectedManufacturer={theManufacturer}                         
                                    selectedModel={theModelId}
                                    generations={productGenerations}
                                    selectedGenerationName={generationName}
                                    onChange={
                                      (name: string, id: number) => 
                                      {              
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => 
                                             {        
                                                setGenerationMessage("")     
                                                setTheGenerationId(id)
                                                setTheSerieId(-1)
                                                setTheTrimId(-1)
                                                getProductSeriesAndProductYear(theManufacturer, theModelId, id)
                                                setRetrieve(true)
                                             }, 100)
                                        } else {   
                                            setTimeout(() => 
                                            {                 
                                               setTheGenerationId(-1)
                                               setTheSerieId(-1)
                                               setTheTrimId(-1)
                                               setGenerationMessage(MANUFACTURER_MESSAGE)
                                            }, 100)
                                        }
                                      }
                                    } 
                                />
                                { generationMessage && <Message msg={GENERATION_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-1/2"
                            >
                                <label className="font-semibold text-xs">Year</label>
                                <SelectYear
                                    selectedManufacturer={theManufacturer} 
                                    selectedModel={theModelId}
                                    selectedYearName={yearName}
                                    selectedYear={Number(advertState.getYear())}
                                    years={years}
                                    onChange={
                                      (name: string, id: number) => 
                                      {              
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => 
                                             {           
                                                setYearMessage("")          
                                                setYearId(id)         
                                                setYearName(name)
                                            }, 100)
                                        } else {
                                           setTimeout(
                                             () => {                   
                                                setYearId(-1)         
                                                setYearName("")
                                                setYearMessage(YEAR_MESSAGE)  
                                            }, 100)
                                        }
                                      }
                                    } 
                                />
                                { yearMessage && <Message msg={yearMessage} status={errMsgStyle} /> }
                            </div>
                        </div>


                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-1/2"
                            >
                                <label className="font-semibold text-xs">Series</label>
                                <SelectSerie
                                    selectedManufacturer={theManufacturer} 
                                    selectedModel={theModelId}
                                    selectedGeneration={theGenerationId}
                                    series={productSeries}
                                    selectedSerieName={serieName}
                                    onChange={
                                      (name: string, id: number) => 
                                      {              
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => 
                                             {           
                                                setSerieMessage("")          
                                                setTheSerieId(id)
                                                setTheTrimId(id)
                                                getProductTrim(theModelId, id)
                                                setRetrieve(true)
                                            }, 100)
                                        } else {
                                           setTimeout(
                                             () => {                    
                                                setTheSerieId(-1)
                                                setTheTrimId(-1)
                                                setSerieMessage(TRIM_MESSAGE)
                                            }, 100)
                                        }
                                      }
                                    } 
                                />
                                { serieMessage && <Message msg={SERIE_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-1/2"
                            >
                                <label className="font-semibold text-xs">Trim</label>
                                {/* selectedManufacturer, selectedModel, selectedGeneration, selectedSerie */}
                                <SelectTrim
                                    selectedManufacturer={theManufacturer}                         
                                    selectedModel={theModelId}
                                    selectedGeneration={theGenerationId}
                                    selectedSerie={theSerieId}
                                    trims={productTrim}
                                    selectedTrimName={theTrimName}
                                    onChange={
                                      (name: string, id: number) => 
                                      {              
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => 
                                             {           
                                                setTrimMessage("")  
                                                setTheTrimId(id)
                                                // setTheEquipment(-1)
                                                setRetrieve(true) 
                                                getProductSpecificationDetail(id)
                                             }, 100)
                                        } else {   
                                            setTimeout(() => 
                                            {                 
                                               setTheTrimId(-1)
                                               // setTheEquipment(-1)
                                               setTrimMessage(TRIM_MESSAGE)
                                            }, 100)
                                        }
                                      }
                                    } 
                                />
                                { trimMessage && <Message msg={TRIM_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            {/* <div 
                                className="w-full md:mb-0 w-2/2 md:w-1/2"
                            >
                                <label className="font-semibold text-xs">Series</label>
                                <SelectSerie
                                    selectedManufacturer={theManufacturer} 
                                    selectedModel={theModelId}
                                    selectedGeneration={theGenerationId}
                                    series={productSeries}
                                    onChange={
                                      (name: string, id: number) => 
                                      {              
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => {               
                                                setTheEquipment(id)
                                                setEquipmentMessage("")
                                            }, 100)
                                        } else {
                                           setTimeout(
                                             () => {               
                                                setTheEquipment(-1)
                                                setEquipmentMessage(EQUIPMENT_MESSAGE)
                                            }, 100)
                                        }
                                      }
                                    } 
                                />
                                { serieMessage && <Message msg={SERIE_MESSAGE} status={errMsgStyle} /> }
                            </div> */}
                        </div>    

                        {
                            
                            (theManufacturer != -1 || theModelId != -1 || theGenerationId != -1 || theSerieId != -1 || theTrimId != -1) && productSpecificationDetail?.length > 0 &&
                            <div 
                                className="w-full d-flex md:flex gap-0 md:gap-10 mb-3 justify-center item-center mt-5 mb-3"
                            >
                                <span
                                    className="p-4 px-5 bg-blue-600 hover:bg-blue-800 border border-2 rounded-xl text-white cursor-pointer"
                                    onClick={
                                      () => {
                                         setOpenSpecification(true)
                                      }
                                    }
                                >
                                    View Spcifications
                                </span>
                            </div>
                        }                   

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-2/2"
                            >
                                <label className="font-semibold text-xs">Fuel</label>
                                <SelectFuel
                                    fuel={productFuel} 
                                    selectedFuelName={advertState.getFuelName()}
                                    onChange={                                        
                                      (name: string, id: number) => 
                                      {              
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => {                     
                                                setFuelId(id)
                                                setFuelMessage("")
                                            }, 100)
                                        } else {
                                           setTimeout(
                                             () => {                          
                                                setFuelId(-1)
                                                setFuelMessage(FUEL_MESSAGE)
                                            }, 100)
                                        }
                                      }
                                    } 
                                />
                                { fuelMessage && <Message msg={fuelMessage} status={errMsgStyle} /> }
                            </div>
                        </div>

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-2/2"
                            >
                                <label className="font-semibold text-xs">Colours</label>
                                <SelectColour
                                    selectedColour={theColourId}
                                    selectedColourName={advertState.getColourName()}
                                    colours={productColour} 
                                    onChange={                                        
                                      (name: string, id: number) => 
                                      {              
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => {          
                                                setColourMessage("")           
                                                setColourId(id)
                                            }, 100)
                                        } else {
                                           setTimeout(
                                             () => {                          
                                                setColourId(-1)
                                                setColourMessage(COLOUR_MESSAGE)
                                            }, 100)
                                        }
                                      }
                                    } 
                                />
                                { colourMessage && <Message msg={colourMessage} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-full md:mb-0 w-2/2 md:w-2/2"
                            >
                                <label className="font-semibold text-xs">Transmission</label>
                                <SelectTransmission
                                    transmissions={productTransmission} 
                                    selectedTransmission={theTransmissionId}
                                    selectedTransmissionName={advertState.getTransmissionName()}
                                    onChange={                                        
                                      (name: string, id: number) => 
                                      {              
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => {                     
                                                setTransmissionId(id)
                                                setTransmissionMessage("")
                                            }, 100)
                                        } else {
                                           setTimeout(
                                             () => {                          
                                                setTransmissionId(-1)
                                                setTransmissionMessage(TRANSMISSION_MESSAGE)
                                            }, 100)
                                        }
                                      }
                                    } 
                                />
                                { transmissionMessage && <Message msg={transmissionMessage} status={errMsgStyle} /> }
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
                                    selectedCondition={theConditionId}
                                    selectedConditionName={advertState.getConditionName()}
                                    conditions={productCondition} 
                                    onChange={                                        
                                      (name: string, id: number) => 
                                      {              
                                        if(id != -1)
                                        {
                                           setTimeout(
                                             () => {                     
                                                setTheConditionId(id)
                                                setConditionMessage("")
                                            }, 100)
                                        } else {
                                           setTimeout(
                                             () => {                          
                                                setTheConditionId(-1)
                                                setConditionMessage(CONDITION_MESSAGE)
                                            }, 100)
                                        }
                                      }
                                    } 
                                />
                                { conditionMessage && <Message msg={conditionMessage} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <div 
                                    className="mb-4 md:w-full"
                                >
                                    <label className="font-semibold text-xs">Mileage</label>
                                    <input 
                                        // defaultValue={advertState.getMileage()}
                                        defaultValue={mileage}
                                        className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        type="text" name="milage" id="milage" placeholder="Enter Milage" 
                                        onChange={(e: any) => 
                                        {
                                            let selected: number = Number(e.target.value)
                                            setMileage(selected)
                                            advertState.setMileage(selected)
                                        }}
                                        // onBlur={(e: any) => 
                                        // {
                                        //    let selected: number = Number(e.target.value)
                                        //    setMileage(selected)
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
                        

                        {/* <div 
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
                                        if(selected === "" || selected === undefined || selected === null)
                                        {
                                            setLocationMessage(LOCATION_MESSAGE)
                                        } else {
                                            advertState.setLocation(selected)
                                            setLocationMessage("")                                            
                                        }
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                        let selected: string = e.target.value
                                        if(selected === "" || selected === undefined || selected === null)
                                        {
                                            setLocationMessage(LOCATION_MESSAGE)
                                        } else {
                                            advertState.setLocation(selected)
                                            setLocationMessage("")                                            
                                        }
                                    }}
                                />
                            { locationMessage && <Message msg={LOCATION_MESSAGE} status={errMsgStyle} /> }
                            </div>
                        </div> */}
                        

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
                                        // defaultValue={advertState.getChasisNo()}
                                        defaultValue={(chasisNo === "Not specified") ? '' : chasisNo}
                                        className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        type="text" name="location" id="location" placeholder="Enter Chasis_no" 
                                        onChange={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            setChasisNo(selected)
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
                                {/* { chasisNoMessage && <Message msg={CHAISIS_NO_MESSAGE} status={errMsgStyle} /> } */}
                                </div>
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <div 
                                    className="mb-4 md:w-full"
                                >
                                    <label className="font-semibold text-xs">Price - </label><span className="font-bold text-md">{currencyFormatter(Number(advertState.getPrice()))}</span>
                                    {/* <label className="font-semibold text-xs">Price - </label> */}
                                    <input 
                                        defaultValue={advertState.getPrice()}
                                        className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        type='number' name="price" id="price" placeholder="Enter Price" 
                                        onChange={(e: any) => 
                                            {
                                                let selected: string = e.target.value
                                                if(selected.toString() === "" || selected === undefined || selected === null)
                                                {
                                                    advertState.setPrice("")
                                                    setPrice(-1)
                                                    setPriceMessage(PRICE_MESSAGE)
                                                } else {
                                                    advertState.setPrice(selected)
                                                    setPrice(Number(selected))
                                                    setPriceMessage("")                                           
                                                }
                                            }
                                        }
                                        onBlur={(e: any) => 
                                           {
                                                let selected: number = Number(e.target.value)
                                                console.log(selected)
                                                if(selected === 0 || selected.toString() === "" || selected === undefined || selected === null)
                                                {
                                                    advertState.setPrice(-1)
                                                    setPrice(-1)
                                                    setPriceMessage(PRICE_MESSAGE)
                                                } else {
                                                    advertState.setPrice(selected)
                                                    setPrice(Number(selected))
                                                    setPriceMessage("")                                      
                                                }
                                            }
                                        }
                                    />
                                { priceMessage && <Message msg={priceMessage} status={errMsgStyle} /> }
                                </div>
                            </div>
                        </div>                        

                        <div 
                            className="w-2/2 md:w-2/2 mb-5 md:mb-16"
                        >
                            <div 
                                className="mb-4"
                            >
                                <span className="w-full font-bold text-sm mb-3">Description</span>
                                <ProductDescriptioinEditor 
                                        data={theDescription}
                                        customOnChange={
                                            (content: string) => {
                                                setTimeout(() => 
                                                {                                                    
                                                   if(content?.length === 0 || content === "" || content === "<p><br></p>" ||  content === "<p></p>")
                                                   {                              
                                                       setTheDescription("")
                                                       advertState.setDescription("")
                                                       setDescriptionMessage(DESCRIPTION_MESSAGE)
                                                   } else {                                                    
                                                       setTheDescription(content)
                                                       setDescriptionMessage("")
                                                       advertState.setDescription(content)
                                                   }
                                                }, 100)
                                            }
                                        }  
                                />
                                { (descriptionMessage?.length === 0 || descriptionMessage === "" || descriptionMessage === "<p><br></p>" ||  descriptionMessage === "<p></p>") && <Message msg={descriptionMessage} status={errMsgStyle} /> }
                                

                                {/* <TextArea 
                                    onClick={
                                        (desc: string) => {
                                            if(desc === "" || desc === null || desc === undefined)
                                            {
                                                setDescriptionErrorMsg(DESCRIPTION_MESSAGE)
                                            } else {          
                                                setDescriptionErrorMsg("")
                                            }
                                        }
                                    }
                                /> */}
                            </div>
                            {/* <div className="text-red-500 font-bold text-sm">{ (value === "") ?  description : "" }</div> */}
                            {/* <div 
                                className="text-red-500 font-bold text-sm"
                            >
                                { description && <Message msg={description} status={errMsgStyle} /> }
                            </div> */}
                        </div>

                        {/* <MultipleImageUpload width={0} ICloudColour={""} 
                            onClick={(img: any) => 
                            {
                                setImagePositionMessage("")
                                setAdvertImages(img)
                            }} 
                        /> */}

                        {  errorMessage && 
                            <div 
                                className="border-2 border-red-400 w-full p-5 mt-5"
                            >
                                <Message msg={errorMessage} status={errMsgStyle} />
                            </div>  
                        }
                        {/* {  (advertState.getImagePosition() === -1) && 
                            <div 
                                className={`${imagePosition ? 'border-2 border-red-400 w-full w-full p-5 mt-5' : "" }`}
                            >
                                <Message msg={imagePosition} status={errMsgStyle} /> 
                            </div>  
                        } 
                        {  imagePosition  && (advertState.getImagePosition() != -1) &&
                            <div 
                                className="border-2 border-red-400 w-full w-full p-5 mt-5"
                            >
                                <Message msg={imagePosition} status={errMsgStyle} /> 
                            </div>  
                        } 
                        */}

                        {/* <div 
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
                                    <span 
                                        className="mr-1 text-white"
                                    >
                                        Save
                                    </span>
                                    { checking ? <BeatLoader size={10} color="white" className="py-2" /> : "Save"}
                                    { !checking &&
                                    <svg 
                                        className="fill-current h-4 w-4 text-white mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> 
                                    </svg>
                                    }
                                </button>
                                { !checking &&
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
                                { checking ? <BeatLoader size={10} color="white" className="py-2" /> : "Publish Ad"} 
                            </div>
                            <div 
                                className="text-white font-bold bg-blue-800 hover:bg-green-700 py-3 px-4 w-[150px] block whitespace-no-wrap cursor-pointer w-fit rounded-lg"
                                    onClick={() => {
                                        SaveAdvert('yes')
                                    }}  
                            >
                                { checking && (type === 'yes') ? <BeatLoader size={10} color="white" className="py-2" /> : "Save As Advert"}
                            </div>
                            
                            
                        </div> */}
                        <div 
                            className="w-full d-flex md:flex mb-3 -mt-5"
                        >
                            <div 
                                className="w-2/2 mb-5 md:mb-0"
                            >
                                { 
                                    (advertState.getOnEdit() === "UA") &&
                                        <div 
                                            className="dropdown inline-block relative"
                                        >
                                            <button 
                                                    className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-5 rounded inline-flex items-center"
                                                    onClick={() => {
                                                        UpdateProductAdvert('save')
                                                    }}
                                            >
                                                { checking ? <BeatLoader size={10} color="white" className="py-2" /> : "Update Advert"}
                                            </button>
                                        </div>
                                }
                                { 
                                    (advertState.getOnEdit() === "UD") &&
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
                                            { checking ? <BeatLoader size={10} color="white" className="py-2" /> : "Upddate"}
                                            { !checking &&
                                            <svg 
                                                className="fill-current h-4 w-4 text-white mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> 
                                            </svg>
                                            }
                                        </button>
                                        { !checking &&
                                            <ul 
                                                className="dropdown-menu absolute hidden text-blue-700 pt-1 absolute"
                                            >
                                                <li className=""
                                                    onClick={() => {
                                                        UpdateProductAdvert('update')
                                                    }}    
                                                >
                                                    <a 
                                                        className="text-white font-bold -t bg-green-800 hover:bg-blue-700 py-3 px-4 block whitespace-no-wrap cursor-pointer"
                                                    >
                                                        Save 
                                                    </a>
                                                </li>
                                                <li className=""
                                                    onClick={() => {
                                                        UpdateProductAdvert('draft')
                                                    }}  
                                                >
                                                    <a 
                                                        className="text-white font-bold bg-green-800 hover:bg-blue-700 py-3 px-4 w-[150px] block whitespace-no-wrap cursor-pointer"
                                                    >
                                                        Update Draft
                                                    </a>
                                                </li>
                                            </ul>
                                        }
                                </div>
                                }
                            </div>
                        </div>

                </div>
            }



            {
                retrieved && <Retrieval 
                            onClick={
                                () => {
                                
                                }
                            } 
                            preLoadModal={retrieved}
                        />
            }

            {
                openSpecification && <SpecificationDetail 
                            onClick={
                                () => {
                                    setOpenSpecification(false)
                                }
                            } 
                            openSpecification={openSpecification}
                            detail={productSpecificationDetail}
                        />
            }
        </>
    )
}
