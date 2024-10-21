import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT_GIG } from "./utils/constants.js";

const MyGigs = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      setError(null);

      axios
        .get(`${USER_API_END_POINT_GIG}/getUserGigs/${userId}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.success) {
            setGigs(response.data.gigs);
          } else {
            setError("Failed to fetch gigs. Please try again.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching gigs: ", error);
          setError("Error fetching gigs. Please try again.");
          setLoading(false);
        });
    }
  }, [userId]);

  if (!userId) {
    return <p>Loading user information...</p>;
  }

  if (loading) {
    return <p>Loading gigs...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (gigs.length === 0) {
    return <p>No gigs found for your brand.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">My Gigs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gigs.map((gig) => (
            <Card key={gig._id} className="shadow-lg">
              <CardHeader className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{gig.gigTitle}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    gig.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {gig.isActive ? "Active" : "Inactive"}
                </span>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-600">
                  <strong>Category:</strong> {gig.gigCategory}
                </p>
                <p className="text-gray-600">
                  <strong>Budget:</strong> ${gig.gigBudget}
                </p>
                <p className="text-gray-600">
                  <strong>Start Date:</strong>{" "}
                  {new Date(gig.gigStartDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>End Date:</strong>{" "}
                  {new Date(gig.gigEndDate).toLocaleDateString()}
                </p>
              </CardContent>
              <CardContent className="flex justify-end">
                <Button
                  className="bg-black text-white"
                  onClick={() => navigate(`/myGigs/${gig._id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyGigs;
