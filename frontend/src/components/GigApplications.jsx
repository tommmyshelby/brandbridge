import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { USER_API_END_POINT_APPLICATION } from "./utils/constants";
import Navbar from "./shared/Navbar";

// Modal Component
const InfluencerModal = ({ influencer, onClose }) => {
  if (!influencer) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-2xl font-semibold mb-4">Influencer Details</h3>
        <p className="mb-2"><strong className="font-medium">Full Name:</strong> {influencer.fullName}</p>
        <p className="mb-2"><strong className="font-medium">Bio:</strong> {influencer.bio}</p>
        <p className="mb-2"><strong className="font-medium">Contact Number:</strong> {influencer.contactNumber}</p>
        <p className="mb-2"><strong className="font-medium">Location:</strong> {influencer.location}</p>
        <p className="mb-4"><strong className="font-medium">Date of Birth:</strong> {new Date(influencer.dateOfBirth).toLocaleDateString()}</p>
        
        <p className="font-medium mb-2">Social Media:</p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          {influencer.socialMedia.instagram && (
            <li>
              <strong>Instagram:</strong> 
              <a
                href={`https://${influencer.socialMedia.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {influencer.socialMedia.instagram}
              </a>
            </li>
          )}
          {influencer.socialMedia.twitter && (
            <li>
              <strong>Twitter:</strong> 
              <a
                href={`https://${influencer.socialMedia.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {influencer.socialMedia.twitter}
              </a>
            </li>
          )}
          {influencer.socialMedia.facebook && (
            <li>
              <strong>Facebook:</strong> 
              <a
                href={`https://${influencer.socialMedia.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {influencer.socialMedia.facebook}
              </a>
            </li>
          )}
          {influencer.socialMedia.linkedin && (
            <li>
              <strong>LinkedIn:</strong> 
              <a
                href={`https://${influencer.socialMedia.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {influencer.socialMedia.linkedin}
              </a>
            </li>
          )}
          {influencer.socialMedia.youtube && (
            <li>
              <strong>YouTube:</strong> 
              <a
                href={`https://${influencer.socialMedia.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {influencer.socialMedia.youtube}
              </a>
            </li>
          )}
        </ul>
        
        <Button onClick={onClose} className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white">
          Close
        </Button>
      </div>
    </div>
  );
};

const GigApplications = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${USER_API_END_POINT_APPLICATION}/getGigApplications/${id}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setApplications(response.data.gigApplications);
        } else {
          setError("Failed to fetch applications.");
        }
      } catch (error) {
        console.error("Error fetching applications: ", error);
        setError("Error fetching applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  const handleStatusChange = async (applicationId, status) => {
    try {
      const response = await axios.post(
        `${USER_API_END_POINT_APPLICATION}/updateStatus`,
        {
          applicationId,
          status,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          )
        );
        toast(
          `${
            status.charAt(0).toUpperCase() + status.slice(1)
          } application successfully`
        );
      } else {
        setError("Failed to update application status.");
      }
    } catch (error) {
      console.error("Error updating application status: ", error);
      setError("Error updating application status. Please try again.");
    }
  };

  const handleViewInfluencer = (influencer) => {
    setSelectedInfluencer(influencer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInfluencer(null);
  };

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Gig Applications</h2>
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          applications.map((application) => (
            <Card key={application._id} className="mb-4 shadow-lg">
              <CardHeader className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  Application from {application.influencerId.fullName}
                </h3>
                <div className="flex items-center space-x-2">
                  <Button className="bg-slate-300 text-slate-900" onClick={() => handleViewInfluencer(application.influencerId)}>
                    View Influencer
                  </Button>
                  <span
                    className={`text-sm  font-semibold ${
                      application.status === "approved"
                        ? "text-green-500"
                        : application.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {application.status.charAt(0).toUpperCase() +
                      application.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Applied Date:</strong>{" "}
                  {new Date(application.appliedDate).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-4">
                  <Button
                  className="bg-green-100 text-green-900 shadow-lg"
                    onClick={() =>
                      handleStatusChange(application._id, "approved")
                    }
                  >
                    Approve
                  </Button>
                  <Button
                  className="bg-red-100 text-red-900 shadow-lg"
                    variant="destructive"
                    onClick={() =>
                      handleStatusChange(application._id, "rejected")
                    }
                  >
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </main>
      {isModalOpen && (
        <InfluencerModal influencer={selectedInfluencer} onClose={closeModal} />
      )}
    </div>
  );
};

export default GigApplications;
