import Axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
 
export default function Login({saveUserData}) {
  let navigate=useNavigate();
const [error, seterror] = useState('');
const [errorList, seterrorList] = useState([]);
const [isloading, setisloading] = useState(false);
  const [user, setUser] = useState({
    email:"",
    password:"",
  })

function getUserData(e){
  let myUser={...user}
myUser[e.target.name]=e.target.value;
  setUser(myUser); 
}

async function sendDataToAPI(){
  let {data}= await Axios.post(`https://route-movies-api.vercel.app/signin`, user)
  if(data.message==='success')
  {
    localStorage.setItem('token',data.token );
    saveUserData()
    setisloading(false)
    navigate('/home');
  }
  else{
    seterror(data.message);
    setisloading(false)
  }
}

function submitData(e){
  e.preventDefault(); 
  setisloading(true);
  let valids = validation();
  if(valids.error){
    seterrorList(valids.error.details);
    setisloading(false)

  }else{
  sendDataToAPI();
  setisloading(false)

  }
}



function validation(){
  const schema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

return schema.validate(user, {abortEarly:false});

}





  return <>
  
<div className="container">
<h1 className='text-center text-info mt-5 pt-5'>Login Page</h1>

  {error.length>0?<div className='alert alert-danger'>{error}</div>:""}
  {errorList.map((err,index)=><div key={index} className='alert alert-danger'>{err.message}</div>)}
<form className='mt-5' onSubmit={submitData}>
<input type="email" className='form-control my-4' placeholder='Email'  name='email' id='email' onChange={getUserData} />

<input type="Password" className='form-control' placeholder='Password' name='password' id='password' onChange={getUserData} />

<button className='btn btn-info mt-4' type='submit'>{isloading===true? <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>:'Login'}</button>
  </form>
</div>
  
  </>
}
