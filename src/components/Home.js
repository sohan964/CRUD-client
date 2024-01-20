import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = user =>{
        const agree = window.confirm(`want to delete:${user.name}`)
        //console.log('deleting user with id ',user._id);
        console.log(agree);

        if(agree){
            console.log(user._id);
            
            
            fetch(`http://localhost:5000/users/${user._id}`,{
                method:'DELETE'
            })
            .then(res => res.json)
            .then(data => {
                alert('user deleted successfully');
                const remainingUsers = displayUsers.filter(usr => usr._id !== user._id);
                setDisplayUsers(remainingUsers);
            });
        }
    }
    return (
        <div>
            <h2>home:{displayUsers.length}</h2>
            {
                displayUsers.map(user => <h3
                key ={user._id}
                >{user.name} {user.email}
                <Link to={`/update/${user._id}`}>
                <button >Update</button> </Link>
                <button onClick={()=>handleDelete(user)}>X</button>
                
                </h3>)
            }
        </div>
    );
};

export default Home;