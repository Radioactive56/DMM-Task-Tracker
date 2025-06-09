import React, { useEffect, useState } from 'react'
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';

export default function Form() {
    const [projecttype,setprojecttype]=useState([]);
    const [clientName,setclientName] = useState([]);
    const [departmentName,setdepartmentName] = useState([]);
    const [employeeName,setemployeeName] = useState([]);
    const {register,handleSubmit,setValue,watch,control}=useForm();
    // const [statusOptions,setstatusoptions]=useState([]);
    const statusOptions = ['Completed','Not Completed']
    const selectedProjectType = watch("type");
    const token = Cookies.get('Token')
    // const end_date = watch("end_date",null);

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
    },[])
    
    const navigate = useNavigate();

    const onSubmit=(data)=>{
        const payload = {
          ...data,
          Client : parseInt(data.Client,10),
          Department : parseInt(data.Department,10),
          Employee : parseInt(data.Employee,10),
        }

        const form_api_url=`${API_URL}/newp`;

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
<form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl" onSubmit={handleSubmit(onSubmit)}>
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
          {...register("name",{ required : true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Type:</label>
        <select {...register("type", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
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
        {/* <Controller 
        name="autocompleteField"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, ...field } }) => (
          <Autocomplete
            {...field}
            options={clientName}
            getOptionLabel={(clientName) => clientName.name || ''}
            onChange={(event, newValue) => onChange(newValue)}
            renderInput={(params) => (
              <TextField
          ref={params.InputProps.ref}
          {...params.inputProps}
        />
            )}
          />
        )}
      /> */}
      <Controller
            name="Client"
            control={control}
            defaultValue={null}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={clientName}
                getOptionLabel={(clientName) => clientName.name || ""}
                value={clientName.find((opt) => opt.id === value) || null}
                onChange={(_, newValue) => onChange(newValue?.id || null)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Client"
                  size="small" // Reduces height from 56px to ~48px
                  style={{marginTop:'4px'}}
                  />
                )}
              />
            )}
          />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Department Name:</label>
        <select {...register("Department",{ required : true})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
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
        <select {...register("Employee", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
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
          {...register('start_date',{ required : true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date:</label>
        <input
          type='date'
          {...register('end_date')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Mode Of Payment:</label>
        <input
          type="text"
          {...register('mode_of_payment')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Completed:</label>
        <select
  {...register("project_completed", { required: "Status is required" })}
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
          {...register('status_description')}
          placeholder="Provide a brief description"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Document Endpath:</label>
        <input
          type="text"
          {...register('Document_endpath')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
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
