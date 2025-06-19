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
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
        User Registration
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Username + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-sm text-red-500">Required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">Required</p>
            )}
          </div>
        </div>

        {/* Row 2: Password + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">Required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("phone")}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter phone"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">Required</p>
            )}
          </div>
        </div>

        {/* Row 3: Role + Aadhar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Role</label>
            <select
              {...register("role", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-500">Required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Aadhar</label>
            <input
              {...register("aadhar")}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Aadhar"
            />
            {errors.aadhar && (
              <p className="text-sm text-red-500">Required</p>
            )}
          </div>
        </div>

        {/* Address Full Width */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Address</label>
          <textarea
            {...register("address")}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter address"
          ></textarea>
          {errors.address && (
            <p className="text-sm text-red-500">Required</p>
          )}
        </div>

        {/* Submit Button Full Width */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </>
);
};