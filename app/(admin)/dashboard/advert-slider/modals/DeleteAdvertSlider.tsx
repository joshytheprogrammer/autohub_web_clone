import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
// import { USAGE_PATH } from "../../../../../constant/Path"
import Message from "../../../../../components/shared/Message"
import { DeleteAdvertSlide, UpdateAdvertSlider } from "../../../../api/admin/market/adverts"


type DeleteAdvertSliderProps = 
{
    onClick: () => void 
    toogleImageSlider: boolean 
    data: { id: number, name: string, image_url: string }
    token: string
}    

export const DeleteAdvertSlider = ({onClick, toogleImageSlider, data, token}: DeleteAdvertSliderProps)  =>
{    
     const [loading, setLoading] = useState<boolean>(false)

     const [errMsgStyle, setErrMsgStyle] = useState<string>('')
     const [errorMessage, setErrorMessage] = useState<string>("")

     useEffect(() => 
    {
        setErrMsgStyle('w-full flex text-md bg-red-600 text-white font-bold rounded-lg py-2 px-5')
    }, [])

     const RemoveSlide = async () => 
     { 
        setLoading(true)
        const addDept = DeleteAdvertSlide(data?.id, token)
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
     }

    return (
                <Modal 
                        onClick={onClick} isOpen={toogleImageSlider} wrapperWidth={1000} margin={'100px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  } 
                        <div 
                            className="text-2xl mb-4 font-bold text-left"
                        >
                            {data?.name}
                        </div>                         
                        <div 
                            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                            <div 
                               className="mb-4 md:w-full d-flex md:flex border-2 border-shadow rounded-lg px-5 py-2 mb-5 md:mb-0"
                            >
                               <img src={data?.image_url}    />                                      
                            </div>
                        </div>
                        <div 
                            className="items-center gap-5 mt-5 flex justify-center mb-2 mx-0 mt-5"
                        >               
                                    
                            <div 
                                className="flex gap-10"
                            >                                                  
                                <button 
                                    className="p-3 bg-green-600 hover:bg-green-800 -mt-5 text-white font-semibold text-sm rounded-xl w-max"
                                    onClick={() => onClick() }
                                >
                                  Cancel
                                </button> 
                                <button 
                                    className="p-3 bg-red-600 hover:bg-red-800 -mt-5 text-white font-semibold text-sm rounded-xl w-max"
                                    onClick={() => RemoveSlide() }
                                >
                                    {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Delete" ) } 
                                </button>  
                            </div>                                    
                        </div>
                </Modal> 
        );
}
