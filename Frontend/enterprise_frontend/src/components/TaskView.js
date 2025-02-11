import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { API_URL } from '../App';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const CustomToolbar=()=>{  
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}


export default function TaskView() {

    const [rows,setRows] = useState([]);
    const {id}=useParams();
    const token = Cookies.get('Token');

    useEffect(()=>{
        const api_url = `${API_URL}/tasks/${id}/`

        fetch(api_url,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response=>{
            if (!response.ok){
                console.log('Error in calling the /tasks/id view api.....')
            }
            return response.json()
        })
        .then(data=>{
            console.log(data);
            setRows(data);
        })
    },[])

    const columns=[
        {
            field: 'task_status',
            headerName: 'Task Status',
            width:200
        },{
            field:'task_date',
            headerName:'Task Name',
            width:200
        }
    ]
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          // toolbar: ()=> <CustomToolbar selected_scan_id={selected_scan_id} />,
            toolbar: ()=> <CustomToolbar/>,
          }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
