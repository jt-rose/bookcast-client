import React, { useState } from 'react'

const Edit = (props) => {
  let emptyBook = { id: props.id, book_name: '', book_image_url: '', description:'', }
  const [book, setBook] = useState(emptyBook)

  const handleChange = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleUpdate(book)
  }


  return (
    <>
    <h2>Edit a book</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Book Name: </label>
          <input type="text" name="book_name" value={book.book_name} onChange={handleChange}/>
          <br />
          <br />
          <label htmlFor="age">Book Image: </label>
          <input type="text" name="book_image_url" value={book.book_image_url} onChange={handleChange}/>
          <br />
          <br />
          <label htmlFor="age">Description: </label>
          <input type="text" name="description" value={book.description} onChange={handleChange}/>
          <br/>
          <input type="submit"/>
        </form>
    </>
  )
}

export default Edit
