# VeggieMart

A full-stack e-commerce web application for buying and managing vegetables online, built with **React, Express, and MongoDB**. The frontend is deployed on **Vercel**, and the backend is deployed on **Render**.  

---

## 🌟 Features

### UI / Frontend
- Landing/Home page with featured content and banners
- Product Listing page (grid view) showing images, name, price, and details
- Product Detail view with full description and “Add to Cart” functionality
- Shopping Cart:
  - Add products
  - Remove products
  - Adjust quantity
  - View order summary
- Checkout flow (review order before placing)
- User Authentication:
  - Register / Sign Up
  - Login / Logout
- Navigation bar linking key pages (Home, Products, Cart)
- Responsive design for desktop and mobile
- Handling of empty states (empty cart, no products)

### Backend / API
- RESTful API endpoints for:
  - Products
  - Cart
  - Orders
- Connected to **MongoDB Atlas** (cloud)
- CORS configured to allow both local and deployed frontend
- Error handling for invalid requests and failed API calls

### Deployment & Infrastructure
- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Environment variables for API URLs and secrets
- Seamless switching between local and production environments

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Deployment:** Vercel (frontend), Render (backend)
- **Other:** Axios / Fetch for API calls, Context API for state management



