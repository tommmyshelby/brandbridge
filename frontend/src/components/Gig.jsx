import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT_GIG } from "./utils/constants.js";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";

const Gig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGig, setEditedGig] = useState(null);

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
        setEditedGig(response.data.gig);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      console.log("Sending update request with data:", { gigId: id,...editedGig });
      const response = await axios.post(
        `${USER_API_END_POINT_GIG}/updateGig`,
        {
          gigId: id,
          ...editedGig,
        },
        { withCredentials: true }
      );
      console.log("Update response:", response.data);
      if (response.data.success) {
        setGig(response.data.gig);
        setIsEditing(false);
        toast("Gig updated successfully");
        setError(null);
      } else {
        setError(
          "Failed to update gig: " + (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error(
        "Error updating gig: ",
        error.response?.data || error.message
      );
      setError(
        "Error updating gig. Please try again. " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  const handleCancel = () => {
    setEditedGig(gig);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${USER_API_END_POINT_GIG}/deleteGig/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate("/mygigs");
      } else {
        setError("Failed to delete gig.");
      }
    } catch (error) {
      console.error("Error deleting gig: ", error);
      setError("Error deleting gig. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked) => {
    console.log("Switch checked:", checked);
    setEditedGig((prev) => ({ ...prev, isActive: checked }));
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
  {isEditing ? (
    <>
      <Input
        name="gigTitle"
        value={editedGig.gigTitle}
        onChange={handleInputChange}
        className="text-xl font-semibold"
      />
      <div className="flex items-center space-x-2">
        <span className="text-sm">Active</span>
        <Switch
          checked={editedGig.isActive}
          onCheckedChange={handleSwitchChange} // Correctly toggle the value in state
          className={`${
            editedGig.isActive ? "bg-green-500" : "bg-red-500"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        />
        <span className="text-sm">
          {editedGig.isActive ? "Yes" : "No"}
        </span>
      </div>
    </>
  ) : (
    <>
      <h3 className="text-xl font-semibold">{gig.gigTitle}</h3>
      <div className="flex items-center space-x-2">
        <span className="text-sm">Active</span>
        <Switch
          checked={gig.isActive}
          className={`${
            gig.isActive ? "bg-green-500" : "bg-red-500"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
          readOnly // Disable editing when not in editing mode
        />
        <span className="text-sm">{gig.isActive ? "Yes" : "No"}</span>
      </div>
    </>
  )}
</CardHeader>

          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="font-bold">Category:</label>
                  <Input
                    name="gigCategory"
                    value={editedGig.gigCategory}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Description:</label>
                  <Textarea
                    name="gigDescription"
                    value={editedGig.gigDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Target Age Group:</label>
                  <Input
                    name="targetAgeGroup"
                    value={editedGig.targetAgeGroup}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Target Gender:</label>
                  <Input
                    name="targetGender"
                    value={editedGig.targetGender}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Min Engagement Rate:</label>
                  <Input
                    name="minEngagementRate"
                    type="number"
                    value={editedGig.minEngagementRate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Min Follower Count:</label>
                  <Input
                    name="minFollowerCount"
                    value={editedGig.minFollowerCount}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Expectations:</label>
                  <Textarea
                    name="expectations"
                    value={editedGig.expectations}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Budget:</label>
                  <Input
                    name="gigBudget"
                    type="number"
                    value={editedGig.gigBudget}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">Start Date:</label>
                  <Input
                    name="gigStartDate"
                    type="date"
                    value={editedGig.gigStartDate.split("T")[0]}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold">End Date:</label>
                  <Input
                    name="gigEndDate"
                    type="date"
                    value={editedGig.gigEndDate.split("T")[0]}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Category:</strong> {gig.gigCategory}
                </p>
                <p>
                  <strong>Description:</strong> {gig.gigDescription}
                </p>
                <p>
                  <strong>Target Age Group:</strong> {gig.targetAgeGroup}
                </p>
                <p>
                  <strong>Target Gender:</strong> {gig.targetGender}
                </p>
                <p>
                  <strong>Min Engagement Rate:</strong> {gig.minEngagementRate}%
                </p>
                <p>
                  <strong>Min Follower Count:</strong> {gig.minFollowerCount}
                </p>
                <p>
                  <strong>Expectations:</strong> {gig.expectations}
                </p>
                <p>
                  <strong>Budget:</strong> ${gig.gigBudget}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(gig.gigStartDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(gig.gigEndDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(gig.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(gig.updatedAt).toLocaleString()}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 space-x-2 flex justify-between" ><div
        className="flex gap-3">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-zinc-900 text-white" >Save Changes</Button>
              <Button variant="secondary"  className="bg-zinc-900 text-white"
              onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button className="bg-zinc-900 text-white" onClick={handleEdit}>
              Edit Gig
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="bg-zinc-900 text-white">
                Delete Gig
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this gig?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your gig.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            className="bg-zinc-900 text-white"
            onClick={() => navigate("/mygigs")}
          >
            Back to My Gigs
          </Button>
          </div>
          <div>
          <Button
            className="bg-zinc-900 text-white"
            onClick={() => navigate(`/gigApplicants/${id}`)}
          >
           View Applicants
          </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gig;
