import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar,GridToolbarQuickFilter,GridToolbarContainer,GridToolbarExport } from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { API_URL } from '../App';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import DashboardView from './DashboardView';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip, IconButton } from '@mui/material';



const CustomToolbar=({selected_scan_id,})=>{
  const navigate = useNavigate();
  const token = Cookies.get('Token'); 

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

  //   const handleDelete=()=>{
  //     console.log(selected_scan_id)
  //   }
  
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter sx={{ flexGrow: 1, marginRight: 2 }} />

      <GridToolbarExport />

      
      <button
        type="button"
        onClick={() => navigate("/addClient")}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add
      </button>
    </GridToolbarContainer>
  );
}



export default function Dashboard() {

  const token = Cookies.get('Token');
  const [TaskId, setTaskId] = useState(null);
  const [cdata, set_cdata] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [openTasksModal, setOpenTasksModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedClient,setSelectedClient] = useState([]);
 
  const handleRowClick = (params) => {
    console.log(params.row.id)
    const c = params.row.id
    setSelectedClient(c);
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
      {
        field: 'active',
        headerName: 'Client Active Status',
        width: 100,
        renderCell: (params) => (
          <Tooltip title={params.value ? "Active" : "Inactive"}>
            <IconButton color={params.value ? "success" : "error"}>
              {params.value ? <CheckIcon /> : <CloseIcon />}
            </IconButton>
          </Tooltip>
        ),
      },
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
  
  const clientupdate = () => {
    if (selectedClient) {
      navigate(`/clientupdate/${selectedClient}`);
    } else {
      console.error("No client selected");
    }
  };

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
        slots={{
          toolbar: CustomToolbar, // Use CustomToolbar directly
        }}
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
            <div style={{display:'flex',justifyContent:'space-between'}}>
             Projects Details
            <Button onClick={clientupdate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Update Client Data </Button>
            </div>
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
