import { BeatLoader } from "react-spinners";
import { Modal } from "../../../components/modal/Modal";
import { useEffect, useState } from "react";
import SingleImageUpload from "../../../components/shared/SingleImageUpload";
import { MakeFeePayment } from "../../api/admin/academic/student";
import Message from "../../../components/shared/Message";

type MakePaymentProp = 
{
   onClick: (x: string) => void 
   openCourseModal: boolean
   refetch: () => void
   token: string
}

export const MakePayment = ({ onClick, openCourseModal, refetch, token }: MakePaymentProp)  =>
{
    const [loading, setLoading] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    const [processAdvert, setProcessAdvert] = useState(false);
 
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>("")
    
    useEffect(() => 
    {
      setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
      setLoading(false)
    }, [])
    
    useEffect(() => 
    {
      
    }, [url])

            
    const sendIt = () => 
    {
       setLoading(true)
       const upload = MakeFeePayment(url, token)
       upload.then((response) => 
       {
          if(response?.status === 200)
          {
              setLoading(false)
              onClick("Receipt Successfuly Sent for vertification and approval")     
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
                  onClick={
                     () => {
                        onClick('')
                     }
                  } 
                  isOpen={openCourseModal} 
                  wrapperWidth={800} 
                  margin={'200px auto 0px auto'}
              >
                  <div 
                    className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                  >
                    { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                    <div 
                      className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center -mt-5'
                    >
                      <div 
                        className="mt-10 w-full flex justify-center items-center gap-3 flex-col"
                      >
                        <p 
                          className="text-center text-xl font-semibold text-brandDarkGray mb-5 text-green-700"
                        >
                          Upload Payment Receipt
                        </p>
                        <div
                           className={`transition duration-300 w-full ${
                                                      !errorMessage && "hidden"
                                                      }`}
                        >
                         <div
                             className={`bg-red-500/10 border-red-500/80 border w-full flex justify-center p-2`}
                          >
                            <p 
                              className=" w-max text-center text-xs text-[#D10000]"
                            >
                              {errorMessage}
                            </p>
                          </div>
                        </div>
                        <SingleImageUpload 
                            width={0} 
                            space={""} 
                            ICloudColour={""} 
                            onClick={
                              (photo) => {
                                setProcessAdvert(true)
                                setUrl(photo)
                              }
                          } 
                        />
                      </div>
                    </div>
                                  
                    <div 
                      className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3"
                    >
                      <button  
                         className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                         onClick={
                           () => {
                                onClick('')
                           }
                         } 
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!processAdvert}
                        className={`mt-2 py-3 px-4 ${(processAdvert) ? "bg-green-700 hover:bg-green-500" : "bg-gray-500"} text-white font-semibold text-sm rounded-xl w-max`}
                        onClick={sendIt}
                      >                                                
                        {loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Send Receipt" )   }
                      </button>
                    </div>
                  </div>
              </Modal>  
          );
  }
  