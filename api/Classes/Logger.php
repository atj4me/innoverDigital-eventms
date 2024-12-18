<?php

namespace Classes;

class Logger
{
    /**
     * @var string
     */
    private $logFile;

    /**
     * @var resource|null
     */
    private $fileHandle;

    public function __construct(string $logFile = 'error.log')
    {
        $this->logFile = $logFile;
    }

    /**
     * Log an error message
     *
     * @param string $message The error message
     * @param array $context Additional context data
     * @return bool
     */
    public function error(string $message, array $context = []): bool
    {
        return $this->log('ERROR', $message, $context);
    }

/**
     * Log an warning message
     *
     * @param string $message The error message
     * @param array $context Additional context data
     * @return bool
     */
    public function warning(string $message, array $context = []): bool
    {
        return $this->log('WARNING', $message, $context);
    }

    /**
     * Log an info message
     *
     * @param string $message The error message
     * @param array $context Additional context data
     * @return bool
     */
    public function info(string $message, array $context = []): bool
    {
        return $this->log('INFO', $message, $context);
    }

    /**
     * Log an debug message
     *
     * @param string $message The error message
     * @param array $context Additional context data
     * @return bool
     */
    public function debug(string $message, array $context = []): bool
    {
        return $this->log('INFO', $message, $context);
    }

    /**
     * Log a message with specified level
     *
     * @param string $level
     * @param string $message
     * @param array $context
     * @return bool
     */
    private function log(string $level, string $message, array $context = []): bool
    {
        $timestamp = date('Y-m-d H:i:s');
        $contextString = !empty($context) ? json_encode($context) : '';
        $logMessage = "[{$timestamp}] [{$level}] {$message} {$contextString}" . PHP_EOL;

        try {
            if (!$this->fileHandle) {
                $this->fileHandle = fopen($this->logFile, 'a');
            }

            if ($this->fileHandle) {
                fwrite($this->fileHandle, $logMessage);
                return true;
            }

            return false;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Close the file handle when the object is destroyed
     */
    public function __destruct()
    {
        if ($this->fileHandle) {
            fclose($this->fileHandle);
        }
    }
}
