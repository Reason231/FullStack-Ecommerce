## Day 24 => This is a deployment of project
- Youtube video => https://www.youtube.com/watch?v=39DloCh510E&t=1880s


1. Go to server and client and create ".env" file

## 1. Modifying Backend Code
1. Go to "server.js" and import the "dotenv"
2. Go to "cloudinary.js"
3. Go to "paypal.js"
4. Go to "order-controller.js" of "shop"
- Tut video => 0-7:30

## 1. Modifying Frontend Code 
1. Go to "store" => "auth-slice" => index.js
2. Right click on "client" folder,and click "Find in folder" and type "http://localhost:5000/" and modify those files.
3. Go to ".gitignore" file and put the .env file
4. Make a clone of this repository
- Tut video => 7:30 - 11:00

## Render
1. Go to https://dashboard.render.com/
Note: To deploy frontend => Static site and To deploy backend => Web Service

## 2. Connecting the backend to render
1. Create a "New" btn which is given in the navbar and click on "Web Service"
2. Connect to github, and click on "Public Git Repo" and paste your repo url.
3. Form Details => 
a. Root Directory => server
b. Build Command => server/ $ npm install
c. Start Command => server/ $ node server.js
d. Click on "Free"
e. Click on "Add from .env" and paste the backend .env code.
f. Click on "Deploy Web Service"

4. After this wait until it says => "Your service is live 🎉"
5. At the above it will give you the URL => https://fullstack-ecommerce-3726.onrender.com


## 2. Connecting the frontend to render
1. Click on "New" btn and click on "Static Site"
2. Connect to github, and click on "Public Git Repo" and paste your repo url.
3. Form Details => 
a. Root Directory => client
b. Build Command => client/ $ npm install; npm run build
c. Publish Directory => client/ ./dist
d. Click on "Add from .env" and paste the frontend .env code.
f. Click on "Deploy Static Site"

4. After this wait until it says => "Your site is live 🎉"
5. At the above it will give you the URL and click on this url =>https://fullstack-ecommerce-1-bned.onrender.com

## 2. Connecting backend to the frontend
- Backend
1. Go to the homePage of render => https://dashboard.render.com/
2. Click on your website Name which has the RUNTIME as Node
3. Click on "Environment" which is given in the sidebar.
4. Click on "Edit" and change the "CLIENT_BASE_URL" to frontend URL => https://fullstack-ecommerce-1-bned.onrender.com
5. Click on save and deploy
6. After that, go to "Events" which is given in the sidebar, and click on "deploy started" to see the status, wait for it be say "Your service is live"

- Frontend
1. Go to the homePage of render => https://dashboard.render.com/
2. Click on your website Name which has the RUNTIME as "Static"
3. Click on "Environment" which is given in the sidebar.
4. Click on "Edit" and change the "CLIENT_BASE_URL" to backend URL => https://fullstack-ecommerce-3726.onrender.com
5. Click on save and deploy
6. After that, go to "Events" which is given in the sidebar, and click on "deploy started" to see the status, wait for it be say "Your service is live"
- Tut video => 11:00 - 18:00


## 3. Cookie Removal Problem
1. After the login, when you refresh the page, the cookie will automatically disappear and it will show you the "Not Found" Page

- Render Website Part
2. Go to the homePage of render => https://dashboard.render.com/
3. Click on your website Name which has the RUNTIME as "Static"
4. Click on "Redirects/Rewrites" which is given in the sidebar.
5. Click on "Add Rule"
6. Write the source as /* and destination as /index.html and action as "Rewrite" and Manual Deploy as "Clear build cache and deploy"

- Code Part
1. Go to "controllers" => "auth" => "auth.controller.js" and go to "res.cookie"
2. Go the "frontend" => "store" => "auth-slice" => index.js
3. Go to "App.jsx" and check for "dispatch(checkAuth())"
4. Go to "header.jsx" of shopping-view and admin-view to implement the delete token after logout
5. Push the code to the github
6. Go to the homePage of render => https://dashboard.render.com/
7. Click on your website Name which has the RUNTIME as "Static" and "Node"
8. Click on "Events" and click on "Manual Deploy"

## Finally
- Go to the frontend "static" link to see the page => https://fullstack-ecommerce-1-bned.onrender.com/


## Project Overview for C.V 
- Built a full-stack e-commerce app (React + Redux Toolkit, Node/Express, MongoDB).
- Implemented product CRUD with Cloudinary uploads and admin dashboard.
- Added advanced filtering, search, and review system (buyers-only guard).
- Integrated PayPal checkout (approval + capture) and order lifecycle management.
- Designed REST APIs with Mongoose models; protected routes with JWT.
- Deployed on Render, CI build, environment-based config.
