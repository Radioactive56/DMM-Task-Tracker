import React, { useEffect, useState } from 'react'
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import { useForm } from 'react-hook-form';
import { useNavigate,useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';

export default function ClientUpdate() {
    const {register,handleSubmit,setValue,watch,control,reset}=useForm();
    const token = Cookies.get('Token')
    const navigate = useNavigate();
    const {id}=useParams();
    

    useEffect(()=>{
      const api_url = `${API_URL}/getClient/${id}/`;
      fetch(api_url,{
        method:"GET",
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
      }
      })
      .then(response=>{
        if (response.ok){
          return response.json()
        }
        else{
          Swal.fire({
            title: "Error",
            text : "Error in calling the Api",
            icon: 'error',
            confirmButtonText:"Ok",
            showConfirmButton:true,
            customClass:{
                confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            }
            }).then(result=>{
                if (result.isConfirmed){
                   navigate('/home')
                }
            });

        }
      })
      .then(data=>{
        console.log(data)
        reset(data[0])
      })
    },[])

    const onSubmit=(data)=>{
        const api_url = `${API_URL}/updateClient/${id}/`
        fetch(api_url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(data)
        })
        .then(response=>{
            if (response.ok){
                Swal.fire({
                title: "Success",
                text : 'Client Added Successfully.',
                icon: 'success',
                confirmButtonText:"Ok",
                showConfirmButton:true,
                customClass:{
                    confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                }
                }).then(result=>{
                    if (result.isConfirmed){
                        navigate('/home')
                    }
                });
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
                           navigate('/home')
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
            <label for="name" className="block text-sm font-medium text-gray-700">Client Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Client name"
              {...register("name",{ required : true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Group :</label>
            <input
              type="text"
              id="name"
              placeholder="Enter group"
              {...register("group",{ required : true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client PAN :</label>
            <input
              type="text"
              id="name"
              placeholder="Enter pan"
              {...register("pan",{ required : true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client GSTIN:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter gstin"
              {...register("gstin")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client TAN :</label>
            <input
              type="text"
              id="name"
              placeholder="Enter tan"
              {...register("tan")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label  className="block text-sm font-medium text-gray-700">Client PTRC :</label>
            <input
              type="text"
              id="name"
              placeholder="Enter ptrc"
              {...register("ptrc")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client PTEC :</label>
            <input
              type="text"
              id="name"
              placeholder="Enter ptec"
              {...register("ptec")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number :</label>
            <input
              type="text"
              id="name"
              placeholder="Enter contact info"
              {...register("contact_no")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Email :</label>
            <input
              type="text"
              id="name"
              placeholder="Enter email"
              {...register("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          </div>
     
        {/* <!-- Textarea and Checkbox --> */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Point of Contact :</label>
            <input
              type="text"
              placeholder="Enter Poc"
              {...register("poc")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
      <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Client Active Status :</label>
        <input type='checkbox' {...register('active')}></input>
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
