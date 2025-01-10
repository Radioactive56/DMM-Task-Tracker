import React from 'react'
import Navbar from './Navbar'
import { useForm} from 'react-hook-form';
import { useNavigate } from 'react-router';
import { API_URL } from '../App';
import Cookies from 'js-cookie';

export default function Email() {
    const token = Cookies.get('Token');
    const { register, handleSubmit,watch, formState: { errors } } = useForm();

    // Watch the value of the "category" field
    // const selectedCategory = watch("category");
    const navigate=useNavigate();
    const onSubmit = data => {

    const formdata = new FormData();

    formdata.append("issue_name",data.issue_name)
    formdata.append("category",data.category)
    formdata.append("security_issue_description",data.security_issue_description)
    formdata.append("replication_steps",data.replication_steps)
    formdata.append('image_upload',data.image_upload[0])

    
    fetch(`${API_URL}/recieve_issue/`,{
        method:"POST",
        headers:{
        'Authorization' : `Bearer ${token}`
        },
        body : formdata,
    })
    .then(response=>{
    if (response.status===404){
        alert('Error in saving the issue..........')
    }
    else if (response.ok){
        window.alert("Data submitted successfully");
        window.location.reload();
    }
    else{
        window.alert("data not sent")
        console.log("data not sent")
    }});
    };

  return (
    <>
    <Navbar></Navbar>
    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{width:'50%',position:"absolute",top:'50%',left:'50%', transform: 'translate(-50%,-50%)',}}>
            <h4 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Register Issue</h4>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginTop:"2%"}}>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue :</label>
                <textarea name="issue_name"
            {...register("issue_name", { required: "Issue name is required." })} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." required />
            {errors.username && <p>{errors.username.message}</p>}
            <div class="help" id="id_username_helptext">
                <div class="text-xs font-normal text-gray-500 dark:text-gray-300">Required. 150 characters or fewer.</div>
            </div>
            </div>
        </div>

        {/* <div style={{marginTop:"2%"}}>
        <label>Category:</label>
          <select {...register("category",{ required: "Issue name is required." })} class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue="">
            <option value="">Select a Issue Category :</option>
            <option value="UI Issue">UI Issue</option>
            <option value="Functional Issue">Functional Issue</option>
            <option value="Security Issue">Security Issue</option>
          </select>
          </div> */}

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Upload The Supporting Evidence : </label>
    <div class="flex">
<input class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" {...register('image_upload',{required:true})}></input>
    </div>
 
        {/* Conditional Fields for Security */}
        {/* {selectedCategory === "Security Issue" && (
          <>
        <div className="mb-6" style={{marginTop:"1%"}}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Security Issue Description:</label>
            <textarea name="security_issue_description"
            {...register("security_issue_description")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write the description..." required />
            {errors.username && <p>{errors.username.message}</p>}
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Replication Steps :</label>
                <textarea name="replication_steps"
            {...register("replication_steps")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write the steps..." required />
            {errors.username && <p>{errors.username.message}</p>}
        </div> 
          </>
        )} */}
                <div style={{marginTop:"4%",display:'flex',justifyContent:'center'}}>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    </form>
    </div>
    </>
  )
}
