import React from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { ArrowRight, BriefcaseIcon, PercentIcon, UsersIcon } from "lucide-react";

function Home() {
  return (
    <div>
      <Navbar />
      <section className="container mx-auto px-4 py-20 text-center bg-green-100">
        <h1 className="text-5xl font-bold mb-6">
          Connect Brands with Influencers
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          BrandBridge is the ultimate platform for brands and influencers to
          collaborate and create impactful partnerships.
        </p>
        <a href="/Signup">
          <Button className="bg-zinc-800 text-white hover:bg-zinc-900 ransition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ...">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <BriefcaseIcon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Post Gigs</h3>
                <p className="text-muted-foreground">
                  Easily create and manage collaboration opportunities for influencers.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <UsersIcon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Find Influencers</h3>
                <p className="text-muted-foreground">Discover and connect with the right influencers for your brand.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <PercentIcon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Measure Success</h3>
                <p className="text-muted-foreground">Track the performance of your influencer marketing campaigns.</p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

export default Home;
