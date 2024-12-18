<?php
/**
 * Main Application File
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Use autoloading instead of multiple includes
spl_autoload_register(function ($class) {
    $class = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    require_once __DIR__ . DIRECTORY_SEPARATOR . $class . '.php';
});

// Cache environment variables to avoid repeated file reads
if (!isset($GLOBALS['env_cache'])) {
    // Check if .env file exists
    if (!file_exists('.env')) {
        throw new RuntimeException('.env file is missing');
    }

    // Parse with error handling
    $env = parse_ini_file('.env', false, INI_SCANNER_RAW);
    if ($env === false) {
        throw new RuntimeException('Failed to parse .env file');
    }

    // Set environment variables once
    foreach ($env as $key => $value) {
        putenv("$key=$value");
    }

    // Cache the parsed environment
    $GLOBALS['env_cache'] = $env;
}

// Include the Router Configuration
include_once 'router/api.php';