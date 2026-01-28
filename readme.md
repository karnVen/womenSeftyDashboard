Awesome, Varun! Since you already have the UI for both **Login** and **Register**, I’ll now guide you **step-by-step** on how to integrate **Firebase Authentication** into your project. We’ll use **Email/Password Auth** from Firebase and connect it directly using JavaScript.

---

## ✅ Step-by-Step Firebase Setup

### 🔧 Step 1: Set Up Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **“Add Project”**
3. Give your project a name (e.g., `PawRescueAuth`)
4. Disable Google Analytics (for now) → Click **Create Project**
5. Once it’s ready, click **Continue**

---

### 🔧 Step 2: Register Your App (Web)
1. In the Firebase dashboard → Click **“</>”** Web icon to add a web app.
2. Name your app (e.g., `PawRescueWeb`)
3. Check "Also set up Firebase Hosting" if you want it later, or uncheck for now.
4. Click **Register App**
5. Firebase will now give you a JS SDK snippet like this:

```html
<script type="module">
  // Import the functions you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
</script>
```

> 💡 Copy this snippet and paste it into your HTML files before the `</body>` tag.

---

### 🔧 Step 3: Enable Email/Password Auth
1. Go to **Firebase Console** → Authentication → **Get Started**
2. Under **Sign-in method**, enable **Email/Password**
3. Click **Save**

---

## ✨ Now Add Firebase Logic to Your Code

Let’s integrate with your login and register forms.

---

### 🧠 Modify: `register.html`

Replace your form code with this clean version and add Firebase script:

#### ✅ Updated `register.html`

```html
<!-- Your full existing head and style remains the same -->
<body class="flex items-center justify-center min-h-screen px-4">
  <div class="login-card p-8 rounded-2xl w-full max-w-md">
    <h2 class="text-3xl font-bold mb-1">Register</h2>

    <form id="registerForm" class="space-y-5">
      <div><input type="email" id="email" required placeholder="Email"></div>
      <div><input type="password" id="password" required placeholder="Password"></div>
      <div><input type="password" id="confirmPassword" required placeholder="Confirm Password"></div>
      <button type="submit" class="btn btn-primary btn-animate">Sign Up</button>
    </form>

    <p class="text-sm mt-4">Already have an account? <a href="login.html">Login</a></p>
  </div>

  <!-- Firebase SDK + Auth Script -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");
        window.location.href = "login.html";
      } catch (error) {
        alert(error.message);
      }
    });
  </script>
</body>
```

---

### 🧠 Modify: `login.html`

#### ✅ Updated `login.html`

```html
<!-- Your full existing head and style remains the same -->
<body class="flex items-center justify-center min-h-screen px-4">
  <div class="login-card p-8 rounded-2xl w-full max-w-md">
    <h2 class="text-3xl font-bold mb-1">Welcome</h2>

    <form id="loginForm" class="space-y-5">
      <div><input type="email" id="email" required placeholder="Email"></div>
      <div><input type="password" id="password" required placeholder="Password"></div>
      <button type="submit" class="btn btn-primary btn-animate">Login</button>
    </form>

    <p class="text-center text-sm mt-6 text-gray-400">
      Don’t have an account? <a href="register.html">Register here</a>
    </p>
  </div>

  <!-- Firebase SDK + Auth Script -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Change to your home page
      } catch (error) {
        alert(error.message);
      }
    });
  </script>
</body>
```

---

## 🔚 You’re Done!

### 🧩 Final Checklist:
✅ Firebase project created  
✅ Email/Password auth enabled  
✅ Firebase SDK added  
✅ Login/Register logic working  
✅ Clean UI with Tailwind  

---

Would you like me to also help you create a `dashboard.html` (post-login landing page) and a logout button with auth check?