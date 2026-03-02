import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // ✅ If ID present → Fetch existing product
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setPrice(data.price);
          setImage(data.image);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      price: Number(price),
      image
    };

    if (id) {
      // ✅ UPDATE
      fetch(`http://localhost:3000/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      })
        .then(() => {
          alert("Product Updated ✅");
          navigate("/products");
        });
    } else {
      // ✅ ADD
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      })
        .then(() => {
          alert("Product Added ✅");
          navigate("/products");
        });
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-4/5"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {id ? "Update Product" : "Add Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 mb-4 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 mb-4 rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded font-semibold"
        >
          {id ? "Update Product" : "Add Product"}
        </button>

      </form>

    </div>
    </>

  );
};

export default AddProduct;