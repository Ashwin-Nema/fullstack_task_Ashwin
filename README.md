# Project Setup Guide

This guide provides step-by-step instructions for setting up the project environment.

## Node and Package Installation

Make sure you have Node.js version 20.12.0 or higher installed.

Ensure the following packages are installed globally:

1. `typescript`
2. `nodemon`

To install them globally, follow these steps:

1. Open Git Bash terminal.
2. Run the following command:
   ```bash
   npm i -g nodemon typescript
   ```
## Setting up Backend

1. **Navigate to the backend folder from the Git Bash terminal:**
    ```bash
    cd .\back-end\
    ```

2. **Install all the dependencies with the following command:**
    ```bash
    npm install
    ```

3. **Redis Installation:**
   Redis needs to be installed CLI and server-side. For Windows, please refer to [Redis Installation for Windows](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/). Similarly, there are docs for Linux and MacOS.

    - **Starting Redis Server:**
        - Open 2 Ubuntu terminals:
            - In one terminal type:
              ```bash
              sudo service redis-server start
              ```
              This will start the Redis server.
            - In another terminal type:
              ```bash
              redis-cli
              ```
              This will start redis-cli.

4. **Configure environment variables in the backend folder and create a `.env` file:**

    - `PORT`: Port on which the backend is running.
    - `MONGODB_URL`: URL for MongoDB database.
    - `FRONT_END_URL`: URL on which the front end is running (example - http://localhost:3000).

5. **Open 2 terminals in the back-end folder:**
    - In one terminal type the command:
      ```bash
      npm run watch
      ```
    - In another terminal type the command:
      ```bash
      npm run dev
      ```

  ## Setting up Frontend

1. **Go to the front-end folder:**

2. **Open terminal and type:**

    ```bash
    npm install
    ```

3. **Create a file named `.env.example` in the front-end folder. Add the following environment variable:**

    ```
    NEXT_PUBLIC_BACK_END_HOST - This is the URL of the backend where the server is running. For example, "http://localhost:4000/"
    ```

4. **Open terminal and type the following:**

    ```bash
    npm run dev
    ```

5. Open the browser at http://localhost:3000, Now the project is running