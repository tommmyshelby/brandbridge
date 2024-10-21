import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "./utils/constants.js";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const AppliedGigsPage = () => {
  const [appliedGigs, setAppliedGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchAppliedGigs();
  }, []);

  const fetchAppliedGigs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${USER_API_END_POINT}/influencer/getAppliedGigs`, { withCredentials: true });
      if (response.data.success) {
        setAppliedGigs(response.data.appliedGigs);
      } else {
        setError("Failed to fetch applied gigs.");
      }
    } catch (error) {
      console.error("Error fetching applied gigs: ", error);
      setError("Error fetching applied gigs. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-200 text-green-800';
      case 'rejected':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-yellow-200 text-yellow-800';
    }
  };

  if (loading) return <p>Loading applied gigs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!appliedGigs.length) return <p>No gigs applied yet.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Applied Gigs</h2>
        {appliedGigs.map((application) => (
          <Card
            key={application._id}
            className={`shadow-lg mb-4 p-4 ${getStatusColor(application.status)}`}
          >
            <CardHeader>
              <h3 className="text-xl font-semibold">{application.gigId.gigTitle}</h3>
            </CardHeader>
            <CardContent>
              <p><strong>Description:</strong> {application.gigId.gigDescription}</p>
              <p><strong>Application Date:</strong> {new Date(application.appliedDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {application.status}</p> 
            
             
              <Button
                    className="mt-5 shadow-lg bg-white text-black"
                    onClick={() => navigate(`/gigDetails/${application.gigId._id}`)}
                  >
                    View Details
                  </Button>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default AppliedGigsPage;
