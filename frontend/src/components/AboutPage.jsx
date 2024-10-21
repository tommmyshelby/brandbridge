

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion'; // For animations
import Navbar from './shared/Navbar';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About BrandBridge
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            BrandBridge is your ultimate platform for connecting brands and influencers. Our mission is to streamline influencer marketing by providing a secure and intuitive platform where brands can find the right influencers and influencers can discover and apply for exciting opportunities.
          </motion.p>
        </section>

        {/* About Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Story</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className="bg-gray-800 shadow-lg">
              <CardHeader>
                <h3 className="text-xl font-semibold">Our Mission</h3>
              </CardHeader>
              <CardContent>
                <p>We aim to bridge the gap between brands and influencers, creating opportunities for meaningful collaborations. Our platform is designed to be user-friendly, secure, and efficient, ensuring a seamless experience for both brands and influencers.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 shadow-lg">
              <CardHeader>
                <h3 className="text-xl font-semibold">Our Vision</h3>
              </CardHeader>
              <CardContent>
                <p>To become the leading platform in influencer marketing, facilitating impactful partnerships and driving innovation in the digital marketing space.</p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Contact Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Contact Us</h2>
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="mb-4">If you have any questions or inquiries, feel free to reach out to us using the contact information below or by filling out the contact form.</p>
            <ul className="mb-6">
              <li><strong>Email:</strong> contact@brandbridge.com</li>
              <li><strong>Phone:</strong> +91-9272383937</li>
              <li><strong>Address:</strong> BrandBridge HQ, HyperCity IT Park, Pune</li>
            </ul>
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => window.location = 'mailto:contact@brandbridge.com'}>
              Email Us
            </Button>
          </motion.div>
        </section>

        {/* Additional Information Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">Additional Information</h2>
          <Card className="bg-gray-800 shadow-lg">
            <CardHeader>
              <h3 className="text-xl font-semibold">Our Team</h3>
            </CardHeader>
            <CardContent>
              <p>Our team is made up of passionate professionals dedicated to delivering the best influencer marketing platform. We combine expertise in technology, marketing, and customer service to provide a top-notch experience.</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
