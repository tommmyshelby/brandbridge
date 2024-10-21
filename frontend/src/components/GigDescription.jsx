import React from "react";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";

function GigDescription() {
  const isApplied = false;
  return (
    <div>
        <Navbar/>
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">Title</h1>

            <div className="flex items-center gap-2 mt-4">
              <p className="text-blue-700 font-bold" variant="ghost">
                Fashion Influencer
              </p>
              <p className="text-red-600 font-bold" variant="ghost">
                Female
              </p>
              <p className="text-black  font-bold" variant="ghost">
                100k
              </p>
            </div>
          </div>
          <Button
            className={` text-white mt-10 ${
              isApplied ? "bg-slate-700" : "bg-black"
            } `}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <div>
          <div class="max-w-4xl  text-black">
            <h1 class="text-xl mt-4 font-mono mb-4">Gig Description</h1>

            <hr class="border-gray-700 mb-6" />

            <div class="mb-4">
              <h2 class="text-xl ">Title:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Category:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Description:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Target Age Group:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Target Gender:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Min Engagement Rate:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Min Follower Count:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Expectations:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Budget:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Start Date:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">End Date:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Active:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Created At:</h2>
            </div>

            <div class="mb-4">
              <h2 class="text-md">Updated At:</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GigDescription;
