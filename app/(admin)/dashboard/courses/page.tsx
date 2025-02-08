"use client"

import { CellContext, ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from "react"
import { Show } from '../../../../components/shared/Show'
import { Icons } from '../../../../components/shared/Icons'
import { Table } from '../../../../components/shared/Table'
import { UseStore } from '../../../../state/store'
import { useQuery } from '@tanstack/react-query'
import { PuffLoader } from 'react-spinners'
// import { USAGE_PATH } from '../../../../constant/Path'
import { BsHighlighter } from 'react-icons/bs'
import { HiBookOpen, HiMiniSwatch } from 'react-icons/hi2'
// import toast from 'react-hot-toast'
import { GetCourses } from '../../../api/admin/academic/courses'
import { AddCourseModal } from './modals/AddCourseModal'
import { EditCourseModal } from './modals/EditCourseModal'
import { DeleteCourseModal } from './modals/DeleteCourseModal'
import { TestExamDuration } from './modals/TestExamDuration'
import { UploadCourseModal } from './modals/UploadCourseModal'
import { RemoveCourseModal } from './modals/RemoveCourseModal'
import { ChangeCourseModal } from './modals/ChangeCourseModal'
import axios from 'axios'
import { BASE_URL } from '../../../../constant/Path'
import { CourseFaqQuestion } from './modals/faq/CourseFaqQuestion'
import { ExamDuration } from './modals/exam/ExamDuration'
import { ExamTheoryDuration } from './modals/exam/ExamTheoryDuration'


export default function Courses() 
{
  const userToken = UseStore((state) => state)
  const token: string = userToken.getUserToken()

  const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-course`, token], queryFn: () => GetCourses(token)})

  const [openAddCourse, setOpenAddCourse] = useState<boolean>(false)
  const [openEditCourse, setOpenEditCourse] = useState<boolean>(false)  
  const [openDeleteCourse, setOpenDeleteCourse] = useState<boolean>(false)  
  const [openCourseDuration, setOpenCourseDuration] = useState<boolean>(false)  
  const [openUploadCourse, setOpenUploadCourse] = useState<boolean>(false)  
  const [openChangeDocument, setOpenChangeDocument] = useState<boolean>(false)  
  const [openRemoveDocument, setOpenRemoveDocument] = useState<boolean>(false)  
  const [openCourseFaq, setOpenCourseFaq] = useState<boolean>(false)    

  const [examStatusObj, setExamStatusObj] = useState<string>('')
  const [examTheoryStatus, setExamTheorytatus] = useState<string>('')

  const [examTheoryDuration, setExamTheoryDuration] = useState<boolean>(false)
  const [examDuration, setExamDuration] = useState<boolean>(false)
      
  const [editedData, setEditedData] = useState<{ id: number, name: string, description: string, objective_duration: number, file_name: string }>({ id: -1, name: "", description: "", objective_duration: -1, file_name: "" })
  
  const [showingStates, setShowStates] = useState<boolean>(false)

  useEffect(() => 
  {

  }, [openEditCourse])
  

  const ShowStates = (page: any) => 
  {
     console.log({page, showingStates})
     setShowStates(true)
  }

  const ChangeData = (x: boolean, data: any) => 
  {
     setEditedData(data)
     setOpenEditCourse(x)
  }

  const DeleteData = (x: boolean, data: any) => 
  {
     setEditedData(data)
     setOpenDeleteCourse(x)
  }

  const ChangeDuration = (x: boolean, data: any) => 
  {
     setEditedData(data)
     setOpenCourseDuration(x)
  }

  const ChangeCourse = (x: boolean, data: any) => 
  {
     setEditedData(data)
     setOpenChangeDocument(x)    
  }

  const UploadCourse = (x: boolean, data: any) => 
  {
     setEditedData(data)
     setOpenUploadCourse(x)
  }

  const RemoveCourse = (x: boolean, data: any) => 
  {
     setEditedData(data)
     setOpenRemoveDocument(x)
  }

  const CourseQuestions = (x: boolean, data: any) => 
  {
    setEditedData(data)
    setOpenCourseFaq(x)    
  }
  
  type AcademicCourses = 
  {
      id: string
      name: string
      file_name: string
      objective_duration: string
      description: string
      edit: any
      delete: any
      change_duration: any
      upload: any
      download: any
      remove: any
      faq: any
  }

  const AllCourses = useMemo<ColumnDef<AcademicCourses>[]>(
        () => [  
          {
                header: 'Name',
                cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
                accessorKey: 'name',
          },
          {
                header: 'File Name',
                cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
                accessorKey: 'file_name',
          },
          {
                header: 'Duration',
                cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
                accessorKey: 'objective_duration',
          },
          {
                header: 'Description',
                cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
                accessorKey: 'description',
          },
          {
                header: 'Edit',
                cell: (row) => (<a href="#" onClick={() => ChangeData(true, row.renderValue())}><Icons iconName="edit" color='red' width={4} height={4}/></a>),
                accessorKey: 'edit',
          },
          {
                header: 'Delete',
                cell: (row) => (<a href="#" onClick={() => DeleteData(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
                accessorKey: 'delete'
          },
          {
                header: 'Change Duration',
                cell: (row) => (<a href="#" onClick={() => ChangeDuration(true, row.renderValue())}><HiBookOpen width={10} height={10} color='blue' /></a>),
                accessorKey: 'change_duration',
                maxSize: 20
          },
          {
                header: 'Document',
                cell: (row: CellContext<AcademicCourses, unknown>) => {
                  const value:any = row.renderValue() as {}
                  const UploadedDocument: string = value?.file_name
                  return (                                                                                                                               
                      <>
                          {
                              UploadedDocument && <>
                                  <span className="px-2 py-2 font-semibold cursor-pointer text-xs hover:text-white rounded-xl bg-blue-500 hover:bg-blue-900"
                                      onClick={() => ChangeCourse(true, row.renderValue())}
                                  >
                                      {'Change Document'}
                                  </span>
                              </>
                          }
                          {
                              !UploadedDocument && <>
                                  <span className="px-2 py-2 font-semibold cursor-pointer text-xs hover:text-white rounded-xl bg-green-500 hover:bg-green-900"
                                      onClick={() => UploadCourse(true, row.renderValue())}
                                  >
                                      {'Upload Document'}
                                  </span>
                              </>
                          }
                      </>
                  )
              },
              accessorKey: 'upload',
              maxSize: 20
          },
          {
                header: 'Download',
                cell: (row: CellContext<AcademicCourses, unknown>) => {
                  const value:any = row.renderValue() as {}
                  const UploadedDocument: string = value?.file_name
                  return (                                                                                                                               
                      <>
                          {
                              UploadedDocument && <>
                                  <span className="px-2 py-2 font-semibold cursor-pointer text-xs hover:text-white rounded-xl bg-yellow-500 hover:bg-yellow-900"
                                      onClick={() => downloadPdfFile(row.renderValue())}
                                  >
                                      {'Download Document'}
                                      {/* <Icons iconName="download" color='red' width={4} height={4}/> */}
                                  </span>
                              </>
                          }
                      </>
                  )
              },
                accessorKey: 'download',
                maxSize: 20
          },
          {
                header: 'Remove',
                cell: (row: CellContext<AcademicCourses, unknown>) => {
                  const value:any = row.renderValue() as {}
                  const UploadedDocument: string = value?.file_name
                  return (                                                                                                                               
                      <>
                          {
                              UploadedDocument && <>
                                  <span className="px-2 py-2 font-semibold cursor-pointer text-xs text-white rounded-xl bg-red-500 hover:bg-red-700"
                                      onClick={() => RemoveCourse(true, row.renderValue())}
                                  >
                                      {'Remove'}
                                  </span>
                              </>
                          }
                      </>
                  )
              },
              accessorKey: 'remove',
              maxSize: 20
          },
          {
                header: 'FAQ',
                cell: (row) => (<a href="#" onClick={() => CourseQuestions(true, row.renderValue())}><HiMiniSwatch className='text-blue-600' width={6} height={6} /></a>),
                accessorKey: 'faq',
                maxSize: 20
          }
    ],[])

    const downloadPdfFile = async (x: any) =>
    {
      let id = x?.id
      if(x?.file_name === null)
      {
         alert('Course Material Not Available')
      } else {
         await axios.get(`${BASE_URL}academic/course/download-course-document/${id}`, 
          { 
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': token ? `Bearer ${token}` : "",
            },
            responseType: 'blob' 
          })
          .then((response: any) => 
          {  
              window.open(URL.createObjectURL(response.data));
          }).catch(() => {                      
              return false;
          })
       }
    }

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
                          All Courses
                  </span>
                  <span className='mt-1 cursor-pointer' 
                          onClick={() => 
                          {
                              setOpenAddCourse(true)
                          }}      
                  >
                      <BsHighlighter className="w-20 hover:text-blue-600" />
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

              {
                !isLoading && (data?.data?.length > 0) && <>
                      <div 
                              className="shadow-md border-2 border-gray-100 mb-3 mt-1 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden hover:shadow-stone-400"
                          >                    
                              <div 
                                      className='px-5'
                              >                              
                                  <Table data={data?.data} 
                                          columns={AllCourses} 
                                          showNavigation={false} 
                                          searchPlaceHolder='search for employees ...' 
                                          path='students' 
                                          from='students' 
                                          onClick={(no) => {
                                              
                                          }}
                                          searchTerm={(word) => {
                                             
                                          }}
                                  /> 
                              </div>                       
                      </div>
              
                      <div className="p-10"></div>

                      <div 
                          className="w-full p-3"
                      >
                          <div 
                              className="flex gap-5 justify-between items-left transition-shadow border rounded-lg shadow-sm hover:shadow-lg p-5"
                          >
                              <span 
                                  className="p-3 font-bold"
                              >
                                Exam Obj
                              </span>
                              
                              {/* <span className="p-3 bg-green-400 hover:bg-green-600 hover:font-bold hover:text-white rounded-md cursor-pointer"
                                    onClick={() => {
                                        setExamStatusObj(data?.plus)
                                        setExamStatus(true)
                                      }}
                                >
                                    Status - {data?.plus?.objective}
                              </span> */}
                              <span 
                                className="p-3 bg-blue-400 hover:bg-blue-600 hover:font-bold hover:text-white rounded-md cursor-pointer"
                                onClick={() => {
                                      setExamStatusObj(data?.plus?.obj_duration)
                                      setExamDuration(true)
                                }}
                                >
                                  Duration - {data?.plus?.obj_duration}
                                </span>
                          </div>
                      </div>

                      <div 
                          className="w-full p-3"
                      >
                        <div 
                          className="flex gap-5 justify-between items-left transition-shadow border rounded-lg shadow-sm hover:shadow-lg p-5"
                        >
                          <span 
                              className="p-3 font-bold"
                          >
                            Exam Theory
                          </span>
                          {/* <span 
                                className="p-3 bg-green-400 hover:bg-green-600 hover:font-bold hover:text-white rounded-md cursor-pointer"
                                onClick={() => {
                                    // setExamStatusObj(data?.plus)
                                    setExamTheorytatus(true)
                                }}
                              >
                                Status - {data?.plus?.theory}
                          </span> */}
                          <span  
                              className="p-3 bg-blue-400 hover:bg-blue-600 hover:font-bold hover:text-white rounded-md cursor-pointer"
                              onClick={() => {
                                  setExamTheorytatus(data?.plus?.theory_duration)
                                  setExamTheoryDuration(true)
                              }}
                          >
                            Duration - {data?.plus?.theory_duration}
                          </span>
                        </div>
                      </div> 
                  </>
              }             

              <AddCourseModal 
                  openCourseModal={openAddCourse} 
                  onClick={
                     () => {
                        refetch()
                        setOpenAddCourse(false)
                     }
                  } token={token} 
              />

              {  (openEditCourse === true) &&
                  <EditCourseModal 
                      editCourseModal={openEditCourse} 
                      onClick={
                        () => {
                            refetch()
                            setOpenEditCourse(false)
                        }
                      } 
                    token={token} 
                    data={editedData}
                  />
              }

              {  (openDeleteCourse === true) &&
                  <DeleteCourseModal 
                      deleteCourseModal={openDeleteCourse} 
                      onClick={
                        () => {
                            refetch()
                            setOpenDeleteCourse(false)
                        }
                      } 
                    token={token} 
                    data={editedData}
                  />
              }

              {  (openCourseDuration === true) &&
                  <TestExamDuration 
                      openCourseModal={openCourseDuration} 
                      onClick={
                        () => {
                            refetch()
                            setOpenCourseDuration(false)
                        }
                      } 
                    token={token} 
                    data={editedData}
                  />
              }

              {  (openUploadCourse === true) &&
                  <UploadCourseModal 
                      openCourseModal={openUploadCourse} 
                      onClick={
                        () => {
                            refetch()
                            setOpenUploadCourse(false)
                        }
                      } 
                    token={token} 
                    data={editedData}
                  />
              }

              {  (openRemoveDocument === true) &&
                  <RemoveCourseModal 
                      removeCourseModal={openRemoveDocument} 
                      onClick={
                        () => {
                            refetch()
                            setOpenRemoveDocument(false)
                        }
                      } 
                    token={token} 
                    data={editedData}
                  />
              }

              {  (openChangeDocument === true) &&
                  <ChangeCourseModal 
                      openCourseModal={openChangeDocument} 
                      onClick={
                        () => {
                            refetch()
                            setOpenChangeDocument(false)
                        }
                      } 
                    token={token} 
                    data={editedData}
                  />
              }

              {  (openCourseFaq === true) &&
                  <CourseFaqQuestion 
                      corseFaqs={openCourseFaq} 
                      onClick={
                        () => {
                            refetch()
                            setOpenCourseFaq(false)
                        }
                      } 
                    token={token} 
                    cdata={editedData}
                  />
              }              

              {  (examDuration === true) &&
                  <ExamDuration 
                      openExamStatus={examDuration} 
                      onClick={
                        () => {
                            refetch()
                            setExamDuration(false)
                        }
                      } 
                    token={token} 
                    exam={examStatusObj}
                  />
              }             

              {  (examTheoryDuration === true) &&
                  <ExamTheoryDuration 
                      openExamStatus={examTheoryDuration} 
                      onClick={
                        () => {
                            refetch()
                            setExamTheoryDuration(false)
                        }
                      } 
                      exam={examTheoryStatus}
                      token={token} 
                  />
              }
          
    </div>
  )
}
