import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, PlusCircle } from 'lucide-react';
import Navbar from './shared/Navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const topInfluencers = [
  { id: 1, name: 'John Doe', followers: '1.2M', engagement: '3.5%', niche: 'Lifestyle' },
  { id: 2, name: 'Jane Smith', followers: '800K', engagement: '4.2%', niche: 'Fashion' },
  { id: 3, name: 'Alex Johnson', followers: '2.5M', engagement: '2.8%', niche: 'Tech' },
];

const InfluencerCard = ({ name, followers, engagement, niche }) => (
  <Card className="w-full">
    <CardContent className="flex items-center space-x-4 py-4">
      <User size={40} className="text-gray-400" />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{followers} followers · {engagement} engagement</p>
        <p className="text-sm text-gray-500">{niche}</p>
      </div>
    </CardContent>
  </Card>
);

const BrandDashboard = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="col-span-full shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h2 className="text-2xl font-bold">Welcome, Brand User!</h2>
                {/* Button for Post New Gig */}
                <a href='/postGig'><Button
                  className="flex bg-black text-white items-center space-x-2"
            
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Post New Gig</span>
                </Button>
                </a>
              </CardHeader>
              <CardContent className="flex justify-between">
                <p>Start collaborating with top influencers to boost your brand.</p>
                {/* Button for My Gigs */}
                <a href='/myGigs'><Button
                  className="flex bg-zinc-600 text-white items-center space-x-2"
               
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>My Gigs</span>
                </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="col-span-full shadow-lg md:col-span-2">
              <CardHeader>
                <h2 className="text-xl font-semibold">Top Influencers</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topInfluencers.map((influencer) => (
                    <InfluencerCard key={influencer.id} {...influencer} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <h2 className="text-xl font-semibold">Quick Stats</h2>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Active Gigs</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pending Applications</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Completed Collaborations</span>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrandDashboard;
