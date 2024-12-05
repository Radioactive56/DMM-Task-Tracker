import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { API_URL } from '../App';
import Cookies from 'js-cookie';


export default function Form() {
    const [projecttype,setprojecttype]=useState([]);
    const [clientName,setclientName] = useState([]);
    const [departmentName,setdepartmentName] = useState([]);
    const [employeeName,setemployeeName] = useState([]);
    const {register,handleSubmit,setValue,watch}=useForm();
    const [statusOptions,setstatusoptions]=useState([]);
    const selectedProjectType = watch("type");
    const token = Cookies.get('Token')
    // const end_date = watch("end_date",null);

    useEffect(()=>{
        const api_url=`${API_URL}/ptype`;
        fetch(api_url,{
          method:"GET",
          headers:{
              'Authorization': `Token ${token}`
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
              'Authorization': `Token ${token}`
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
              'Authorization': `Token ${token}`
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
              'Authorization': `Token ${token}`
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

    useEffect(()=>{
      if (selectedProjectType){
        const api_url=`${API_URL}/status/${selectedProjectType}`;

        fetch(api_url,{
          method:"GET",
          headers:{
              'Authorization': `Token ${token}`
          },
        })
        .then(response=>{
          if (!response.ok){
            console.error("Error in status api calling.")
          }
          else{
            return response.json()
          }
        })
        .then(data=>{
          setstatusoptions(data)
          // setValue("status","");
        })
      }

    },[selectedProjectType])
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
            'Authorization': `Token ${token}`,
          },
          body:JSON.stringify(payload)
        })
        .then(response=>{
          if (response.ok){
            alert('Form submitted successfully')
          }
          else{
          return response.json().then((err)=>{
            alert(err.message);
          })
        }
        })
    }
  return (
    <>
<div style={{width:"100vw",height:'100vh'}}>
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
        <select {...register("Client", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
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
        <label for="priority" className="block text-sm font-medium text-gray-700">Status:</label>
        <select
  {...register("status", { required: "Status is required" })}
  disabled={!statusOptions.length} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
>
  <option value="">Select Status</option>
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
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          {...register('project_completed')}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label for="completed" className="ml-2 text-sm font-medium text-gray-700">
          Project Completed
        </label>
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
