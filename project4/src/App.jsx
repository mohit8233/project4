import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import Login from './pages/Login'


const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<Products/>} />
          
          {/* Add Product */}
          <Route path='/addproducts' element={<AddProduct/>} />

          {/* Edit Product */}
          <Route path='/editproducts/:id' element={<AddProduct/>} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
    </div>
  )
}

export default App