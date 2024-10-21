import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './shared/Navbar';
import { USER_API_END_POINT } from './utils/constants';
import { useNavigate } from 'react-router-dom';

function InfluencerProfile() {
  // State for form inputs
  const [profileData, setProfileData] = useState({
    fullName: '',
    bio: '',
    instagram: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    contactNumber: '',
    location: '',
    dateOfBirth: '',
  
  });
  const navigate =useNavigate();
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
      
      // Assuming the API endpoint for profile creation is /api/influencers/profile
      await axios.post(`${USER_API_END_POINT}/influencer/updateProfile`, profileData,{
        withCredentials: true});

      setSuccess(true);
      if(success){
        navigate("/influencer/dashboard");
      }
    } catch (err) {
      setError('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }


  };

  return (
    
<div>
    <Navbar/>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl mt-10">
      <h1 className="text-2xl font-bold text-black mb-6">Create Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-black text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={handleInputChange}
            required
            className="w-full p-2 bg-zinc-200 text-black rounded-md"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-black text-sm font-medium mb-2">
            Bio (Max 500 characters)
          </label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
            maxLength="500"
            className="w-full p-2 bg-zinc-200 text-black rounded-md"
          />
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Social Media</h2>
          {['instagram', 'twitter', 'facebook', 'linkedin', 'youtube'].map((platform) => (
            <div key={platform} className="mb-3">
              <label className="block text-black text-sm font-medium mb-2 capitalize">
                {platform} Profile URL
              </label>
              <input
                type="text"
                name={platform}
                value={profileData[platform]}
                onChange={handleInputChange}
                className="w-full p-2 bg-zinc-200 text-black rounded-md"
              />
            </div>
          ))}
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

        {/* Date of Birth */}
        <div>
          <label className="block text-black text-sm font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
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

export default InfluencerProfile;
