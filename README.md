# 🏥 ClinicFlow - Full Stack Clinic Management System

A modern, production-ready clinic management application built with the MERN stack, featuring real-time appointment scheduling, patient management, and comprehensive doctor profiles.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19.2-blue)
![Node](https://img.shields.io/badge/Node-18+-green)

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication with HTTP-only cookies
- Role-based access control (Admin, Doctor, Patient)
- Secure password hashing with bcrypt
- Protected routes on both frontend and backend
- Rate limiting on login endpoints

### 👥 Patient Management
- Complete CRUD operations
- Real-time search and filtering
- Admission status tracking
- Medical condition monitoring
- Contact information management

### 👨‍⚕️ Doctor Management
- Comprehensive doctor profiles
- Specialization categorization
- Experience and qualification tracking
- Consultation fee management
- Availability scheduling system
- Active/inactive status control

### 📅 Appointment System
- Real-time slot availability checking
- Intelligent conflict prevention (no double booking)
- Multi-status tracking (Pending, Confirmed, Completed, Cancelled)
- Prescription management
- Appointment notes and reason tracking
- Calendar integration

### 📊 Dashboard Analytics
- Real-time statistics overview
- Patient admission tracking
- Today's appointments counter
- Recent patients list
- Upcoming appointments preview
- Monthly trends visualization

## 🛠 Technology Stack

### Frontend
- **React 19** - UI library with latest features
- **TypeScript** - Type safety and better DX
- **Redux Toolkit** - State management with async thunks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client with interceptors
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **date-fns** - Date formatting
- **Lucide React** - Icon library
- **Vite** - Fast build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Express Rate Limit** - DDoS protection
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📦 Project Structure