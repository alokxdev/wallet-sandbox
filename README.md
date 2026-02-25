# Wallet Sandbox

This project started as a way for me to understand how database transactions actually work in practice.

Instead of just reading about them, I built a small wallet system where balance updates and transfers depend on transactional integrity.

The main goal of this project is to explore:

- How database transactions prevent inconsistent state
- How to safely update balances
- What can go wrong without transactions
- How session-based transactions work (e.g. with Mongoose)

The wallet UI is simple — the focus is on backend logic and correctness.

---

## 🧠 What I’m Learning Through This Project

- Why atomic operations matter
- How to handle concurrent balance updates
- How to use database sessions
- What “rollback” really means in practice
- How backend logic connects to frontend behavior

---

## 🏗 Project Structure

- **frontend/** — Simple React interface for interacting with the wallet
- **backend/** — API handling balance updates and transactional logic

---

## ⚠️ Important

This is not a production-ready wallet system.  
There is no real money involved.

It is a controlled learning environment for experimenting with transactional behavior.

---

## 🚀 Running Locally

```bash
# install dependencies
npm install

# run backend
cd backend
npm install
npm start

# run frontend
cd ../frontend
npm install
npm start
```
