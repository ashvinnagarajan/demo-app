import React, { useState } from 'react';
import { Box, Textarea, VStack, Heading, HStack, Stack } from '@chakra-ui/react';
import { Skeleton } from "./components/ui/skeleton";
import { Button } from "./components/ui/button";
import PageActionBar from './components/PageActionBar';

const systemPrompt = { "role": "system", "content": "You are a helpful assistant." };

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const DialogPage = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchStreamedResponse = async () => {
    setIsLoading(true);
    
    const response = await fetch(`${API_BASE_URL}/api/dialog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [systemPrompt, { "role": "user", "content": query }] }),
    });

    if (!response.ok) {
      console.error('Failed to fetch data:', response.statusText);
      setIsLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let result = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }

    try {
      const jsonResponse = JSON.parse(result);  // Parse the JSON string
      setResponse(jsonResponse.response);       // Access the "response" field
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }

    setIsLoading(false);
  };

  return (
    <Box p={8}>
      <VStack spacing={4}>
        <Heading>Ask a Query</Heading>
        <Textarea
          placeholder="Enter your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              fetchStreamedResponse();
            }
          }}
        />
        <Button loading={isLoading} onClick={fetchStreamedResponse}>Send Query</Button>
      </VStack>

      <Box spacing={4}>
        {isLoading ? (
          <HStack gap={5} align="start">
            <Stack flex="1" spacing={3}>
              <Skeleton height="5" borderRadius="md" />
              <Skeleton height="5" width="80%" borderRadius="md" />
            </Stack>
          </HStack>
        ) : (
          <Textarea
            placeholder="Response..."
            value={response}
            minHeight="400px"
            resize="vertical"
          />
        )}
      </Box>
      <PageActionBar pageTitle="Dialog" />
    </Box>
  );
};

export default DialogPage;
