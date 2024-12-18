import { Box, Code, Flex, Heading, Separator, Skeleton, Text, VStack } from '@chakra-ui/react';
import { NavigationButton } from 'components/ui/NavigationButton';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from 'services/eventService';
import { formatDate } from '../services/dateService'; // Assuming you have a date formatting function

export const EventsDetails = () => {
    const { id } = useParams(); // Access the dynamic ID from the URL
    const [event, setEvent] = useState(null); // State to hold event details
    const [isLoading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Get request
                const data = await getEvent(id);
                setEvent(data.item); // Set the event data
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchEvent();
    }, [id]);

    return (
        <Flex
            p={5}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            width="50%"
            margin="0 auto"
            justifyContent="center"
            flexDirection="column"
            alignItems="Center" >
            <Heading size="3xl" color="teal.500" textAlign="center" paddingY={10}>
                Event Details
            </Heading>
            <Box p={5} width="100%">
                <VStack gap={4} align="start" >
                    <Skeleton loading={isLoading} width="80%">
                        <Heading size="lg">{event?.title || 'Loading...'}</Heading>
                    </Skeleton>
                    <Skeleton loading={isLoading} width="80%">
                        <Text fontSize="md" color="gray.600">{event?.description || 'Loading description...'}</Text>
                    </Skeleton>
                    <Skeleton loading={isLoading} width="80%">
                        <Text fontSize="sm" color="gray.600">Event ID:
                            <Code fontSize="sm" color="gray.600">{event?.id || 'Loading event id...'}</Code>
                        </Text>
                    </Skeleton>
                    <Separator />
                    <Skeleton loading={isLoading} width="50%">
                        <Text fontWeight="bold">Start Date: {isLoading ? 'Loading...' : formatDate(event?.startDate)}</Text>
                    </Skeleton>
                    <Skeleton loading={isLoading} width="50%">
                        <Text fontWeight="bold">End Date: {isLoading ? 'Loading...' : formatDate(event?.endDate)}</Text>
                    </Skeleton>
                    <Separator />
                    <Skeleton loading={isLoading} width="30%">
                        <NavigationButton
                            colorScheme="teal"
                            buttonText="Back to Events"
                            path="/events"
                            showIcon="left"
                            loading={isLoading}>
                        </NavigationButton>
                    </Skeleton>
                </VStack>
            </Box>
        </Flex>
    );
};