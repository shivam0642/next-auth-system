A secure, production-grade authentication system featuring JWT-based session management, email verification, and protected routing. This application demonstrates how to handle user identity safely from registration to logout.

**Key Features**

Secure Signup: Password hashing using bcryptjs before database storage.

Email Verification: Integration with Nodemailer and Mailtrap to ensure users provide valid email addresses.

JWT & Cookies: Stateless authentication using JSON Web Tokens stored in HTTP-only cookies for protection against XSS.

Route Guarding: Higher-Order Components (HOC) or Middleware to prevent unauthorized access to sensitive pages (Dashboard, Profile).

Auto-Redirects: Seamlessly redirects unauthenticated users to the login page.
