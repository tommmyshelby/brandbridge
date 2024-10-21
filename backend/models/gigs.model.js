import mongoose from "mongoose";

const gigSchema = mongoose.Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand', // Reference to the Brand model
    required: true
  },
  gigTitle: {
    type: String,
    required: true,
    trim: true // Remove leading/trailing whitespace
  },
  gigCategory: {
    type: String,
    required: true
  },
  gigDescription: {
    type: String,
    required: true,
    trim: true
  },
  targetAgeGroup: {
    type: String,
    enum: ['18-24', '25-34', '35-44', '45-54', '55+', 'All'], // Include 'All' option
    required: true
  },
  targetGender: {
    type: String,
    enum: ['Male', 'Female', 'Non-binary', 'All'],
    required: true
  },
  minEngagementRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100  // Valid engagement rate range
  },
  minFollowerCount: {
    type: String,
    required: true,
    min: 0
  },
  expectations: {
    type: String,
    trim: true
  },
  gigBudget: {
    type: Number,
    required: true,
    min: 0  // Ensure positive budget
  },
  gigStartDate: {
    type: Date,
    required: true
  },
  gigEndDate: {
    type: Date,
    required: true,
    validate: { // Validate that end date is after start date
      validator: function(endDate) {
        return endDate > this.gigStartDate;
      },
      message: 'Gig end date must be after start date'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: { // Add a field to track active gigs
    type: Boolean,
    default: true
  }
});

export const Gig = mongoose.model('Gig', gigSchema);