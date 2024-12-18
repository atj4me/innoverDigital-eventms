<?php

namespace Classes;

use Classes\Logger;
class Request
{

    /**
     * The request uri
     * @var string
     */
    protected $uri;

    /**
     * The request headers
     * @var array
     */
    protected $headers;

    /**
     * The API URL
     * @var string
     */
    protected $api_url = '';

    /**
     * The prefix for the API Request
     */
    protected $prefix = '';

    /**
     * The Client ID for the API Request
     */
    protected $client_id = '';

    /** 
     * The Client Secret for the API Request
     */
    protected $client_secret = '';

    /**
     * The Bearer Token for the API Request
     */
    protected $bearer_token = '';

    /**
     * The Logger Instance
     */
    protected $logger;

    /**
     * The Request Constructor
     */
    function __construct()
    {   
        $this->prefix = getenv('API_PREFIX');
        $this->client_id = getenv('API_CLIENT_ID');
        $this->client_secret = getenv('API_CLIENT_SECRET');
        $this->api_url = trim(getenv('API_URL'), "/");
        $this->uri = "{$this->api_url}/{$this->prefix}/api";

        // API Headers
        $this->headers = [
            'Content-Type' => 'application/json',
        ];

        // If the token is not available, we would create one
        if (!$this->bearer_token) {
            $this->getToken();
        }

        $this->logger = new Logger();
    }

    /**
     * Function to get the token from the API
     * @return void
     */
    private function getToken()
    {
        /**
         * Send a POST request to the API to get the token
         * @var mixed $response
         */
        $response = $this->send("POST", 'auth', [
            "clientId" => $this->client_id,
            "clientSecret" => $this->client_secret
        ]);

        $response = json_decode($response);
        if ($response->access_token) {
            $this->setToken($response->access_token);
        }
    }

    /**
     * Function to Set Bearer Token in the Header
     * @param mixed $token
     * @return void
     */
    private function setToken($token)
    {
        $this->bearer_token = $token;
        $this->headers['Authorization'] = "Bearer {$token}";
    }

    /**
     * 
     * Function to Send a Request to the API
     * @param mixed $request_type
     * @param mixed $endpoint
     * @param mixed $data
     * @throws \Exception
     * @return bool|string
     */
    private function send($request_type, $endpoint, $data)
    {
        try {
            $url = "{$this->uri}/{$endpoint}";
            $curl = curl_init();

            if ($curl === false) {
                throw new \Exception("Failed to initialize CURL");
            }

            // Convert headers array to the correct format
            $formatted_headers = [];
            foreach ($this->headers as $key => $value) {
                $formatted_headers[] = "$key: $value";
            }

            $options = [
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => $request_type,
                CURLOPT_HTTPHEADER => $formatted_headers
            ];

            if ($request_type === 'POST') {
                $options[CURLOPT_POSTFIELDS] = json_encode($data);
            } elseif ($request_type === 'GET') {
                $options[CURLOPT_URL] = $url . '?' . http_build_query($data);
            }

            if (!curl_setopt_array($curl, $options)) {
                throw new \Exception("Error setting CURL options: " . curl_error($curl));
            }

            $response = curl_exec($curl);

            if ($response === false) {
                $error = curl_error($curl);
                curl_close($curl);
                throw new \Exception("CURL Error: $error");
            }

            curl_close($curl);
            return $response;

        } catch (\Exception $e) {
            $this->logger->log($e->getMessage(), 'error');
            return false;
        }
    }

    public function get($endpoint, $data = [])
    {
        return $this->send('GET', $endpoint, $data);
    }

    public function post($endpoint, $data = [])
    {
        return $this->send('POST', $endpoint, $data);
    }

}
