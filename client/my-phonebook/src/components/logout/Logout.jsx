import React from 'react'
import './Logout.css'

const Logout = () => {

// useEffect(()=>{
 
// }, [])


const logout = () =>{
window.localStorage.removeItem("token");
window.location = "/";
}
  return (
    <>

    <button className='logout-button' onClick={logout}>Logout</button>
    </>
  )
}

export default Logout