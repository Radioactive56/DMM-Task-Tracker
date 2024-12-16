import React, { isValidElement, useEffect, useState } from 'react'
import { API_URL } from '../App'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PrivateRoute({children}) {
    const navigate = useNavigate();
    const [IsValidToken,setIsValidToken] = useState(null);
    const token = Cookies.get('Token');


    useEffect(()=>{

        if (!token){
            setIsValidToken(false)
        }

        fetch(`${API_URL}/validate/`,{
            method:"GET",
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response=>{
            if(response.ok){
                setIsValidToken(true)
            }
            else if (response.status === 401){
                setIsValidToken(false)
                console.error("Invalid Token / Credentials....")
            }
            else{
                setIsValidToken(false)
            }
        })
    },[token]
    )

    if (IsValidToken === null) {
        return <div>Loading...</div>;
    }
  return IsValidToken ? children : navigate('/');

}


