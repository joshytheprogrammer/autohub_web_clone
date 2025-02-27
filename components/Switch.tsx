import { useRouter } from 'next/navigation';
import { UseStore } from '../state/store';
import { Modal } from './modal/Modal';


type SwitchProps = 
{
    children?: React.ReactNode,
    switchDialog: boolean,
    onClick: (isOpen: boolean) => void,
    p1: string, 
    p2: string,
    color: string
    current: string
    where: string
}


export const Switch = ({ onClick, switchDialog, p1, p2, color, current, where }: SwitchProps)  =>
{
        const Session = UseStore((state) => state)
        const router = useRouter()

        return (
                <>
                   <Modal 
                       onClick={onClick} 
                       isOpen={switchDialog} 
                       wrapperWidth={600} 
                       margin={'200px auto 0px auto'} 
                       color='green'
                   >   
                      <div 
                         className='d-flex justify-center item-center mx-auto min:h-[40px] max:h-[300px]'
                       >
                         <p className='w-full text-center font-bold text-2xl'>{p1}</p>
                         <p className='w-full text-center font-bold text-lg'>{p2}</p>
                      </div>
                      <div 
                        className="items-center gap-5 mt-2 sm:flex flex justify-left mb-2 mx-5 mt-8 -ml-1"
                      >
                        <button  
                           className="w-full mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                           onClick={() =>
                              onClick(false)
                           }
                        >
                           Stay Here
                        </button>
                        <button  
                           className={`w-full mt-2 p-4 text-white hover:font-bold text-sm bg-${color}-600 rounded-md outline-none ring-offset-2 ring-${color}-600 focus:ring-2 justify-start`}
                           onClick={() =>
                             {
                               router.push(`/user/dashboard`)
                               Session.setSideType(current)
                             }                              
                           }
                        >
                           Visit {where}
                        </button>
                      </div>
                   </Modal>
                </> 
        );
}
