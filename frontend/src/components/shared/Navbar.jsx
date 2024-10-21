import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2, Home, Info, Briefcase, Badge, BadgeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constants.js";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const renderUserSpecificLinks = () => {
    if (user.role === 'influencer') {
      return (
        <>
          <Link to="/influencer/dashboard" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <BadgeIcon className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
          <Link to="/influencer/myProfile" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <User2 className="mr-2 h-4 w-4" />
            My Profile
          </Link>
          <Link to="/influencer/appliedGigs" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <Badge className="mr-2 h-4 w-4" />
            Applied Gigs
          </Link>
        </>
      );
    } else if (user.role === 'brand') {
      return (
        <>
          <Link to="/brand/dashboard" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <BadgeIcon className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
          <Link to="/brand/myProfile" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <User2 className="mr-2 h-4 w-4" />
            My Profile
          </Link>
          <Link to="/mygigs" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
            <Badge className="mr-2 h-4 w-4" />
            My Gigs
          </Link>
        </>
      );
    }
    return null;
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <h1 className="text-white font-bold text-2xl">BrandBridge</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Info className="w-4 h-4 mr-1" />
              About
            </Link>
            <Link to="/allGigs" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              Gigs
            </Link>
            {user && renderUserSpecificLinks()}
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            {!user ? (
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button className="bg-white text-indigo-600 hover:bg-indigo-100">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-indigo-500 text-white hover:bg-indigo-400">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-white hover:border-indigo-300 transition-all">
                    <AvatarImage
                      src={user.avatarUrl || "https://github.com/shadcn.png"}
                      alt="User avatar"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4 bg-white rounded-lg shadow-xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage
                        src={user.avatarUrl || "https://github.com/shadcn.png"}
                        alt="User avatar"
                      />
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-gray-800 ">{user.fullName}</h2>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
