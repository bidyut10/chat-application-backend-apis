# Group Chat Server with Authentication

This project is a real-time chat application developed using Node.js, Express and the Websockt framework.
It incorporates websockets to enable instantaneous communication between clients. 
The server-side code utilizes MongoDB as a database, and the chat messages are stored in a chatModel schema. 
JSON Web Tokens (JWT) are employed to provide secure authentication and ensure that only authorized users can access the chat. 
Additionally, the project includes a separate file for defining routes used by the Express application. Overall, this project offers a robust and scalable solution for real-time chat communication, with a focus on security and performance.

GitHub Link: https://github.com/bidyut10/chat-application-backend-apis

To start the Srever:  npm run start

Tech Stack:
● Programming language: node.js
● Framework: Express Js and WebSocket 
● Database: MongoDB
● For User authentication: jsonwebtoken

Api's
● User Registration (localhost:3000/registration)

● User Login (localhost:3000/login)

● wss (ws://localhost:8080)
