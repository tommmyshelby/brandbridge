import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "./utils/constants.js";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "./shared/Navbar.jsx";
import { toast } from "sonner";

const BrandMyProfile = () => {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBrand, setEditedBrand] = useState(null);

  useEffect(() => {
    fetchBrandProfile();
  }, []);

  const fetchBrandProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${USER_API_END_POINT}/brand/getMyProfile`, { withCredentials: true });
      if (response.data.success) {
        setBrand(response.data.brand);
        setEditedBrand(response.data.brand);
      } else {
        setError("Failed to fetch brand profile.");
      }
    } catch (error) {
      console.error("Error fetching brand profile: ", error);
      setError("Error fetching brand profile. Please try again.");
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
        `${USER_API_END_POINT}/brand/updateProfile`,
        editedBrand,
        { withCredentials: true }
      );
      if (response.data.success) {
        setBrand(response.data.brand);
        setIsEditing(false);
        toast("Brand profile updated successfully");
        setError(null);
      } else {
        setError("Failed to update brand profile: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating brand profile: ", error.response?.data || error.message);
      setError("Error updating brand profile. Please try again. " + (error.response?.data?.message || error.message));
    }
  };

  const handleCancel = () => {
    setEditedBrand(brand);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBrand((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading brand profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!brand) return <p>No brand profile found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Brand Profile</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <h3 className="text-xl font-semibold">
              {isEditing ? (
                <Input
                  name="brandName"
                  value={editedBrand.brandName}
                  onChange={handleInputChange}
                  className="text-xl font-semibold"
                />
              ) : (
                brand.brandName
              )}
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="font-bold">Website URL:</label>
                  <Input
                    name="websiteUrl"
                    value={editedBrand.websiteUrl}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Contact Person:</label>
                  <Input
                    name="contactPerson"
                    value={editedBrand.contactPerson}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Contact Email:</label>
                  <Input
                    name="contactEmail"
                    value={editedBrand.contactEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Contact Number:</label>
                  <Input
                    name="contactNumber"
                    value={editedBrand.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Industry:</label>
                  <Input
                    name="industry"
                    value={editedBrand.industry}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Location:</label>
                  <Input
                    name="location"
                    value={editedBrand.location}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : (
              <>
                <p><strong>Website URL:</strong> {brand.websiteUrl}</p>
                <p><strong>Contact Person:</strong> {brand.contactPerson}</p>
                <p><strong>Contact Email:</strong> {brand.contactEmail}</p>
                <p><strong>Contact Number:</strong> {brand.contactNumber}</p>
                <p><strong>Industry:</strong> {brand.industry}</p>
                <p><strong>Location:</strong> {brand.location}</p>
                <p><strong>Created At:</strong> {new Date(brand.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(brand.updatedAt).toLocaleString()}</p>
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

export default BrandMyProfile;