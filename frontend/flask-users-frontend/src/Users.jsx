import React, { useState, useEffect } from 'react';
import { Heading, VStack, Input, HStack, Flex, Container } from '@chakra-ui/react';
import axios from 'axios';
import { Button } from "./components/ui/button"
import {
    RadioCardItem,
    RadioCardLabel,
    RadioCardRoot,
  } from "./components/ui/radio-card"
import { Toaster, toaster } from "./components/ui/toaster"
import PageActionBar from './components/PageActionBar'

const apiUrl = 'https://zz2vxt1eck.execute-api.us-east-2.amazonaws.com/dev/users';

function Users() {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch all users
    const getUsers = async () => {
        try {
            const response = await axios.get(apiUrl);
            setUsers(response.data);
        } catch (error) {
            const errorMsg = `Error fetching users: ${error}`;
            console.error(errorMsg);
            toaster.create({
                description: errorMsg,
                type: "error",
            })
        }
    };

    // Add a new user
    const addUser = async () => {
        if (!userName || !userEmail) {
            toaster.create({
                description: 'Please fill all fields',
                type: "error",
            })
            return;
        }
        try {
            await axios.post(apiUrl, {
                name: userName,
                email: userEmail
            });
            getUsers();
            setUserName('');
            setUserEmail('');
            toaster.create({
                description: `Added user ${userName}`,
                type: "success",
            })
        } catch (error) {
            const errorMsg = `Error adding user: ${error}`
            console.error(errorMsg);
            toaster.create({
                description: errorMsg,
                type: "error",
            })
        }
    };

    // Delete a user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            getUsers();
            toaster.create({
                description: `Deleted user ${id}`,
                type: "info",
            })
        } catch (error) {
            const errorMsg = `Error deleting user: ${error}`
            console.error(errorMsg);
            toaster.create({
                description: errorMsg,
                type: "error",
            })
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
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Input 
                    placeholder="Say something interesting"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button colorScheme="blue" onClick={addUser} width="full">
                    Add User
                </Button>
            </VStack>

            {/* Users List Section */}
            <RadioCardRoot defaultValue="next">
                <Flex justify="space-between">
                    <RadioCardLabel textStyle="sm" fontWeight="medium">
                        Users List
                    </RadioCardLabel>
                    <Button
                        size="md"
                        mt="4"
                        colorPalette='red'
                        loading={isLoading}
                        onClick={async () =>  {
                            setIsLoading(true);
                            const selectedUser = document.querySelector('input[type="radio"]:checked');
                            if (selectedUser) {
                                await deleteUser(selectedUser.value);
                            } else {
                                toaster.create({
                                    description: "Please select a user to delete",
                                    type: "error",
                                });
                            }
                            setIsLoading(false);
                        }}>
                        Delete User
                    </Button>
                </Flex>
                <HStack align="stretch">
                <Flex gap="2" justify="space-between" wrap="wrap">
                    {users.map((user) => (
                    <RadioCardItem
                        label={user.name}
                        description={user.email}
                        key={user.id}
                        value={user.id}
                    />
                    ))}
                </Flex>
                </HStack>
            </RadioCardRoot>
            <Toaster />
            <PageActionBar pageTitle="Users"/>
        </Container>
    );
}

export default Users;
