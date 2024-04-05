


import React, { useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { Close } from '@mui/icons-material';

type Props = {}
createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#000000',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');
const Tabletest = (props: Props) => {
    
  
    const columns = [
        {
            name: 'FirstName',
            selector: (row: { firstname: any }) => row.firstname,
           
           
        },
        {
            name: 'LastName',
            selector: (row: { lastname: any }) => row.lastname,
     
          
        },
        {
            name: 'Email',
            selector: (row: { email: any }) => row.email,
           
        },
        {
            name: 'Age',
            selector: (row: { age: any }) => row.age,
            sortable: true,
            grow:0
        },
        {
            name: 'City',
            selector: (row: { city: any }) => row.city,
            grow:0
        },
        {
            name:'Actions',
            grow:0,
            cell: (row: any) => (
                <>
               
                <div className="  flex">
                    <button className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap" onClick={() => handleView(row)}>View</button>
                    <button className=" px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 whitespace-nowrap" onClick={() => handleEdit(row)}>Edit</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 whitespace-nowrap max-w-sm" onClick={() => handleDelete(row)}>Delete</button>
                </div>
    
                </>
            ),
           
            button: true,
           
        },
    ];
    const data = [
                {
                    id: 1,
                    firstname: 'priyal',
                    lastname: 'thummar',
                    email: 'priya@gmail.com',
                    age: 25,
                    city: 'New York'
                },
                {
                    id: 2,
                    firstname: 'john',
                    lastname: 'doe',
                    email: 'john@gmail.com',
                    age: 30,
                    city: 'Los Angeles'
                },
                {
                    id: 3,
                    firstname: 'jane',
                    lastname: 'smith',
                    email: 'jane@gmail.com',
                    age: 28,
                    city: 'Chicago'
                },
                {
                    id: 4,
                    firstname: 'priyal',
                    lastname: 'thummar',
                    email: 'jane@gmail.com',
                    age: 28,
                    city: 'Chicago'
                },
                {
                    id: 5,
                    firstname: 'priyal',
                    lastname: 'thummar',
                    email: 'priya@gmail.com',
                    age: 25,
                    city: 'New York'
                },
                {
                    id: 6,
                    firstname: 'john',
                    lastname: 'doe',
                    email: 'john@gmail.com',
                    age: 30,
                    city: 'Los Angeles'
                },
                {
                    id: 7,
                    firstname: 'jane',
                    lastname: 'smith',
                    email: 'jane@gmail.com',
                    age: 28,
                    city: 'Chicago'
                },
                {
                    id: 8,
                    firstname: 'priyal',
                    lastname: 'thummar',
                    email: 'jane@gmail.com',
                    age: 28,
                    city: 'Chicago'
                },
                
                {
                    id: 9,
                    firstname: 'priyal',
                    lastname: 'thummar',
                    email: 'priya@gmail.com',
                    age: 25,
                    city: 'New York'
                },
                {
                    id: 10,
                    firstname: 'john',
                    lastname: 'doe',
                    email: 'john@gmail.com',
                    age: 30,
                    city: 'Los Angeles'
                },
                {
                    id: 11,
                    firstname: 'jane',
                    lastname: 'smith',
                    email: 'jane@gmail.com',
                    age: 28,
                    city: 'Chicago'
                },
                {
                    id: 12,
                    firstname: 'priyal',
                    lastname: 'thummar',
                    email: 'jane@gmail.com',
                    age: 28,
                    city: 'Chicago'
                },
                
                
            ]

            const [records, setRecords] = useState(data);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);

        
    const handleView = (row: any) => {
        setSelectedRow(row);
        setModalOpen(true);
    };

    const handleEdit = (row: any) => {
        setSelectedRow(row);
        // Implement your edit functionality here
    };

    const handleDelete = (row: any) => {
        const newData = records.filter((record: any) => record.id !== row.id);
        setRecords(newData)
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedRow(null);
    };
    const handlefilter = (e: React.ChangeEvent<HTMLInputElement>) =>{
                const newData = data.filter(row => {
                    return row.firstname.toLowerCase().includes(e.target?.value.toLowerCase())
                })
                setRecords(newData)
            }

    return (
       <>
            <div className='w-2/3
            '>
                <DataTable
                    columns={columns}
                    data={records}
                    selectableRows
                    selectableRowsHighlight
                    fixedHeader
                    pagination
                    subHeader
                    subHeaderComponent ={
                        <input type='text' className='w-25' placeholder='search' onChange={handlefilter}/>
                    }
                    theme="solarized"
                   
                    
                />
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        
                        <button className='left-0 text-lg cursor-pointer' onClick={closeModal}><Close/></button>
                        <p>First Name: {selectedRow.firstname}</p>
                        <p>Last Name: {selectedRow.lastname}</p>
                        <p>Email: {selectedRow.email}</p>
                        <p>Age: {selectedRow.age}</p>
                        <p>City: {selectedRow.city}</p>
                    </div>
                </div>
            )}
       </>
    );
};

export default Tabletest;

