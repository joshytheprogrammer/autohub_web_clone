import { useEffect, useState } from "react"
import { PuffLoader } from "react-spinners"
import { Modal } from "../../../../components/modal/Modal"
import { useRouter } from "next/navigation"
import { UseStore } from "../../../../state/store"
import { AdvertWithSpecificData } from "../../../api/home/market/advert/createAdvert"
import delay from "delay"
import Message from "../../../../components/shared/Message"


type PreloadProps = 
{
    onClick: () => void 
    preLoadModal: boolean 
    slug: string 
    mode: string
}    

export const PreLoadingModal = ({onClick, preLoadModal, slug, mode}: PreloadProps)  =>
{
     const router = useRouter()
     const advertState = UseStore((state) => state)
     const [loading, setIsLoading] = useState<boolean>(false)
 
     const [errMsgStyle, setErrMsgStyle] = useState<string>('')
     const [errorMessage, setErrorMessage] = useState<string>("")

     useEffect(() => 
     {
        setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        setErrorMessage("")
        GetSelectedProduct()
     }, []) 

     const GetSelectedProduct = async () => 
     {    
        setIsLoading(true)
        await delay(1000)
        const GetUserProductDetail = AdvertWithSpecificData(slug)
        GetUserProductDetail.then((response) => 
        { 
            if(response?.data?.status === 200)
            {
                populateFields(response?.data?.data?.products, response?.data?.data?.manufacturer_models, response?.data?.data?.model_trims, response?.data?.data?.trim_engines)
            } else {
                setIsLoading(false)
                setErrorMessage("Product could not be loaded")
                setTimeout(() => 
                {
                   setErrorMessage("")                                
                }, 10000)
            }
        }).then(() => {
            
        })
     }

     const populateFields = (product: any, manufacturerModels: any, modelTrims: any, trimEngines: any) => 
     {    
        advertState.setOnEdit(mode)
        advertState.setCountry(product?.country?.id)
        advertState.setCountryName(product?.country?.name)
        advertState.setStates(product?.state?.id)
        advertState.setStateName(product?.state?.name)
        advertState.setCategory(product?.category?.id)
        advertState.setCategoryName(product?.category?.name)
        advertState.setManufacturer(product?.manufacturer.id)
        advertState.setManufacturerName(product?.manufacturer?.name)
        advertState.setModel(product?.model?.id)
        advertState.setModelName(product?.model?.name)
        advertState.setTrim(product?.trim?.id)
        advertState.setTrimName(product?.trim?.name)
        advertState.setEngine(product?.engine?.id)
        advertState.setEngineName(product?.engine?.name)
        advertState.setColour(product?.colour?.id)
        advertState.setColourName(product?.colour?.name)
        advertState.setYear(product?.year)
        advertState.setYearName(product?.year)
        advertState.setTransmission(product?.transmission?.id)
        advertState.setTransmissionName(product?.transmission?.name)
        advertState.setCondition(product?.condition?.id)
        advertState.setConditionName(product?.condition?.name)
        advertState.setFuel(product?.fuel?.id)
        advertState.setFuelName(product?.fuel?.name)
        advertState.setMileage(product?.mileage)
        advertState.setLocation(product?.address)
        advertState.setChasisNo(product?.Chasis_no)
        advertState.setDescription(product?.description)
        advertState.setPrice(product?.price)
        advertState.setOthers("no")
        advertState.setTheManufacturerName("")
        advertState.setTheModelName("")
        advertState.setTheTrimName("")
        advertState.setTheEngineName("")
        advertState.setTheMakerModels(manufacturerModels)
        advertState.setTheModelTrim(modelTrims)
        advertState.setTrimEngine(trimEngines)
        advertState.setStateModel([])
        advertState.setImagePosition(-1)
        advertState.setSaveOption("")
        router.push(`/user/edit-advert?ytedpfpiemfi986emgogietwbfmvlvjedd=${slug}&kfiirnmoeiuuyyh3u4i5pfmnvijurmfjvhrfyfhufyfb=${product?.id}`) 
     }

     return (
                <Modal 
                        onClick={onClick} isOpen={preLoadModal} wrapperWidth={500} margin={'320px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                            <div 
                                className="items-center gap-5 mt-2 sm:flex flex justify-center mb-2 mx-5 mt-5 y-20"
                            >                        
                                
                                {   loading ? ( <PuffLoader size={9} className="text-black" />) : ( "" ) } 
                            </div>
                        </div>
                </Modal>  
     );
}
