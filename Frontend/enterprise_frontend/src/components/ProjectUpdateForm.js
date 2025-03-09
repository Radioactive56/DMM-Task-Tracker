import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import { useNavigate,useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TaskForm from './TaskForm';
import TaskView from './TaskView';
import Swal from 'sweetalert2';

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



export default function Form() {
    const parentForm = useForm();
    const [projecttype,setprojecttype]=useState([]);
    const [clientName,setclientName] = useState([]);
    const [departmentName,setdepartmentName] = useState([]);
    const [employeeName,setemployeeName] = useState([]);
    // const {register,handleSubmit,reset,setValue,watch}=useForm();
    const statusOptions = ['Completed','Not Completed']
    const selectedProjectType = parentForm.watch('type')
    const token = Cookies.get('Token')
    const {id}=useParams();

   


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const navigate = useNavigate();

    useEffect(()=>{
        const api_url=`${API_URL}/ptype`;
        fetch(api_url,{
          method:"GET",
          headers:{
              'Authorization': `Bearer ${token}`
          },
        })
        .then(response=>{
            if (!response.ok){
                console.error("Project type Api calling Failed");
            }
            return response.json()
        })
        .then(data=>{
          console.log("Project Type data :"+data);
            setprojecttype(data);
        })

        const client_api_url = `${API_URL}/cname`;

        fetch(client_api_url,{
          method:"GET",
          headers:{
              'Authorization': `Bearer ${token}`
          },
        })
        .then(response=>{
          if (!response.ok){
            console.error("Error calling the client Api..")
          }
          else{
            return response.json()
          }
        })
        .then(data=>{
          console.log(data);
          setclientName(data);
        })
        const department_api_url=`${API_URL}/dname`;

        fetch(department_api_url,{
          method:"GET",
          headers:{
              'Authorization': `Bearer ${token}`
          },
        })
        .then(response=>{
          if (!response.ok){
            console.error('Error in calling department api..')
          }
          else{
            return response.json()
          }
        })
        .then(data=>{
          console.log("Department data :"+data);
          setdepartmentName(data);

        })

        const employee_api_url=`${API_URL}/ename`;

        fetch(employee_api_url,{
          method:"GET",
          headers:{
              'Authorization': `Bearer ${token}`
          },
        })
        .then(response=>{
          if (!response.ok){
            console.error('Error in calling department api..')
          }
          else{
            return response.json()
          }
        })
        .then(data=>{
          console.log("Employee data :"+data);
          setemployeeName(data);
        })


      fetch(`${API_URL}/project/${id}/`,{
        method:'GET',
        headers:{
          'Authorization' : `Bearer ${token}`
        }
      })
      .then(response=>{
        if (!response.ok){
          console.error('Error in calling /project/:id api.......')
        }
        return response.json()
      })
      .then(data=>{
        console.log(data)
        parentForm.reset(data)
      })
    },[])

    const handleParentSubmit=(data)=>{
        const payload = {
          ...data,
          Client : parseInt(data.Client,10),
          Department : parseInt(data.Department,10),
          Employee : parseInt(data.Employee,10),
        }

        const form_api_url=`${API_URL}/update_project/${id}/`;

        fetch(form_api_url,{
          method:"POST",
          headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body:JSON.stringify(payload)
        })
        .then(response=>{
          if (response.ok){
            Swal.fire({
              title: "Success",
              text : 'Project Added Successfully.',
              icon: 'success',
              confirmButtonText:"Ok",
              showConfirmButton:true,
              customClass:{
                  confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              }
              }).then(result=>{
                  if (result.isConfirmed){
                      navigate('/projects')
                  }
              });
            // alert('Form submitted successfully')
            // navigate('/projects')
          }
          else{
          return response.json().then((err)=>{
            Swal.fire({
              title: "Error",
              text : err.message,
              icon: 'error',
              confirmButtonText:"Ok",
              showConfirmButton:true,
              customClass:{
                  confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              }
              }).then(result=>{
                  if (result.isConfirmed){
                      navigate('/projects');
                  }
              });
            // alert(err.message);
          })
        }
        })
    }
  return (
    <>
    <Navbar></Navbar>
<div style={{width:"100vw",height:'100vh',marginTop:'15vh'}}>
<form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl" onSubmit={parentForm.handleSubmit(handleParentSubmit)}>
    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Project Form</h2>
    
    {/* <!-- Form Grid --> */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* <!-- Input Fields --> */}
      <div>
        <label for="name" className="block text-sm font-medium text-gray-700">Project Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Project name"
          {...parentForm.register("name",{ required : true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Type:</label>
        <select {...parentForm.register("type", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled>
        <option value="">Select Project</option>
        {projecttype.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
          
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Client Name:</label>
        <select {...parentForm.register("Client", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled>
        <option value=''>Select Client</option>
        {
          clientName.map((item)=>(
            <option key={item.id} value={item.id}>{item.name}</option>
          ))
        }
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Department Name:</label>
        <select {...parentForm.register("Department",{ required : true})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled>
          <option value="">Select Department</option>
          {
            departmentName.map((item)=>(
              <option key={item.id} value={item.id}>{item.name}</option>
            ))
          }
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Employee Name:</label>
        <select {...parentForm.register("Employee", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled>
        <option value=''>Select Employee</option>
        {
          employeeName.map((item)=>(
            <option key={item.id} value={item.id}>{item.name}</option>
          ))
        }
        </select>
      </div>
      <div>
        <label  className="block text-sm font-medium text-gray-700">Start Date:</label>
        <input
          type='date'
          {...parentForm.register('start_date',{ required : true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date:</label>
        <input
          type='date'
          {...parentForm.register('end_date')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Mode Of Payment:</label>
        <input
          type="text"
          {...parentForm.register('mode_of_payment')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Completed:</label>
        <select
  {...parentForm.register("project_completed", { required: "Status is required" })}
  disabled={!statusOptions.length} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
>
  <option value="">Select Project Completion Status</option>
  {statusOptions.map((status) => (
    <option key={status} value={status}>
      {status}
    </option>
  ))}
</select>
      </div>
      </div>
 
    {/* <!-- Textarea and Checkbox --> */}
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="description" className="block text-sm font-medium text-gray-700">Status Description:</label>
        <textarea
          id="description"
          rows="3"
          {...parentForm.register('status_description')}
          placeholder="Provide a brief description"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Document Endpath:</label>
        <input
          type="text"
          {...parentForm.register('Document_endpath')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div style={{display:'flex',flexDirection:'row'}}>
      <div>
        <label for="task_status" className="block text-sm font-medium text-gray-700">Add Task :</label>
        <div>
      <Button onClick={handleOpen}>Open Task Addition form</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TaskForm type={selectedProjectType} setOpen={setOpen}></TaskForm>
        </Box>
      </Modal>
    </div>
    </div>
    <div>
    <label for="task_view" className="block text-sm font-medium text-gray-700">Task View :</label>
        <div>
      <Button onClick={handleOpen1}>Open All the Added Tasks</Button>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TaskView></TaskView>
        </Box>
      </Modal>
    </div>
    </div>
      </div>
      </div>
    </div>
 
    {/* <!-- Submit Button --> */}
    <div className="mt-6 flex justify-center">
      <button
        type="submit"
        className="px-8 py-2 bg-indigo-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </div>
  </form>
</div>
</>


  )
}
