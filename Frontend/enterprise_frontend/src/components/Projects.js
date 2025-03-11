import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridToolbarContainer, GridToolbarExport,GridToolbarQuickFilter } from '@mui/x-data-grid';
import Navbar from './Navbar';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


const CustomToolbar=({selected_scan_id})=>{
  const navigate = useNavigate();
  const token = Cookies.get('Token'); 
  const handleDelete = async()=>{
    setOpen(false)
      fetch(`${API_URL}/projectDelete/`,{
          method:"POST",
          headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`
          },
          body:JSON.stringify(selected_scan_id)
  })
  .then(response=>{
              if (response.status===403){
                  Swal.fire({
                      title: "Error",
                      text : 'You dont have the permission to perform this function.',
                      icon: 'error',
                      confirmButtonText:"Ok",
                      showConfirmButton:true,
                      customClass:{
                          confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      }
                      }).then(result=>{
                          if (result.isConfirmed){
                            window.location.reload('/projects')
                          }
                      });
              }
              else if (!response.ok){
                  Swal.fire({
                      title: "Error",
                      text : 'Error in Connecting to Database.',
                      icon: 'error',
                      confirmButtonText:"Ok",
                      showConfirmButton:true,
                      customClass:{
                          confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      }
                      }).then(result=>{
                          if (result.isConfirmed){
                              window.location.reload('/projects')
                          }
                      });
              }
              else{
                   Swal.fire({
                      title: "Success",
                      text : 'Data Deleted Successfully',
                      icon: 'success',
                      confirmButtonText:"Ok",
                      showConfirmButton:true,
                      customClass:{
                          confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      }
                      }).then(result=>{
                          if (result.isConfirmed){
                              window.location.reload('/projects')
                          }
                      });
              }
          })
          }

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  
  return (
     <GridToolbarContainer>
          <GridToolbarQuickFilter sx={{ flexGrow: 1, marginRight: 2 }} />
    
          <GridToolbarExport />
    
          
          <button
            type="button"
            onClick={() => navigate("/project")}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add
          </button>
          <button type="button" onClick={handleOpen} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you really want to Delete the selected rows ? 
          </Typography>
          <div style={{display: 'flex',justifyContent: 'space-around',paddingTop: '5%'}}>
          <button type="button" onClick={handleDelete} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Yes</button>
          <button type="button" onClick={handleClose} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">No</button>
          </div>
        </Box>
      </Modal>
        </GridToolbarContainer>
  );
}

export default function Projects() {
    const [project_data,set_project_data] = useState([]);
    const token = Cookies.get('Token')
    const [selected_scan_id,set_selected_scan_id] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        const api_url = `${API_URL}/get_project/`;
        fetch(api_url,{
            method:"GET",
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response=>{
            if (response.ok){
                return response.json()
            }
            else if (!response.ok){
                console.error('error in calling the get_project/ api.......')
            }
        })
        .then(data=>{ 
          set_project_data(data)
        })
    },[])

    const columns = [
        { field: 'name', headerName: 'Project Name', width:200 },
        { field: 'type', headerName: 'Project Type', width:200 },
        { field: 'department_name', headerName: 'Project Department', width:200 },
        { field: 'client_name', headerName: 'Client Name', width:200 },
        { field: 'employee_name', headerName: 'Employee Name', width:200 },
    //     { field: 'status', headerName: 'Project Status', width:200, renderCell:(params)=>{
    //         return(
    //             <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{params.value}</span>
    //         )
    // }, },
    { field: 'project_completed', headerName: 'Project Completed', width:200,renderCell:(params)=>{
      return(
          <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{params.value}</span>
      )
}, },
        { field: 'start_date', headerName: 'Start Date', width:200 },
        { field: 'end_date', headerName: 'End Date', width:200 },
        { field: 'mode_of_payment', headerName: 'Mode Of Payment', width:200 },
        { field: 'Document_endpath', headerName: 'Document Endpath', width:200 },
        { field: 'status_description', headerName: 'Status Description', width:200 },
    ]

    const handleRowClick = (params)=>{
      navigate(`update/${params.id}`)
    }

    const handleSelectionChange = (newSelection) => {
      set_selected_scan_id(newSelection);
    };

  return (
    <>
    <Navbar/>
    <div style={{marginTop:'15vh'}}>
      <Box sx={{ height:'85vh'}}>
      <DataGrid
                rows={project_data}
                columns={columns}
                slots={{
                  toolbar: ()=> <CustomToolbar selected_scan_id={selected_scan_id} />,
                    // toolbar: ()=> <CustomToolbar/>,
                  }}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[50, 100]}
                onRowClick={handleRowClick}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange} // Handle row selection change
            />
    </Box>
    </div>
    </>
  )
}
