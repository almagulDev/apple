import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCuPTklNzEiGwJDWrAxT7p4OINoM3pWqs",
  authDomain: "apple-628cb.firebaseapp.com",
  projectId: "apple-628cb",
  storageBucket: "apple-628cb.firebasestorage.app",
  messagingSenderId: "344630956861",
  appId: "1:344630956861:web:967d35e7d669cf90f72b54",
};

//firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
