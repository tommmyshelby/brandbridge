import { GigApplication } from "../models/gigApplication.model.js";
import { Influencer } from "../models/influencers.model.js";

// Apply to a gig
export const applyGigs = async (req, res) => {
  try {
    const userId = req.id; // Extracted from JWT (via isAuthenticated middleware)
    const gigId = req.body.gigId; // Extracted from URL params

    console.log(userId + gigId);
    // Find the influencer based on userId
    const influencer = await Influencer.findOne({ userId });
    if (!influencer) {
      return res.status(404).json({
        message: "Influencer profile not found",
        success: false,
      });
    }

    // Check if the gigId is provided
    if (!gigId) {
      return res.status(400).json({
        message: "Gig ID is missing",
        success: false,
      });
    }

    // Check if the influencer has already applied to the gig
    const existingApplication = await GigApplication.findOne({
      gigId,
      influencerId: influencer._id,
    });

    if (existingApplication) {
      return res.status(200).json({
        message: "You have already applied for this gig",
        success: true,
      });
    }

    // Create the gig application
    await GigApplication.create({
      influencerId: influencer._id,
      gigId,
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error applying to gig:", error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Get gigs the influencer has applied for
export const getAppliedGigs = async (req, res) => {
  try {
    const userId = req.id; // Extracted from JWT
    const influencer = await Influencer.findOne({ userId });

    if (!influencer) {
      return res.status(404).json({
        message: "Influencer profile not found",
        success: false,
      });
    }

    // Get all gigs the influencer has applied for, sorted by date
    const appliedGigs = await GigApplication.find({
      influencerId: influencer._id,
    })
      .populate("gigId") // Optional: populate the gig details if needed
      .sort({ createdAt: -1 });

    return res.status(200).json({
      appliedGigs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching applied gigs:", error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};






export const getGigApplications = async (req, res) => {
  try {
    const gigId = req.params.id; 

    const gigApplications = await GigApplication.find({ gigId })
      .populate("influencerId") 
      .sort({ createdAt: -1 });

     


    return res.status(200).json({
      gigApplications,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching gig applications:", error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};



export const applicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body;

    // Validate status
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status", success: false });
    }

    // Update application
    const application = await GigApplication.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }

    return res.status(200).json({ application, success: true });
  } catch (error) {
    console.error("Error updating application status:", error.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
