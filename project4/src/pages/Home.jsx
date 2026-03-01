import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />

   
      <section className="h-[90vh] flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to MyStore 🛍️
        </h1>

        <p className="text-xl mb-8 max-w-2xl">
          Discover the best products at unbeatable prices. 
          Shop smart, shop easy, shop with confidence.
        </p>

        <Link
          to="/products"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </section>

   
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-8 px-8">
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">🚚 Fast Delivery</h3>
            <p>Get your products delivered quickly and safely.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">💳 Secure Payment</h3>
            <p>100% secure and trusted payment methods.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">⭐ Premium Quality</h3>
            <p>We provide only high-quality and verified products.</p>
          </div>

        </div>
      </section>

    
      <footer className="bg-black text-white text-center py-4">
        © 2026 MyStore. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;