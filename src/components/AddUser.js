import React, { useState } from 'react';

const AddUser = () => {

    const [user, setUser] = useState({})

    const handleAddUser = (event) =>{
        event.preventDefault();
        console.log(user);
        console.log(user['name']);

        fetch('http://localhost:5000/users',{
            method:'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.acknowledged){
                alert('user added successfully');
                event.target.reset();
            }
        });
    }

    const handleInputBlur = event =>{
        const value= event.target.value;
        const fieldName = event.target.name;
        const newUser = {...user};
         newUser[fieldName] = value;
         setUser(newUser); 

    }

    return (
        <div>
            <h2>Please add users</h2>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInputBlur} type="text" name='name' placeholder='name' />
                <br />
                <input onBlur={handleInputBlur} type="text" name="address" id="" placeholder='address' />
                <br />
                <input onBlur={handleInputBlur} type="email" name="email" id="" placeholder='email' />
                <br />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;