import { useState } from "react"
import { Modal } from "../../../../../components/modal/Modal"
import toast from "react-hot-toast"
import { USAGE_PATH } from "../../../../../constant/Path"
import { ActionOnUser } from "../../../../api/admin/market/users"
import { BeatLoader } from "react-spinners"


type SuspendedUserProps = 
{
    onClick: () => void 
    openSuspendUser: boolean 
    data: any
    token: string
}    

export const SuspendUserModal = ({onClick, openSuspendUser, data, token}: SuspendedUserProps)  =>
{
     const [loading, setIsLoading] = useState<boolean>(false)
     const [takeAction, setTakeAction] = useState<string>(data?.status)
     const ACTIONS = ['active', 'inactive', 'suspended', 'pending']

     const SelectedUser = async () => 
     {
        setIsLoading(true)
        const sus = ActionOnUser(data?.id, takeAction, token)
        sus.then((response) => 
        {
            if(response?.status === 200)
            {
                setIsLoading(false)
                toast.success(response?.data, {
                  position: "top-center",
                });
                onClick()
            }
        }).catch(() => {
            setIsLoading(false)
        })
     }

     return (
                <Modal 
                        onClick={onClick} isOpen={openSuspendUser} wrapperWidth={650} margin={'70px auto 0px auto'}
                >
                        <div 
                             className='w-11/12 md:w-8/12 mx-auto pt-1 pb-5 overflow-y-auto mt-10 xm:overflow-y-scroll justify-center item-center'
                        >
                                <div 
                                    className="d-flex justify-center items-center mb-10"
                                >
                                    <span 
                                        className="text-xl font-bold text-blue-600 mb-4 flex justify-center items-center text-center"
                                    >
                                        <h1 className="text-black uppercase mr-5"> User Status:</h1> {data?.status}
                                    </span>
                                    <span 
                                        className="text-xl font-bold text-green-800 border-2 border-gray-300 p-2 rounded-xl mb-4 flex justify-center items-center text-center"
                                    >
                                        {data?.fullname}
                                    </span>
                                    {/* <img src={`${USAGE_PATH.AVATAR}${data?.passport}`} width={400} height={400} className="rounded-xl border-4 border-green-400" /> */}
                                    { 
                                        (data?.passport === "no-image.png") ? (
                                            <img src={`${USAGE_PATH.DEFAULT_AVATAR}${data?.passport}`} className="object-contain w-full rounded-xl cover border-4 border-green-400 mx-auto" />
                                        ) : (
                                            <img src={`${USAGE_PATH.AVATAR}${data?.passport}`} className="object-contain w-full rounded-xl border-4 border-green-400 mx-auto" />
                                        )
                                    }
                                </div>
                                <div 
                                   className="w-full mx-auto items-center gap-3 mt-2 flex justify-center mb-2 mt-5"
                                >    
                                        <div 
                                            className="w-12/12 mb-4 border border-gray-200"
                                        >
                                            <div 
                                                className="relative border text-gray-800 bg-white col-span-3 md:col-span-2"
                                            >
                                                <select
                                                    onChange={(e) => {
                                                        setTakeAction(e.target.value);
                                                    }} 
                                                    className="appearance-none w-full py-4 pl-3 md:pr-20 pr-14 bg-white" name="whatever" id="frm-whatever">
                                                    <option value={-1}>- Select Action To Take -</option>
                                                    {
                                                        ACTIONS?.map((action: string) => (
                                                            <option key={action} value={action} selected={(action === data?.status) ? true : false}
                                                            >
                                                                {action}
                                                            </option>
                                                        ))
                                                    }
                                                    </select>
                                                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                        </div>  
                                        <div 
                                            className="w-12/12 md:12/12"
                                        >
                                            <div 
                                                className="w-full py-5 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl mb-5 cursor-pointer"
                                                onClick={SelectedUser}
                                            >
                                                {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Apply" ) } 
                                            </div>  
                                        </div>                                    
                                </div>
                                <div 
                                   className="w-full mx-auto items-center mt-20 flex justify-center"
                                > 
                                    <button 
                                        className="w-full py-5 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl mb-2"
                                        onClick={() => onClick() }
                                    >
                                        Cancel
                                    </button> 
                                </div>
                        </div>
                        
                </Modal>  
        );
}
