import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Close } from '@mui/icons-material';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    getPaginationRowModel,
    PaginationState
} from '@tanstack/react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { Outlet, Link } from 'react-router-dom';

interface Person {
    _id: string;
    name: string;
    email: string;
    phone: string;
}


const ReactTable: React.FC = () => {
    const [data, setData] = useState<Person[]>([]);
    const [selectedRow, setSelectedRow] = useState<Person | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
      })

    const columnHelper = createColumnHelper<Person>();
    const columns = [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            header: 'Name'
        }),
        columnHelper.accessor('email', {
            cell: info => info.getValue(),
            header: 'Email'
        }),
        columnHelper.accessor('phone', {
            cell: info => info.getValue(),
            header: 'Phone'
        }),
        {
            header: 'Actions',
            cell: ({ row }: { row: any }) => (
                <div className='flex gap-2'>
                    <button className='text-blue-400' onClick={() => handleView(row.original)}><PreviewIcon /></button>
                    <button className='text-green-600' onClick={() => handleEdit(row.original)}><EditIcon /></button>
                    <button className='text-red-500' onClick={() => handleDelete(row.original._id)}><DeleteIcon /></button>
                </div>
            )
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<Person[]>('http://localhost:5000/api/testuser/getall');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleView = (row: Person) => {
        setSelectedRow(row);
        setIsEdit(false);
        setModalOpen(true);
    };

    const handleEdit = (row: Person) => {
        setSelectedRow(row);
        setIsEdit(true);
        setModalOpen(true);
        
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/testuser/delete/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting row:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedRow(null);
        setModalOpen(false);
    };

    const handleSave = async (updatedData: Person) => {
        try {
            await axios.put(`http://localhost:5000/api/testuser/update/${updatedData._id}` , updatedData);
           
            const updatedDataIndex = data.findIndex(item => item._id === updatedData._id);
            if (updatedDataIndex !== -1) {
                const newData = [...data];
                newData[updatedDataIndex] = updatedData;
                setData(newData);
            };

            setModalOpen(false);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const table = useReactTable({
        data,
        columns,
        state: { sorting , pagination},
        getCoreRowModel: getCoreRowModel<Person>(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel<Person>(),
        getPaginationRowModel: getPaginationRowModel<Person>(),
        onPaginationChange: setPagination
    });
    const pageCount = Math.ceil(data.length / pagination.pageSize); 
    return (
        <>
            <div className="flex flex-col h-screen max-w-3xl mx-auto py-24">
                <table className="my-auto border">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="border-b text-white uppercase">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 pr-2 py-4 font-medium text-left">
                                        {header.isPlaceholder
                                            ? null
                                            : (
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none flex min-w-[36px]'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler()
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {header.column.getCanSort() && (
                                                        <span className="pl-2">
                                                            {header.column.getIsSorted() === 'asc' ? '🔼' : '🔽'}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-b text-white">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 pt-[14px] pb-[18px]">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* pagination */}
            <div className="flex justify-center ">
                <button disabled={pagination.pageIndex === 0} onClick={() => setPagination(prev => ({ ...prev, pageIndex: Math.max(prev.pageIndex - 1, 0) }))} className='text-white'>⏮</button>
                <span className="mx-4 text-white">Page {pagination.pageIndex + 1}</span>
                <button disabled={data.length < pagination.pageSize} onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }))} className='text-white'>⏭</button>
            </div>
            </div>

            {/* Modal Component */}
            {modalOpen &&  (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                   
                        <button className=' text-lg cursor-pointer ml-40 px-3 py-1' onClick={handleCloseModal}><Close/></button>
                        {selectedRow  && (isEdit ? (
                            <div>

                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSave(selectedRow);
                                    
                                }}>
<div className=' flex flex-col  justify-center'>
                                    <label>Name:</label>
                                    <input type="text" value={selectedRow.name} onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })} />
                                    <label>Email:</label>
                                    <input type="text" value={selectedRow.email} onChange={(e) => setSelectedRow({ ...selectedRow, email: e.target.value })} />
                                    <label>Phone:</label>
                                    <input type="text" value={selectedRow.phone} onChange={(e) => setSelectedRow({ ...selectedRow, phone: e.target.value })} />
                                    <button type="submit" className='bg-green-300 text-black  mt-2' >Save</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <h2 className='font-bold text-center'>Details</h2>
                                <p>Name: {selectedRow.name}</p>
                                <p>Email: {selectedRow.email}</p>
                                <p>Phone: {selectedRow.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ReactTable;
