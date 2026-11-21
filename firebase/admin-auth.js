import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const ADMIN_EMAILS = new Set([
  "omarhossny@gmail.com",
  "youssefehab@gmail.com"
]);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const gate = document.getElementById("adminAuthGate");
const form = document.getElementById("adminLoginForm");
const message = document.getElementById("adminAuthMessage");
const loginButton = document.getElementById("adminLoginButton");
const signOutButton = document.getElementById("adminSignOut");
const accountLabel = document.getElementById("adminAccountLabel");

function showGate(show) {
  gate.hidden = !show;
  document.body.classList.toggle("admin-locked", show);
  signOutButton.hidden = show;
}

function showMessage(text, isError = true) {
  message.textContent = text;
  message.classList.toggle("success", !isError);
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    showGate(true);
    accountLabel.textContent = "SIGNED OUT";
    return;
  }

  const email = (user.email || "").toLowerCase();
  if (!ADMIN_EMAILS.has(email)) {
    await signOut(auth);
    showGate(true);
    showMessage("This account is not authorized to access Hossny Admin.");
    return;
  }

  accountLabel.textContent = email;
  showGate(false);
  showMessage("");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("adminEmail").value.trim().toLowerCase();
  const password = document.getElementById("adminPassword").value;

  if (!ADMIN_EMAILS.has(email)) {
    showMessage("This email is not on the authorized admin list.");
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = "SIGNING IN…";
  showMessage("Checking your account…", false);
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const messages = {
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/user-not-found": "No Firebase user exists for this email.",
      "auth/wrong-password": "Incorrect email or password.",
      "auth/too-many-requests": "Too many attempts. Please wait and try again.",
      "auth/network-request-failed": "Network error. Check your internet connection."
    };
    showMessage(messages[error.code] || `Sign-in failed: ${error.message}`);
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "SIGN IN";
  }
});

signOutButton.addEventListener("click", async () => {
  await signOut(auth);
});
