import React from 'react'
import { useForm,Controller } from 'react-hook-form';
import Navbar from './Navbar';
import { useNavigate } from 'react-router';
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import pic from './password.png'
import pic1 from './user-male-3.png'
import video1 from './sign_video.mp4'

export default function Users() {
  const token = Cookies.get('Token');
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate=useNavigate();
  const onSubmit = data => {
    console.log(data);

    fetch(`${API_URL}/addUser/`,{
      method:"POST",
      headers:{"Content-Type":"application/json",'Authorization': `Bearer ${token}`

      },
      body : JSON.stringify(data),
    })
    .then(response=>{
              if (response.ok){
                Swal.fire({
                title: "Success",
                text : 'User Added Successfully',
                icon: 'success',
                confirmButtonText:"Ok",
                showConfirmButton:true,
                customClass:{
                    confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                }
                }).then(result=>{
                    if (result.isConfirmed){
                        navigate('/users');
                    }
                });
              }
              else if (response.status === 403){
                  Swal.fire({
                    title: "Error",
                    text : 'You dont have the permission to perform this function.',
                    icon: 'error',
                    confirmButtonText:"Ok",
                    showConfirmButton:true,
                    customClass:{
                        confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    }
                    }).then(result=>{
                        if (result.isConfirmed){
                            navigate('/user');
                        }
                    });
              }
              else if (response.status===500){
                // alert(".....")
                Swal.fire({
                  title: "Error",
                  text : "Error in saving data to the model as the format didn't match.",
                  icon: 'error',
                  confirmButtonText:"Ok",
                  showConfirmButton:true,
                  customClass:{
                      confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  }
                  }).then(result=>{
                      if (result.isConfirmed){
                          navigate('/user');
                      }
                  });
              }
              else{
                console.error("Error in calling the api....")
              }
            })
        }

  return (
    <>
    <Navbar title="ISAE ADMIN"/>
    <div className='root' style={{"height":"100vh","display":"flex","justifyContent":"center","alignItems":"center",'background':'none'}}>
    
            
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" style={{'opacity':'88%',"marginTop":"15vh"}}>
           
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
                        <img width="20" height="10" src={pic1} alt="user-male-3"/>
                        </span>
                        <input type="text" {...register('username')} className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required/>
                    </div>
                    {/* <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required /> */}
                </div>
                <div style={{'marginTop':'15px'}}>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>                
                    <div class="flex">
                        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <img width="20" height="10" src={pic} alt="password"/>
                                            </span>
                        <input type="password" {...register('password')} placeholder="Password" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    </div>
                </div>
    
    
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add User</button>
            </form>
        </div>
    
        </div>
  </>
);
};