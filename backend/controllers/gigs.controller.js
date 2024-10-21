import { Brand } from "../models/brands.model.js";
import { Gig } from "../models/gigs.model.js";


export const postGig = async (req, res) => {
  try {
    const userId=req.id;
  
    const {
      gigTitle,
      gigCategory,
      gigDescription,
      targetAgeGroup,
      targetGender,
      minEngagementRate,
      minFollowerCount,
      expectations,
      gigBudget,
      gigStartDate,
      gigEndDate,
    } = req.body;

    if (
      !gigTitle ||
      !gigCategory ||
      !gigDescription ||
      !targetAgeGroup ||
      !targetGender ||
      !minEngagementRate ||
      !minFollowerCount ||
      !expectations ||
      !gigBudget ||
      !gigStartDate ||
      !gigEndDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    let brand = await Brand.findOne({userId})
    if(brand){
    let brandId = brand.id;
    
    await Gig.create({
      brandId,
      gigTitle,
      gigCategory,
      gigDescription,
      targetAgeGroup,
      targetGender,
      minEngagementRate,
      minFollowerCount,
      expectations,
      gigBudget,
      gigStartDate,
      gigEndDate,
    });
    return res.status(201).json({
      message: "Gig created successfully",
      success: true,
    });
    }else{
        return res.status(404).json({
            message: "User not found",
            success: false
        })
    }  

  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateGig = async (req, res) => {
  try {
   
    const {
      gigId,
      gigTitle,
      gigCategory,
      gigDescription,
      targetAgeGroup,
      targetGender,
      minEngagementRate,
      minFollowerCount,
      expectations,
      gigBudget,
      gigStartDate,
      gigEndDate,
      isActive,
    } = req.body;

    
    let gig = await Gig.findById(gigId);
    if (gig) {
      gig.gigTitle = gigTitle || gig.gigTitle;
      gig.gigCategory = gigCategory || gig.gigCategory;
      gig.gigDescription = gigDescription || gig.gigDescription;
      gig.targetAgeGroup = targetAgeGroup || gig.targetAgeGroup;
      gig.targetGender = targetGender || gig.targetGender;
      gig.minEngagementRate = minEngagementRate || gig.minEngagementRate;
      gig.minFollowerCount = minFollowerCount || gig.minFollowerCount;
      gig.expectations = expectations || gig.expectations;
      gig.gigBudget = gigBudget || gig.gigBudget;
      gig.gigStartDate = gigStartDate || gig.gigStartDate;
      gig.gigEndDate = gigEndDate || gig.gigEndDate;
      gig.isActive = isActive 
      gig.updatedAt = Date.now();
   
     
      await gig.save();
      return res.status(200).json({
        message: "Gig updated successfully",
        success: true,
        gig,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const deleteGig = async (req, res) => {
  try {
    const { gigId } = req.body;
    const gig = await Gig.findOneAndDelete({ gigId });

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Gig deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAllGigs = async (req,res) => {
  try{
   
      const gigs = await Gig.find({isActive: true});
      console.log(gigs);
      if(!gigs){
        return res.status(404).json({
          message: "No gigs found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Gigs fetched successfully",
        success: true,
        gigs,
      });
    
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
}


export const getGigsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    // Find the brand associated with the given userId
    const brand = await Brand.findOne({ userId });

    if (!brand) {
      return res.status(404).json({
        message: "Brand not found for this user",
        success: false,
      });
    }

    // Use the brandId to find gigs
    const gigs = await Gig.find({ brandId: brand._id });

    if (!gigs || gigs.length === 0) {
      return res.status(404).json({
        message: "No gigs found for this brand",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Gigs fetched successfully",
      success: true,
      gigs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const getGigById = async(req,res) =>
{
  try{
    
    const gigId = req.params.id;
    const gig = await Gig.findById(gigId);
    if(!gig){
      return res.status(404).json({
        message: "Gig not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Gig fetched successfully",
      success: true,
      gig,
    });
    
  }
  catch{
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
}


