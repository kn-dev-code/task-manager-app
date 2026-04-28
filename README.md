Taskify - DevSecOps Project
--------------------------------------------------------------------------------
CSC 2362 | Intro to Cybersecurity
--------------------------------------------------------------------------------
This repository demonstrates a complete "Build, Break, and Fix" cycle. It 
showcases how common vulnerabilities are introduced and how to architect 
robust, production-grade defenses.

🔗 GitHub: https://github.com/kn-dev-code/task-manager-app

📂 Repository Structure
--------------------------------------------------------------------------------
main Branch (Secure Version): 
The hardened build. Features include strict Zod input validation, JWT auth, 
RBAC, and sanitized API endpoints to mitigate OWASP Top 10 risks.

feat/vulnerable-branch (Vulnerable Version): 
Intentionally sabotaged to demonstrate security failures like NoSQL injection 
and broken access controls.

🛠️ Tech Stack
--------------------------------------------------------------------------------
Frontend: React / TypeScript / Tailwind CSS
Backend: Node.js / Express / TypeScript
Database: MongoDB (Atlas)
Security Testing: Vitest / Supertest

🚦 How to Run
--------------------------------------------------------------------------------
1. Clone the repo: git clone https://github.com/kn-dev-code/task-manager-app.git
2. Install dependencies: npm install (in both /frontend and /backend)
3. Setup Environment: Create a .env in /backend (see .env.example)
4. Start Dev: npm run dev
5. Run Tests: npm test

🛡️ Documented Vulnerabilities & Fixes
--------------------------------------------------------------------------------
• NoSQL Injection: (Fixed via Zod object-validation in auth services)
• Mass Assignment: (Fixed by removing spread operators on User models)
• Broken Access Control: (Fixed via RBAC middleware on /admin routes)
• Stored XSS: (Fixed via React’s native DOM escaping + input sanitization)
