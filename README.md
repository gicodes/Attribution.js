# Documentation for Attribution.Js

## Project Overview

Attribution.js is an Express-based API designed to track and manage advertisements and sales events for e-commerce products.

Advertisers commonly want to measure how many users see x Ad and then go on to click and purchase x product (conversion). Some program or application measure conversion using third-party tracking cookies, and this can be bad for user privacy (visit `https://developer.mozilla.org/en-US/docs/Web/API/Attribution_Reporting_API` to learn more about Attribution Reporting). 

This project aims to provision a reliable backend service for tracking user interactions and marketing campaign effectiveness in a way that protects user privacy.

Attribution.js connects to a MongoDB server to store and retrieve event data efficiently.

## Table Of Contents
1.  Installation
2.  Configuration
3.  Running the Application
4.  API Endpoints
5.  Client-API Connection
6.  Testing the Application
7.  Deployment
8.  Contributing
9.  License

## (1) Installation

-- Prerequisites

- Node.js: Ensure that you have Node.js installed on your system. You can download it from `nodejs.org`.

- MongoDB: You will need access to a MongoDB database. You can use a local installation or cloud-based service like `cloud.mongodb.com` to run a MongoDB driver.

-- Steps

### 1.1.  Clone the Repository
    Clone the project repository from Github:

   `git clone https//github.com/gicodes/attributionJs.git`
   `cd attribution.js`

### 1.2.  Install Dependencies
    Install the required Node.js package using `npm`

   `npm install`


## (2) Configuration

### 2.1.    Environment Variables
    Create a `.env` file in the root directory of your project and configure the following environment variables:
    
        MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
        PORT=5000
    
#### 2.2.    Database Connection
    Update `attr.db.connect.js` to ensure it uses the connection string provided in your environment variables:
   `const uri = process.env.MONGO_URI || "Your-Valid-Connection-String";`


## (3) Running The Application

### 3.1.    Start the Server
    To start the server, run:
    npm run dev 

    This will launch or run the serve on the specified `port 5001`.
    If you are familiar with nodemon you can skip this explanation.
    
    The use of nodemon to start this application is responsible for automatically restarting the server whenever changes are made to a file. This means you don't manually stop and restart your server everytime you update your files. 
    Configuring nodemon can change how these files are watched or ignored.

### 3.2.    Access an API Endpoint
    Once the server is running, you can access the API at `http:localhost:5001/api/test`.
    To ensure the API connection works, you should see "This API connection works perfectly-- Thank you!" when you visit the url above on any browser on your machine.
    

## (4) API Endpoints 
### GET
    Endpoint '/events' retrieves a list of events, with optional query parameters to filter the results based on user ID, campaign ID, or event type.

### POST     
    Endpoint '/events' This endpoint is used to create a new event, such as tracking a user action related to a product or advertisement.

### PUT
    Endpoint '/events' updates an existing event specified by its ID, allowing modifications to the event's metadata or type.

### DELETE
    Endpoint '/events' deletes a specific event by its ID.


## (5) Client-API Connection

This section describes how client applications, such as `afrofashion.site` can interact with the Attribution.js API to send and receive data.

### 5.1. Setting Up the Client
    To connect a client application to the Attribution.js API, ensure the following steps are followed:

1.  Base URL Configuration
    Define the base URL of the API in your client application. 
    For example;
    `const API_BASE_URL = 'https://api.attribution.js/api';`

2.  HTTP Client Setup
    Use a HTTP client library such as `axios` or the native `fetch` API to make requests to the `track` API endpoint. Below is an example using `fetch`
    
        const response = await fetch(`${API_BASE_URL}/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });
    

### 5.2. Making API Requests
#### 5.2.1.  Tracking Events
    To track events like click or sales, send a `POST` request to the `api/track` endpoint.
    
        const trackEvent = async (eventData) => {
            try {
                const response = await apiClient.post('/track', eventData);
                console.log('Event tracked:', response.data);
            } catch (error) {
                console.error('Error tracking event:', error.response ? error.response.data : error.message);
            }
        };
    

#### 5.2.2. Handling Responses and Errors
    Ensure that the client handles both successful responses and potential errors when interacting with the API.
    
        const handleApiResponse = (response) => {
            if (response.status === 201) {
                console.log('Success:', response.data.message);
            } else {
                console.error('Unexpected response:', response);
            }
        };

        const handleApiError = (error) => {
            if (error.response) {
                // The request was made, and the server responded with a status code
                console.error('API Error:', error.response.data);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('Network Error:', error.message);
            } else {
                // Something happened in setting up the request
                console.error('Error:', error.message);
            }
        };
    

#### 5.3.3. Security Considerations
    -   CORS: 
    Ensure that the API server is configured to allow requests from your client application's domain. You can achieve this if you configuere CORS in your express app.

    -   Authentication:
    Depending on the sensitivity of the data being attributed, you might want to implement authentication and authorization mechanisms to protect these API endpoints.


## (6) Testing The Application

The application includes automated tests to ensure the API works as expected.

### 6.1. Running The Tests
    To run the tests, execute:  
   `npm test`

    This will run the test suite using Mocha and Chai, testing various API endpoints and functionality.


## (7) Deployment

To deploy this application to a production environment, follow these steps:

### 7.1.  Environment Setup
    Ensure that your production environment has Node.js and MondoDB configuration set.

### 7.2.  Build and Deploy
    - In some cases, you may need to build or compile your code first. Run `npm run build`
    - Push your code to a production server such as Heroku, AWS or Vercel for deployment.
    - Set the environment variables for the production database and server.

### 7.3.  Start the Application
    Use a process manager like `pm2` or a hosting service that manages Node,.js processes to start the app:
   `pm2 start app.js`


## (8) Contributing

We welcome contributions from the community.

To Contribute:

### 8.1.    Fork and Clone
    -   Start by forking the repository, and clone it to your local machine.
    This creates a copy of the project where you can make changes without affecting the original repository.

### 8.2.    Create New Branch
    -   Create a new branch for your feature, modification or bug fix
    This keeps your work organized and separate from the main codebase as you progress.

### 8.3.    Maintain Coding Standards    
    -   Follow the existing code style
    -   Write clear, concise comments and documentation for new features

### 8.4.    Test New Features
    -   Run comprehensive tests on your feature, modification or bug fix

### 8.5.    Push and Pull
    -   Push your branch with the changes to your forked repository on GitHub.
    -   Submit a Pull Request with a description of your code or changes.

### 8.6.    Review and Merge
    -   Your changes will be reviewed and feedback will be provided.
    -   Once the pull request is approved, it will be merged into the original repository. At this point, Your contributions are now part of the project, Congrats!
   


## (9) License

This project is licensed under the MIT License. See the `LICENSE` file for details.








# Attribution.js
