import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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

  return (
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
  )
}
