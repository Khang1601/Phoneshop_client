
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export  const handleGoogleLogin = async () =>{
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    return await signInWithPopup(auth,provider)
  }

  //congif firebase
  const firebaseConfig = {


    apiKey: "AIzaSyAR6BvrpowsVvKi1P4ctVJ-pTmoWOfsfFo",
    authDomain: "md5-save-image.firebaseapp.com",
    projectId: "md5-save-image",
    storageBucket: "md5-save-image.appspot.com",
    messagingSenderId: "24598478302",
    appId: "1:24598478302:web:4af99756cfc1866bfbf14f",
    measurementId: "G-9BJ2LBWVFE"
  };

  export default {
    handleGoogleLogin
  }
  const app = initializeApp(firebaseConfig);
  
