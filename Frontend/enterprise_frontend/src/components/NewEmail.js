import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from '../App';
import Cookies from 'js-cookie';
import Navbar from "./Navbar";
import Swal from "sweetalert2";

 
export default function NewEmail() {
  const token = Cookies.get('Token');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [attachments, setAttachments] = useState([]);
 
  // Handle file input
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // spread operator(...)
    setAttachments((prev) => [...prev, ...files]);
  };
 
  // Remove an attachment
  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };
 
  const onSubmit = (data) => {
    console.log(attachments)

    const emailList = data.email_reciever // here forward slash(/) indicate start and end of regex
    // [] defines character set
    // \s whitespace character
    // , literal , (comma character)
    // + is a quantifier which determines multiple commas or spaces or both....
        .split(/[\s,]+/) // Split by commas or spaces (including multiple spaces)
        .filter(email => email.trim() !== ""); // Remove any empty strings

    const formdata = new FormData();

    formdata.append('email_reciever',JSON.stringify(emailList))
    formdata.append("subject",data.subject)
    formdata.append('body',data.body)
    
    attachments.forEach(file=>{
        formdata.append('attachment',file)
    })

    console.log(formdata)
    fetch(`${API_URL}/email/`,{
            method:"POST",
            headers:{
            'Authorization' : `Bearer ${token}`
            },
            body : formdata,
        })
        .then(response=>{
        if (response.status===400){
          Swal.fire({
            title: "Error",
            text : "Error in sending Email.",
            icon: 'error',
            confirmButtonText:"Ok",
            showConfirmButton:true,
            customClass:{
                confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            }
            }).then(result=>{
                if (result.isConfirmed){
                }
            });
            // alert('Emails Not sent.....')
        }
        else if (response.ok){
          Swal.fire({
            title: "Success",
            text : 'Emails Sent Successfully',
            icon: 'success',
            confirmButtonText:"Ok",
            showConfirmButton:true,
            customClass:{
                confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            }
            }).then(result=>{
                if (result.isConfirmed){
                   window.location.reload();
                }
            });
            // window.alert("Emails sent successfully.........");
        }
        else{
          Swal.fire({
            title: "Error",
            text : "Error in sending Email.",
            icon: 'error',
            confirmButtonText:"Ok",
            showConfirmButton:true,
            customClass:{
                confirmButton: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            }
            }).then(result=>{
                if (result.isConfirmed){
                }
            });
        }});

    // reset();
    // setAttachments([]); // Clear attachments after submission
  };
 
  return (
    <>
    <Navbar></Navbar>
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h2 style={styles.header}>Compose Email</h2>
 
        <div style={styles.field}>
          <label style={styles.label}>To</label>
          <textarea
            type="email"
            multiple
            placeholder="Recipient's email"
            {...register("email_reciever")}
            style={styles.input}
          />
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Can add multiple Email Address but make sure to sperate it via , or space like<br></br><span class="text-blue-600">Example 1: email1@gmail.com,email2@gmail.com<br></br>Example 2: email1@gmail.com email2@gmail.com</span></p>
        </div>
 

        <div style={styles.field}>
          <label style={styles.label}>Subject</label>
          <input
            type="text"
            placeholder="Subject"
            {...register("subject", { required: "Subject is required" })}
            style={styles.input}
          />
          {errors.subject && <p style={styles.error}>{errors.subject.message}</p>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Message</label>
          <textarea
            placeholder="Write your message here..."
            {...register("body", { required: "Message body is required" })}
            style={styles.textarea}
          ></textarea>
          {errors.body && <p style={styles.error}>{errors.body.message}</p>}
        </div>
 
        <div style={styles.field}>
          <label style={styles.label}>Attachments</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={styles.fileInput}
          />
          <div style={styles.attachments}>
            {attachments.map((file, index) => (
              <div key={index} style={styles.attachment}><span>{file.name}</span>
                <button type="button" onClick={() => removeAttachment(index)} style={styles.removeButton}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Info alert!</span> Please wait a few seconds after clicking on send untill you get a alert....
        </div>
        </div>
 
        <div style={styles.actions}>
          <button type="submit" style={styles.sendButton}>Send</button>
          <button type="button" onClick={() => { reset(); setAttachments([]); }} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
    </>
  );
};
 
const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginTop:'15vh',
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.5em",
    color: "#444",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    display: "block",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1em",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1em",
  },
  fileInput: {
    marginTop: "10px",
    padding: "5px",
  },
  attachments: {
    marginTop: "10px",
  },
  attachment: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "5px",
    borderRadius: "4px",
    marginBottom: "5px",
    border: "1px solid #ddd",
  },
  fileName: {
    fontSize: "0.9em",
    color: "#555",
  },
  removeButton: {
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  sendButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    color: "#555",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
};
