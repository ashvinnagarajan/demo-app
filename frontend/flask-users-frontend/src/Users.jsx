import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Input, Button, HStack, List, ListItem, IconButton, Text, Container } from '@chakra-ui/react';
import axios from 'axios';

const apiUrl = 'https://zz2vxt1eck.execute-api.us-east-2.amazonaws.com/dev/users';

function Users() {
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
        if (!userId || !userName || !userEmail) {
            alert('Please fill all fields');
            return;
        }
        try {
            await axios.post(apiUrl, {
                id: parseInt(userId),
                name: userName,
                email: userEmail
            });
            getUsers();
            setUserId('');
            setUserName('');
            setUserEmail('');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Delete a user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            getUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Container maxW="container.md" py={10}>
            <Heading textAlign="center" mb={8}>User Management</Heading>

            {/* Form Section */}
            <VStack spacing={4} mb={8} align="stretch">
                <Input 
                    placeholder="User ID"
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <Input 
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Input 
                    placeholder="User Email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button colorScheme="blue" onClick={addUser} width="full">
                    Add User
                </Button>
            </VStack>

            {/* Users List Section */}
            <Heading size="md">Users List</Heading>
            <List.Root>
                {users.map((user) => (
                    <List.Item key={user.id} border="1px" borderColor="gray.200" borderRadius="md" p={4}>
                        <HStack justify="space-between">
                            <Box>
                                <Text fontWeight="bold">{user.name}</Text>
                                <Text fontSize="sm" color="gray.600">{user.email}</Text>
                            </Box>
                        </HStack>
                    </List.Item>
                ))}
            </List.Root>
        </Container>
    );
}

export default Users;
