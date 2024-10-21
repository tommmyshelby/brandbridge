import mongoose from "mongoose";

const influencerSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true, minlength: 2 },
    bio: { type: String, maxlength: 500 },
    socialMedia: {
        instagram: { type: String },
        twitter: { type: String },
        facebook: { type: String },
        linkedin: { type: String },
        youtube: { type: String }
    },
    contactNumber: { type: String, match: /^[0-9]{10,15}$/ },
    location: { type: String },
    dateOfBirth: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Automatically update the `updatedAt` field before saving
influencerSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const Influencer = mongoose.model('Influencer', influencerSchema);

