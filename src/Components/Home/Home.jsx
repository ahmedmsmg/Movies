import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  let[movies,setmovies]=useState([]);
  let[tv,settv]=useState([]);
  let[person,setperson]=useState([]);

  async function getDataFromUser(movie ,fun){
    let {data}= await axios.get(`https://api.themoviedb.org/3/trending/${movie}/week?api_key=f1aca93e54807386df3f6972a5c33b50`);
    fun(data.results);
    }
    useEffect(()=>{
      getDataFromUser('movie',setmovies)
      getDataFromUser('tv',settv)
      getDataFromUser('person',setperson)
    },[])

  return <>
 <div  className="container mt-5">
  
    <div className="row g-3 p-5">
    <div className='col-lg-4'>
    <hr className='w-25'/>
   <h2>Trending<br/>movie<br/>to watch Now</h2>
   <p>most watches movies by days</p>
   <hr/>
  </div>
   
    {movies.slice(0,10).map((movies,index)=>
    
      <div key={index} className="col-lg-2">
        <Link className='links' to={`/details/${movies.id}/${movies.media_type}`}>
<div className="item position-relative">
<img src={'https://image.tmdb.org/t/p/w500' + movies.poster_path} className='w-100' alt="" />
<p >{movies.title}</p>
<div className='vot p-2 text-center position-absolute top-0 end-0' >{movies.vote_average.toFixed(1)}</div>
</div></Link >
      </div>)}
  
      <div className='col-lg-4'>
    <hr className='w-25'/>
   <h2>Trending<br/>tv<br/>to watch Now</h2>
   <p>most watches tv by days</p>
   <hr/>
  </div>
    {tv.slice(0,10).map((movies,index)=>
      <div key={index} className="col-lg-2">
        <Link className='links' to={`/details/${movies.id}/${movies.media_type}`}>
<div className="item position-relative">
<img src={'https://image.tmdb.org/t/p/w500' + movies.poster_path} className='w-100' alt="" />
<p >{movies.name}</p>
<div className='vot p-2 text-center position-absolute top-0 end-0' >{movies.vote_average.toFixed(1)}</div>

</div>
</Link>
      </div>)}
      {/* person */}
      <div className='col-lg-4'>
    <hr className='w-25'/>
   <h2>Trending<br/>Person<br/>to watch Now</h2>
   <p>most watches Person by days</p>
   <hr/>
  </div>
    {person.slice(0,10).map((movies,index)=>
    
      <div key={index} className="col-lg-2">
<Link className='links' to={`/details/${movies.id}/${movies.media_type}`}>
<div className="item position-relative">

{ movies.profile_path?<img src={'https://image.tmdb.org/t/p/w500' + movies.profile_path} className='w-100' alt="" />:<img src="images.png" className='w-100 noImg'  alt="" />}
<p >{movies.name}</p>
</div>
</Link>
      </div>)}
      </div>
      </div> 
  </>
}
