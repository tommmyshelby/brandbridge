import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "./utils/constants.js";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";

const InfluencerMyProfile = () => {
  const [influencer, setInfluencer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfluencer, setEditedInfluencer] = useState(null);

  useEffect(() => {
    fetchInfluencerProfile();
  }, []);

  const fetchInfluencerProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${USER_API_END_POINT}/influencer/getMyProfile`, { withCredentials: true });
      if (response.data.success) {
        setInfluencer(response.data.influencer);
        setEditedInfluencer(response.data.influencer);
      } else {
        setError("Failed to fetch influencer profile.");
      }
    } catch (error) {
      console.error("Error fetching influencer profile: ", error);
      setError("Error fetching influencer profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/influencer/updateProfile`,
        editedInfluencer,
        { withCredentials: true }
      );
      if (response.data.success) {
        setInfluencer(response.data.influencer);
        setIsEditing(false);
        toast("Influencer profile updated successfully");
        setError(null);
      } else {
        setError("Failed to update influencer profile: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating influencer profile: ", error.response?.data || error.message);
      setError("Error updating influencer profile. Please try again. " + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setEditedInfluencer(influencer);
    setIsEditing(false);
  };

const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Handle nested object updates
  setEditedInfluencer(prev => {
    const keys = name.split(".");
    if (keys.length > 1) {
      // If it's a nested field, like socialMedia.instagram
      return {
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]], // Ensure the rest of socialMedia remains intact
          [keys[1]]: value
        }
      };
    } else {
      // If it's a top-level field, like fullName or bio
      return {
        ...prev,
        [name]: value
      };
    }
  });
};


  if (loading) return <p>Loading influencer profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!influencer) return <p>No influencer profile found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Influencer Profile</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <h3 className="text-xl font-semibold">
              {isEditing ? (
                <Input
                  name="fullName"
                  value={editedInfluencer.fullName}
                  onChange={handleInputChange}
                  className="text-xl font-semibold"
                />
              ) : (
                influencer.fullName
              )}
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="font-bold">Bio:</label>
                  <Textarea
                    name="bio"
                    value={editedInfluencer.bio}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Instagram:</label>
                  <Input
                    name="socialMedia.instagram"
                    value={editedInfluencer.socialMedia.instagram}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Twitter:</label>
                  <Input
                    name="socialMedia.twitter"
                    value={editedInfluencer.socialMedia.twitter}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Facebook:</label>
                  <Input
                    name="socialMedia.facebook"
                    value={editedInfluencer.socialMedia.facebook}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">LinkedIn:</label>
                  <Input
                    name="socialMedia.linkedin"
                    value={editedInfluencer.socialMedia.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">YouTube:</label>
                  <Input
                    name="socialMedia.youtube"
                    value={editedInfluencer.socialMedia.youtube}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Contact Number:</label>
                  <Input
                    name="contactNumber"
                    value={editedInfluencer.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Location:</label>
                  <Input
                    name="location"
                    value={editedInfluencer.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Date of Birth:</label>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    value={editedInfluencer.dateOfBirth?.split('T')[0]}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : (
              <>
                <p><strong>Bio:</strong> {influencer.bio}</p>
                <p><strong>Instagram:</strong> {influencer.socialMedia.instagram}</p>
                <p><strong>Twitter:</strong> {influencer.socialMedia.twitter}</p>
                <p><strong>Facebook:</strong> {influencer.socialMedia.facebook}</p>
                <p><strong>LinkedIn:</strong> {influencer.socialMedia.linkedin}</p>
                <p><strong>YouTube:</strong> {influencer.socialMedia.youtube}</p>
                <p><strong>Contact Number:</strong> {influencer.contactNumber}</p>
                <p><strong>Location:</strong> {influencer.location}</p>
                <p><strong>Date of Birth:</strong> {new Date(influencer.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Created At:</strong> {new Date(influencer.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(influencer.updatedAt).toLocaleString()}</p>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-zinc-900 text-white">Save Changes</Button>
              <Button variant="secondary" className="bg-zinc-900 text-white" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button className="bg-zinc-900 text-white" onClick={handleEdit}>
              Edit Profile
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default InfluencerMyProfile;