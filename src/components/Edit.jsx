import React, { useState } from 'react'

const Edit = (props) => {
  let emptyCasting = { id: props.id, created: '', creator: '', source_name: '', source_image_url: '', description: ''}
  const [casting, setCasting] = useState(emptyCasting)

  const handleChange = (event) => {
    setCasting({ ...casting, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleUpdate(casting)
  }


  return (
    <>
      <details>
        <summary>Edit</summary>
        <form onSubmit={handleSubmit}>
          <label htmlFor="source_name">Film: </label>
          <input
            type="text"
            name="source_name"
            value={casting.source_name}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="source_image_url">Image: </label>
          <input
            type="text"
            name="source_image_url"
            value={casting.source_image_url}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="age">description: </label>
          <input
            type="text"
            name="description"
            value={casting.description}
            onChange={handleChange}
          />
          <input type="submit" />
        </form>
      </details>
    </>
  )
}

export default Edit
