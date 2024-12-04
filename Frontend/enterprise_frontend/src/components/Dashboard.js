import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar,GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { API_URL } from '../App';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function Dashboard() {
  const [cdata,set_cdata]= useState("");

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
 
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

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
        onRowClick={handleRowClick}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
    <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Row Details
          </Typography>
          {selectedRow && (
            <>
              <Typography sx={{ mt: 2 }}>
ID: {selectedRow.id}
              </Typography>
              <Typography>
Name: {selectedRow.name}
              </Typography>
            </>
          )}
          <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'2%'}}>
    <button type="button" onClick={()=>navigate('/project')} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Project</button>
    </div>
    </>
  )
}
