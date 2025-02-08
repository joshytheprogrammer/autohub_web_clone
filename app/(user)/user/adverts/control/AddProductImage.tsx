import React, { useEffect, useState } from 'react';
// import './css/dragAndDrop.css'
import { BeatLoader } from "react-spinners";
import { Modal } from '../../../../../components/modal/Modal';
import { reduceImageSize } from '../../../../../components/util/image';
import { AddImage } from '../../../../api/home/market/images/product-images';
import Message from '../../../../../components/shared/Message';

type AddProductImageProp = 
{
   onClick: () => void 
   imageModal: boolean 
   productId: number 
   adverProductId: number
   userType: string
   token: string
}

export const AddProductImage = ({onClick, imageModal, productId, adverProductId, userType, token}: AddProductImageProp)  =>
{  
        const [imgUrl, setUrl] = useState<string>("")
        const [loading, setIsLoading] = useState<boolean>(false)
        const [rawImage, setRawImage] = useState<string>("")
    
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
   
        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
           console.log(adverProductId)
        }, []) 
        
        useEffect(() => 
        {

        }, [imgUrl])

        useEffect(() => 
        {

        }, [rawImage])

        const uploadImage = async () =>
        {
            setIsLoading(true)
            const AddProductImage = AddImage(productId, rawImage, userType, token)
            AddProductImage.then((response) => 
            {
                if(response?.status === 200)
                {
                   setIsLoading(false)
                   setErrorMessage("")
                   onClick()
                } else {
                   setIsLoading(false)
                   setErrorMessage("Setting product image failed")
                }

            }).then(() => {

            })
            console.log(rawImage)
        }

        const imageUrlToDisplay = (file: any) => 
        {
            const img = file[0]
            const displayedImage: any = URL.createObjectURL(img)
            setUrl(displayedImage)

            const image = Array.from(file)        
            Promise.all(
                image.map((file: any) => 
                {
                   return new Promise((resolve, reject) => 
                   {
                      const reader: FileReader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = async () => 
                      {                        
                         let sizeToCalculate = reader.result as string
                         let x = await reduceImageSize(sizeToCalculate)
                         resolve(x)
                      }
                      reader.onerror = (error) => reject(error);
                   });
                })
                ).then((results) => {
                   let x = results[0] as string
                   setRawImage(x)
                });
        }

        const closeIt = () => 
        {
                setUrl("")
                return onClick()                
        }

        return (
                <>
                        <Modal onClick={onClick} isOpen={imageModal} wrapperWidth={800} margin={'240px auto 0px auto'} color='green'>
                                {/* <div className={`transition duration-300 w-full ${!error && "hidden"}`}>
                                        <div className={`bg-red-500/10 border-red-500/80 border w-full flex justify-center p-2`}>
                                                <p className=" w-max text-center text-xs text-[#D10000]">{error}</p>
                                        </div>
                                </div> */}
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                <div 
                                   className="grid grid:col-12 gap-5 mt-5 mb-5 justify-center items-center"
                                >
                                        <div className="bg-white shadow-md w-fit mx-auto justify-center item-center overflow-y-auto xm:overflow-y-scroll justify-center item-center h-[400px]">
                                               { imgUrl && 
                                                        <img src={imgUrl} alt="Product image" className="object-cover" />
                                                }
                                         </div>

                                        
                                         <div className="drag-area p-3 items-center text-center mx-auto">
                                                <span className="flex select justify-center items-center text-xs block" role="button">
                                                        <b className="px-10 py-5">Browse</b>
                                                        <input type="file" id="product" name="product" className="file" onChange={
                                                                (e) => {
                                                                        imageUrlToDisplay(e.target.files)
                                                                }
                                                         } />
                                                </span>
                                        </div>
                                </div>
                                
                                <div 
                                    className="items-center gap-5 mt-2 sm:flex flex justify-left mb-2 mx-5 mt-1 -ml-1 justify-center flexx"
                                >                                        
                                        <button 
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={closeIt}
                                                >
                                                        Cancel
                                        </button>
                                        
                                         {
                                            imgUrl && <button 
                                                        className="py-3 px-4 bg-green-700 hover:bg-green-500 text-white font-semibold text-sm rounded-xl w-max"
                                                        onClick={uploadImage}
                                                        >
                                                        {   (loading === true) ? ( <BeatLoader size={9} color="#fff" />) : ( "Upload Image" )  }
                                                </button>
                                         }
                                </div>
                        </Modal>
                </> 
        );
}


