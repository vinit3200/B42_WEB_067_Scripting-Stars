# B42_WEB_067_Scripting-Stars

## Introduction
The Unity-hub Platform is a dynamic web application designed to connect users based on their interests. It allows users to join niche communities, participate in real-time discussions, and receive personalized content recommendations. The platform solves the problem of fragmented online communities by providing a centralized, interactive, and user-friendly space for like-minded individuals.

## Project Type
Fullstack

## Deplolyed App
Frontend: http://unity-hub.netlify.app
Backend: https://b42-web-067-scripting-stars.onrender.com/
Database: mongodb+srv://cyber:good797@database.fuqlu.mongodb.net/B42_067?retryWrites=true&w=majority

## Directory Structure
my-app/ 
├─ backend/ 
│ ├─ controllers/ 
│ ├─ models/ 
│ ├─ routes/ 
│ ├─ config/ 
│ ├─ sockets/ 
│ └─ index.js 
├─ frontend/ 
│ ├─ public/ 
│ ├─ src/ 
│    ├─assets/
│    ├─Componenets/
│    │  ├─Community/
│    │  ├─Footer/
│    │  ├─Home/
│    │  ├─Navbar/
│    │  ├─Login/
│    ├─App.css/
│    ├─App.jsx/
│    ├─main.jsx/
├─ package.json 
└─ README.md

## Video Walkthrough of the project
https://youtu.be/-dX_yK5HMFw

## Video Walkthrough of the codebase
https://youtu.be/9UkifRYc7EE

## Features
- **User Authentication:** Secure registration and login with JWT-based sessions.
- **Real-Time Discussions:** Live discussion boards with real-time updates using WebSockets.
- **Community Management:** Create, join, and manage niche communities.
- **Reactions and Engagement:** like,posts and comments.

## design decisions or assumptions
- Responsive Design:
The application is built to work seamlessly on various devices, ensuring an optimal user experience on mobile, tablet, and desktop.

- User-Friendly Authentication UI:
Clean, intuitive login and registration pages with form validation, error messaging, and smooth transitions between authentication states.

- Interactive Dashboard:
A personalized dashboard that displays key content such as recent posts, communities, and notifications immediately after user login.

- Community Discovery & Navigation:
Intuitive search and filter functionalities that allow users to easily discover niche communities.
Well-structured navigation with clearly defined menus and sections for quick access to different parts of the platform.

- Real-Time Updates:
Integration with real-time data feeds (via WebSockets or Socket.io) ensures that users receive instant updates for new posts, comments, and notifications without needing to refresh the page.

## Installation & Getting started
Follow these steps to set up the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/vinit3200/B42_WEB_067_Scripting-Stars
   cd Unity_hub

2. **Install Dependencies:**
Backend:
   cd backend
   npm install
Frontend:
   cd ../frontend
   npm install 

3. **Configure Environment Variables:**

Create a .env file in the backend folder with the necessary variables (e.g., DB_URI, JWT_SECRET).     

4. **Start the Application:**

Backend:
   cd backend
   npm start
Frontend:
   cd frontend
   npm run dev

5. Access the Application: Open your browser and navigate to http://localhost:5173/ for the frontend.


## Usage
After logging in, you can:

-Join Communities: Browse and join niche communities.
-Create Posts: Initiate discussions by creating posts within a community.
-Comment & React: Engage in discussions with threaded comments and reaction features.
-Customize Feed: Adjust settings to personalize your content feed.

## Example:
# Register a new user
Visit http://localhost:3000/signup and complete the registration form.
# Log in
Visit http://localhost:3000/login and use your credentials to log in.
# Explore Communities
Browse the dashboard to join communities of interest and start interacting.

## Credentials
Use the following test credentials to access authenticated pages:
Username: sakshi
Email: sakshi1701@gmail.com
Password: sakshi1701 

## APIs Used
This application utilizes the following external APIs:
-Email Service API: For sending account verification and notification emails.
-AI Recommendation API (Optional): To provide personalized community recommendations based on user activity.

## API Endpoints
Below is a list of key API endpoints provided by the backend:

User Authentication:
POST /api/auth/register - Register a new user.
POST /api/auth/login - Log in a user.
Community Management:
GET /api/communities - Retrieve all communities.
POST /api/communities - Create a new community.
PUT /api/communities/:id - Update community details.
DELETE /api/communities/:id - Delete a community.
Posts & Comments:
GET /api/posts - Retrieve posts.
POST /api/posts - Create a new post.
GET /api/posts/:id/comments - Retrieve comments for a post.
POST /api/posts/:id/comments - Add a comment to a post.
Real-Time Updates:
Socket.io is used for real-time post and comment updates.


## Technology Stack
# Frontend:
- React.js
- HTML: For structuring the web application.
- JavaScript: For adding interactivity and dynamic behavior
- Socket.io-client (for real-time communication)
- CSS/module.css for styling
# Backend:
- Node.js
- Express.js
- Socket.io (for real-time updates)
- JWT for authentication
# Database:
- MongoDB
- Other Libraries/Modules:
- bcrypt for password hashing
- dotenv for environment variable management
- nodemon for development server auto-restarts

# ScreenShots:
![Login/SignUp page-](C:\Users\thods\Downloads\login.png)
![Create Community](C:\Users\thods\Downloads\createcommunity.png)
![Home Page](C:\Users\thods\Downloads\Ui.png)

