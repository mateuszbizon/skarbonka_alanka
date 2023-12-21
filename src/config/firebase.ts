import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAp2FAKhTV7fK6N2eOlOKB1AK0qfxTu3ms",
  authDomain: "skarbonkaalankabase.firebaseapp.com",
  projectId: "skarbonkaalankabase",
  storageBucket: "skarbonkaalankabase.appspot.com",
  messagingSenderId: "494335562859",
  appId: "1:494335562859:web:8a30252b9dc1ee7bb14d2e",
  measurementId: "G-KHYWB5R533"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);