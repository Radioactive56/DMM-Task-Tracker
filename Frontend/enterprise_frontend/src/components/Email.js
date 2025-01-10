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

    const emailList = data.email_reciever // here forward slash(/) indicate start and end of regex
    // [] defines character set
    // \s whitespace character
    // , literal , (comma character)
    // + is a quantifier which determines multiple commas or spaces or both....
        .split(/[\s,]+/) // Split by commas or spaces (including multiple spaces)
        .filter(email => email.trim() !== ""); // Remove any empty strings

    const formdata = new FormData();



    formdata.append("email_reciever",JSON.stringify(emailList))
    formdata.append("body",data.body)
    formdata.append('image_upload',data.image_upload[0])
    
    fetch(`${API_URL}/email/`,{
        method:"POST",
        headers:{
        'Authorization' : `Bearer ${token}`
        },
        body : formdata,
    })
    .then(response=>{
    if (response.status===400){
        alert('Emails Not sent.....')
    }
    else if (response.ok){
        window.alert("Emails sent successfully.........");
        window.location.reload();
    }
    else{
        window.alert("Emails Not Sent.....")
    }});
    };

  return (
    <>
    <Navbar></Navbar>
    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{marginTop:'5%',width:'100%',position:"absolute",top:'50%',left:'50%', transform: 'translate(-50%,-50%)',}}>
            <h4 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Send Email</h4>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginTop:"2%"}}>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mention all Recipients :</label>
                <textarea name='email_reciever'
            {...register("email_reciever", { required: "Email Recipients name is required." })} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mention Email Reciepients.... (min:1)" required />
            {errors.username && <p>{errors.username.message}</p>}
            <div class="help" id="id_username_helptext">
                <div class="text-xs font-normal text-gray-500 dark:text-gray-300">Required. 150 characters or fewer.</div>
            </div>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Body :</label>
                <textarea name="body"
            {...register("body", { required: "Body is required." })} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mention The message body..." required />
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
          

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Upload The File which you want to Send : </label>
    <div class="flex">
<input class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" {...register('image_upload')}></input>
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
        <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert" style={{marginTop:"1%"}}>
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-medium">Info alert!</span> Please wait for few minutes for the system to send mail.Don't close or Refresh the page.
        </div>
        </div>
        <div style={{marginTop:"4%",display:'flex',justifyContent:'center'}}>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
    </form>
    </div>
    </>
  )
}
