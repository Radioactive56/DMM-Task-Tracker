import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar,GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { API_URL } from '../App';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import DashboardView from './DashboardView';


export default function Dashboard() {

  const token = Cookies.get('Token');
  const [TaskId, setTaskId] = useState(null);
  const [cdata, set_cdata] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [openTasksModal, setOpenTasksModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
 
  const handleRowClick = (params) => {
    console.log(params.row.id)
    const c = params.row.id
    const api_url=`${API_URL}/get_project/${c}/`;
    fetch(api_url,{
      method:"GET",
      headers:{
          'Authorization': `Bearer ${token}`
      },
    })
    .then(response=>{
      if (!response.ok){
        if (response.status===404){
          throw new Error('No Projects available for this client.')
        }
        console.error('Error in fetching the api......')
      }
      return response.json()
    })
    .then(data=>{
      console.log(data)
      setSelectedRow(data);
    })
    .catch((error)=>setSelectedRow([{'name':'Project Not Found'}]));
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
    setSelectedRow([]);
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


      { field: 'id', headerName: 'Customer ID', width:50 },
      { field: 'name', headerName: 'Client Name', width:400 },
      { field: 'group', headerName: 'Client Group', width:200 },
      { field: 'email', headerName: 'Client Email', width:200 },
      { field: 'pan', headerName: 'PAN NO', width:200 },
      { field: 'gstin', headerName: 'GSTIN', width:200 },
      { field: 'tan', headerName: 'TAN', width:200 },
      { field: 'ptrc', headerName: 'PTRC', width:200 },
      { field: 'ptec', headerName: 'PTEC', width:200 },
      { field: 'contact_no', headerName: 'Contact Info', width:200 },
      { field: 'poc', headerName: 'Point Of Contact', width:200 },
    ]

    // const handleClose = () => {
    //   setOpen(false);
    //   setSelectedProjects([]);
    // };
  
    const handleOpenTasksModal = (id) => {
      setTaskId(id);
      setOpenTasksModal(true);
    };
  
    const handleCloseTasksModal = () => {
      setOpenTasksModal(false);
      setTaskId(null);
    };
    

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  
  const navigate = useNavigate();



  return (
    <>
    <Navbar/>
    <div style={{marginTop:'6%'}}>
      <Box sx={{ height:'85vh', width: 1 }}>
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
            width: '60%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Projects Details
          </Typography>
          {selectedRow.length > 0 ? (
              selectedRow.map((item) => (
                <div key={item.id}>
                  <Button onClick={() => handleOpenTasksModal(item.id)}>
                    {item.name}
                  </Button>
                </div>
              ))
            ) : (
              <Typography>No projects found.</Typography>
            )}
            <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
              Close
            </Button>
          </Box>
        </Modal>

        {/* Modal for Task Details */}
        <Modal open={openTasksModal} onClose={handleCloseTasksModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
            {TaskId ? <DashboardView id={TaskId} /> : <Typography>No tasks available.</Typography>}
          </Box>
        </Modal>

    </div>
    </>
  )
}
