import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { API_URL } from '../App';


export default function Form() {
    const [projectname,setprojectname]=useState([])
    const {register,handleSubmit,watch}=useForm();

    useEffect(()=>{
        const api_url=`${API_URL}/pname`;
        fetch(api_url)
        .then(response=>{
            if (!response.ok){
                console.error("Api calling Failed");
            }
            return response.json()
        })
        .then(data=>{
            console.log(data)
            setprojectname(data);
        })
    },[])

    useEffect(()=>{

    })
    const onSubmit=(data)=>{
        console.log(data)
    }
  return (
    <>
    <div>
      {API_URL}
    </div>
<div style={{width:"100vw",height:'100vh'}}>
<form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl" onSubmit={handleSubmit(onSubmit)}>
    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Project Form</h2>
    
    {/* <!-- Form Grid --> */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* <!-- Input Fields --> */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Name:</label>
        <select {...register("name", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        <option value="">Select Project</option>
        {projectname.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
          
      </div>
      <div>
        <label for="clientName" className="block text-sm font-medium text-gray-700">Client Name:</label>
        <input
          type="text"
          id="clientName"
          placeholder="Enter client name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="email" className="block text-sm font-medium text-gray-700">Department Name:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="phone" className="block text-sm font-medium text-gray-700">Employee Name:</label>
        <input
          type="tel"
          id="phone"
          placeholder="Enter phone number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
        <input
          type="date"
          id="startDate"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
        <input
          type="date"
          id="endDate"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="budget" className="block text-sm font-medium text-gray-700">Mode Of Payment:</label>
        <input
          type="number"
          id="budget"
          placeholder="Enter budget"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="teamSize" className="block text-sm font-medium text-gray-700">Period:</label>
        <input
          type="number"
          id="teamSize"
          placeholder="Enter team size"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label for="priority" className="block text-sm font-medium text-gray-700">Status:</label>
        <select
          id="priority"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      </div>
      {/* <div>
        <label for="status" className="block text-sm font-medium text-gray-700"></label>
        <select
          id="status"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select status</option>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div> */}
 
    {/* <!-- Textarea and Checkbox --> */}
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="description" className="block text-sm font-medium text-gray-700">Status Description:</label>
        <textarea
          id="description"
          rows="3"
          placeholder="Provide a brief description"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="completed"
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label for="completed" className="ml-2 text-sm font-medium text-gray-700">
          Project Completed
        </label>
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
