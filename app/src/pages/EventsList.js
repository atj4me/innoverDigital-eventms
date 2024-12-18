import { Box, Heading, Table } from "@chakra-ui/react"
import TableSkeleton from "components/skelton/TableSkelton"
import { NavigationButton } from "components/ui/NavigationButton"
import React, { useEffect, useState } from "react"
import { formatDate } from "../services/dateService"
import { getEvents } from "../services/eventService"

export const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Define an async function to fetch events
        const fetchEvents = async () => {
            try {
                const response = await getEvents({ top: 0, skip: 0, orderBy: 'startDate' });
                if (response && response.success === true) {
                    setEvents(response.items); // Update state with the items
                }
            } catch (error) {
                console.error('Error fetching events:', error); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchEvents(); // Call the async function
    }, []); // Empty dependency array means this runs once on mount

    return (
        <Box bg="white" borderRadius="md" boxShadow="lg" height="100vh">
            <Heading size="3xl" color="teal.500" textAlign="center" paddingY={10}>
                All Events
            </Heading>
            <Box textAlign="right" paddingX={10} paddingBottom={10}>
                <NavigationButton
                    colorScheme="teal"
                    buttonText="Add new Event"
                    path="/events/add"
                    showIcon="calendarLeft"
                    loading={loading}>
                </NavigationButton>
            </Box>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Sl. No.</Table.ColumnHeader>
                        <Table.ColumnHeader>Title</Table.ColumnHeader>
                        <Table.ColumnHeader>Description</Table.ColumnHeader>
                        <Table.ColumnHeader>Start Date</Table.ColumnHeader>
                        <Table.ColumnHeader>End Date</Table.ColumnHeader>
                        <Table.ColumnHeader>View</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                {loading && TableSkeleton(6, 10)}
                {!loading && events.length === 0 &&
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan={6} textAlign="center">No events found.</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                }
                {!loading && events.length > 0 &&
                    <Table.Body>
                        {events.map((item, index) => {
                            return (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell>{item.title}</Table.Cell>
                                    <Table.Cell>{item.description}</Table.Cell>
                                    <Table.Cell>{formatDate(item.startDate)}</Table.Cell>
                                    <Table.Cell>{formatDate(item.endDate)}</Table.Cell>
                                    <Table.Cell>
                                        <NavigationButton
                                            path={`/event/${item.id}`}
                                            buttonText="View Details"
                                            colorScheme="gray"
                                            showIcon="right"
                                            loading={loading}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                }
            </Table.Root>
        </Box>
    )
}