import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./ui/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Hero from "./ui/Hero";
import BookRoom from "./ui/BookRoom";
import useGetAllRooms from "@/hooks/useGetAllRooms";
import useGetAvailableRooms from "@/hooks/useGetAvailableRooms";
import AvailableRooms from "./ui/AvailableRooms";
import useGetMyBookings from "@/hooks/useGetMyBookings";
import { setMyBookings } from "@/redux/bookingsSlice";

function Home() {
  useGetAllRooms();
  const dispatch = useDispatch()
  dispatch(setMyBookings(""))
  const { user } = useSelector((store) => store.auth);
  const { availableRooms } = useSelector((store) => store.room);
  const navigate = useNavigate();


  useEffect(() => {
    if (user?.role === "owner") {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <Hero /> {/* Keeping the Hero section as is */}
      
      {/* Customer Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Customer Testimonials</h2>
        <div className="flex justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <p className="text-lg italic">"Absolutely amazing! The staff was super friendly, and the room was spotless. Highly recommend!"</p>
            <p className="mt-4 text-gray-700">- John Doe</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <p className="text-lg italic">"A great stay. Will definitely be coming back for my next vacation!"</p>
            <p className="mt-4 text-gray-700">- Jane Smith</p>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="bg-blue-500 text-white py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Special Offers</h2>
        <div className="flex justify-center gap-8">
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-80">
            <h3 className="text-xl font-bold mb-4">Winter Special</h3>
            <p className="text-lg mb-4">Book your stay now and get 20% off for bookings made in December!</p>
            <a href="/rooms" className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Book Now</a>
          </div>
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-80">
            <h3 className="text-xl font-bold mb-4">Weekend Getaway</h3>
            <p className="text-lg mb-4">Enjoy a relaxing weekend at our guest house with a 10% discount on Friday and Saturday stays.</p>
            <a href="/rooms" className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Book Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
