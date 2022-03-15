import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
    let [users, setUsers] = useState([])

    const getUsers = () => {
     axios
       .get('https://bookcast-server.herokuapp.com/api/users')
       .then(
         (response) => setUsers(response.data),
         (err) => console.error(err)
       )
       .catch((error) => console.error(error))
    }

    useEffect(() => {
     getUsers()
    }, [])

    return (
        <>
        <h1>BookCast</h1>
        <div className="users">
         {users.map((user) => {
           return (
             <div className="person" key={user.id}>
               <h4>Name: {user.username}</h4>
             </div>
           )
         })}
        </div>
        </>
    )
}
export default App;
