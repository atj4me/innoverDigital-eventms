import { Box, Code, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaCalendarAlt, FaEye, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export const Home = () => {
    return (
        <Stack gap={8} align="center" py={10}>
            <Heading size="3xl" color="teal.500" textAlign="center">
                Civic Plus Interview Assessment
            </Heading>
            <Text fontSize="xl" textAlign="center" maxW="800px">
                A front-end built on ReactJs for Event Management by consuming the API at 
                <Code>{`https://interview.civicplus.com/f6963d59-ba7a-4080-a19c-3938a222b981`}</Code>
            </Text>

            <VStack gap={6} align="stretch" maxW="800px" w="100%">
                <Link 
                 to="/events">
                <Feature
                    icon={FaCalendarAlt}
                    title="View All Events"
                    description="Access a comprehensive list of all your events in one place. Stay organized and never miss an important date."
                />
                </Link>
                <Link 
                 to="/events/add">
                <Feature
                    icon={FaPlus}
                    title="Add New Events"
                    description="Easily create and add new events to your calendar. Include all the important details like title, description, start date, and end date."
                />
                </Link>
                <Feature
                    icon={FaEye}
                    title="Event Details at a Glance"
                    description="View detailed information about each event with just a click. Access event specifics quickly and conveniently."
                />
            </VStack>
        </Stack>
    );
}

const Feature = ({ icon: IconComponent, title, description }) => {
    return (
        <Box 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="md"
            _hover={{ bg: "teal.50", borderColor: "teal.300" }}
        >
            <Flex align="center">
                <IconComponent size="2em" color="teal.500" />
                <Heading size="md" ml={3}>{title}</Heading>
            </Flex>
            <Text mt={2}>{description}</Text>
        </Box>
    );
};

// Add prop types validation
Feature.propTypes = {
    icon: PropTypes.elementType.isRequired, // Validate that icon is a React component
    title: PropTypes.string.isRequired,      // Validate that title is a string
    description: PropTypes.string.isRequired  // Validate that description is a string
};

