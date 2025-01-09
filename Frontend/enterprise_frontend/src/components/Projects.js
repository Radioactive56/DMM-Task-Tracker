import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Navbar from './Navbar';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { API_URL } from '../App';
import Cookies from 'js-cookie';


const CustomToolbar=()=>{
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

  
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <div style={{display:"flex"}}>
      <button type="button" onClick={()=>navigate('/project')} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add </button>
      </div>
    </GridToolbarContainer>
  );
}

export default function Projects() {
    const [project_data,set_project_data] = useState([]);
    const token = Cookies.get('Token')
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
        { field: 'status', headerName: 'Project Status', width:200, renderCell:(params)=>{
            return(
                <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{params.value}</span>
            )
    }, },
    { field: 'project_completed', headerName: 'Project Completed', width:200 },
        { field: 'start_date', headerName: 'Start Date', width:200 },
        { field: 'end_date', headerName: 'End Date', width:200 },
        { field: 'mode_of_payment', headerName: 'Mode Of Payment', width:200 },
        { field: 'Document_endpath', headerName: 'Document Endpath', width:200 },
        { field: 'status_description', headerName: 'Status Description', width:200 },
    ]

    const handleRowClick = (params)=>{
      navigate(`update/${params.id}`)
    }


  return (
    <>
    <Navbar/>
    <div style={{marginTop:'15vh'}}>
      <Box sx={{ height:'85vh'}}>
      <DataGrid
                rows={project_data}
                columns={columns}
                slots={{
                  // toolbar: ()=> <CustomToolbar selected_scan_id={selected_scan_id} />,
                    toolbar: ()=> <CustomToolbar/>,
                  }}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[50, 100]}
                onRowClick={handleRowClick}
                checkboxSelection
                // onRowSelectionModelChange={handleSelectionChange} // Handle row selection change
            />
    </Box>
    </div>
    </>
  )
}
