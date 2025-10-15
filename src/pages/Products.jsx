import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    available: false,
    bestSeller: false,
    sort: "",
    search: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search") || "";
    setFilters((prev) => ({ ...prev, search }));
  }, [location.search]);

  const fetchProducts = async () => {
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.available) params.append("available", filters.available);
    if (filters.bestSeller) params.append("bestSeller", filters.bestSeller);
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.search) params.append("search", filters.search);

    try {
      
// /async/await ensures the app waits for the backend API to send the product list before updating the UI with setProducts(data)./ 

const res = await fetch(`https://veggiemart-backend.onrender.com/api/products?${params.toString()}`); 

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({ ...filters, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        {cart.length > 0 && (
          <button
            onClick={() => navigate("/checkout")}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Proceed to Checkout ({cart.length} items)
          </button>
        )}
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap justify-between gap-6 mb-6">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Fruit">Fruit</option>
        </select>

        

        <label>
  <input type="checkbox" name="available" checked={filters.available} onChange={handleFilterChange} /> Available
</label>
<label>
  <input type="checkbox" name="bestSeller" checked={filters.bestSeller} onChange={handleFilterChange} /> Best Seller
</label>


        <select
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded shadow flex flex-col justify-between transform transition duration-300 hover:shadow-xl hover:scale-105 hover:border-green-500"
            >
              <Link to={`/products/${p._id}`} className="block">
                <img src={p.image} alt={p.name} className="w-full h-40 rounded mb-2 object-cover" />
                <h2 className="font-bold text-2xl">{p.name}</h2>
              </Link>
              {p.bestSeller && <p className="text-red-500 font-semibold mt-1">Best Seller</p>}
              <p className="font-semibold mt-1">Rs.{p.price}/kg</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
