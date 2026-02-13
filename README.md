#  Full-Stack Auth Pro

A secure, production-grade authentication system featuring **JWT-based session management**, **email verification**, and **protected routing**. This application demonstrates a robust security flow designed for real-world production environments.

##  Key Features

* **Secure Signup:** Implements password hashing using `bcryptjs` before database storage.
* **Email Verification:** Integration with **Nodemailer** and **Mailtrap** to ensure account authenticity.
* **JWT & Cookies:** Stateless authentication using JSON Web Tokens stored in `HTTP-only` cookies to prevent XSS attacks.
* **Route Guarding:** Backend middleware and Frontend guards to prevent unauthorized access to private pages like Dashboard and Profile.
* **Auto-Redirects:** Seamlessly redirects unauthenticated users to the login page when trying to access protected content.

##  Tech Stack

- **Frontend:** React.js / Next.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Mailtrap & Nodemailer

## ⚙️ How It Works



1.  **Registration:** The user provides details; the password is encrypted, and the account is created with an `unverified` status.
2.  **Verification:** A secure link is sent via Mailtrap. Clicking this link verifies the user's email address in the database.
3.  **Login:** Upon successful login, the server issues a JWT. This token is stored in a secure, `httpOnly` cookie.
4.  **Authorization:** For every protected request, the server verifies the token in the cookie. If valid, the user is granted access; otherwise, an error is returned.

##  Project Structure

```text
├── backend
│   ├── controllers/   # Auth logic (login, signup, verify)
│   ├── middleware/    # Auth guards (protectRoute)
│   ├── models/        # User schema
│   └── utils/         # JWT and Email transporters
└── frontend
    ├── src/components # UI components
    ├── src/pages      # Protected vs Public routes
    └── src/context    # Auth state management
```

## Getting Started

1. Clone the repo
Bash
git clone [https://github.com/yourusername/auth-system.git](https://github.com/yourusername/auth-system.git)
2. Install dependencies
Bash
# For Backend
cd backend && npm install

## For Frontend
cd ../frontend && npm install
3. Environment Variables
Create a .env file in the root of your backend folder and add:

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_super_secret_key

MAILTRAP_USER=your_mailtrap_user

MAILTRAP_PASS=your_mailtrap_password

CLIENT_URL=http://localhost:5173

4. Run the app
Bash
# In backend folder
npm run dev

# In frontend folder
npm run dev
