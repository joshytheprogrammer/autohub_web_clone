import { getCoreRowModel, useReactTable, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Icons } from './Icons';
import { useState } from 'react';


interface ReactTableProps<T extends object> 
{
    data: T[]
    columns: ColumnDef<T>[]
    showFooter?: boolean
    showNavigation?: boolean;
    path?: string
    searchPlaceHolder?: string
    headerColor?: string
    space?: string
    from?: string
    headerTextColor?: string
    headerNavigation?: boolean
    removeHeader?: boolean
    pageNos?: number[]
    onClick: (pageNo: number) => void
    searchTerm: (keyword: string) => void
}

export const Table = <T extends object>({ data, columns, headerNavigation=true, showFooter = false, removeHeader, showNavigation = false, searchPlaceHolder = '', headerColor, space, from='nothing', headerTextColor, pageNos, onClick, searchTerm }: ReactTableProps<T>) => 
{
    const [openModal, setOpenModal] = useState<boolean>(false)

    const page:any = (from === 'dashboard') ? space : 'mb-7'
    
    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            manualPagination: true
        },
    );
    console.log(table.getPaginationRowModel())
   
    return (
        <>
            <div className={`grid grid-cols-12 my-1 gap-5 ${page}`}>
              {
                  showNavigation ? (
                      <>
                            {   headerNavigation &&(
                                        <>
                                                <div className="relative border text-gray-800 bg-white col-span-3 md:col-span-2">
                                                    <select
                                                        value={table.getState().pagination.pageSize}
                                                        onChange={(e) => {
                                                            table.setPageSize(Number(e.target.value));
                                                        }} className="appearance-none w-full py-1 pl-3 md:pr-20 pr-14 bg-white" name="whatever" id="frm-whatever">
                                                        {pageNos?.map((pageSize: number) => (
                                                            <option key={pageSize} value={pageSize}
                                                                    onClick={() => {
                                                                        onClick(pageSize)
                                                                    }}
                                                            >
                                                                {pageSize}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div 
                                                    className='col-span-7 md:col-span-9 flex justify-center items-center'
                                                >
                                                    <input  
                                                           className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                           type="email" name="email" id="email" placeholder="Enter Email" 
                                                           onChange={(e) => {
                                                              let value: string = e.target.value
                                                              searchTerm(value)
                                                           }}
                                                      />
                                                </div>
                                                <div 
                                                        className="col-span-2 md:col-span-1"
                                                >
                                                    <button className="py-2 px-6 md:mr-0 text-white rounde" onClick={() => setOpenModal(!openModal)}>
                                                        <Icons iconName={'download'} width={6} height={6} color='red' />
                                                    </button>
                                                </div>
                                        </>
                                )
                            }
                      </>
                  ) : null
              }
            </div>

            <div 
                className='grid grid-cols-1 overflow-x-auto pb-10'
            >
                <table className="text-left">
                    { !removeHeader && 
                        <thead className="border-1 bg-green-700 shadow-sm shadow-black">
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className='px-5 py-3 border-b-2 border-gray-200 text-left bg-NavHover text-white text-[11px] font-semibold uppercase tracking-wider'>
                                    {
                                        headerGroup.headers.map((header) => (
                                            <th key={header.id} className="px-6 py-4 text-[13px] font-bold text-white" style={{backgroundColor: headerColor, color: headerTextColor  }}>
                                                { header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())  }
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                        </thead>
                    }
                    
                    <tbody>
                      {
                        table.getRowModel().rows.map((row) => (
                          <tr key={row.id} className='px-5 border-b border-gray-300 bg-white border-1 hover:bg-green-100 hover:font-bold hover:text-black'>
                            {
                              row.getVisibleCells().map((cell) => (
                                <td className="whitespace-nowrap px-6 py-3 font-medium hover:font-bold" key={cell.id} style={{
                                    width: cell.column.getSize(),
                                  }}
                                >
                                    { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                                </td>
                              ))
                            }
                          </tr>
                        ))
                      }
                    </tbody>
                    {
                        showFooter ? (
                            <tfoot className="border-t bg-gray-50 p-3">
                                {
                                    table.getFooterGroups().map((footerGroup) => (
                                        <tr key={footerGroup.id} className='text-sm hover:font-bold'>
                                            {
                                                footerGroup.headers.map((header) => (
                                                <th key={header.id} colSpan={header.colSpan} className='p-4 text-lg'>
                                                    {   header.isPlaceholder ? null: flexRender(header.column.columnDef.footer, header.getContext())}
                                                </th>
                                            ))
                                            }
                                        </tr>
                                        ))
                                }
                            </tfoot>
                        ) : null
                    }
                </table>
            </div>
        </>
    );
   };