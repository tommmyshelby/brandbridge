// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import InfluencerProfile from "./components/InfluencerProfile.jsx";
import GigDescription from "./components/GigDescription.jsx";
import BrandProfile from "./components/BrandProfile.jsx";
import BrandDashboard from "./components/BrandDashboard.jsx";
import InfluencerDashboard from "./components/InfluencerDashboard.jsx";
import PostGig from "./components/PostGig.jsx";
import MyGigs from "./components/MyGigs.jsx";
import AllGigs from "./components/AllGigs.jsx";
import GigDetails from "./components/GigDetails.jsx";
import Gig from "./components/Gig.jsx";
import GigApplications from "./components/GigApplications.jsx";
import BrandMyProfile from "./components/BrandMyProfile.jsx";
import InfluencerMyProfile from "./components/InfluencerMyProfile.jsx";
import AppliedGigsPage from "./components/AppliedGigsPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/InfluencerProfile",
      element: <ProtectedRoute element={<InfluencerProfile />} />,
    },
    {
      path: "/BrandProfile",
      element: <ProtectedRoute element={<BrandProfile />} />,
    },
    {
      path: "/gigs/description/:id",
      element: <ProtectedRoute element={<GigDescription />} />,
    },
    {
      path: "/brand/dashboard",
      element: <ProtectedRoute element={<BrandDashboard />} />,
    },
    {
      path: "/allGigs",
      element: <ProtectedRoute element={<AllGigs />} />,
    },
    {
      path: "/influencer/dashboard",
      element: <ProtectedRoute element={<InfluencerDashboard />} />,
    },
    {
      path: "/postGig",
      element: <ProtectedRoute element={<PostGig />} />,
    },
    {
      path: "/myGigs",
      element: <ProtectedRoute element={<MyGigs />} />,
    },
    {
      path: "/myGigs/:id",
      element: <ProtectedRoute element={<Gig />} />,
    },
    {
      path: "/gigDetails/:id",
      element: <ProtectedRoute element={<GigDetails />} />,
    },
    {
      path: "/gigApplicants/:id",
      element: <ProtectedRoute element={<GigApplications />} />,
    },
    {
      path: "/brand/myProfile",
      element: <ProtectedRoute element={<BrandMyProfile />} />,
    },
    {
      path: "/influencer/myProfile",
      element: <ProtectedRoute element={<InfluencerMyProfile />} />,
    },
    {
      path: "/influencer/appliedGigs",
      element: <ProtectedRoute element={<AppliedGigsPage />} />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    }
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
