# Hospital Management System

A web-based Hospital Management System built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

## Features

- User Authentication (Login/Signup)
- Patient Record Management
  - Add new patient records
  - Search patient records
  - Update patient information
  - Delete patient records
- Responsive Design
- Secure API endpoints
- MongoDB Database Integration

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hospital-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB service on your machine

4. Create a `.env` file in the root directory and add:
```
MONGODB_URI=mongodb://localhost:27017/hospital_management
JWT_SECRET=your_jwt_secret
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
hospital-management-system/
├── public/
│   ├── index.html
│   ├── dashboard.html
│   ├── styles.css
│   ├── dashboard.css
│   ├── script.js
│   └── dashboard.js
├── server.js
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Login user

### Patients
- GET `/api/patients` - Get all patients
- POST `/api/patients` - Create new patient
- GET `/api/patients/:id` - Get patient by ID
- PUT `/api/patients/:id` - Update patient
- DELETE `/api/patients/:id` - Delete patient
- GET `/api/patients/search` - Search patients

## Security

- JWT-based authentication
- Password hashing using bcrypt
- Protected API endpoints
- CORS enabled

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 