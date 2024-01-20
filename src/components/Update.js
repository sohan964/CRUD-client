import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser)

    const handleUpdateUser = (event) =>{
        event.preventDefault();
        // console.log(user);
        // console.log(user['name']);
        fetch(`http://localhost:5000/users/${storedUser._id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('user Updated done');
                console.log(data)
                
            }
        })
        
    }

    const handleInputChange = event =>{
        const value= event.target.value;
        const fieldName = event.target.name;
        const newUser = {...user};
         newUser[fieldName] = value;
         setUser(newUser); 

    }
    
    return (
        <div>
            <h2>update:{storedUser.name}</h2>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} defaultValue={storedUser.name} type="text" name='name' placeholder='name' />
                <br />
                <input onChange={handleInputChange} defaultValue={storedUser.address} type="text" name="address" id="" placeholder='address' />
                <br />
                <input onChange={handleInputChange} defaultValue={storedUser.email} type="email" name="email" id="" placeholder='email' />
                <br />
                <button type="submit">update</button>
            </form>
        </div>
    );
};

export default Update;