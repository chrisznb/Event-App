import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKKyomkRYc79x8yFZmfwbLVZjqByPb4Xc",
  authDomain: "heinsberg-event-app-4ea87.firebaseapp.com",
  projectId: "heinsberg-event-app-4ea87",
  // storageBucket, messagingSenderId, appId sind optional für Auth
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 