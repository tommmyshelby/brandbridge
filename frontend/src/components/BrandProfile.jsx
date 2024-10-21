import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './shared/Navbar';
import { USER_API_END_POINT } from './utils/constants';

function BrandProfile() {
  // State for form inputs
  const [profileData, setProfileData] = useState({
    brandName: '',
    websiteUrl: '',
    contactPerson: '',
    contactEmail: '',
    contactNumber: '',
    industry: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Assuming the API endpoint for brand profile update is /api/brands/updateProfile
      await axios.post(`${USER_API_END_POINT}/brand/updateProfile`, profileData, {
        withCredentials: true
      });

      setSuccess(true);
    } catch (err) {
      setError('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl mt-10">
        <h1 className="text-2xl font-bold text-black mb-6">Create Your Brand Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Brand Name */}
          <div>
            <label className="block text-black text-sm font-medium mb-2">
              Brand Name
            </label>
            <input
              type="text"
              name="brandName"
              value={profileData.brandName}
              onChange={handleInputChange}
              required
              className="w-full p-2 bg-zinc-200 text-black rounded-md"
            />
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-black text-sm font-medium mb-2">
              Website URL
            </label>
            <input
              type="url"
              name="websiteUrl"
              value={profileData.websiteUrl}
              onChange={handleInputChange}
              className="w-full p-2 bg-zinc-200 text-black rounded-md"
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-black text-sm font-medium mb-2">
              Contact Person
            </label>
            <input
              type="text"
              name="contactPerson"
              value={profileData.contactPerson}
              onChange={handleInputChange}
              className="w-full p-2 bg-zinc-200 text-black rounded-md"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-black text-sm font-medium mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={profileData.contactEmail}
              onChange={handleInputChange}
              className="w-full p-2 bg-zinc-200 text-black rounded-md"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-black text-sm font-medium mb-2">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={profileData.contactNumber}
              onChange={handleInputChange}
              pattern="[0-9]{10,15}"
              title="Please enter a valid phone number"
              className="w-full p-2 bg-zinc-200 text-black rounded-md"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-black text-sm font-medium mb-2">
              Industry
            </label>
            <input
              type="text"
              name="industry"
              value={profileData.industry}
              onChange={handleInputChange}
              className="w-full p-2 bg-zinc-200 text-black rounded-md"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-black text-sm font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              className="w-full p-2 bg-zinc-200 text-black rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-black text-white rounded-md hover:bg-zinc-800"
            >
              {loading ? 'Saving...' : 'Create Profile'}
            </button>
          </div>

          {/* Error or Success Message */}
          {error && <p className="text-red-600 mt-2">{error}</p>}
          {success && <p className="text-green-600 mt-2">Profile created successfully!</p>}
        </form>
      </div>
    </div>
  );
}

export default BrandProfile;
