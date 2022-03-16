import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Redirect,
  BrowserRouter,
  Routes,
  Route,
  Link,
  Switch,
  useParams
} from "react-router-dom" ;
import Add from './components/Add'
import Edit from './components/Edit'
import Home from './components/Home'

const App = () => {
    let [books, setBooks] = useState([])

    const getBooks = () => {
     axios
       .get('https://openlibrary.org/search.json?q=subjects')
       .then(
         (response) => setBooks(response.data.docs),
         (err) => console.error(err)
       )
       .catch((error) => console.error(error))
    }


    useEffect(() => {
     getBooks()
    }, [])

    return (
        <>
        <h1>BookCast</h1>
        <div className = "nav">
        <Link to="/home">Home</Link>
        <Link to="/add">Add</Link>
        <Link to="/edit">Edit</Link>

        </div>

         <Routes>
         <Route path="/home" element={<Home />}/>
         <Route path="/add" element={<Add />}/>
         <Route path="/edit" element={<Edit />}/>
         </Routes>
        </>
    )
}
export default App;
