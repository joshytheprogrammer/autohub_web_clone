import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import Message from "../../../../../components/shared/Message"
import { ChangeDepartment } from "../../../../api/admin/market/users"
import { USAGE_PATH } from "../../../../../constant/Path"
import toast from "react-hot-toast"


type ChangeStaffDepartmentModalProps = 
{
    onClick: () => void 
    openAddMember: boolean 
    token: string
    departments: { id: number, name: string }[]
    data: { id: number, passport: string, fullname: string }
}    

export const ChangeStaffDepartmentModal = ({onClick, openAddMember, departments, data, token}: ChangeStaffDepartmentModalProps)  =>
{
    const [loading, setLoading] = useState<boolean>(false)
    const [theDepartment, setDepartment] = useState<number>(-1)
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")

    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, []) 

    const SaveNewSaff = async () => 
    { 
        setLoading(true)
        const changeDept = ChangeDepartment(data?.id, theDepartment, token)
        changeDept.then((response) => 
        {
            if(response?.status === 200)
            {
                setErrorMessage("")
                onClick()
            } else {
                toast.error(response?.message, {
                  position: "top-center",
                });               
            }
            setLoading(false)
        }).catch(() => {

        })
    }

     return (
                <Modal 
                        onClick={onClick} isOpen={openAddMember} wrapperWidth={700} margin={'100px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                            className='col-span-12 pt-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                            <h3 className="font-bold text-md mb-4 text-blue-500 uppercase">Change Department</h3>
                            <div 
                                className="d-flex justify-center items-center mb-4"
                            >
                                <span 
                                    className="text-xl font-bold text-green-800 border-2 border-gray-300 p-2 rounded-xl mb-4 flex justify-center items-center text-center"
                                >
                                    {data?.fullname}
                                </span>
                                {/* <img src={`${USAGE_PATH.AVATAR}${data?.passport}`} width={400} height={400} className="rounded-xl border-4 border-green-400 mx-auto" /> */}                                
                                { 
                                    (data?.passport === "no-image.png") ? (
                                        <img src={`${USAGE_PATH.DEFAULT_AVATAR}${data?.passport}`} className="object-contain w-full rounded-xl cover border-4 border-green-400 mx-auto" />
                                    ) : (
                                        <img src={`${USAGE_PATH.AVATAR}${data?.passport}`} className="object-contain w-full rounded-xl border-4 border-green-400 mx-auto" />
                                    )
                                }
                            </div>
                            <div 
                                className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                            >
                                <div 
                                    className="w-12/12 mb-4 border border-gray-200"
                                >
                                    <div 
                                        className="relative border text-gray-800 bg-white col-span-3 md:col-span-2"
                                    >
                                        <select
                                            onChange={(e) => {
                                                setDepartment(Number(e.target.value));
                                            }} 
                                            className="appearance-none w-full py-4 pl-3 md:pr-20 pr-14 bg-white" name="whatever" id="frm-whatever">
                                            <option value={-1}>- Select Department -</option>
                                            {
                                                departments.map((dept: { id: number, name: string }, index: number) => {
                                                    return (
                                                        <option 
                                                            key={index} value={dept?.id}
                                                        >
                                                            {dept?.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <div 
                                            className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l"
                                        >
                                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>  
                                <div 
                                   className="items-center gap-5 mt-2 sm:flex flex justify-between -mb-5 mt-7"
                                >                                       
                                   <button 
                                        className="p-5 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                        onClick={() => onClick() }
                                   >
                                      Cancel
                                   </button>
                                      
                                   <button 
                                       className="p-5 bg-green-600 text-white font-semibold text-sm rounded-xl w-max hover:bg-green-800"
                                       onClick={() => SaveNewSaff()}
                                   >
                                      {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Change" ) } 
                                   </button>                                        
                                </div>
                           </div>
                        </div>
                </Modal>  
        );
}
