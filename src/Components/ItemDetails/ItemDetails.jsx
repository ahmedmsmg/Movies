import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export default function ItemDetails() {
  let {id,mediatype}= useParams();
  console.log(mediatype);
const [Details, setDetails] = useState({})
const [similar, setsimilar] = useState([])


async function dataDetails(movie_id,type){
let {data}=await axios.get(`https://api.themoviedb.org/3/${type}/${movie_id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
setDetails(data)

}


async function similarMoves(movie_id,type){
let {data}=await axios.get(`https://api.themoviedb.org/3/${type}/${movie_id}/similar?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&page=1`)
setsimilar(data)

}

useEffect(() => {
    dataDetails(id,mediatype)
    similarMoves(id,mediatype)

}, [])


  return <>
  <section className='mt-5'>
<div className="container">
    <div className="row">
        <div className="col-lg-4 position-relative">
        {Details.poster_path?<img src={'https://image.tmdb.org/t/p/w500' + Details.poster_path} className='w-100 mt-5 h-75 ' alt="" />:<img src={'https://image.tmdb.org/t/p/w500' + Details.profile_path} className='w-100' alt="" />}   
<h4 className='vot p-2 mt-5 me-3 text-center position-absolute top-0 end-0' >{Details.vote_average?.toFixed(1)}</h4>


        </div>
        <div className="col-lg-8 mt-5 ">
           
            <h2>{Details.title}{Details.name}</h2>

<a href={Details.homepage} className="btn vot my-5" target="_blank">Watch Now</a>

<p className='py-2 text-muted'>Vote: {Details.vote_average?.toFixed(1)}</p>
<p className='py-2 text-muted'>Vote Count: {Details.vote_count?.toFixed(1)}</p>
<p className='py-2 text-muted'>popularity: {Details.popularity?.toFixed(1)}</p>
<p className='py-2 text-muted'>{Details.overview}</p>






        </div>
    </div>
    
</div>


  </section>
  
  

  
  </>
}
