import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Products = () => {

  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 4;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
  fetch("http://localhost:3000/products")
    .then(res => res.json())
    .then(data => {
      setTotalProducts(data.length)

      const start = (page - 1) * productsPerPage
      const end = start + productsPerPage

      setProduct(data.slice(start, end))
    })
    .catch(err => console.log(err))
}, [page])

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleDelete = (id) => {
    if (!user) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setProduct(product.filter(item => item.id !== id));
      setTotalProducts(prev => prev - 1);
    });
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-10 text-center">

        <h1 className="text-4xl font-bold text-white mb-10">
          ✨ Premium Product Store
        </h1>

        <div className="flex justify-center gap-8 flex-wrap">
          {product.map((el) => (
            <div
              key={el.id}
              className="w-56 bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-white shadow-2xl"
            >
              <img
                src={el.image}
                alt=""
                className="w-full h-36 object-contain mb-3"
              />

              <h4 className="font-semibold">
                {el.title.slice(0, 20)}...
              </h4>

              <p className="mt-2 font-bold">₹ {el.price}</p>

              <p className="text-sm mt-1">
                ⭐ {el.rating?.rate} ({el.rating?.count})
              </p>

              <div className='flex gap-8 mt-4 justify-center'>
                <button
                  onClick={() => {
                    if (!user) {
                      alert("Login Required ");
                      navigate("/login");
                      return;
                    }
                    navigate(`/editproducts/${el.id}`);
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(el.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center items-center gap-6">
          <button
            onClick={() => {
              if (page > 1) setPage(prev => prev - 1);
            }}
            disabled={page === 1}
            className="px-6 py-2 rounded-full bg-white font-bold disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-white text-lg font-bold">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => {
              if (page < totalPages) setPage(prev => prev + 1);
            }}
            disabled={page >= totalPages}
            className="px-6 py-2 rounded-full bg-white font-bold disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  )
}

export default Products;