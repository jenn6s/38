// across.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Fixed config (comma was missing)
const firebaseConfig = {
  apiKey: "AIzaSyCKLhzvfmXLM_fiPyQv7Y5nWkiyTMmD2-w",
  authDomain: "explore-tha-world.firebaseapp.com",
  projectId: "explore-tha-world",
  storageBucket: "explore-tha-world.appspot.com", // <- fixed comma
  messagingSenderId: "223355311448",
  appId: "1:223355311448:web:454baafd3e6221a210812d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 💬 Fun logic (optional)
let destination = "Bali";
let travelBudget = 1500;
let dailyBudget = travelBudget / 7;

if (dailyBudget > 200) {
  console.log("You're living luxuriously!");
} else {
  console.log("Time to find budget-friendly deals!");
}

let isSunny = true;
let hasTickets = false;

if (isSunny && hasTickets) {
  console.log("Perfect day to explore " + destination);
} else {
  console.log("Might need to reschedule the trip.");
}

document.addEventListener("DOMContentLoaded", function () {
  let section = document.getElementById("coolSection");
  if (section) {
    let newParagraph = document.createElement("p");
    newParagraph.textContent = `Your daily budget for ${destination} is $${dailyBudget.toFixed(2)}.`;
    section.appendChild(newParagraph);
  }
});

console.log("landons my biggest SUPPORTER <3");

// 🧠 Firebase Auth Logic (Login + Sign Up + Firestore Write/Read)
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const authMessage = document.getElementById("auth-message");

  if (loginForm && signupForm && authMessage) {
    // 🔐 LOGIN
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 🔎 READ: Optional Firestore fetch
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          console.log("User Firestore Data:", docSnap.data());
        }

        authMessage.style.color = "#CAB59E";
        authMessage.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "pinterest.html";
        }, 1000);
      } catch (error) {
        authMessage.style.color = "red";
        authMessage.textContent = error.message;
      }
    });

    // ✍️ SIGN UP
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 🗃️ CREATE: Add user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: serverTimestamp(),
        });

        authMessage.style.color = "#CAB59E";
        authMessage.textContent = "Sign up successful! You can now log in.";
        signupForm.reset();
      } catch (error) {
        authMessage.style.color = "red";
        authMessage.textContent = error.message;
      }
    });
  } else {
    console.error("One or more DOM elements for auth are missing!");
  }
});
