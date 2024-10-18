import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "jquery/dist/jquery.min.js"
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import "./index.css"

import jwt_decode from "jwt-decode";
import Notfound from './Components/Notfound/Notfound'
import Protectedrouts from './Components/Protectedrouts/Protectedrouts'
import ItemDetails from './Components/ItemDetails/ItemDetails'
import Tv from './Components/Tv/Tv'
import Movies from './Components/Movies/Movies'
import { Offline, Online } from "react-detect-offline";


export default function App() {
  useEffect(()=>{
    if(localStorage.getItem('token')!==null){
      saveUserData()
    }
  },[])
  const [userData, setuserdata] = useState(null)

function saveUserData(){
  let encode= localStorage.getItem('token');
  let decode =jwt_decode(encode)
  // console.log(decode);
  setuserdata(decode);

}

function logout(){
  localStorage.removeItem('token');
  setuserdata(null);
  // <Navigate  to="/login"/>

}

let routers = createBrowserRouter([
{path:"/",element:<Layout userData={userData}  logout={logout}/> ,errorElement:<Notfound/>, children:[
  {index:true,element:<Register/>},
  {path:"login",element:<Login saveUserData={saveUserData}/>},
  {path:"home",element:<Protectedrouts userData={userData} saveUserData={saveUserData}><Home/></Protectedrouts>},
  {path:"details/:id/:mediatype",element:<Protectedrouts userData={userData} saveUserData={saveUserData}><ItemDetails/></Protectedrouts>},
  {path:"tv",element:<Protectedrouts userData={userData} saveUserData={saveUserData}><Tv/></Protectedrouts>},
  {path:"movies",element:<Protectedrouts userData={userData} saveUserData={saveUserData}><Movies/></Protectedrouts>},
] },


])

  return <>
  
  
  <div className='bg-danger'> 
    {/* <Online >Only shown when you're online </Online> */}
    <Offline><div className='offline'>You are Offline</div></Offline>
  </div>
  <RouterProvider router={routers}/>

  
  </>
}
