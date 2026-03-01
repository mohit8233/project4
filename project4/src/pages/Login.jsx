
 import React, { useState } from "react";
 import Navbar from "../components/Navbar";
 import { auth } from "../firebase";
 import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup
 } from "firebase/auth";
 import { useNavigate } from "react-router-dom";

 const LoginSignup = () => {

   const [isLogin, setIsLogin] = useState(true);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   // 🔹 Email Login / Signup
   const handleSubmit = async () => {
     if (!email || !password) {
       alert("Please fill all fields");
       return;
     }

     try {
       if (isLogin) {
         await signInWithEmailAndPassword(auth, email, password);
         alert("Login Successful ✅");
         navigate("/");
       } else {
         await createUserWithEmailAndPassword(auth, email, password);
         alert("Account Created ✅");
         setIsLogin(true);
       }
     } catch (error) {
       alert(error.message);
     }
   };

 // 🔹 Google Login
   const handleGoogleLogin = async () => {
     if (loading) return;

     setLoading(true);

     try {
       const provider = new GoogleAuthProvider();
       await signInWithPopup(auth, provider);

       alert("Google Login Successful ✅");
       navigate("/");

     } catch (error) {
       console.log(error.code);
     }
    setLoading(false);
   };

  return (
    <>
       <Navbar />

       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300">
        <div className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl shadow-2xl w-96 border border-white/40">

          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
           {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
         </h2>

           <p className="text-center text-gray-600 mb-6 text-sm">
             {isLogin ? "Login to continue" : "Sign up to get started"}
        </p>

           {!isLogin && (
           <input
              type="text"
              placeholder="Full Name"
             onChange={(e) => setName(e.target.value)}
               className="w-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none p-3 mb-4 rounded-lg transition"
             />
           )}

           <input
             type="email"
             placeholder="Email Address"
             onChange={(e) => setEmail(e.target.value)}
             className="w-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none p-3 mb-4 rounded-lg transition"
           />

           <input
             type="password"
             placeholder="Password"
             onChange={(e) => setPassword(e.target.value)}
           className="w-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none p-3 mb-6 rounded-lg transition"
           />

           <button
             onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition duration-300 shadow-md"
           >
             {isLogin ? "Login" : "Sign Up"}
           </button>

           <div className="flex items-center my-6">
             <div className="flex-1 h-px bg-gray-300"></div>
             <span className="px-3 text-gray-500 text-sm">OR</span>
             <div className="flex-1 h-px bg-gray-300"></div>
           </div>


           <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"

             onClick={handleGoogleLogin}
           disabled={loading}
           >
             Continue with Google
           </button>

          <p className="text-center mt-6 text-sm text-gray-600">
             {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 font-semibold cursor-pointer ml-2 hover:underline"
             >
               {isLogin ? "Sign Up" : "Login"}
             </span>
           </p>
         </div>
       </div>
     </>
  );
 };

export default LoginSignup;











