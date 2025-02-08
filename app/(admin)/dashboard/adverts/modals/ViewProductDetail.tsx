import { Modal } from "../../../../../components/modal/Modal"
import DOMPurify from "dompurify"
import { USAGE_PATH } from "../../../../../constant/Path"
import { GetProductDetail, PlaceAsAdvert } from "../../../../api/admin/market/adverts"
import { UseStore } from "../../../../../state/store"
import { useQuery } from "@tanstack/react-query"
import { PuffLoader } from "react-spinners"
import toast from "react-hot-toast"


type ViewProductDetailProps = 
{
    onClick: () => void 
    openViewProductDetail: boolean 
    product: any
}    


export const ViewProductDetail = ({onClick, openViewProductDetail, product}: ViewProductDetailProps)  =>
{   
    const UserToken = UseStore((state) => state)
    const token: string = UserToken.getUserToken()

    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-product`, product?.tb_id, token], queryFn: () => GetProductDetail(product?.tb_id, token)})
  
    const placeAdvert = (imageId: number, status: string) => 
    {
        if(status === 'active')
        {
            const Place = PlaceAsAdvert(Number(imageId), Number(product?.tb_id), token)
            Place.then((response) => 
            {
                if(response?.status === 200)
                {
                    toast.success(response?.message, {
                      position: "top-center",
                    });
                    refetch()
                    // alert(response?.message)
                } else {
                    toast.success(response?.message, {
                      position: "top-center",
                    });
                    refetch()
                    // alert("Advert could not be placed")
                }
            }).catch(() => {
    
            })
        } else {
            toast.error(`You can not place as an advert, product is ${status}`, {
              position: "top-center",
            });
        }
    }

    return (
                <Modal 
                        onClick={onClick} isOpen={openViewProductDetail} wrapperWidth={1000} margin={'60px auto 0px auto'}
                >
                    {
                        isLoading && !isRefetching &&  <div 
                                    className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                                >
                                    <PuffLoader className='w-12 h-12' color="black" />
                                </div>
                    }
                    {
                        isLoading && isRefetching  &&  <div 
                                    className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                                >
                                    <PuffLoader className='w-12 h-12' color="black" />
                                </div>
                    }
                    {
                        !isLoading && data?.data && <>
                            <div 
                                className="w-full text-sm font-bold font-bold text-blue-500 text-xl mb-3 px-5"
                            >
                                Product Detail : <span className="text-green-600 font bold">{data?.data?.title}</span>
                            </div>
                            <div 
                                className='col-span-12 pt-1 pb-5 pb-2 overflow-auto overflow-y-scroll justify-center h-[700px] px-5 item-center'
                            >        
                                    <div 
                                        className="mb-4 md:w-full d-flex md:flex gap-5 "
                                    >
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Title</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.title}
                                            </div>
                                        </div>
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Manufacturer</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.manufacturer}
                                            </div>
                                        </div>
                                    </div> 
                                    <div 
                                        className="mb-4 md:w-full d-flex md:flex gap-5"
                                    >
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Model</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.model}
                                            </div>
                                        </div>
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Trim</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.trim}
                                            </div>
                                        </div>
                                    </div> 
                                    <div 
                                        className="mb-4 md:w-full d-flex md:flex gap-5"
                                    >
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Engine</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.engine}
                                            </div>
                                        </div>
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Colour</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.colour}
                                            </div>
                                        </div>
                                    </div> 
                                    <div 
                                        className="mb-4 md:w-full d-flex md:flex gap-5"
                                    >
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Transmission</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.transmission}
                                            </div>
                                        </div>
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Year</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.year}
                                            </div>
                                        </div>
                                    </div> 
                                    <div 
                                        className="mb-4 md:w-full d-flex md:flex gap-5"
                                    >
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Country</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.country}
                                            </div>
                                        </div>
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">State</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.state}
                                            </div>
                                        </div>
                                    </div> 
                                    <div 
                                        className="mb-4 md:w-full d-flex md:flex gap-5"
                                    >
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Location</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.location}
                                            </div>
                                        </div>
                                        <div 
                                            className="w-full md:w-1/2 border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Mileage</span>
                                            <div 
                                                className=""
                                            >
                                                {data?.data?.mileage}
                                            </div>
                                        </div>
                                    </div> 
                                    <div 
                                        className="mb-4 md:w-full d-flex md:flex gap-5"
                                    >
                                        <div 
                                            className="w-full border-2 border-shadow rounded-lg py-2 px-5 mb-5 md:mb-0"
                                        >
                                            <span className="w-full text-sm font-bold">Description</span>
                                            <div 
                                                className=""
                                            >
                                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.data?.description!) }} ></div>
                                            </div>
                                        </div>
                                    </div> 
                                    { 
                                        data?.data?.images && (data?.data?.images.length > 0) && data?.data?.images.map((img: any, index: number) => {
                                                let cssStyle = (Number(img.as_advert) === 1) ? "col-span-3 md:col-span-3 border border-2 mb-5 relative border border-2 p-3 bg-green-100 border-green-700" : "col-span-3 md:col-span-3 border border-2 mb-5 relative"
                                                return (
                                                        <div className={cssStyle} key={index}>
                                                            <img src={`${USAGE_PATH.PRODUCT_FACE}${img.image_url}`} alt="product images" />
                                                                <button 
                                                                    onClick={() => {
                                                                        placeAdvert(img?.id, data?.data?.status)
                                                                    }} 
                                                                    className='hover:bg-green-800 rounded-full text-sm p-3 px-5 bg-blue-700 text-white font-bold absolute bottom-11 right-11'>
                                                                    place as advert - {img.as_advert}
                                                                </button>
                                                        </div> 
                                                        )                                                       
                                                }) 
                                    } 
                            </div>
                            
                            <div 
                                className="items-center gap-5 mt-5 sm:flex flex justify-between mb-2 mx-0 mt-5"
                            >                                       
                                <button 
                                    className="p-5 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                    onClick={() => onClick() }
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    }
                </Modal>  
        );
}
