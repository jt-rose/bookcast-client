import React, { useState, useEffect } from 'react'
// import "../styles/home.css"
import "../styles/jihee.css"
const Add = (props) => {
  let emptyCasting = {created: '', creator: '', source_name: '', source_image_url: '', description: '' }
  const [casting, setCasting] = useState(emptyCasting)


  const handleChange = (event) => {
    setCasting({ ...casting, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(casting)
  }

  return (
    <>
    <div className = "addDiv">
      
    <form className='addForm' onSubmit={handleSubmit}>

     <label htmlFor="source_name"></label>
     <input className="forms" type="text" name="source_name" placeholder="Film"
      value={casting.source_name} onChange={handleChange} />
     
     <label htmlFor="source_image_url"></label>
     <input className="forms" type="text" name="source_image_url" placeholder="Image_url" value={casting.source_image_url} onChange={handleChange} />
     
     <label htmlFor="description"></label>
     <input className="forms" type="text" name="description" placeholder="Description" value={casting.description} onChange={handleChange} />
   
     <button className="btn" type="submit" >submit</button>
    </form>
    </div>
    </>
  )
}

export default Add
