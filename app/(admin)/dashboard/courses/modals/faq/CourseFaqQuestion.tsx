import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { Show } from '../../../../../../components/shared/Show';
import { useQuery } from '@tanstack/react-query';
import { BsHighlighter } from 'react-icons/bs';
import { PuffLoader } from 'react-spinners';
import { Table } from '../../../../../../components/shared/Table';
import { Icons } from '../../../../../../components/shared/Icons';
import { Modal } from '../../../../../../components/modal/Modal';
import { AddCourseFaqQuestion } from './AddCourseFaqQuestion';
import { GetCourseFaq } from '../../../../../api/admin/academic/faq';
import { EditCourseFaqQuestion } from './EditCourseFaqQuestion';
import { DeleteCourseFaqQuestion } from './DeleteCourseFaqQuestion';


type CourseFaqsProps = 
{
    corseFaqs: boolean,
    onClick: () => void
    token: string
    cdata: { id: number, name: string, description: string, objective_duration: number, file_name: string }
}


export const CourseFaqQuestion = ({onClick, corseFaqs, cdata, token}: CourseFaqsProps)  =>
{
    const { data, isLoading, refetch, isRefetching } = useQuery({ queryKey: [`get-all-course-faqs`, token], queryFn: () => GetCourseFaq(cdata?.id, token)})
      
    const [openAddCourseFaqQuestion, setOpenAddCourseFaqQuestion] = useState<boolean>(false)
    const [openEditCourseFaq, setOpenEditCourseFaq] = useState<boolean>(false)  
    const [openDeleteCourseFaq, setOpenDeleteCourseFaq] = useState<boolean>(false)  
            
    const [editedData, setEditedData] = useState<{ id: number, course_id: number, questions: string }>({ id: -1, course_id: -1, questions: "" })
        
    const [showingStates, setShowStates] = useState<boolean>(false)
      
    useEffect(() => 
    {
      
    }, [openEditCourseFaq])
        
    const ShowStates = (page: any) => 
    {
        console.log({page, showingStates})
        setShowStates(true)
    }
          
    const ChangeData = (x: boolean, data: any) => 
    {
       setEditedData(data)
       setOpenEditCourseFaq(x)
    }
          
    const RemoveData = (x: boolean, data: any) => 
    {
       setEditedData(data)
       setOpenDeleteCourseFaq(x)
    }
        
    type AcademicCourses = 
    {
       id: string
       questions: string
       edit: string
       delete: string
    }
      
    const AllCourses = useMemo<ColumnDef<AcademicCourses>[]>(
       () => [  
          {
             header: 'Question',
             cell: (row) => (<a href="#" onClick={() => ShowStates(row.cell.row.getValue)}><Show display={row.renderValue()} /></a>),
             accessorKey: 'questions',
          },
          {
             header: 'Edit',
             cell: (row) => (<a href="#" onClick={() => ChangeData(true, row.renderValue())}><Icons iconName="edit" color='red' width={4} height={4}/></a>),
             accessorKey: 'edit',
          },
          {
             header: 'Delete',
             cell: (row) => (<a href="#" onClick={() => RemoveData(true, row.renderValue())}><Icons iconName="delete" color='red' width={4} height={4}/></a>),
             accessorKey: 'delete'
          }
       ],[])
      
       return (
                <Modal 
                         onClick={onClick} isOpen={corseFaqs} wrapperWidth={1200} margin={'100px auto 0px auto'}
                >
                    <div 
                        className="w-full"
                    >        
                        <div 
                            className='font-bold text-2xl text-green-600 ml-5 mb-7 mt-5 flex gap-10'
                        >
                            <span 
                                className="text-lg text-black"
                                >
                                    All Questions
                            </span>
                            <span className='mt-1 cursor-pointer' 
                                    onClick={() => 
                                    {
                                        setOpenAddCourseFaqQuestion(true)
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
                            !isLoading && (data?.data?.length === 0)  &&  <div 
                                        className="flex md:d-flex xl:flex-row h-[200px] justify-center items-center mt-20"
                                    >
                                        <h1 className='text-[25px] font-bold text-center'>No Question Yet</h1>
                            </div>
                        }
        
                        {
                        !isLoading && (data?.data?.length > 0) && 
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
                        }
                        <div className="p-10"></div>
                    </div>


                    {  (openAddCourseFaqQuestion === true) &&
                        <AddCourseFaqQuestion 
                            openCourseFaqModal={openAddCourseFaqQuestion} 
                            onClick={
                                () => {
                                    refetch()
                                    setOpenAddCourseFaqQuestion(false)
                                }
                            } 
                            token={token} 
                            courseId={cdata?.id}
                        />
                    }

                    {  (openEditCourseFaq === true) &&
                        <EditCourseFaqQuestion 
                            editAddCourseFaqQuestion={openEditCourseFaq} 
                            onClick={
                                () => {
                                    refetch()
                                    setOpenEditCourseFaq(false)
                                }
                            } 
                            token={token} 
                            data={editedData}
                        />
                    }

                    {  (openDeleteCourseFaq === true) &&
                        <DeleteCourseFaqQuestion 
                            faqCourseModal={openDeleteCourseFaq} 
                            onClick={
                                () => {
                                    refetch()
                                    setOpenDeleteCourseFaq(false)
                                }
                            } 
                            token={token} 
                            data={editedData}
                        />
                    }


                </Modal>
    )
}
