import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submission
const form = document.getElementById("subscribe-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();

  if (!name || !email) return alert("Please fill out both fields.");

  try {
    await addDoc(collection(db, "visitors"), {
      name: name,
      email: email,
      timestamp: new Date()
    });

    alert(`Thanks, ${name}! You’ve been added to our eco-mission 🌱`);
    form.reset();
  } catch (err) {
    console.error("Error saving data:", err);
    alert("Something went wrong. Please try again.");
  }
});
