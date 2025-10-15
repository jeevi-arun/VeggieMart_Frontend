import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-600 mb-6">You haven’t placed any orders yet.</p>
        <a
          href="/"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow-md bg-white">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">Order ID: {order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>

            <p>
              Status:{" "}
              <span className="text-green-700 font-semibold">{order.status}</span>
            </p>

            <hr className="my-3" />

            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <p>
                    {item.name} × {item.quantity}
                  </p>
                  <p>Rs.{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <hr className="my-3" />

            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">
                Total: Rs.{order.totalAmount.toFixed(2)}
              </p>
              <p className="text-gray-600">
                Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : "Card"}
              </p>
            </div>

            <div className="mt-3 text-sm text-gray-700">
              <p>
                <strong>Address:</strong> {order.shippingInfo.address},{" "}
                {order.shippingInfo.city} - {order.shippingInfo.pincode}
              </p>
              <p>
                <strong>Phone:</strong> {order.shippingInfo.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
