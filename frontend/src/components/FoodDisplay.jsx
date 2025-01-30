import React, { useState } from "react";
import add1 from "../../public/add_icon_white.png";
import add2 from "../../public/add_icon_green.png";
import remove from "../../public/remove_icon_red.png";
import { useSelector } from "react-redux";
import axios from "axios";

const FoodDisplay = ({ item }) => {
  const [cartItems, setCartItems] = useState({}); // Use an object to track item counts
  const { user } = useSelector((store) => store.auth);

  const addToCart = async () => {
    setCartItems((prev) => ({
      ...prev, [item._id]: (prev[item._id] || 0) + 1, // Increment item count or initialize it to 1
    }));
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/menu/cart/add',
         { userId:user.id, foodId:item._id },
         { withCredentials: true }
    )
      if (response.status === 200 ){
        alert('Item Added To Cart')
        console.log('Updated Cart:', response.data.cart);
      } 
    } catch (error) {
      console.log("error adding item to cart:", error.response?.data || error.message );
      alert('Failed to add items')
    }
  };

  const removeFromCart = async () => {
    setCartItems((prev) => {
      if (prev[item._id] > 1) {
        return { ...prev, [item._id]: prev[item._id] - 1 }; // Decrement item count
      } else {
        const updatedItems = { ...prev };
        delete updatedItems[item._id]; // Remove item from cart if count reaches 0
        return updatedItems;
      }
    });
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/menu/cart/remove',
         { userId:user.id, foodId:item._id },
         { withCredentials: true }
    )
      if (response.status === 200 ){
        alert('Item Removed From Cart')
        console.log('Updated Cart:', response.data.cart);
      } 
    } catch (error) {
      console.log("error adding item to cart:", error.response?.data || error.message );
      alert('Failed to add items')
    }
  };

  const itemCount = cartItems[item._id] || 0; // Get the count for this specific item

  return (
    <div className="max-w-sx bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        {/* <pre className="absolute top-2 left-2 bg-gray-200 p-2 rounded-md text-xs">
            {JSON.stringify(cartItems, null, 2)}
        </pre> */}

        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={item.imageUrl}
          alt=""
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-white p-1 rounded-lg shadow-md">
          {!itemCount ? (
            <img
              className="cursor-pointer w-6 h-6"
              src={add1}
              alt="Add"
              onClick={addToCart}
            />
          ) : (
            <div className="flex items-center gap-2">
              <img
                className="cursor-pointer w-6 h-6"
                src={remove}
                alt="Remove"
                onClick={removeFromCart}
              />
              <p className="text-sm font-semibold">{itemCount}</p>
              <img
                className="cursor-pointer w-6 h-6"
                src={add2}
                alt="Add"
                onClick={addToCart}
              />
            </div>
          )}
        </div>
      </div>

      <div className="py-5 px-3">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.name}
          </h5>
        </div>
        <p className="mb-3 font-normal leading-none text-gray-700 dark:text-gray-400">
          {item.description}
        </p>
        <div>
          <button className="bg-green-400 text-white px-2 rounded-full">
            {item.category}
          </button>
        </div>
        <h2 className="text-orange-500 font-semibold my-2 text-2xl">
          ${item.price}
        </h2>
      </div>
    </div>
  );
};

export default FoodDisplay;
