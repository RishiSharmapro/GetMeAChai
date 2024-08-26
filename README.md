# GetMeAChai

Welcome to **GetMeAChai**, a platform designed to support creators by allowing their fans to contribute financially. Our platform is similar to Patreon and Buy Me A Coffee but tailored to offer a seamless experience for creators and supporters. This project is built with Next.js and includes features like user authentication, payment integration with Razorpay, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- **User Authentication**: Secure login and registration for both creators and supporters.
- **Payment Integration**: Simple and efficient payments through Razorpay.
- **Creator Dashboard**: Creators can manage their profile, track contributions, and view analytics.
- **Supporter Dashboard**: Supporters can view their contributions and manage their subscriptions.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

To get started with GetMeAChai, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/RishiSharmapro/GetMeAChai.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd GetMeAChai
   ```

3. **Install Dependencies**

   Ensure you have Node.js installed. Then, run:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**

   Create a `.env.local` file in the root of your project and add the following variables:

   ```plaintext
   NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

   Replace the placeholders with your actual Razorpay and NextAuth secrets.

5. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Your application will be available at `http://localhost:3000`.

## Usage

1. **Register and Log In**

   Navigate to the login or registration page to create a new account or sign in.

2. **Create a Creator Profile**

   Once logged in, navigate to the creator dashboard to set up your profile and link your payment methods.

3. **Set Up Payment Integration**

   Follow the instructions in the dashboard to integrate Razorpay with your account.

4. **Start Receiving Contributions**

   Share your profile with your supporters to start receiving contributions. Supporters can choose from various contribution options.

## Contributing

We welcome contributions to GetMeAChai! If you have suggestions or want to help improve the project, please follow these guidelines:

1. **Fork the Repository**
2. **Create a New Branch**
3. **Make Your Changes**
4. **Submit a Pull Request**

## Contact

For any inquiries or support, please contact us at [support@getmeachai.com](mailto:rishi.sharma4945@gmail.com).

---

Thank you for using GetMeAChai! We hope it helps you in your journey to support and connect with your favorite creators. Enjoy!

