import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import Navbar from "../shared/Navbar";

const ManageQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/get/contact`, { withCredentials: true });
        console.log(res.data);
        
        if (res.data.success) {
          setQueries(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };
    fetchQueries();

  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Manage Queries
      </h1>
      <div className="overflow-x-auto">
        {queries.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b text-gray-600">#</th>
                <th className="py-3 px-4 border-b text-gray-600">Name</th>
                <th className="py-3 px-4 border-b text-gray-600">Email</th>
                <th className="py-3 px-4 border-b text-gray-600">Message</th>
                <th className="py-3 px-4 border-b text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query, index) => (
                <tr key={query._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b">{query.fullName}</td>
                  <td className="py-3 px-4 border-b">{query.email}</td>
                  <td className="py-3 px-4 border-b">{query.message}</td>
                  <td className="py-3 px-4 border-b">
                    {new Date(query.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-6">No queries found</div>
        )}
      </div>
    </div>
    </>
  );
};

export default ManageQueries;
