# Farmacia Project

## Overview
The Farmacia project is a comprehensive application designed to manage pharmacy operations efficiently. It provides functionalities for user authentication, product scanning, and managing database connections.

## Features
- **User Authentication**: Secure login and registration for users.
- **Product Scanning**: Scan products using integrated scanning functionality.
- **Database Management**: Connects to a database for storing user and product information.
- **API Documentation**: Automatically generated API documentation using Swagger.

## Project Structure
```
package.json
README.md
server.js
swagger.js
DB/
    dbConnection.js
    models/
        scanModel.js
        userModel.js
src/
    config/
        cloudinary.js
        passport.js
    controllers/
        authController.js
        scanController.js
        userController.js
    middlewares/
        authMiddleware.js
        errorMiddlewares.js
        upload.js
        validatorMiddleware.js
    routes/
        authRoute.js
        scanRoute.js
        userRoute.js
    services/
        modelService.js
    uploads/
    utils/
        apiError.js
        generateToken.js
    validators/
        scanValidator.js
        userValidator.js
```

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Swagger**: API documentation tool.
- **Cloudinary**: Image and video management.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd farmacia
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables as needed.

## Usage
To start the server, run:
```bash
npm start
```

## API Endpoints

### Authentication Routes
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.
- **POST /api/auth/logout**: Log out from logged account.

### Scan Routes
- **GET /api/scans**: Retrieve a list of all scans.
- **POST /api/scans**: Add a new scans.
- **GET /api/scans/:id**: Retrieve a specific scan by ID.
- **PUT /api/scans/:id**: Update a specific scan by ID.
- **DELETE /api/scans/:id**: Delete a specific scan by ID.

### User Routes
- **GET /api/users**: Retrieve a list of all users.
- **GET /api/users/:id**: Retrieve a specific user by ID.
- **PUT /api/users/:id**: Update a specific user by ID.
- **DELETE /api/users/:id**: Delete a specific user by ID.

### LoggedUser Routes
- **GET /api/users/profile**: Retrieve a logged user profile.
- **PUT /api/profile/**: Update logged user.
- **DELETE /api/profile/**: Delete logged user.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.