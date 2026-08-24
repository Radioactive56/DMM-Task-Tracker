# DMM Task Tracker

A full-stack task management application designed to help teams organize, track, and manage tasks efficiently. The application provides authentication, role-based access, task assignment, status tracking, and a centralized dashboard for managing work.

## Features

- User authentication using JWT
- Role-based access control
- Create, update, and delete tasks
- Assign tasks to team members
- Track task status and priority
- Task filtering and search
- User-specific task views
- RESTful APIs using Django REST Framework
- Responsive React frontend

## Tech Stack

### Frontend
- React.js
- Material UI
- JavaScript

### Backend
- Python
- Django
- Django REST Framework
- JWT Authentication

### Database
- PostgreSQL

## Architecture

The application follows a client-server architecture:

React Frontend → REST API → Django/DRF Backend → PostgreSQL

JWT tokens are used to authenticate users and authorize API requests.

## Key Highlights

- Implemented secure JWT-based authentication.
- Designed REST APIs for task and user management.
- Implemented role-based authorization to restrict access based on user roles.
- Built a responsive dashboard for monitoring and managing tasks.
- Integrated React with Django REST APIs.

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
