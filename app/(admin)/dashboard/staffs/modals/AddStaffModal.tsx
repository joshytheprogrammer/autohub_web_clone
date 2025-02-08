import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { Modal } from "../../../../../components/modal/Modal"
import Message from "../../../../../components/shared/Message"
import { NewStaff } from "../../../../api/admin/market/users"
import toast from "react-hot-toast"


type AddMemberModalProp = 
{
    onClick: () => void 
    openAddMember: boolean 
    token: string
    departments: { id: number, name: string }[]
    roles: { id: number, name: string }[]
}    

export const AddStaffModal = ({onClick, openAddMember, departments, roles, token}: AddMemberModalProp)  =>
{
    const [loading, setLoading] = useState<boolean>(false)
    const [firstname, setFirstname] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [theRole, setRole] = useState<number>(-1)
    const [theDepartment, setDepartment] = useState<number>(-1)
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage] = useState<string>("")

    useEffect(() => 
    {
       setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
    }, []) 

    const SaveNewSaff = async () => 
    { 
        setLoading(true)
        const data = { firstname: firstname, surname: surname, phone: phone, email: email, departmentId: theDepartment, roleId: theRole, token: token }
        const newStaff = NewStaff(data)
        newStaff.then((response) => 
        {
            if(response?.status === 200)
            {
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
                        onClick={onClick} isOpen={openAddMember} wrapperWidth={1000} margin={'100px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                            className='col-span-12 pt-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                            <h3 className="font-bold text-md mb-4 text-blue-500">Add New Staff</h3>
                                <div 
                                    className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                                >
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg mb-5 md:mb-0"
                                    >
                                        <input  
                                            className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                            type="text" name="firstname" id="firstname" placeholder="Enter Firstname" 
                                            onChange={(e) => {
                                              setFirstname(e.target.value)
                                            }}
                                            onBlur={(e: any) => 
                                            {
                                                  let value: string = e.target.value
                                                  if(value === "" || value === undefined || value === null)
                                                  {
                                                        // setCompanyNameMessage(COMPANY_NAME_MESSAGE)
                                                  }
                                            }}
                                        />
                                        {/* { companyNameMessage && <Message msg={companyNameMessage} status={'text-red-600 -mt-1 font-bold rounded-md'} /> } */}
                                    </div>
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg mb-5 md:mb-0"
                                    >
                                        <input  
                                            onChange={(e) => {
                                             setSurname(e.target.value)
                                            }}
                                            className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                            type="text" name="surname" id="surname" placeholder="Enter Surname" 
                                        />
                                    </div>
                                </div> 
                                <div 
                                    className="mb-4 md:w-full d-flex md:flex gap-5"
                                >
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg mb-5 md:mb-0"
                                    >
                                        <input  
                                           onChange={(e) => {
                                             setPhone(e.target.value)
                                           }}
                                           className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                           type="text" name="phone" id="phone" placeholder="Enter phone" 
                                        />
                                    </div>
                                    <div 
                                        className="w-full md:w-1/2 border-2 border-shadow rounded-lg mb-5 md:mb-0"
                                    >
                                        <input  
                                            onChange={(e) => {
                                              setEmail(e.target.value)
                                            }}
                                            className="w-full border rounded-md p-3 bg-opacity-75 rounded border border-blue-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                            type="email" name="email" id="email" placeholder="Enter Email" 
                                        />
                                    </div>
                                </div> 
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
                                    className="w-12/12 mb-4 border border-gray-200"
                                >
                                    <div 
                                        className="relative border text-gray-800 bg-white col-span-3 md:col-span-2"
                                    >
                                        <select
                                            onChange={(e) => {
                                                setRole(Number(e.target.value));
                                            }} 
                                            className="appearance-none w-full py-4 pl-3 md:pr-20 pr-14 bg-white" name="whatever" id="frm-whatever">
                                            <option value={-1}>- Select Role -</option>
                                            {
                                                roles.map((role: { id: number, name: string }, index: number) => {
                                                    return (
                                                        <option 
                                                            key={index} value={role?.id} className="uppercase"
                                                        >
                                                            {role?.name}
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
                                      {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Add Staff" ) } 
                                   </button>                                        
                                </div>
                           </div>
                        </div>
                </Modal>  
        );
}
