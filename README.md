Taskify - DevSecOps Project
------------------------------------------------------------------------------------------------------------------------------------------
CSC 2362 | Intro to Cybersecurity
------------------------------------------------------------------------------------------------------------------------------------------
This repository contains two versions of a full-stack Task Management application to demonstrate the "Build, Break, and Fix" cycle of secure software development.

📂 Repository Structure
------------------------------------------------------------------------------------------------------------------------------------------
main Branch (Secure Version): The production-ready build. Includes Zod input validation, JWT authentication, role-based access control (RBAC), and environment variable protection.

feat/vulnerable-branch (Vulnerable Version): A version of the app intentionally sabotaged to demonstrate OWASP Top 10 vulnerabilities.

🛠️ Tech Stack
------------------------------------------------------------------------------------------------------------------------------------------
Frontend: React / TypeScript / Tailwind CSS

Backend: Node.js / Express / TypeScript

Database: MongoDB

Testing: Vitest / Supertest
------------------------------------------------------------------------------------------------------------------------------------------
🚦 How to Run
Clone the repo.

Install dependencies: npm install (in both frontend and backend directories).

Setup Environment Variables: - Create a .env file in the backend root based on .env.example.

Start the app: npm run dev

Run Security Tests: npm test
------------------------------------------------------------------------------------------------------------------------------------------
🛡️ Documented Vulnerabilities (Vulnerable Branch)
Broken Access Control: Admin middlewares removed from sensitive routes.

Mass Assignment: Object destructuring disabled in user updates, allowing role escalation.

NoSQL Injection: Validation bypassed in the login service to allow $gt operator exploits.

Sensitive Data Exposure: Plaintext passwords logged to the server terminal during authentication.
