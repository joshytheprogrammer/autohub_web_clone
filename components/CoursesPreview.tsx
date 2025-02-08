import React, { useEffect, useState } from 'react';
import { Modal } from '../app/component/modal/Modal';
import ModuleAccordion from './ModuleAccordion';


type CourseModuleProp = {
   modules: any 
   subCourseId: number
}

export const CourseModule = ({ modules, subCourseId } : CourseModuleProp) => 
{
        return (
                <>
                   <ul 
                     className="text-black" 
                     style={{ listStylePosition: 'outside' }}
                   >
                     {
                        modules.map((module: any, index: number) => {
                           return (
                                    <li 
                                       key={index}
                                       style={{ listStylePosition: 'outside' }}
                                    >
                                      {module}
                                    </li>
                                  )  
                                        })
                                }
                        </ul>
                        
                </>
            )
}

type CoursesPreviewProp = {
   onClick: () => void 
   theModule: any //{ id: number, course_id: number, name: string }
   theModuleId: number
   theModuleName: string
}

export const CoursesPreview = ({ onClick, theModule, theModuleId, theModuleName }: CoursesPreviewProp)  =>
{
    const [theSubModule] = useState<any>(theModule?.modules.filter((x: any) => x?.course_id === theModuleId))

    return (
             <Modal 
                onClick={onClick} 
                isOpen={true} 
                wrapperWidth={800} 
                margin={'165px auto 0px auto'}
             >
                <div 
                   className='-mt-7 px-2 overflow-y-auto xm:overflow-y-scroll' 
                   style={{ maxHeight: '32rem' }}
                >
                  <h1 
                    className='font-bold text-md mb-4 -mt-5'
                  >
                     {theModuleName} Sub-Courses
                  </h1>
                  { 
                     theSubModule.length > 0 && theSubModule &&
                        <>                                            
                        { 
                                theSubModule.map((x: { id: number, name: string, submodule: any }, index: number) => {
                                return  (
                                        <div 
                                                key={index}
                                        >
                                                <ModuleAccordion 
                                                   title={x.name} 
                                                   id={x.id} 
                                                   content={x?.submodule} 
                                                />
                                        </div>
                                        )
                                        })
                        }
                        </>
                   }
                   <div 
                     className='flex w-full pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-between'
                   >       
                      <div  
                        className="mt-2 p-4 text-white cursor-pointer hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={
                            () =>
                               onClick()
                            }
                        >
                          Close
                        </div>
                      </div>
                   </div>
                </Modal>  
        );
}
