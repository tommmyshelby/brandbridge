import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { USER_API_END_POINT } from "../utils/constants";
import { toast, Toaster } from "sonner";
import { setLoading, setUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "influencer",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
  
      // Make the login request to the backend
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success("Login successful!");
  
        const user = response.data.user;
  
        // Check if the profile exists and redirect accordingly
        if (response.data.profileExists) {
          navigate(user.role === "brand" ? "/brand/dashboard" : "/influencer/dashboard");
        } else {
          navigate(user.role === "brand" ? "/BrandProfile" : "/InfluencerProfile");
        }
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      // Display a more detailed error message from the backend or a fallback message
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="flex justify-center items-center pt-20 pb-10 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl text-gray-800 font-bold mb-6 text-center">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                className="bg-slate-200"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                className="bg-slate-200"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Role</Label>
              <RadioGroup
                defaultValue={formData.role}
                onValueChange={handleRoleChange}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem  className="bg-slate-200"  value="influencer" id="influencer" />
                  <Label htmlFor="influencer">Influencer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem  className="bg-slate-200"  value="brand" id="brand" />
                  <Label htmlFor="brand">Brand</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full text-white bg-black" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
