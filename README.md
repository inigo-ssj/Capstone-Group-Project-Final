# Project Name: **Everwear E-commerce Site**

## Description
A brief description of your app and its purpose.

## Prerequisites
Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (for local development) or an online MongoDB instance (e.g., MongoDB Atlas)
- A code editor like [VS Code](https://code.visualstudio.com/)

## Installation
Follow these steps to install and set up the project locally:

1. **Clone the repository**:
   `git clone <repository-url>`

2. **Navigate to your project directory**:
   `cd your-project-name`

3. **Install dependencies**:
   Run the following command to install all the required dependencies:
   `npm install bcrypt@5.1.1 bcryptjs@2.4.3 body-parser@1.20.3 cors@2.8.5 crypto@1.0.1 dotenv@16.4.7 express@4.21.2 jsonwebtoken@9.0.2 mongoose@8.8.4 nodemailer@6.9.16
`

   This will install the following dependencies:
   - **bcrypt@5.1.1**: For password hashing.
   - **bcryptjs@2.4.3**: An alternative to bcrypt for password hashing.
   - **body-parser@1.20.3**: Middleware for parsing incoming request bodies.
   - **cors@2.8.5**: For enabling Cross-Origin Request Sharing (CORS).
   - **crypto@1.0.1**: A module for cryptographic operations.
   - **dotenv@16.4.7**: To load environment variables from a `.env` file.
   - **express@4.21.2**: Web framework for Node.js.
   - **jsonwebtoken@9.0.2**: For creating and verifying JSON Web Tokens (JWT).
   - **mongoose@8.8.4**: MongoDB object modeling for Node.js.
   - **nodemailer@6.9.16**: For sending emails from your app.

4. **Set up environment variables**:
   Create a `.env` file in the root of your project directory. The `.env` file should include your MongoDB connection string and any other sensitive information like API keys, JWT secret, etc.
   
   Example `.env`:


5. **Start the application**:
To start the server, run:
`npm start`

This will run the server on the default port (usually `3000`, but you can customize it).


