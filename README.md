# URL Shortener 🔗

A full-stack URL shortener application built with .NET Core backend and React.js frontend with Redux state management.

## 🚀 Features

### Backend (.NET Core API)
- **RESTful API** for URL management
- **MySQL Database** for data storage
- **Stored Procedures** for database operations
- **Auto-incrementing** access counters
- **Custom short code** generation

### Frontend (React.js)
- **React Redux** with Thunk middleware for state management
- **Ant Design** for modern UI components
- **React Router** for navigation
- **Real-time statistics** and analytics
- **Copy to clipboard** functionality
- **Responsive design** for all devices

## 🛠️ Tech Stack

### Backend
- .NET Core 8.0
- MySQL Database
- Dapper ORM
- Stored Procedures
- Swagger/OpenAPI

### Frontend
- React.js 17
- Redux with Redux Thunk
- Ant Design 4.x
- React Router 5
- Axios for API calls
- Moment.js for date handling

## 📸 Screenshots

visit screenshot folder for screen of project


## 📁 Project Structure

```
backend/
├── Controllers/
├── Models/
├── Repository/
├── Services/
└── Database/
    └── stored-procedures.sql

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── services/
│   └── utils/
```

## 🔧 API Endpoints

- `POST /api/url/shorten` - Create short URL
- `GET /api/url` - Get all URLs
- `GET /api/url/{code}` - Get URL details
- `GET /api/url/{code}/redirect` - Redirect to original URL
- `PUT /api/url/{code}` - Update URL
- `DELETE /api/url/{code}` - Delete URL

