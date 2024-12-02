import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Navigate, useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar,GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { API_URL } from '../App';


export default function Dashboard() {
  const [cdata,set_cdata]= useState("");
  useEffect(()=>{

    const api_url = `${API_URL}/cname`;
    fetch(api_url)
    .then(response=>{
      if (!response.ok){
        console.error("Error in calling Client Api....")
      }
      return response.json();
    })
    .then(data=>{
      console.log(data)
      set_cdata(data)
    })
  },[])

    const columns = [


      { field: 'id', headerName: 'Customer ID', width:200 },
      { field: 'name', headerName: 'Name', width:200 },
      { field: 'phone_number', headerName: 'Phone Number', width:200 },
      { field: 'email', headerName: 'Email Info', width:200 },
    ]
    const navigate = useNavigate();

  return (
    <>
    <div>
      <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={cdata}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
    </div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'2%'}}>
    <button type="button" onClick={()=>navigate('/project')} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Project</button>
    </div>
    </>
  )
}
