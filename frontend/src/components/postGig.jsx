import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "./shared/Navbar";
import { USER_API_END_POINT_GIG } from "./utils/constants";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const PostGig = () => {
  const [formData, setFormData] = useState({
    gigTitle: "",
    gigCategory: "",
    gigDescription: "",
    targetAgeGroup: "",
    targetGender: "",
    minEngagementRate: "",
    minFollowerCount: "",
    expectations: "",
    gigBudget: "",
    gigStartDate: "",
    gigEndDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert minEngagementRate and gigBudget to numbers
      const dataToSend = {
        ...formData,
        minEngagementRate: parseFloat(formData.minEngagementRate),
        gigBudget: parseFloat(formData.gigBudget),
      };

      const response = await axios.post(
        `${USER_API_END_POINT_GIG}/postGig`,
        dataToSend,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const navigate = useNavigate();
        toast.success("Gig posted successfully!");
        navigate("/brand/dashboartd");
        // Reset form
        setFormData({
          gigTitle: "",
          gigCategory: "",
          gigDescription: "",
          targetAgeGroup: "",
          targetGender: "",
          minEngagementRate: "",
          minFollowerCount: "",
          expectations: "",
          gigBudget: "",
          gigStartDate: "",
          gigEndDate: "",
        });
      } else {
        toast.error("Error posting gig: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while posting the gig.");
    }
  };

  return (
    <div>
      <Navbar />
      <Card className="w-auto max-w-2xl mt-10 mx-auto shadow-xl">
        <CardHeader>
          <CardTitle>Post a New Gig</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="gigTitle">Gig Title</Label>
              <Input
                id="gigTitle"
                name="gigTitle"
                value={formData.gigTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="gigCategory">Gig Category</Label>
              <Input
                id="gigCategory"
                name="gigCategory"
                value={formData.gigCategory}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="gigDescription">Gig Description</Label>
              <Textarea
                id="gigDescription"
                name="gigDescription"
                value={formData.gigDescription}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="targetAgeGroup">Target Age Group</Label>
              <Select
                name="targetAgeGroup"
                onValueChange={(value) => handleSelectChange("targetAgeGroup", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="18-24">18-24</SelectItem>
                  <SelectItem value="25-34">25-34</SelectItem>
                  <SelectItem value="35-44">35-44</SelectItem>
                  <SelectItem value="45-54">45-54</SelectItem>
                  <SelectItem value="55+">55+</SelectItem>
                  <SelectItem value="All">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetGender">Target Gender</Label>
              <Select
                name="targetGender"
                onValueChange={(value) => handleSelectChange("targetGender", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Non-binary">Non-binary</SelectItem>
                  <SelectItem value="All">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="minEngagementRate">Minimum Engagement Rate (%)</Label>
              <Input
                id="minEngagementRate"
                name="minEngagementRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.minEngagementRate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="minFollowerCount">Minimum Follower Count</Label>
              <Input
                id="minFollowerCount"
                name="minFollowerCount"
                type="text"
                value={formData.minFollowerCount}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="expectations">Expectations</Label>
              <Textarea
                id="expectations"
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="gigBudget">Gig Budget</Label>
              <Input
                id="gigBudget"
                name="gigBudget"
                type="number"
                min="0"
                step="0.01"
                value={formData.gigBudget}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="gigStartDate">Gig Start Date</Label>
              <Input
                id="gigStartDate"
                name="gigStartDate"
                type="date"
                value={formData.gigStartDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="gigEndDate">Gig End Date</Label>
              <Input
                id="gigEndDate"
                name="gigEndDate"
                type="date"
                value={formData.gigEndDate}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="bg-black text-white">
              Post Gig
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostGig;