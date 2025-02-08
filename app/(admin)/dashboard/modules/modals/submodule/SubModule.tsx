import { useEffect, useMemo, useState } from "react"
import { GetSubModules } from "../../../../../api/admin/academic/courses"
import { useQuery } from "@tanstack/react-query"
import { Modal } from "../../../../../../components/modal/Modal"
import { BsHighlighter } from "react-icons/bs"
import { ColumnDef } from "@tanstack/react-table"
import { Show } from "../../../../../../components/shared/Show"
import { Icons } from "../../../../../../components/shared/Icons"
import { AddSubModule } from "./AddSubModule"
import { EditSubModule } from "./EditSubModule"
import { DeleteSubModule } from "./DeleteSubModule"
import { Table } from "../../../../../../components/shared/Table"


type CourseModuleProps = 
{
    openCourseModuleModal: boolean,
    onClick: () => void
    token: string
    mData: { id: number, course_id: number, name: string }
}

export default function SubModule({ openCourseModuleModal, mData, onClick, token }: CourseModuleProps)
{
    const { data, isLoading, refetch } = useQuery({ queryKey: [`get-all-modules-submodules`, token], queryFn: () => GetSubModules(mData?.id, token)})
   
    const [openAddSubModule, setOpenAddSubModule] = useState<boolean>(false)   
    const [openEditSubModule, setOpenEditSubModule] = useState<boolean>(false)
    const [openDeleteSubModule, setOpenDeleteSubModule] = useState<boolean>(false)

    const [editData, setEditData] = useState<{ id: number, module_id: number, name: string }>({ id: -1, module_id: -1, name: "" })

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
       setOpenEditSubModule(x)
    }
    
    const openDelete = (x: boolean, data: any) =>
    {
        setEditData(data)
        setOpenDeleteSubModule(x)
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
                wrapperWidth={900} 
                margin={'200px auto 0px auto'}
             >
                <div 
                   className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                >       
                   <div 
                      className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-5 flex gap-10'
                   >
                      <span 
                        className="text-lg text-black"
                      >
                        All SubModules
                      </span>
                      <span 
                          className='mt-1 cursor-pointer' 
                          onClick={() => 
                          {
                            setOpenAddSubModule(true)
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
                   openAddSubModule && 
                     <AddSubModule
                        openCourseModal={openAddSubModule}
                        token={token}
                        onClick={
                           () => {
                              refetch()
                              setOpenAddSubModule(false)
                           }
                        }
                        moduleId={mData?.id}
                     />
                }

                {
                   openEditSubModule && 
                     <EditSubModule
                        editCourseModal={openEditSubModule}
                        token={token}
                        onClick={
                           () => {
                              refetch()
                              setOpenEditSubModule(false)
                           }
                        }
                        data={editData}
                     />
                }

                {
                   openDeleteSubModule && 
                     <DeleteSubModule
                        deleteCourseModal={openDeleteSubModule}
                        token={token}
                        onClick={
                           () => {
                              refetch()
                              setOpenDeleteSubModule(false)
                           }
                        }
                        data={editData}
                     />
                }     

         </Modal>  
       );
}