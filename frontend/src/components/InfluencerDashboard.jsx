import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Search, BarChart2, Bell } from 'lucide-react';
import Navbar from './shared/Navbar';
import { useNavigate } from 'react-router-dom';

const recentGigs = [
  { id: 1, brand: 'TechGiant', title: 'Product Review', budget: '$500', status: 'Applied' },
  { id: 2, brand: 'FashionNova', title: 'Summer Collection', budget: '$800', status: 'Accepted' },
  { id: 3, brand: 'EcoLife', title: 'Sustainable Living', budget: '$600', status: 'Pending' },
];



const GigCard = ({ brand, title, budget, status }) => (
  <Card className="w-full">
    <CardContent className="flex items-center justify-between py-4">
      <div>
        <h3 className="text-lg font-semibold">{brand}</h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{budget}</p>
        <p className={`text-sm ${status === 'Accepted' ? 'text-green-500' : 'text-gray-500'}`}>{status}</p>
      </div>
    </CardContent>
  </Card>
);

const InfluencerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="col-span-full shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h2 className="text-2xl font-bold">Welcome, Influencer!</h2>
                <Button onClick={() => navigate('/allGigs')} className="flex bg-black text-white items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Find Gigs</span>
                </Button>
              </CardHeader>
              <CardContent>
                <p>Discover exciting collaboration opportunities and grow your influence.</p>
              </CardContent>
            </Card>

            <Card className="col-span-full shadow-lg md:col-span-2">
              <CardHeader>
                <h2 className="text-xl font-semibold">Recent Gigs</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGigs.map((gig) => (
                    <GigCard key={gig.id} {...gig} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <h2 className="text-xl font-semibold">Your Stats</h2>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Total Followers</span>
                  <span className="font-semibold">250K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Avg. Engagement Rate</span>
                  <span className="font-semibold">4.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Completed Collaborations</span>
                  <span className="font-semibold">15</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <h2 className="text-xl font-semibold">Notifications</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-blue-500" />
                    <span>New gig matching your profile!</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-green-500" />
                    <span>Your application was accepted!</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <h2 className="text-xl font-semibold">Quick Actions</h2>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-blue-500 text-white">Update Profile</Button>
                <Button className="w-full bg-green-500 text-white">View Applied Gigs</Button>
                <Button className="w-full bg-purple-500 text-white">Analytics</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InfluencerDashboard;