import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

export default function CheckoutPage() {
  const { cart = [], setCart } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [user, setUser] = useState(null); // Track logged-in user
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    paymentMethod: "cod",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const navigate = useNavigate();

  //  Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  //  Calculate subtotal and delivery fee
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(total);
    setDeliveryFee(total > 1000 ? 0 : 50); // Free delivery if subtotal > 1000
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!user) {
      alert("⚠️ Please sign in to place your order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) return alert("Your cart is empty!");

    setOrderPlaced(true);
    setCart([]);
    localStorage.removeItem("cart");
  };

  if (orderPlaced) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">✅ Order Confirmed!</h1>
        <p className="mb-4">
          Thank you, {user?.email || "Customer"}! Your order has been placed successfully.
        </p>
       

        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/*  Shipping & Payment Form */}
        <form
          className="flex-1 p-4 border rounded shadow flex flex-col gap-4"
          onSubmit={handlePlaceOrder}
        >
          <h2 className="text-xl font-bold mb-2">Shipping Information</h2>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="border p-2 rounded"/>
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="border p-2 rounded"/>
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="border p-2 rounded"/>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className="border p-2 rounded"/>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="border p-2 rounded"/>

          <h2 className="text-xl font-bold mt-4 mb-2">Payment Method</h2>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="border p-2 rounded">
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
          </select>

          {formData.paymentMethod === "card" && (
            <div className="flex flex-col gap-2">
              <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="Card Number" className="border p-2 rounded" required />
              <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="Expiry MM/YY" className="border p-2 rounded" required />
              <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV" className="border p-2 rounded" required />
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition mt-4"
          >
            Place Order
          </button>
        </form>

        {/*  Order Summary */}
        <div className="md:w-1/3 p-4 border rounded shadow flex flex-col gap-2">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cart.map(item => (
            <div key={item._id} className="flex justify-between">
              <p>{item.name} × {item.quantity}</p>
              <p>Rs.{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <hr className="my-2" />
          <p>Subtotal: Rs.{subtotal.toFixed(2)}</p>
          <p>
            Delivery:{" "}
            {deliveryFee === 0 ? (
              <span className="text-green-600 font-semibold">Free</span>
            ) : (
              `Rs.${deliveryFee}`
            )}
          </p>
          <p className="font-bold text-lg">Total: Rs.{(subtotal + deliveryFee).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
