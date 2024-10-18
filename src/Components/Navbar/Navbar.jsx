import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData , logout}) {
  return <>
 <nav className="navbar navbar-expand-lg navbar-dark  shadow-lg fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand  " href="#">Noxe</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/movies">movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tv">tvshow</Link>
        </li>  
      </ul> :""}
      <form className="d-flex ms-auto ">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <i className="fa-brands fa-facebook mt-2"></i>
      <i className="fa-brands fa-twitter  mt-2"></i>
      <i className="fa-brands fa-instagram  mt-2"></i>
      <i className="fa-brands fa-linkedin  mt-2"></i>
       {userData? <Link className='links mx-2' to="/login" onClick={logout}>Logout</Link>:<><Link to="/login"className='links mx-3'>Login</Link>
       <Link to="/"className='links mx-3'>Register</Link> </>
       }
     
      </form>
      
      {userData? <p className='mx-2'>Welcome {userData.first_name}</p>:""}
    </div>
  </div>
</nav>
  
  </>
}
