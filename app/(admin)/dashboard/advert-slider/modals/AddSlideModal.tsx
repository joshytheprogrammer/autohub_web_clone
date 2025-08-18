import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
// import { USAGE_PATH } from "../../../../../constant/Path"
import Message from "../../../../../components/shared/Message"
import SingleImageUpload from "../../../../../components/shared/SingleImageUpload"
import { CreateAdvertSlider } from "../../../../api/admin/market/adverts"


type AddAdvertSlideModalProp = 
{
    onClick: () => void 
    openAddSlide: boolean
    token: string
}    

export const AddSlideModal = ({onClick, openAddSlide, token}: AddAdvertSlideModalProp)  =>
{
     const [loading, setLoading] = useState<boolean>(false)

     const NAME_MESSAGE = 'Enter Name'
     const SLIDE_MESSAGE = 'Enter Slide'
     const STATUS_MESSAGE = 'Enter Status'
     const PICTURE_MESSAGE = 'Enter Picture'
     
     const [url, setUrl] = useState<string>("");
     const [pictureMessage, setPictureMessage] = useState<string>('')
     const [processAdvert, setProcessAdvert] = useState(false)

     const [name, setName] = useState<string>('')
     const [nameMessage, setNameMessage] = useState<string>('')

     const [slide, setSlide] = useState<number>(-1)
     const [slideMessage, setSlideMessage] = useState<string>('')

     const [status, setStatus] = useState<string>('')
     const [statusMessage, setStatusMessage] = useState<string>('')

     const [errMsgStyle, setErrMsgStyle] = useState<string>('')
     const [errorMessage, setErrorMessage] = useState<string>("")

     useEffect(() => 
     {
        setErrMsgStyle('text-md text-red-500 font-bold rounded-lg py-1 px-5')
     }, []) 

     useEffect(() => 
     {
         
     }, [name, slide, status]) 

     const addSlide = async () => 
     {
        if(allField() === true)
        {
           setLoading(true)
           const slideData =  { name: name, slide: slide, status: status, image: url }
           const addDept = CreateAdvertSlider(slideData, token)
           addDept.then((response) => 
           {
             if(response?.status === 200)
             {
                setLoading(false)
                onClick()                
             } else {
                setErrorMessage(response?.message)
                setTimeout(() => 
                {
                  setErrorMessage("")
                }, 3000)
                setLoading(false)                
             }
           }).catch(() => {
           })
        } else {
                // alert("No")
        } 
     }

     const allField = () => 
     {
        let valid = true
        if(name === "" || name === undefined || name === ""){ setNameMessage(NAME_MESSAGE); valid = false; }
        if(slide === -1){ setSlideMessage(SLIDE_MESSAGE); valid = false; }
        if(status === "" || status === undefined || status === ""){ setStatusMessage(STATUS_MESSAGE); valid = false; }  
        if(!url){ setPictureMessage(PICTURE_MESSAGE); setUrl('x'); valid = false; }  
        return valid      
     }

     return (
                <Modal 
                        onClick={onClick} isOpen={openAddSlide} wrapperWidth={850} margin={'100px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                            className='col-span-12 pt-1 px-3 py-2 overflow-y-auto xm:overflow-y-scroll'
                        >
                                <h1 className='w-full flex justify-left text-xl items-left uppercase mb-5 font-bold mt-3 text-red-600'>Add Slide</h1>                               
                                {
                                        // imageProductUrl && imageProductUrl !="" && <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto">
                                        //         <img className="w-full" src={`${USAGE_PATH.PRODUCT_FACE}${imageProductUrl}`} alt="Sunset in the mountains" />
                                        // </div>
                                }
                                <div 
                                    className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >    
                                    <div 
                                        className="mb-4 md:w-full d-flex md:flex gap-5 mt-2"
                                    >
                                        <div 
                                            className="w-full md:w-2/2 rounded-lg mb-5 md:mb-0"
                                        >
                                            <input  
                                                className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                type="text" name="name" id="name" placeholder="Enter Name" 
                                                onChange={(e: any) => 
                                                {
                                                    let value: string = e.target.value
                                                    setName(value)
                                                    setNameMessage("")
                                                }}
                                                onBlur={(e: any) => 
                                                {
                                                    let value: string = e.target.value
                                                    if(value === "" || value === undefined || value === null)
                                                    {
                                                        setNameMessage(NAME_MESSAGE)
                                                    }
                                                }}
                                            />
                                        { nameMessage && <Message msg={NAME_MESSAGE} status={errMsgStyle} /> }
                                        </div>
                                    </div> 
                                    <div 
                                        className="mb-4 md:w-full d-flex md:flex gap-5 -mb-20"
                                    >
                                        <div 
                                            className="w-full md:w-1/2 rounded-lg mb-5 md:mb-0"
                                        >
                                            <input  
                                                className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                type="number" name="slide" id="slide" placeholder="Enter slide" 
                                                onChange={(e: any) => 
                                                {
                                                    let value: number = Number(e.target.value)
                                                    setSlide(value)
                                                    setSlideMessage("")
                                                }}
                                                onBlur={(e: any) => 
                                                {
                                                    let value: string = e.target.value
                                                    if(value === "")
                                                    {
                                                        setSlide(-1)
                                                        setSlideMessage(SLIDE_MESSAGE)
                                                    }
                                                }}
                                            />
                                            { slideMessage && <Message msg={SLIDE_MESSAGE} status={errMsgStyle} /> }
                                        </div>
                                        <div 
                                            className=" md:w-1/2 w-full p-2 relative"
                                        >
                                            <select        
                                                className="block appearance-none w-full border-2 border-shadow bg-gray-100 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                onChange={(e: any) => 
                                                    {
                                                        let value: string = e.target.value
                                                        if(value.length === 0 || value === "" || value === undefined || value === null)
                                                        {
                                                            setStatus("")
                                                            setStatusMessage(STATUS_MESSAGE)
                                                        } else {
                                                            setStatus(value)
                                                            setStatusMessage("")                                                        
                                                        }
                                                    }}
                                                    onBlur={(e: any) => 
                                                    {
                                                        let value: string = e.target.value
                                                        if(value.length === 0 || value === "" || value === undefined || value === null)
                                                        {
                                                            setStatus("")
                                                            setStatusMessage(STATUS_MESSAGE)
                                                        } else {
                                                            setStatus(value)
                                                            setStatusMessage("")                                                        
                                                        }
                                                    }
                                                }
                                                >
                                                <option value=''> - Select Status -  </option>
                                                <option value={'active'}> Active  </option>
                                                <option value={'inactive'}> Inactive  </option>
                                            </select>
                                            { statusMessage && <Message msg={STATUS_MESSAGE} status={errMsgStyle} /> }
                                        <div 
                                        className="pointer-events-none mr-3 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -mt-5"
                                        >
                                        <svg 
                                            className="fill-current h-4 w-4" 
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                        </svg>
                                        </div>
                                    </div> 
                                </div>

                                <SingleImageUpload 
                                    width={0} 
                                    space={""} 
                                    ICloudColour={""} 
                                    onClick={
                                        (photo) => {
                                            setProcessAdvert(true)
                                            setUrl(photo)
                                        }
                                    } 
                                />
                                { url === 'x' && <Message msg={PICTURE_MESSAGE} status={errMsgStyle} /> }

                                
                                <div 
                                   className="items-center gap-5 mt-5 sm:flex flex justify-between mb-2 mt-14"
                                >                                       
                                   <button 
                                        className="px-3 py-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-red-800"
                                        onClick={() => onClick() }
                                   >
                                      Cancel
                                   </button>
                                      
                                   <button 
                                       className="px-3 py-4 bg-green-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                                       onClick={() => addSlide()}
                                   >
                                      {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Add" ) } 
                                   </button>                                        
                                </div>
                           </div>
                        </div>
                </Modal>  
        );
}
