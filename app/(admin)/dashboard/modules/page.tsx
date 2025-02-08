"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { Show } from "../../../../components/shared/Show"
import { Icons } from "../../../../components/shared/Icons"
import { Table } from "../../../../components/shared/Table"
import { useQuery } from "@tanstack/react-query"
import { UseStore } from "../../../../state/store"
import { PuffLoader } from "react-spinners"
import { GetCoursesWithModules } from "../../../api/admin/academic/courses"
import ModulesWithCourses from "./modals/module/ModulesWithCourses"


export default function Modules() 
{
      const userToken = UseStore((state) => state)
      const token: string = userToken.getUserToken()

      const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-departments`, token], queryFn: () => GetCoursesWithModules(token)})
      
      const [id, setId] = useState<number>(-1)
      const [modules, setModule] = useState<boolean>(false)

    //   const [editData, setEditData] = useState<{ id: number, course_id: number, name: string }>({ id: -1, course_id: -1, name: "" })
  
      const [showingStates, setShowStates] = useState<boolean>(false)


      useEffect(() => 
      {
      }, [showingStates])
  
      const ShowStates = (page: any) => 
      {
         console.log(page)
         setShowStates(true)
      }

      const ViewModules = (x: boolean, data: any) =>
      {
         setId(data)
         setModule(x)
      }

      type AllStudent = 
      {
          id: number
          name: string
          modules_count: string
          edit: any
          delete: any
      }
  
      const employees = useMemo<ColumnDef<AllStudent>[]>(
          () => [
          {
            header: 'Courses',
            cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
            accessorKey: 'name',
          },
          {
              header: 'Modules',
              cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
              accessorKey: 'modules_count',
          },
          {
              header: 'View Modules',
              cell: (row) => (<a href="#" onClick={() => ViewModules(true, row.renderValue())}><Icons iconName="eye"  width={5} height={5} color='green' /></a>),
              accessorKey: 'id',
              maxSize: 20
          }
      ],[])

  return (
            <div 
                  className="w-full"
            > 
               <div 
                  className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-5 flex gap-10'
               >
                  <span 
                     className="text-lg text-black"
                  >
                     Courses | Modules | Submodules
                  </span>
               </div> 

                {
                    isLoading && !isRefetching &&  <div 
                                className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                            >
                                <PuffLoader className='w-12 h-12' color="black" />
                            </div>
                }
                {
                    isLoading && isRefetching  &&  <div 
                                className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                            >
                                <PuffLoader className='w-12 h-12' color="black" />
                            </div>
                }
                  
                {  !isLoading && (data?.data?.length === 0) && <>
                        <div 
                            className="flex md:d-flex xl:flex-row h-[400px] justify-center items-center mt-20"
                        >
                            <div 
                                className="w-full d-flex justify-center items-center"
                            >
                                <div className="w-full text-center text-lg">No Course Yet</div>
                            </div>
                        </div>
                    </>
                }
            
            {
                  !isLoading && (data?.data?.length > 0) &&                         
                  <div 
                        className="shadow-md border-2 border-gray-100 py-5 mb-3 mt-7 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
                  >                    
                        <div 
                              className='px-5'
                        >           
                        <Table data={data?.data} 
                              columns={employees} 
                              showNavigation={false} 
                              searchPlaceHolder='search for employees ...' 
                              path='students' 
                              from='students' 
                              pageNos={[10, 20, 30]}
                              onClick={() => {
                              //      setPerPage(no)
                              }}
                              searchTerm={() => {
                                    // setSearchQuery(word)
                              }}
                        /> 
                        </div>                       
                  </div>
            }

            { 
                  modules &&  
                     <ModulesWithCourses 
                        openCourseModuleModal={modules}
                        token={token} 
                        onClick={() => {
                              refetch()
                              setModule(false)
                        }}
                        courseId={id}
                  />
            }
      </div>
  )
}


