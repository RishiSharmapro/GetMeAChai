# GetMeAChai <img width="60" height="60" alt="favicon-chai" src="https://github.com/user-attachments/assets/5628ec2a-b057-4f3b-8f99-d7c9331d9a54" />

**GetMeAChai** is a modern full-stack platform designed to empower creators by enabling fans to support them through contributions. Think of it as a community-driven alternative to *Patreon* or *Buy Me A Coffee* — rebuilt with an improved UI, seamless payment flow, and smooth authentication.

👉 **Live Demo**: [get-me-a-chai-beta.vercel.app](https://get-me-a-chai-beta.vercel.app/)

---

## ✨ Features

* 🔐 **Authentication Made Simple** – Secure sign in with **Google and GitHub** using NextAuth.
* 💸 **Seamless Payments** – Integrated with **Razorpay** for fast and secure transactions.
* 👤 **User Pages** – Each creator gets a profile page showcasing:

  * Active campaigns
  * Supporters list with messages + contribution amounts
  * Button to support (send money instantly)
* 🌍 **All Creators Page** – Browse and discover all active creators.
* 📊 **Creator Dashboard** – Creators can edit details, manage campaigns, and track contributions.
* 🏠 **Landing Page** – Highlights active campaigns, testimonials, and platform features for visitors.
* 📱 **Responsive UI** – Built with **Next.js, TailwindCSS** for a smooth and engaging experience across devices.

---

## 📸 Screenshots & Previews

### 🏠 Landing Page
<img width="1470" height="838" alt="Landing page with campaigns and testimonials" src="https://github.com/user-attachments/assets/4e2a0bad-fbbd-4ba0-9b5a-fbdd62592c58" />
<img width="1470" height="838" alt="Landing page with campaigns and testimonials" src="https://github.com/user-attachments/assets/d5c7fa5c-b9aa-4cd4-aa01-9e560c23650f" />

### 🌍 All Creators
<img width="1470" height="838" alt="All creators page" src="https://github.com/user-attachments/assets/5ac8928a-064d-4749-b5dc-a9b59ff05264" />

### 🔑 Authentication
<img width="1470" height="838" alt="Login with Google/GitHub" src="https://github.com/user-attachments/assets/d98ae663-d674-4bdc-8d6e-c324e521666f" />

### 📊 Dashboard
<img width="1470" height="841" alt="Creator dashboard for managing campaigns" src="https://github.com/user-attachments/assets/4aa5001e-0ffc-432c-9e36-b893cc064731" />

### 👤 Creator Page
<img width="1470" height="839" alt="Creator profile with supporters list" src="https://github.com/user-attachments/assets/d777ee55-d3da-44dc-94e6-acca87764720" />

### 🎥 Quick Demo GIF

<img src="screenshots/demo.gif" width="700" alt="Project demo"/>  

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 15, React 19, TailwindCSS, Lucide Icons
* **Backend**: Next.js API Routes, MongoDB (via Mongoose), Zod Validation
* **Authentication**: Auth.js (Google, GitHub)
* **Payments**: Razorpay Integration
* **Utilities**: React Hot Toast for alerts & notifications

---

## ⚡ Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/RishiSharmapro/GetMeAChai.git
   cd GetMeAChai
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root:

   ```env
   # App Base URL  
   NEXT_PUBLIC_URL=http://localhost:3000  
   
   # GitHub Auth  
   AUTH_GITHUB_ID=your_github_client_id  
   AUTH_GITHUB_SECRET=your_github_client_secret  
   
   # Google Auth  
   AUTH_GOOGLE_ID=your_google_client_id  
   AUTH_GOOGLE_SECRET=your_google_client_secret  
   
   # NextAuth Config  
   NEXTAUTH_URL=http://localhost:3000  
   NEXTAUTH_SECRET=your_nextauth_secret  
   
   # Database (MongoDB Atlas / Local)  
   MONGODB_URI=your_mongo_connection_string  
   
   # Razorpay Keys  
   RAZORPAY_ID=your_razorpay_id  
   RAZORPAY_SECRET=your_razorpay_secret  
   NEXT_PUBLIC_RAZORPAY_ID=your_razorpay_id
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   App runs at: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Usage

* **For Supporters**
* 
  * Browse creators → Explore campaigns → Select a User Campaign → Visit User Profile Page → Send support with Razorpay.
* **For Creators**

  * Sign in → Set up profile & campaigns in the dashboard → Share your page → Receive support.

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes
4. Submit a pull request

---

## 📬 Contact

Made with ❤️ by [Rishi Sharma](https://rishisharmapro.vercel.app)

For support or queries: **[rishi.sharma4945@gmail.com](mailto:rishi.sharma4945@gmail.com)**

---

🔥 **GetMeAChai** makes supporting creators as simple as sharing a cup of chai.

---
