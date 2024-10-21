import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT_APPLICATION, USER_API_END_POINT_GIG } from "./utils/constants.js";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (id) {
      fetchGigDetails();
    }
  }, [id]);

  const fetchGigDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${USER_API_END_POINT_GIG}/getGig/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setGig(response.data.gig);
      } else {
        setError("Failed to fetch gig details.");
      }
    } catch (error) {
      console.error("Error fetching gig details: ", error);
      setError("Error fetching gig details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkGig = async () => {
    try {
      const response = await axios.post(
        `${USER_API_END_POINT_GIG}/bookmarkGig`,
        { gigId: id },
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsBookmarked(true);
        toast.success("Gig bookmarked successfully!");
      } else {
        toast.error("Failed to bookmark gig.");
      }
    } catch (error) {
      console.error("Error bookmarking gig: ", error);
      toast.error("Error bookmarking gig.");
    }
  };

  const handleApplyGig = async () => {
    try {
      const response = await axios.post(
        `${USER_API_END_POINT_APPLICATION}/apply`,
        { gigId: id },
        { withCredentials: true }
      );
      if (response.data.success) {
        if (response.data.message === "You have already applied for this gig") {
          toast.error("You have already applied for this gig.", {
            style: { backgroundColor: "#DC2626", color: "white" }, // Red background
          });
        } else {
          setHasApplied(true);
          toast.success("Applied to the gig successfully!");
        }
      } else {
        toast.error("Failed to apply for gig.");
      }
    } catch (error) {
      console.error("Error applying for gig: ", error);
      toast.error("Error applying for gig.");
    }
  };
  

  if (!id) return <p>No gig ID provided.</p>;
  if (loading) return <p>Loading gig details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!gig) return <p>No gig found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Gig Details</h2>
        <Card className="shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{gig.gigTitle}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Active</span>
              <span className={`text-sm ${gig.isActive ? "text-green-500" : "text-red-500"}`}>
                {gig.isActive ? "Yes" : "No"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p><strong>Category:</strong> {gig.gigCategory}</p>
            <p><strong>Description:</strong> {gig.gigDescription}</p>
            <p><strong>Target Age Group:</strong> {gig.targetAgeGroup}</p>
            <p><strong>Target Gender:</strong> {gig.targetGender}</p>
            <p><strong>Min Engagement Rate:</strong> {gig.minEngagementRate}%</p>
            <p><strong>Min Follower Count:</strong> {gig.minFollowerCount}</p>
            <p><strong>Expectations:</strong> {gig.expectations}</p>
            <p><strong>Budget:</strong> ${gig.gigBudget}</p>
            <p><strong>Start Date:</strong> {new Date(gig.gigStartDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(gig.gigEndDate).toLocaleDateString()}</p>
            <p><strong>Created At:</strong> {new Date(gig.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(gig.updatedAt).toLocaleString()}</p>
          </CardContent>
        </Card>
        <div className="mt-4 space-x-2">
          {user && user.role === 'influencer' && !hasApplied && (
            <Button className="bg-zinc-900 text-white" onClick={handleApplyGig}>
              Apply to Gig
            </Button>
          )}

          {user && user.role === 'influencer' && hasApplied && (
            <Button className="bg-green-500 text-white" disabled>
              Applied
            </Button>
          )}

          <Button className="bg-zinc-900 text-white" onClick={() => navigate("/allGigs")}>
            Back to Gigs
          </Button>
        </div>
      </main>
    </div>
  );
};

export default GigDetails;
