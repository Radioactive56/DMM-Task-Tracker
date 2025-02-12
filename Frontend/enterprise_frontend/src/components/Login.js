import { useState,useEffect } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { API_URL } from '../App';
import user from './icons8-user-male-3-40.png'
import password from './icons8-password-64.png'

import Swal from 'sweetalert2';
import Cookies from 'js-cookie';


export default function Login() {

    const [captchaUrl, setCaptchaUrl] = useState(""); // URL to fetch captcha image
    const navigate = useNavigate();
    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();

    const fetchCaptcha = () => {
    setCaptchaUrl(`${API_URL}/generate-captcha/?t=${new Date().getTime()}`); // Cache-busting parameter
    };
         
    useEffect(() => {
        fetchCaptcha();
    }, []);

    function showAlert(message,type = 'error'){
        Swal.fire({
            title: type.toUpperCase(),
            text : message,
            icon: type,
            confirmButtonText:"Ok",
            showConfirmButton:true,
            customClass:{
                confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            }
            }).then(result=>{
                if (result.isConfirmed){
                    window.location.reload()
                }
            });
    }

    const onSubmit = (data) =>{
            const api_url=`${API_URL}/login`

            fetch(api_url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
            })
            .then(response=>{

                if (response.status === 403){
                    showAlert('Login Failed due to Incorrect Username or Password.')
                    throw new Error('Error')
                }
                else if (response.status === 400){
                    showAlert('Invalid Captcha!')
                    throw new Error('Error')
                }
                else if (!response.ok){
                    showAlert('Error in calling the api.')
                    throw new Error('Error')
                }
                else{
                    return response.json()
                }
            })
            .then(data=>{
                Swal.fire({
                    title: "Success",
                    text : 'Login Successfull',
                    icon: 'success',
                    confirmButtonText:"Ok",
                    showConfirmButton:true,
                    customClass:{
                        confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    }
                    }).then(result=>{
                        if (result.isConfirmed){
                            console.log(data)
                            Cookies.set('Token',data.Token,{expires:30/1440})
                            // localStorage.setItem('name',data.user)
                            window.location.replace("/home");
                        }
                    });
                // console.log(data)
                // Cookies.set('Token',data.Token,{expires:30/1440})
                // window.location.replace("/home");
            })
            .catch(error=>{
            })
    }
    
    

  return (
    <div className='root' style={{"height":"100vh","display":"flex","justifyContent":"center","alignItems":"center"}}>

        
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
       
       
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Welcome Back!</h1>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to DMM Server</h5>
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                <div class="flex">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <img width="20" height="10" src={user} alt="user-male-3"/>
                    </span>
                    <input type="text" {...register('username')} className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required/>
                </div>
                {/* <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required /> */}
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <div class="flex">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <img width="20" height="10" src={password} alt="password"/>
                    </span>
                    <input type="password" {...register('password')} placeholder="password" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
            </div>
            <div style={{ marginTop: "20px" }}>
          <img src={captchaUrl} alt="Captcha" style={{ display: "block", marginBottom: "10px" }} />
          <input
            type="text"
            placeholder="Enter Captcha"
            {...register("captcha", { required: "Captcha is required" })}
            onChange={() => clearErrors("captcha")}
          />
          {errors.captcha && <p style={{ color: "red" }}>{errors.captcha.message}</p>}
          <button type="button" onClick={fetchCaptcha} style={{ marginTop: "10px" }}>
            Refresh Captcha
          </button>
        </div>
 
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
        </form>
    </div>
    </div>
  )
}
