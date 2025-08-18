import { useEffect, useState } from "react"
import { PuffLoader } from "react-spinners"
import { Modal } from "../../../../components/modal/Modal"
import { useRouter } from "next/navigation"
import { UseStore } from "../../../../state/store"
import delay from "delay"
import Cookies from 'js-cookie';
import Message from "../../../../components/shared/Message"


type PreloadProps = 
{
    onClick: () => void 
    preLoadModal: boolean 
    slug: string 
    mode: string
}    

const AdvertWithSpecificData = async (url: string) => 
{
    let endPoint = `/api/advert/modified-data/${url}`
    let ApiUrl = `${process.env.URL}${endPoint}`
    // return await fetch(ApiUrl).then((res) => res.json());
    
    return fetch(ApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('user-in-use')}`,
        }
    })
    .then((res) => res.json())
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
        await delay(200)
        const GetUserProductDetail = AdvertWithSpecificData(slug)
        GetUserProductDetail.then((response) => 
        { 
            if(response?.status === 200)
            {
                console.log(response?.data)
                populateFields(response?.data)
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

     const populateFields = (data: any) => 
     {
        advertState.setOnEdit(mode)
        advertState.setProductId(data?.product?.product_id)
        advertState.setCategory(data?.product?.category_id)
        advertState.setCategoryName(data?.product?.category_name)
        advertState.setCountry(data?.product?.country_id)
        advertState.setCountryName(data?.product?.country_name)
        advertState.setStates(data?.product?.state_id)
        advertState.setStateName(data?.product?.state_name)
        advertState.setLGA(data?.product?.lga_id)
        advertState.setLgaName(data?.product?.lga_name)
        advertState.setOurLgaName(data?.product?.lga_name)
        advertState.setManufacturer(data?.product?.manufacturer_id)
        advertState.setManufacturerName(data?.product?.manufacturer_name)
        advertState.setModel(data?.product?.model_id)
        advertState.setModelName(data?.product?.model_name)
        advertState.setGeneration(data?.product?.generation_id)
        advertState.setGenerationName(data?.product?.generation_name)
        advertState.setSerie(data?.product?.serie_id)
        advertState.setSerieName(data?.product?.serie_name)
        advertState.setTrim(data?.product?.trim_id)
        advertState.setTrimName(data?.product?.trim_name)
        advertState.setColour(data?.product?.colour_id)
        advertState.setColourName(data?.product?.colour_name)
        advertState.setYear(data?.product?.year)
        advertState.setYearName(data?.product?.year)
        advertState.setTransmission(data?.product?.transmission?.id)
        advertState.setTransmission(data?.product?.transmission_id)
        advertState.setTransmissionName(data?.product?.transmission_name)
        advertState.setCondition(data?.product?.condition_id)
        advertState.setConditionName(data?.product?.condition_name)
        advertState.setFuel(data?.product?.fuel_id)
        advertState.setFuelName(data?.product?.fuel_name)
        advertState.getMileage(data?.product?.mileage)
        advertState.setLocation(data?.product?.address)
        advertState.setChasisNo(data?.product?.chasis_no)
        advertState.setDescription(data?.product?.description)
        advertState.setPrice(data?.product?.price)
        advertState.setOthers("no")
        advertState.setTheManufacturerName("")
        advertState.setTheModelName("")
        advertState.setTheTrimName("")
        advertState.setImagePosition(-1)
        advertState.setSaveOption("")

        console.log(data?.colours)
        
        advertState.setCategories(data?.categories)
        advertState.setCountries(data?.countries)
        advertState.setStatess(data?.states)
        advertState.setLGAS(data?.lgas)
        advertState.setManufactuers(data?.manufacturers) 
        advertState.setModels(data?.models)  
        advertState.setGenerations(data?.generations)  
        advertState.setSeries(data?.series)
        advertState.setTrims(data?.trims) 
        advertState.setColours(data?.colours)
        advertState.setFuels(data?.fuel)
        advertState.setTransmissions(data?.transmission)
        advertState.setConditions(data?.conditions)
        advertState.setProductDetail(data?.product_detail)
        router.push(`/user/update-advert?ytedpfpiemfi986emgogietwbfmvlvjedd=${slug}&kfiirnmoeiuuyyh3u4i5pfmnvijurmfjvhrfyfhufyfb=${data?.product?.product_id}`) 
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
                                
                                {   loading ? ( <PuffLoader size={50} className="text-black" />) : ( "" ) } 
                            </div>
                        </div>
                </Modal>  
     );
}
