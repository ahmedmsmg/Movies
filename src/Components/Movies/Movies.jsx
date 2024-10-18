import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Movies() {
    let[movies,setmovies]=useState([]);
   
    async function getDataFromUser(){
      let {data}= await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=f1aca93e54807386df3f6972a5c33b50`);
      setmovies(data.results);
      }
      useEffect(()=>{
        getDataFromUser()
      },[])

  return <>
   {movies.length>0?<div className="container">
    <div className="row mt-5">

    {movies.map((movies,index)=>
    
    <div key={index} className="col-lg-3 mt-5">
      <Link className='links' to={`/details/${movies.id}/${movies.media_type}`}>
<div className="item position-relative">
<img src={'https://image.tmdb.org/t/p/w500' + movies.poster_path} className='w-100' alt="" />
<p >{movies.title}</p>
<div className='vot p-2 text-center position-absolute top-0 end-0' >{movies.vote_average.toFixed(1)}</div>
</div></Link >
    </div>)}
    </div>
    
    
    </div>:<div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
  <div class="lds-hourglass"></div>
    </div>}
  
  </>
}
