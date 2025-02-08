import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import Message from "../../../../../../components/shared/Message"
import { Modal } from "../../../../../../components/modal/Modal"
import { RemoveCategory } from "../../../../../api/admin/market/categories"

type TCategory = 
{
    id: number
    name: string,
    icon: string,
    link: string,
    mobile: string,
    rate: number
}

type DeleteCategoryModalProps = 
{
    onClick: () => void 
    openDeleteCategory: boolean 
    token: string
    data: TCategory
}    

export const DeletCategoryModal = ({onClick, openDeleteCategory, data, token}: DeleteCategoryModalProps)  =>
{
     const [loading, setIsLoading] = useState<boolean>(false)
 
     const [errMsgStyle, setErrMsgStyle] = useState<string>('')
     const [errorMessage, setErrorMessage] = useState<string>("")

     useEffect(() => 
     {
        setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        setErrorMessage("")
     }, []) 

     const CategoryDelete = async () => 
     { 
         setIsLoading(true)
         const CategDel = RemoveCategory(data?.id, token)
         CategDel.then((response) => 
         {
             if(response?.status === 200)
             { 
                setIsLoading(false)
                onClick()
             } else {
                setErrMsgStyle(response?.message)
                setIsLoading(false)
                setTimeout(() => 
                {
                   setErrMsgStyle("")
                }, 5000)
             }
         }).catch(() => {

         })

     }

     return (
                <Modal 
                        onClick={onClick} isOpen={openDeleteCategory} wrapperWidth={650} margin={'200px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                            className='w-full pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center space-x-10 m-5'
                        >
                           <div className="font-bold text-xl flex justify-center text-center">You are about deleting <span className="font-bold text-blue-500 mr-2 ml-2">{`${data?.name}`}</span> category</div>
                        </div>
                        <div 
                            className='w-full pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center space-x-10 m-5'
                        >
                           <button 
                                className="w-5/12 py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl"
                                onClick={() => onClick() }
                           >
                              Cancel
                           </button>
                           <button 
                                className="w-5/12 py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl hover:bg-green-800"
                                onClick={() => CategoryDelete()}
                           >
                             {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Delete" ) } 
                           </button>
                        </div>
                </Modal>  
        );
}
