<?php

namespace Classes;

use Classes\Request;

class Events
{

    /**
     * The Request instance.
     *
     * @var Request
     */
    protected $request;

    protected $path;

    public function __construct()
    {
        $this->request = new Request();
        $this->path = 'events';

        // Set the Content-Type header for JSON response
        header('Content-Type: application/json');

    }

    public function getEvents()
    {

        $events = $this->request->get($this->path);
        // Check if events were added successfully
        if ($events) {
            http_response_code(201); // Created
            $eventData = json_decode($events, false);
            echo json_encode([
                'success' => true,
                'total' => $eventData->total,
                'items' => $eventData->items,
            ]);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode([
                'error' => 'Internal Server Error',
                'message' => 'Failed to add event'
            ]);
        }
    }

    public function addEvent()
    {
        // Get the raw POST data
        $request = json_decode(file_get_contents('php://input'), true);
        $data = isset($request['data']) ? $request['data'] : [];


        // Check if data is provided
        if (count($data) > 0) {
            // Assuming this method adds the event and returns a response
            $events = $this->request->post($this->path, $data);

            // Check if events were added successfully
            if ($events) {
                http_response_code(201); // Created
                echo json_encode([
                    'success' => true,
                    'message' => 'Event added successfully',
                    'data' => $events // Return the added event data if needed
                ]);
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode([
                    'error' => 'Internal Server Error',
                    'message' => 'Failed to add event'
                ]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode([
                'error' => 'Bad Request',
                'message' => 'No data provided'
            ]);
        }

        exit;
    }

    public function getEvent($id)
    {
        // Fetch the event by ID from your data source
        $event = $this->request->get($this->path . '/' . $id); // Adjust this line based on your API structure

        if ($event) {
            http_response_code(200); // OK
            $eventData = json_decode($event, false);
            echo json_encode([
                'success' => true,
                'item' => $eventData // Return specific event data
            ]);
        } else {
            http_response_code(404); // Not Found
            echo json_encode([
                'error' => 'Not Found',
                'message' => 'Event not found'
            ]);
        }
    }


}