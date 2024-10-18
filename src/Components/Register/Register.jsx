import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
 
export default function Register() {
  let navigate=useNavigate();
const [error, seterror] = useState('');
const [errorList, seterrorList] = useState([]);
const [isloading, setisloading] = useState(false);
  const [user, setUser] = useState({
    first_name:"",
    last_name:"",
    age:0,
    email:"", 
    password:"",
  
  })

function getUserData(e){
  let myUser={...user}
  // الطريقه دي عشان تقدر تكون متغيره
myUser[e.target.name]=e.target.value;
  setUser(myUser); 
}

async function sendDataToAPI(){
  let {data}= await axios.post(`https://route-movies-api.vercel.app/signup`, user)
  console.log(data);
  if(data.message==='success')
  {
    setisloading(false)
    navigate('/login'); 
  }
  else{
    seterror(data.message);
    setisloading(false)
  }
}

function submitData(e){
  e.preventDefault(); 
  // sendDataToAPI()
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
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),

   
    age: Joi.number()
        .integer()
        .min(10)
        .max(80),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

return schema.validate(user, {abortEarly:false});
}





  return <>
  
<div className="container mt-5">
  <h1 className='text-center text-info mt-5 pt-5'>Register Page</h1>
  {error.length>0?<div className='alert alert-danger'>{error}</div>:""}
  {errorList.map((err,index)=><div key={index} className='alert alert-danger'>{err.message}</div>)}
<form className='mt-5' onSubmit={submitData}>
<input type="text" className='form-control' placeholder='First Name'  name='first_name' id='first_name' onChange={getUserData}/>

<input type="text" className='form-control my-4' placeholder='Last Name' name='last_name' id='last_name' onChange={getUserData}/>

<input type="number" className='form-control' placeholder='Age' name='age' id='age' onChange={getUserData}  />

<input type="email" className='form-control my-4' placeholder='Email'  name='email' id='email' onChange={getUserData} />

<input type="Password" className='form-control' placeholder='Password' name='password' id='password' onChange={getUserData} />

<button className='btn btn-info mt-4' type='submit'>{isloading===true? <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>:'Register'}</button>
  </form>
</div>
  
  </>
}
