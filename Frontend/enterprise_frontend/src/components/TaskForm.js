import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { API_URL } from '../App'
import Cookies from 'js-cookie';
import { useNavigate,useParams} from 'react-router-dom';


  
export default function TaskForm({ type,}) {

    const {id}=useParams();
    const token = Cookies.get('Token')
    const [taskStatus,settaskStattus]=useState([])
    const selectedProjectType = type;

    useEffect(()=>{
          if (selectedProjectType){
            const api_url=`${API_URL}/status/${selectedProjectType}`;
    
            fetch(api_url,{
              method:"GET",
              headers:{
                  'Authorization': `Bearer ${token}`
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
              settaskStattus(data)
            })
          }
        },[selectedProjectType])


    const modalForm=useForm();
    const employeeName = ['Manav','Yash']
    const handleModalSubmit=()=>{
      // getValues() returns an object with all current form field...
      const data = modalForm.getValues(); 
      console.log(data)
      console.log(id)

      const api_url=`${API_URL}/addtask/${id}/`
      fetch(api_url,{
        method:"POST",
        headers:{
          'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(data)
      })
      .then(response=>{
        if (response.status===200){
          alert('Task added successfully......')
          modalForm.reset();
        }
        else{
          alert('Error in adding the data....')
        }
      })
    }
  return (
    <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <div>
        <label className="block text-sm font-medium text-gray-700">Task Status:</label>
        <select {...modalForm.register("task_status", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        <option value=''>Select Task Status :</option>
        {
          taskStatus.map((item)=>(
            <option>{item}</option>
          ))
        }
        </select>
      </div>
      <div>
        <label  className="block text-sm font-medium text-gray-700">Start Date:</label>
        <input
          type='date'
          {...modalForm.register('task_date',{ required : true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mt-6 flex justify-center">
      <button
        type='button'
        onClick={handleModalSubmit}
        className="px-8 py-2 bg-indigo-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </div>
    </form>
  )
}
