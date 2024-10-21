import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    brandName: { type: String, required: true, minlength: 2 },
    websiteUrl: { type: String },
    contactPerson: { type: String },
    contactEmail: { type: String },
    contactNumber: { type: String, match: /^[0-9]{10,15}$/ },
    industry: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

brandSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const Brand = mongoose.model('Brand', brandSchema);
