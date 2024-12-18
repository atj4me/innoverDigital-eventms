#! /bin/bash

# Build the PHP Development Server
php -S localhost:8000 -t api

# Go to the App Folder
cd app

# Install All required packages
npm install

# Start the app
npm start