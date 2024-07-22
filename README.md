# Fullstack Blog Web Application

Welcome to our Fullstack Blog Web Application! This dynamic web app is designed to provide a robust platform for bloggers and readers alike. It's built using the MERN stack (MongoDB, Express, Next.js(React), Node.js) and offers a range of features including authentication with JWT tokens, server-side rendering, Manual Mail Authentication Configuration (Also OAuth) and CRUD (Create, Read, Update, Delete) actions.

![Homepage](https://github.com/user-attachments/assets/55c31b85-0186-4e9f-95c2-2557a8cb3a10)

## Deployment

- **Frontend Deployed** on [Vercel](https://blog-app-client-ivory.vercel.app/)
- **Backend Deployed** on [Deta Space](https://blogapp-1-e5505167.deta.app/)

## Features

- **User Authentication:** Securely authenticate users using JWT tokens, protecting user data and enabling personalized experiences.

- **Dynamic Data Representation:** Utilize server-side rendering to enhance page load times and SEO optimization while dynamically representing your blog posts and content.

- **CRUD Actions:** Easily create, read, update, and delete blog posts through intuitive user interfaces.

- **Mail Authentication** User valication and verification done manually by send verification emails. (Also for Notifications)

- **Image Uploading** User's can have the ability to upload there profiles and images to the cloud storage dynnamically (Using Cloudinary)

## Technologies Used

- **Frontend:** Next.js, TailwindCSS, JavaScript.

- **Backend:** Node.js, Express.js, MongoDB, Cloudinary, JWT for authentication.

## Getting Started

Follow these steps to set up and run the application locally:

1. **Clone the Repository:** 
   ```
   git clone https://github.com/404rakshit/blog-webapp.git
   ```

2. **Navigate to the Frontend Directory and Install Dependencies:**
   ```
   cd client
   npm install
   ```

3. **Navigate to the Backend Directory and Install Dependencies:**
   ```
   cd server
   npm install
   ```

4. **Set Up Environment Variables:** 
   You need to create two `.env` file in the project, one inside client directory another in server directory and configure it with your MongoDB connection string, JWT secret key, and other necessary environment variables.

   ***For Client***
   ```
   SERVER_URL= http://localhost:8080 (or server on which backend is running)
   UNSPLASH_KEY = unslpash_api_key
   CLIENT_ID = Google_cloud_client_id
   ```

   ***For Server***
   ```
   db_url = generated mongo cluster url with credentials
   accessToken = random_longsecret (recommended creating using crypto lib)
   refreshToken = random_longsecret (recommended creating using crypto lib)
   mailToken = random_longsecret (recommended creating using crypto lib)
   passToken = random_longsecret (recommended creating using crypto lib)
   Email = Configured mail
   Password = Generated app password for gmail of above configured mail
   CLIENT_URL = http://localhost:3000 (currently serving frontend)
   cloud_name = cloudinary_credentials
   api_key = cloudinary_credentials
   api_secret = cloudinary_credentials
   ```

6. **Start the Application:**

   ***For Client***
   ```
   cd client
   npm run dev
   ```

   ***For Server***
   ```
   cd server
   npm run dev
   ```

8. **Open in Your Browser:** 
   Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- **Authentication:** Users can sign up and log in to access personalized features.
- **Creating Posts:** Authenticated users can create new blog posts.
- **Editing and Deleting Posts:** Authors can edit and delete their own posts.
- **Reading Posts:** Anyone can read and comment on posts.
- **Review Functionality:** Users can like and comment for specific posts even follow a perticular person.
- **Responsive Design:** The app is optimized for mobile and desktop use.

## UI
![User Blog](https://github.com/user-attachments/assets/e852d85b-879f-4488-baf5-79ccb1448b01)
![Write blog](https://github.com/user-attachments/assets/50d830ad-1dff-430a-b4c2-d9d937e00384)
![Login](https://github.com/user-attachments/assets/65292c81-4965-40c4-a0b5-daccc276d5ae)
![Articles](https://github.com/user-attachments/assets/c1b00723-3866-4c1c-91d7-89b12dbf1456)
![User Profile](https://github.com/user-attachments/assets/c6b4c830-6f2d-4aa1-9efb-3aa1d94fa71f)
![Dashboard](https://github.com/user-attachments/assets/982fe6ae-52ab-4719-b352-9b95e16f609e)


## Acknowledgments

We would like to express our gratitude to the open-source community and the developers who have contributed to the tools and libraries used in this project.
  
Happy blogging!

---

Feel free to modify this README to provide more specific details about your project, including installation instructions, usage guidelines, and any additional features or functionalities that your blog application offers.
