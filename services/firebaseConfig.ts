import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Replace these with your Firebase project credentials
// Get them from: https://console.firebase.google.com/project/YOUR_PROJECT/settings/general
const firebaseConfig = {
apiKey: "AIzaSyD3s8eKS62visHg_PFETeZu5g_JQMQlY0I",
  authDomain: "healthykids-25.firebaseapp.com",
  projectId: "healthykids-25",
  storageBucket: "healthykids-25.firebasestorage.app",
  messagingSenderId: "37906944322",
  appId: "1:37906944322:web:dac7f8edbe7950cc3938db",
  measurementId: "G-TKJR7G1TSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
