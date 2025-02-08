import { useEffect, useMemo, useState } from "react"
import { GetModules } from "../../../../../api/admin/academic/courses"
import { useQuery } from "@tanstack/react-query"
import { Modal } from "../../../../../../components/modal/Modal"
import { BsHighlighter } from "react-icons/bs"
import { ColumnDef } from "@tanstack/react-table"
import { Show } from "../../../../../../components/shared/Show"
import { Icons } from "../../../../../../components/shared/Icons"
import { AddCourseModuleModal } from "./AddCourseModuleModal"
import { EditCourseModuleModal } from "./EditCourseModuleModal"
import { DeleteCourseModuleModal } from "./DeleteCourseModuleModal"
import { Table } from "../../../../../../components/shared/Table"
import SubModule from "../submodule/SubModule"


type CourseModuleProps = 
{
    openCourseModuleModal: boolean,
    onClick: () => void
    token: string
    // mData: { id: number, name: string }
    courseId: number
}

export default function ModulesWithCourses({ openCourseModuleModal, courseId, onClick, token }: CourseModuleProps)
{
    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-courses-modules`, token], queryFn: () => GetModules(courseId, token)})

    const [openAddModule, setOpenAddModule] = useState<boolean>(false)   
    const [openEditModule, setOpenEditModule] = useState<boolean>(false)
    const [openDeleteModule, setOpenDeleteModule] = useState<boolean>(false)
    const [openModuleSubModule, setOpenModuleSubModule] = useState<boolean>(false)

    const [editData, setEditData] = useState<{ id: number, course_id: number, name: string }>({ id: -1, course_id: -1, name: "" })

    useEffect(() => 
    {
        
    }, []) 

    const [showingStates, setShowStates] = useState<boolean>(false)
    
    const ShowStates = (page: any) => 
    {
       console.log({page, showingStates})
       setShowStates(true)
    }
    
    const openEdit = (x: boolean, data: any) =>
    {
       setEditData(data)
       setOpenEditModule(x)
    }
    
    const openDelete = (x: boolean, data: any) =>
    {
        setEditData(data)
        setOpenDeleteModule(x)
    }
    
    const ViewSubModule = (x: boolean, data: any) =>
    {console.log(data)
        setEditData(data)
        setOpenModuleSubModule(x)
    }
    
    type AllStudent = 
    {
       id: string
       name: string
       description: string
       edit_data: { id: number, name: string, description: string }
       delete_data: { id: number, name: string, description: string }
    }
      
    const employees = useMemo<ColumnDef<AllStudent>[]>(
      () => [
      {
         header: 'Name',
         cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
         accessorKey: 'name',
      },
      {
         header: 'View Submodule',
         cell: (row) => (<a href="#" onClick={() => ViewSubModule(true, row.renderValue())}><Icons iconName="eye"  width={5} height={5} color='blue' /></a>),
         accessorKey: 'edit',
      },
      {
         header: 'Edit',
         cell: (row) => (<a href="#" onClick={() => openEdit(true, row.renderValue())}><Icons iconName="edit"  width={5} height={5} color='green' /></a>),
         accessorKey: 'edit',
         maxSize: 20
      },
      {
         header: 'Delete',
         cell: (row) => (<a href="#" onClick={() => openDelete(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
         accessorKey: 'delete',
         maxSize: 20
      }
    ],[])

    return (
            <Modal 
                onClick={onClick} 
                isOpen={openCourseModuleModal} 
                wrapperWidth={1200} 
                margin={'100px auto 0px auto'}
             >
                <div 
                   className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                >       
                   <div 
                      className='font-bold text-2xl text-green-600 ml-5 mb-2 mt-5 flex gap-10'
                   >
                      <span 
                        className="text-lg text-black"
                      >
                        All Modules
                      </span>
                      <span 
                          className='mt-1 cursor-pointer' 
                          onClick={() => 
                          {
                            setOpenAddModule(true)
                          }}      
                       >
                         <BsHighlighter className="w-20 hover:text-blue-600" />
                       </span>
                   </div> 
                </div>

                {
                   !isLoading && (data?.data?.length > 0) &&                         
                      <div 
                         className="shadow-md border-2 border-gray-100 py-5 mb-3 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
                      >                    
                         <div 
                             className='px-5'
                         >           
                           <Table 
                               data={data?.data} 
                               columns={employees} 
                               showNavigation={false} 
                               searchPlaceHolder='search for employees ...' 
                               path='students' 
                               from='students' 
                               pageNos={[10, 20, 30]}
                               onClick={
                                  (no) => 
                                  {
                                     //      setPerPage(no)
                                  }
                               }
                               searchTerm={
                                  (word) => 
                                  {
                                     // setSearchQuery(word)
                                  }
                               }
                           /> 
                         </div>                       
                       </div>
                 }

                {
                   openAddModule && 
                     <AddCourseModuleModal
                        openCourseModal={openAddModule}
                        token={token}
                        onClick={
                           () => {
                              refetch()
                              setOpenAddModule(false)
                           }
                        }
                        courseId={courseId}
                     />
                }

                {
                   openEditModule && 
                     <EditCourseModuleModal
                        editCourseModal={openEditModule}
                        token={token}
                        onClick={
                           () => {
                              refetch()
                              setOpenEditModule(false)
                           }
                        }
                        data={editData}
                     />
                }

                {
                   openDeleteModule && 
                     <DeleteCourseModuleModal
                        deleteCourseModal={openDeleteModule}
                        token={token}
                        onClick={
                           () => {
                              refetch()
                              setOpenDeleteModule(false)
                           }
                        }
                        data={editData}
                     />
                }

                {
                   openDeleteModule && 
                     <DeleteCourseModuleModal
                        deleteCourseModal={openDeleteModule}
                        token={token}
                        onClick={
                           () => {
                              refetch()
                              setOpenDeleteModule(false)
                           }
                        }
                        data={editData}
                     />
                }
                

                {
                   openModuleSubModule && 
                     <SubModule
                        openCourseModuleModal={openModuleSubModule}
                        token={token}
                        onClick={
                           () => {
                              setOpenModuleSubModule(false)
                           }
                        }
                        mData={editData}
                     />
                } 

            </Modal>  
       );
}