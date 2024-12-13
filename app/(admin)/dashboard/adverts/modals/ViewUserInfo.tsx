import { useEffect } from "react"
import { Modal } from "../../../../../components/modal/Modal"
import { USAGE_PATH } from "../../../../../constant/Path"


type ViewUserInfoProps = 
{
    onClick: () => void 
    openViewUserDetailModal: boolean 
    user: any
}    

export const ViewUserInfo = ({onClick, openViewUserDetailModal, user}: ViewUserInfoProps)  =>
{
    console.log(user)
     useEffect(() => 
     {
        console.log(user)
     }, []) 

     
     return (
                <Modal 
                        onClick={onClick} isOpen={openViewUserDetailModal} wrapperWidth={1000} margin={'80px auto 0px auto'}
                >
                        <div 
                            className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex justify-center items-center md:bg-blue-200 border-2 border-shadow rounded-lg p-5 mb-5 md:mb-5"
                                >
                                    <img 
                                        src={`${USAGE_PATH.AVATAR}${user?.image}`}
                                        width={300}
                                        className="flex justify-center items-center rounded-xl border-4 border-white"
                                    />                                         
                                </div>
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                                >
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg p-5 mb-2 md:mb-0"
                                    >
                                        {user?.firstname}
                                    </div>
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg p-5 mb-2 md:mb-0"
                                    >
                                        {user?.surname}
                                    </div>
                                </div> 
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                                >
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg p-5 mb-2 md:mb-0"
                                    >
                                        {user?.phone}
                                    </div>
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg p-5 mb-2 md:mb-0"
                                    >
                                        {user?.email}
                                    </div>
                                </div> 
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex border-2 border-shadow rounded-lg p-5 mb-2 md:mb-5"
                                >
                                        {user?.user_type}  
                                </div>  
                                <div 
                                   className="items-center gap-5 mt-5 sm:flex flex justify-center mb-2 mx-0 mt-5"
                                >                                       
                                        <button 
                                             className="p-5 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                             onClick={() => onClick() }
                                        >
                                            Cancel
                                        </button>
                                        
                                </div>
                        </div>
                </Modal>  
        );
}
