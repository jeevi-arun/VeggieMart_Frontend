import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedKg, setSelectedKg] = useState(2);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://veggiemart-backend.onrender.com/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6 text-gray-500">Loading...</p>;

  const calculatedPrice = (product.price * selectedKg).toFixed(2);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: selectedKg });
    alert(`${product.name} (${selectedKg} kg) added to cart!`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img src={product.image} alt={product.name} className="w-full rounded shadow" />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          {product.bestSeller && <p className="text-red-500 font-semibold mb-2">Best Seller</p>}
          <p className="text-lg mb-4">{product.description}</p>
          {product.nutrition && <p className="text-green-700 font-semibold mb-4">Nutrition: {product.nutrition}</p>}

          <div className="mb-4">
            <label className="mr-2 font-semibold">Select kg:</label>
            <select
              value={selectedKg}
              onChange={(e) => setSelectedKg(Number(e.target.value))}
              className="border p-1 rounded"
            >
              {[...Array(5)].map((_, i) => {
                const value = 0.5 + i * 0.5;
                return <option key={value} value={value}>{value} kg</option>;
              })}
            </select>
          </div>

          <p className="text-xl font-bold mb-4">Rs.{calculatedPrice}</p>

          {product.available ? (
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition mr-2"
            >
              Add to Cart
            </button>
          ) : (
            <button disabled className="bg-gray-400 text-white px-6 py-3 rounded cursor-not-allowed mr-2">
              Out of Stock
            </button>
          )}

          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition mt-2"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
