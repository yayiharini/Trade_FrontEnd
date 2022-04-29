import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
//import S123_EPA from './public/S123_EPA.xlsx';
import Grid from "@mui/material/Grid";
import axios from "axios";
import * as XLSX from "xlsx";
import Container from '@mui/material/Container';
import "../App.css";
import { Paper } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Cookies from 'universal-cookie';
import { AUTHENTICATION_ENDPOINT } from "../Constants";
import fileDownload from 'js-file-download'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FFF',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Upload =()=>{
   const [file,setFile]=React.useState();
   const [name,setName]=React.useState('');

   
   const onFileChange=  (event) =>{
     
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(event.target.files[0]);
    var data='test';
    fileReader.onload = event => {
      const bstr = event.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log('before append',data);
      data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      console.log('afterappend',data);  
      setFile(data);
    };
    
    
       //readTextFile()
   };
   console.log("file",file);


   React.useEffect(()=> {
    (
        async() =>{
          const cookies = new Cookies();
          let jwt_token = cookies.get('jwt_token');
          console.log(jwt_token);
          const response= await fetch(AUTHENTICATION_ENDPOINT + '/api/user?jwt_token=' + jwt_token, {
                headers: {'Content-Type': 'application/json'}
          });
            
          const content=await response.json();
          setName(content.Name);
        }
    )();


});


 const submitFile= () =>{
    const data = {
       file:file,
      };
      console.log('data',data);
      axios.post(AUTHENTICATION_ENDPOINT + '/api/upload',  data ).then((res) => {
        console.log("------------- get record -------------------");
        console.log({ data });
        console.log(res.data);
      }).catch((error) => {
        // Error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
 };

  const onFileUpload=() =>{
      //e.prevent.default();
      submitFile();
  }

  const logout = async() =>{
    const cookies = new Cookies();
    cookies.remove('jwt_token', { path: '/' });
      const response= await fetch(AUTHENTICATION_ENDPOINT + '/api/logout',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            credentials:'include',
      });

      const content=await response.json();
      setName('');
  }

    return(
     <Container maxWidth="sm" >
      <Paper elevation={2}>
      
      
      <Grid container  spacing={3}  >
          <Grid item xs={7}>
          <AccountBoxIcon></AccountBoxIcon>
            
          </Grid>
          <Grid item xs={5}>
          <Button variant="contained" style={{ backgroundColor: "#008080" }} >
          <Link to='/upload' underline='none' style={{ color: "white", textDecoration: 'none' }} onClick={logout} >Logout</Link>
          </Button>
          
          </Grid>
          
         
          <Grid item md={12}>

          </Grid>
          <Grid item md={12}>

          </Grid>
          <Grid item md={12}> 
          <label style={{ color: "#008080",fontWeight: 'bold',fontStyle:'italic'}}>You can  now upload an excel file, This is the 
          {/* <button onClick={handleDownload}>Template</button> */}
          <Button><a href={'https://drive.google.com/uc?export=download&id=1uUK2i8ymLJo-iiae-tlYDGZqEIKv7cHf'} download="template.xlsx">Template</a></Button>
           file for reference</label>
          </Grid>
          
          {/* <Grid item md={8}>
         
          <label>Upload your file</label>
               
          </Grid>  */}
          <Grid item md={12}>

           </Grid>
          <Grid item md={12}>

          </Grid>
          <Grid item md={7}>
            
           <input required type="file" onChange={onFileChange} style={{ color:'#008080',fontWeight: 'bold'}} />
               
          </Grid>

          <Grid item md={5}>
           <Button variant="contained"  onClick={onFileUpload} style={{
                backgroundColor: "#008080",
              }}><span></span>Upload</Button>
      
          </Grid>
          
          <Grid item md={12}>

          </Grid>
          
      </Grid>
      </Paper>
      
      

      
    
    </Container>
    )
}
export default Upload