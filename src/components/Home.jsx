import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './Add'
import Edit from './Edit'

const Home = () => {
    const [books, setbooks] = useState([])

    const getBooks = (props) => {
     axios
       .get('http://localhost:3000/add')
       .then(
         (response) => setbooks(response.data),
         (err) => console.error(err)
       )
       .catch((error) => console.error(error))
    }

    const handleCreate = (addBook) => {
      axios
        .post('http://localhost:3000/add', addBook)
        .then((response) => {
          console.log(response)
          getBooks()
        })
    }


    const handleDelete = (event) => {
      axios
        .delete('http://localhost:3000/add' + event.target.value)
        .then((response) => {
          getBooks()
        })
    }

    const handleUpdate = (editBook) => {
  console.log(editBook)
  axios
    .put('http://localhost:3000/add' + editBook.id, editBook)
    .then((response) => {
      getBooks()
    })
}

    useEffect(() => {
     getBooks()
    }, [])

    return(
        <>
        <div className="people">
         {books.map((book) => {
           return (
             <div className="person" key={book.id}>
               <h4>Name: {book.book_name}</h4>
               <img src = {book.book_image_url}></img>
               <h5>Age: {book.description}</h5>
                 <Edit handleUpdate={handleUpdate} id={book.id} />
               <button onClick={handleDelete} value={book.id}>X</button>
             </div>
           )
         })}
        </div>
        </>
    )
}
export default Home;
