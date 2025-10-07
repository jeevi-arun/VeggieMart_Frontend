import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart = [], setCart } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [cart]);

  const updateQuantity = (id, quantity) => {
    if (quantity < 0.5) quantity = 0.5;
    setCart(cart.map(item => item._id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) return <p className="p-6 text-gray-500">Your cart is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col gap-4">
        {cart.map(item => (
          <div key={item._id} className="flex items-center justify-between border-b py-4 flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-1">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded object-cover"/>
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-green-700">Rs.{item.price}/kg</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label>
                Qty:
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                  className="w-16 ml-2 p-1 border rounded"
                />
              </label>
              <p className="w-24 text-right font-semibold">
                Rs.{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500 font-semibold ml-2 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 p-4 border rounded shadow">
          <p className="text-xl font-bold">Subtotal: Rs.{subtotal.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
