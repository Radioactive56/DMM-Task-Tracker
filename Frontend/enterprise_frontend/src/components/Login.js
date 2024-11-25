import React from 'react'
import { useForm } from 'react-hook-form'
import './Login.css';
import { API_URL } from '../App';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Login() {

    const {register,handleSubmit} = useForm();
    const navigate = useNavigate();
    const onSubmit = (data)=>{
        const api_url=`${API_URL}/login`;

        fetch(api_url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            credentials:'include',
            body:JSON.stringify(data)  
        })
        .then(response=>{
            if (response.ok){
                alert("Login Successfull");
                navigate('/project');
                
            }
            else{
                return response.json().then(data=>{
                    alert(data.message)
                })
            }
        })
    }
    return (
        <div className='root' style={{"height":"100vh","display":"flex","justifyContent":"center","alignItems":"center"}}>
            
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to DMM</h5>
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                    <input {...register('username')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" {...register('password')} placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div className="flex items-start">
                    <div className="flex items-start">
                    <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div>
    <span class="font-medium">Info alert!</span> logging in can take upto few minutes.
  </div>
</div>
                    </div>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
            </form>
        </div>
        </div>
      )
}
