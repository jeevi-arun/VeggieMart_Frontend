import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
 

  return (

    
    <div className="max-w-7xl mx-auto p-6">
      

     {/* Hero Section */}
<div
  className="h-[70vh] bg-cover bg-top flex flex-col   text-center text-white"
  style={{
    backgroundImage:
      "url('https://www.antarnaad.net/app/docs/20240314121138650.jpg')",
  }}
>

  <div className="relative z-10 p-6 rounded-lg ">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
      Fresh from the Farm to Your Home
    </h1>
    <p className="text-lg md:text-2xl mb-6 drop-shadow-md">
      100% organic fruits & vegetables delivered daily.
    </p>
    <Link
      to="/products"
      className="bg-green-600 px-6 py-3 rounded-lg text-white font-semibold hover:bg-green-700 transition"
    >
      Shop Now
    </Link>
  </div>
</div>



       {/* Captions Section */}
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <img
            src="https://img.icons8.com/color/96/000000/organic-food.png"
            alt="Naturally Grown"
            className="mx-auto mb-4 w-16 h-16"
          />
          <h3 className="text-xl font-semibold">Naturally Grown</h3>
          <p className="text-gray-600 mt-2">
            Fresh produce nurtured without harmful chemicals.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <img
            src="https://img.icons8.com/color/96/000000/tractor.png"
            alt="Partner Farms"
            className="mx-auto mb-4 w-16 h-16"
          />
          <h3 className="text-xl font-semibold">Direct from Partner Farms</h3>
          <p className="text-gray-600 mt-2">
            Supporting local farmers through fair-trade sourcing.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <img
            src="https://img.icons8.com/color/96/000000/checked--v1.png"
            alt="Quality Checked"
            className="mx-auto mb-4 w-16 h-16"
          />
          <h3 className="text-xl font-semibold">Quality Checked</h3>
          <p className="text-gray-600 mt-2">
            Every batch inspected for freshness and safety.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <img
            src="https://img.icons8.com/color/96/000000/leaf.png"
            alt="Sustainably Farmed"
            className="mx-auto mb-4 w-16 h-16"
          />
          <h3 className="text-xl font-semibold">Sustainably Farmed</h3>
          <p className="text-gray-600 mt-2">
            Eco-friendly practices that protect our planet.
          </p>
        </div>
      </div>


     {/* CTA Section */}
<div className="py-12 px-4 md:px-6 bg-green-50">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
    
    {/* Image Section  */}
    <div className="flex-1 flex justify-center md:justify-start">
      <img
        src="https://www.atlantaparent.com/wp-content/uploads/2020/03/iStock-1214541379-scaled.jpg"
        alt="Fresh Vegetables"
        className="w-full max-w-md shadow-lg rounded-lg"
      />
    </div>

    {/* Text Section  */}
    <div className="flex-1 text-center md:text-left md:order-2">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Join 10,000+ Happy Customers
      </h2>
      <h4 className="mb-4 md:mb-6 text-lg md:text-xl font-semibold">
        Naturally grown, hand-picked, and delivered to your doorstep
      </h4>
      <p className="mb-6 text-base md:text-lg">
        Experience the joy of fresh, organic produce every day.
      </p>
      <Link
        to="/products"
        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Explore Products
      </Link>
    </div>
  </div>
</div>


 








      
      </div>
  
  );
}
