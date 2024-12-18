<?php 

namespace Classes;

/**
 * A Custom implementation of Basic Router
 */
class Router {

    /**
     * The Routes Array
     * @var array
     */
    private $routes = [];

    /**
     * Callback for Route Not Found
     * @var 
     */
    private $notFoundCallback;

    /**
     * Method to add a new route to the routes array
     * @param mixed $method
     * @param mixed $path
     * @param mixed $callback
     * @return void
     */
    public function add($method, $path, $callback) {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'callback' => $callback
        ];
    }

    /**
     * Method to add a new 'GET' request to the routing array
     * @param mixed $path
     * @param mixed $callback
     * @return void
     */
    public function get($path, $callback) {
        $this->add('GET', $path, $callback);
    }

    /**
     * Method to add a new 'POST' request to the routing array
     * @param mixed $path
     * @param mixed $callback
     * @return void
     */
    public function post($path, $callback) {
        $this->add('POST', $path, $callback);
    }

    /**
     * Method to execute the callback of a route
     * @param mixed $callback
     * @param mixed $params
     * @return mixed
     */
    private function executeCallback($callback, $params = []) {

        // Check if the $callback is an array
        if (is_array($callback)) {
            // Create an instance of the class first
            $class = new $callback[0]();
            $method = $callback[1];

            // Return the method defined in the route with the passed params
            return call_user_func_array([$class, $method], $params);
        }
        // If callback is closure/function ( Static Function )
        return call_user_func_array($callback, $params);
    }

    /**
     * To Extract the route from the url and match it with the routes array
     * @param mixed $path
     * @return mixed
     */
    public function match($path) {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        
        foreach ($this->routes as $route) {
            $pattern = "#^" . preg_replace('/\{([a-zA-Z0-9_]+)\}/', '([^/]+)', $route['path']) . "$#";
            
            if (preg_match($pattern, $path, $matches) && $route['method'] === $requestMethod) {
                array_shift($matches); // Remove the first match
                return $this->executeCallback($route['callback'], $matches);
            }
        }

        if ($this->notFoundCallback) {
            return $this->executeCallback($this->notFoundCallback);
        }
        
        http_response_code(404);
        echo "404 Not Found";
    }

    public function setNotFound($callback) {
        $this->notFoundCallback = $callback;
    }
}
