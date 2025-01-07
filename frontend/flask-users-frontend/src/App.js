import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'https://zz2vxt1eck.execute-api.us-east-2.amazonaws.com/dev/users';

function App() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Fetch all users
    const getUsers = async () => {
        try {
            const response = await axios.get(apiUrl);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Add a new user
    const addUser = async () => {
        try {
            await axios.post(apiUrl, {
                id: parseInt(userId),
                name: userName,
                email: userEmail
            });
            alert('User added successfully!');
            getUsers();
            setUserId('');
            setUserName('');
            setUserEmail('');
        } catch (error) {
            alert('Error adding user');
            console.error(error);
        }
    };

    // Delete a user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            alert('User deleted successfully!');
            getUsers();
        } catch (error) {
            alert('Error deleting user');
            console.error(error);
        }
    };

    // Fetch users on page load
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="App">
            <h1>Flask Users Management App (React)</h1>
            
            {/* Create User Form */}
            <div>
                <input 
                    type="number" 
                    placeholder="User ID" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="User Name" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                />
                <input 
                    type="email" 
                    placeholder="User Email" 
                    value={userEmail} 
                    onChange={(e) => setUserEmail(e.target.value)} 
                />
                <button onClick={addUser}>Add User</button>
            </div>

            {/* List of Users */}
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
