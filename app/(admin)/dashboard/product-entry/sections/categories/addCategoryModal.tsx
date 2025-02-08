import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Modal } from "../../../../../../components/modal/Modal";
import { AddCategory } from "../../../../../api/admin/market/categories";
import Message from "../../../../../../components/shared/Message";

type addCategoryModalProps = 
{
    onClick: () => void,
    openCategoryModal: boolean,
    userType: string
    token: string
} 

type TCategory = {
    name: string,
    icon: string,
    link: string,
    mobile: string,
    rate: number
}

export const AddCategoryModal = ({onClick, openCategoryModal, userType, token}: addCategoryModalProps)  =>
{
        const [loading, setIsLoading] = useState(false)
        const [categoryName, setCategoryName] = useState<string>("")
        const [categoryIcon, setCategroyIcon] = useState<string>("")
        const [categoryLink, setCategoryLink] = useState<string>("")
        const [categoryMobile, setCategoryMobile] = useState<string>("")
        const [categoryRate, setCategoryRate] = useState<number>(-1)
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
    
        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
           setErrorMessage("")
           console.log({ userType })
        }, []) 
        
        const AddCateg = () => 
        {
            const data: TCategory = 
            {
                name: categoryName,
                icon: categoryIcon,
                link: categoryLink,
                mobile: categoryMobile,
                rate: categoryRate
            }
            setIsLoading(true)
            const addCateg = AddCategory(data, token)
            addCateg.then((response) => 
            {
                if(response?.status === 200)
                {
                      onClick()  
                } else {
                   setErrorMessage(response?.message)
                   setTimeout(() => 
                   {
                      setErrorMessage("")
                   }, 5000)
                }
            }).then(() => {

            })
        }

        return (
                <Modal 
                        onClick={onClick} isOpen={openCategoryModal} wrapperWidth={800} margin={'120px auto 0px auto'}
                >
                        <div 
                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                <div 
                                    className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >
                                        <h1 
                                                className="text-black font-bold w-full flex justify-left text-center mb-5"
                                        >
                                                Add Category
                                        </h1>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="categoryName" id="categoryName" placeholder="Enter Category Name" 
                                                        onChange={(e) => {
                                                               setCategoryName(e.target.value) 
                                                        }}
                                                />
                                        </div>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="categoryIcon" id="categoryIcon" placeholder="Enter Category Icon" 
                                                        onChange={(e) => {
                                                               setCategroyIcon(e.target.value) 
                                                        }}
                                                />
                                        </div>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="categoryLink" id="categoryLink" placeholder="Enter Category Link" 
                                                        onChange={(e) => {
                                                               setCategoryLink(e.target.value) 
                                                        }}
                                                />
                                        </div>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="categoryMobile" id="categoryMobile" placeholder="Enter Category Mobile" 
                                                        onChange={(e) => {
                                                               setCategoryMobile(e.target.value) 
                                                        }}
                                                />
                                        </div>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="categoryRate" id="categoryRate" placeholder="Enter Category Rate" 
                                                        onChange={(e) => {
                                                               setCategoryRate(Number(e.target.value)) 
                                                        }}
                                                />
                                        </div>   
                                        <div 
                                        className="items-center gap-5 mt-2 sm:flex flex justify-between mx-1 mt-5"
                                        >                                       
                                                {
                                                        <button 
                                                                className="py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-semibold text-sm rounded-xl w-max"
                                                                onClick={() => onClick() }
                                                        >
                                                                        Close
                                                        </button>
                                                }
                                                {
                                                <button 
                                                                className="py-3 px-4 bg-green-800 hover:bg-green-700 text-white font-semibold text-sm rounded-xl w-max"
                                                                onClick={() => AddCateg()}
                                                >
                                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Create" )          }
                                                </button>
                                                }
                                        </div>
                                </div>
                        </div>
                </Modal>  
        );
}