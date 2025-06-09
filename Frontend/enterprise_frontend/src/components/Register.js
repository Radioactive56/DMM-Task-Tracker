import { useState,useEffect } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { redirect, useNavigate } from 'react-router';
import { API_URL } from '../App';
import Swal from 'sweetalert2';
import pic from './password.png'
import pic1 from './user-male-3.png'
import { QRCodeCanvas } from 'qrcode.react';
import video from './login_video.mp4'
import video1 from './sign_video.mp4'

import Cookies from 'js-cookie';


export default function Login() {
    const [captchaUrl, setCaptchaUrl] = useState(""); // URL to fetch captcha image
    const navigate = useNavigate();
    const { register, handleSubmit, reset,setError, clearErrors, formState: { errors } } = useForm();
    const [uri,seturi] = useState(null);

    const fetchCaptcha = () => {
    setCaptchaUrl(`${API_URL}/generate-captcha/?t=${new Date().getTime()}`); // Cache-busting parameter
    };
         
    useEffect(() => {
        fetchCaptcha();
    }, []);
      

    function showAlert(message,type='success'){
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
            const api_url=`${API_URL}/register/`

            fetch(api_url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
            })
            .then(response=>{

                if (response.status === 403){
                    showAlert('Invalid Login or Password!','error')
                    throw new Error('error!!!!!')
                }
                else if (response.status === 400){
                    showAlert('Invalid Captcha','error')
                    throw new Error('error!!!!!')
                }
                else if (!response.ok){
                    showAlert('Error with connection to database','error')
                    throw new Error('error!!!!!')
                }
                else{
                    return response.json()
                }
            })
            .then(data=>{
                console.log(data)
                seturi(data.otp_uri)
            })
            .catch(error=>{

            })
    }
    
    const handleredirect=()=>{
        navigate('/')
    }
    

  return (
    <div className='root' style={{"height":"100vh","display":"flex","justifyContent":"center","alignItems":"center"}}>

        
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" style={{'opacity':'88%'}}>
       
       { !uri && <>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div style={{'display':'flex','justifyContent':'center'}}>
            <video autoPlay loop muted style={{'height':'25vh'}}>
                <source src={video1} type='video/mp4'></source>
            </video>
            </div>
            <div>
                <label htmlFor="username" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                <div class="flex">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <img width="20" height="10" src={pic} alt="user-male-3"/>
                    </span>
                    <input type="text" {...register('username')} className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required/>
                </div>
                {/* <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required /> */}
            </div>
            <div style={{'marginTop':'15px'}}>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ marginTop: "-15px" }}>Your password</label>
                <div class="flex">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <img width="20" height="10" src={pic1} alt="password"/>
                                        </span>
                    <input type="password" {...register('password')} placeholder="password" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
            </div>

            <div style={{ marginTop: "15px" }}>
          <img src={captchaUrl} alt="Captcha" style={{ display: "block", marginBottom: "5px" }} />
          <input
            type="text"
            placeholder="Enter Captcha"
            {...register("captcha", { required: "Captcha is required" })}
            onChange={() => clearErrors("captcha")}
          />
          {errors.captcha && <p style={{ color: "red" }}>{errors.captcha.message}</p>}
          <button type="button"  onClick={fetchCaptcha} style={{ marginTop: "10px" }}>
            Refresh Captcha
          </button>
        </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{marginTop:'20px'}}>Login to your account</button>
        </form>
        <button onClick={handleredirect} style={{marginBottom:'5px'}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
<span>&#8592;</span> Back to Login
</button>
</>
        }
        {uri!= null && uri != "" && (
        <div className="mt-6" style={{'display':'flex','justifyContent':'center','flexDirection':'column'}}>
            <video autoPlay muted loop style={{'height':'40vh'}}>
                <source src={video} type='video/mp4'></source>
            </video>
          <h3 className="text-lg font-bold mb-2">Scan this QR with any Authenticator...</h3>
          <div style={{'display':'flex','justifyContent':'center'}}>
          <QRCodeCanvas value={uri} size={200} />
          </div>
          <button onClick={handleredirect} style={{marginTop:'5px'}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <span>&#8592;</span> Back to Login</button>
        </div>
      )}
    </div>

    </div>
  )
}
