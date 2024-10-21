import bcrypt from "bcrypt";
import { User } from "../models/users.model.js";
import jwt from "jsonwebtoken";
import { Brand } from "../models/brands.model.js";
import { Influencer } from "../models/influencers.model.js";
// Register User
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    // Basic validation checks
    if (!fullName || fullName.length < 3 || fullName.length > 50) {
      return res.status(400).json({
        message: "Full name must be between 3 and 50 characters",
        success: false,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email",
        success: false,
      });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        message: "Phone number must be 10 digits",
        success: false,
      });
    }

    if (!password || password.length < 8 || password.length > 30) {
      return res.status(400).json({
        message: "Password must be between 8 and 30 characters",
        success: false,
      });
    }

    if (!role || (role !== 'brand' && role !== 'influencer')) {
      return res.status(400).json({
        message: "Role must be either 'brand' or 'influencer'",
        success: false,
      });
    }

    // Check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    // Hash password and create user
    const hashpassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashpassword,
      role,
    });

    return res.status(201).json({
      message: "Account has been created successfully",
      success: true,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Basic validation checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email",
        success: false,
      });
    }

    if (!password || password.length < 8 || password.length > 30) {
      return res.status(400).json({
        message: "Password must be between 8 and 30 characters",
        success: false,
      });
    }

    if (!role || (role !== 'brand' && role !== 'influencer')) {
      return res.status(400).json({
        message: "Role must be either 'brand' or 'influencer'",
        success: false,
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Check role
    if (role !== user.role) {
      return res.status(403).json({
        message: "No user found with this role",
        success: false,
      });
    }

    // Generate token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Check profile existence
    let profileExists = false;
    if (user.role === "brand") {
      profileExists = await Brand.exists({ userId: user._id });
    } else if (user.role === "influencer") {
      profileExists = await Influencer.exists({ userId: user._id });
    }

    // Update profile field if necessary
    if (profileExists && !user.profile) {
      user.profile = true;
      await user.save(); // Update user in the database
    }

    // Clean up user object
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Send response with token
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Logged in successfully",
        success: true,
        user,
        profileExists,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the cookie by setting an immediate expiration date and matching path/domain
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true, // Ensure it matches the same flags as when the cookie was set
        expires: new Date(0), // Set the expiration date to a past date
        secure: process.env.NODE_ENV === "production", // Set secure flag in production
        sameSite: "strict", // Follow the sameSite attribute used initially
        path: "/", // Specify the path to match where the cookie was set
      })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateBrandProfile = async (req, res) => {
  try {
    const userId = req.id;
    const {
      brandName,
      websiteUrl,
      contactPerson,
      contactEmail,
      contactNumber,
      industry,
      location,
    } = req.body;

    let brand = await Brand.findOne({ userId });

    if (brand) {
      brand.brandName = brandName || brand.brandName;
      brand.websiteUrl = websiteUrl || brand.websiteUrl;
      brand.contactPerson = contactPerson || brand.contactPerson;
      brand.contactEmail = contactEmail || brand.contactEmail;
      brand.contactNumber = contactNumber || brand.contactNumber;
      brand.industry = industry || brand.industry;
      brand.location = location || brand.location;
      brand.updatedAt = new Date();

      await brand.save();

      return res.status(200).json({
        message: "Brand profile updated successfully",
        success: true,
        brand,
      });
    } else {
      brand = await Brand.create({
        userId,
        brandName,
        websiteUrl,
        contactPerson,
        contactEmail,
        contactNumber,
        industry,
        location,
      });

      return res.status(201).json({
        message: "Brand profile created successfully",
        success: true,
        brand,
      });
    }
  } catch (error) {
    console.error("Error updating or creating brand profile:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateInfluencerProfile = async (req, res) => {
  try {
    const userId = req.id;

   
    const {
      fullName,
      bio,
      socialMedia: { instagram, twitter, facebook, linkedin, youtube } = {},
      contactNumber,
      location,
      dateOfBirth,
    } = req.body;

    let influencer = await Influencer.findOne({ userId });

    if (influencer) {
      influencer.fullName = fullName || influencer.fullName;
      influencer.bio = bio || influencer.bio;

      influencer.socialMedia.instagram =
        instagram !== undefined ? instagram : influencer.socialMedia.instagram;
      influencer.socialMedia.twitter =
        twitter !== undefined ? twitter : influencer.socialMedia.twitter;
      influencer.socialMedia.facebook =
        facebook !== undefined ? facebook : influencer.socialMedia.facebook;
      influencer.socialMedia.linkedin =
        linkedin !== undefined ? linkedin : influencer.socialMedia.linkedin;
      influencer.socialMedia.youtube =
        youtube !== undefined ? youtube : influencer.socialMedia.youtube;

      influencer.contactNumber = contactNumber || influencer.contactNumber;
      influencer.location = location || influencer.location;
      influencer.dateOfBirth = dateOfBirth || influencer.dateOfBirth;
      influencer.updatedAt = new Date();

      await influencer.save();

      return res.status(200).json({
        message: "Influencer profile updated successfully",
        success: true,
        influencer,
      });
    } else {
      influencer = await Influencer.create({
        userId,
        fullName,
        bio,
        socialMedia: {
          instagram,
          twitter,
          facebook,
          linkedin,
          youtube,
        },
        contactNumber,
        location,
        dateOfBirth,
      });

      return res.status(201).json({
        message: "Influencer profile created successfully",
        success: true,
        influencer,
      });
    }
  } catch (error) {
    console.error("Error updating or creating influencer profile:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getBrandProfile = async (req, res) => {
  try {
    const userId = req.id; // Assuming you're using authentication middleware to set req.id

    const brand = await Brand.findOne({ userId });

    if (!brand) {
      return res.status(404).json({
        message: "Brand profile not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    console.error("Error fetching brand profile:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getInfluencerProfile = async (req, res) => {
  try {
    const userId = req.id; // Assuming you're using authentication middleware to set req.id

    const influencer = await Influencer.findOne({ userId });

    if (!influencer) {
      return res.status(404).json({
        message: "Influencer profile not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      influencer,
    });
    
  } catch (error) {
    console.error("Error fetching influencer profile:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
