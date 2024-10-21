import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Users, Zap } from "lucide-react"
import Navbar from './shared/Navbar'

export default function DashBoard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
     <Navbar/>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Connect Brands with Influencers</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">BrandBridge is the ultimate platform for brands and influencers to collaborate and create impactful partnerships.</p>
          <a href='/Signup'><Button className="bg-blue-600 hover:bg-blue-700">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          </a>
        </section>

        <section className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose BrandBridge?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Briefcase className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Brand Opportunities</h3>
                <p>Post and manage collaboration gigs effortlessly</p>
              </div>
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Influencer Network</h3>
                <p>Connect with a diverse pool of talented influencers</p>
              </div>
              <div className="text-center">
                <Zap className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Seamless Collaboration</h3>
                <p>Streamlined process from application to partnership</p>
              </div>
            </div>
          </div>
        </section>

       
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 BrandBridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}