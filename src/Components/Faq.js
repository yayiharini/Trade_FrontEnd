import React from "react";
import "../App.css";
import Upload from "./upload";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { AUTHENTICATION_ENDPOINT } from "../Constants";

const Faq =()=>{

    const[email,setEmail]=React.useState('');
    const[password,setPassWord]=React.useState('');
    const[success,setSuccess]=React.useState(false);
    
    
    const login = async(e) => {
        e.preventDefault();
    

    await fetch(AUTHENTICATION_ENDPOINT + '/api/login',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify(
            {
                email,
                password
            }
        )
    })
    .then((res) =>{
        console.log(res);
        if(res.status ==200){
            setSuccess(true);
            
        }else {
            setSuccess(false);
        }
    })
    .then((data)=>console.log(data));
}
if(success){
    return <Navigate to="/login" />
}



    return(
        
    <div class="form-container">
      
      <form class="register-form" onSubmit={login}>
        <input
          id="email"
          class="form-field"
          type="text"
          placeholder="Email"
          name="email"
          onChange={e=>setEmail(e.target.value)}
        />
        <input
          id="password"
          class="form-field"
          type="password"
          placeholder="password"
          name="purpose"
          onChange={e=>setPassWord(e.target.value)}
        />
       
        <button class="form-field" type="submit"  style={{backgroundColor:"#008080"}}>
        Login
        </button>
      </form>
      
     
      
      
    </div>
  );
     
    
}
export default Faq;