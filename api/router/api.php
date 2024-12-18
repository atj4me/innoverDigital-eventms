<?php 

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *"); // Adjust as necessary for security
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit(0); // End the script to prevent further processing
}

// Initialize router
$router = new Classes\Router();

// Define routes
$router->get('/', function() {
    echo "Welcome to homepage";
});

$router->get('/events', [Classes\Events::class, "getEvents"]);
$router->get('/event/{id}', [Classes\Events::class, "getEvent"]);
$router->post('/event', [Classes\Events::class, "addEvent"]);


// Handle 404
$router->setNotFound(function() {
    http_response_code(404);
    echo "404 - Page not found";
});

// Get the current request path
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Match and execute the route
$router->match($requestPath);
