import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import axios from "axios";
import { USER_API_END_POINT_GIG } from "./utils/constants.js"; // Ensure this path is correct

const AllGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // flag to check if component is mounted

    setLoading(true);
    setError(null);

    axios
      .get(`${USER_API_END_POINT_GIG}/getAllGigs`, { 
        withCredentials: true,
      })
      .then((response) => {
        if (isMounted) {
          if (response.data.success) {
            setGigs(response.data.gigs);
          } else {
            setError("Failed to fetch gigs. Please try again.");
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("Error fetching gigs: ", error);
          setError("Error fetching gigs. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; // Cleanup function to set flag false
    };
  }, []);

  if (loading) {
    return <p>Loading gigs...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (gigs.length === 0) {
    return <p>No active gigs available at the moment.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">All Active Gigs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gigs.map((gig) => {
         
            const startDate = new Date(gig.gigStartDate);
            const endDate = new Date(gig.gigEndDate);

            return (
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
                    <strong>Brand:</strong> {gig.brandId} {/* Adjust as needed */}
                  </p>
                  <p className="text-gray-600">
                    <strong>Budget:</strong> ${gig.gigBudget}
                  </p>
                  <p className="text-gray-600">
                    <strong>Category:</strong> {gig.gigCategory}
                  </p>
                  <p className="text-gray-600">
                    <strong>Start Date:</strong>{startDate.toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>End Date:</strong>{endDate.toLocaleDateString()}
                   
                  </p>
                </CardContent>
                <CardContent className="flex justify-end">
                  <Button
                    className="bg-black text-white"
                    onClick={() => navigate(`/gigDetails/${gig._id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AllGigs;
