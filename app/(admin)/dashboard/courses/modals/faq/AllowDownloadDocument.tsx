import { useState } from "react"
import { Modal } from "../../../../../../components/modal/Modal"
import { BeatLoader } from "react-spinners"



type DownloadDocumentProps = 
{
    allowDocument: boolean,
    onClick: () => void
    token: string
    data: { id: number, name: string, description: string, objective_duration: number, file_name: string }
}

export const AllowDownloadDocument  = ({ allowDocument, onClick, data, token }: DownloadDocumentProps)  =>
{   
    const [loading] = useState<boolean>(false)
    const [courseName] = useState<string>(data?.name)
    const [courseId] = useState<number>(data?.id)
       
    const DocumentDownload = async () => 
    {  
        console.log({ courseId, courseName })
    }

    return (
             <Modal 
                  onClick={onClick} 
                  isOpen={allowDocument} 
                  wrapperWidth={800} 
                  margin={'100px auto 0px auto'}
             >
                  <div 
                     className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                  >
                       <h4 
                           className='font-bold text-lg mb-5 flex items-center text-red-500 p-3 rounded-md justify-center uppercase'
                       >
                          On setting assessment, course test and exam will be open for student
                       </h4>
                       <h1 
                           className='font-bold text-lg mb-10 flex items-center bg-blue-100 p-3 rounded-md justify-center'
                        >
                           {''}
                        </h1>   
                                                       
                       <div 
                           className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-5"
                        >
                            <button  
                                className="py-3 px-4 bg-gray-600 hover:bg-gray-900 text-white font-semibold text-sm rounded-xl w-max"
                                onClick={() => {
                                       onClick()
                                }}
                            >                           
                                Cancel
                            </button>
                            <button
                                disabled={loading}
                                className="mt-2 py-3 px-4 bg-red-600 hover:bg-red-900 text-white font-semibold text-sm rounded-xl w-max"
                                onClick={DocumentDownload}
                             >                                                  
                                { loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Allow Download" )    }
                             </button>
                          </div>
                        </div>
                </Modal>  
        );
}
