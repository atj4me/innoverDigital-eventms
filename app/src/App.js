import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Layout, EventsList, Home, EventsForm, EventsDetails } from './pages';
import './App.css';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          {/* Main Layoute */}
          <Route path="/" element={<Layout />}>
            {/* Main Routes */}
            <Route index element={<Home />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/events/add" element={<EventsForm />} />
            <Route path="/event/:id" element={<EventsDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;