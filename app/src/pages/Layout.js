import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";

export const Layout = () => { 

  return (
    <Box minH="100vh" bg="white">
      {/* Navigation */}
      <Box borderBottom="1px" borderColor="gray.200" bg="gray.600" fontWeight={500} color="white">
        <Container maxW="container.xl" py={4}>
          <Flex as="nav" gap={6}>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/events">Events</RouterLink>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <Outlet />
      </Container>

    </Box>
  );
}
