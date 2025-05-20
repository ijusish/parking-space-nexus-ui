
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <Link to="/" className="flex items-center">
              <div className="rounded-md bg-parking-primary p-2 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-white"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 9h6v6H9z" />
                  <path d="m21 15-3-3 3-3" />
                  <path d="m3 15 3-3-3-3" />
                </svg>
              </div>
              <span className="text-xl font-bold text-parking-accent">ParkWise</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="hidden md:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-parking-primary hover:bg-parking-secondary">
                <span className="hidden md:inline">Create Account</span>
                <span className="md:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16 md:py-24 flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Smart Parking Management for Modern Cities
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Find, reserve, and pay for parking spaces with ease. ParkWise makes parking hassle-free with real-time availability and seamless booking.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button className="w-full sm:w-auto bg-parking-primary hover:bg-parking-secondary text-lg px-8 py-6">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 relative z-10">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-md flex items-center justify-center ${
                          i % 3 === 0
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : i % 3 === 1
                            ? "bg-amber-100 text-amber-700 border border-amber-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-8 w-8"
                        >
                          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10H8s-2.7.6-4.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
                          <path d="M7 17h10m-5-6v6" />
                          <circle cx="6.5" cy="17.5" r="2.5" />
                          <circle cx="17.5" cy="17.5" r="2.5" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">Downtown Parking</p>
                      <p className="text-sm text-gray-500">4 spots available</p>
                    </div>
                    <Button className="bg-parking-secondary">Book Now</Button>
                  </div>
                </div>
                <div className="absolute inset-0 transform translate-x-4 translate-y-4 bg-blue-200 rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Smart Features for Smart Parking</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-parking-primary"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Availability</h3>
              <p className="text-gray-600">
                Find available parking spots in real-time, updated instantly as vehicles come and go.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-parking-secondary"
                >
                  <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
                  <path d="M15 3v6h6" />
                  <path d="M10 16l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Reservations</h3>
              <p className="text-gray-600">
                Reserve your parking spot in advance to ensure availability when you arrive.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-parking-accent"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10H8s-2.7.6-4.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
                  <path d="M7 17h10m-5-6v6" />
                  <circle cx="6.5" cy="17.5" r="2.5" />
                  <circle cx="17.5" cy="17.5" r="2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Vehicle Management</h3>
              <p className="text-gray-600">
                Save and manage multiple vehicles to streamline your parking experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-parking-accent to-parking-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to simplify your parking?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of drivers who've transformed their parking experience with ParkWise.
          </p>
          <Link to="/register">
            <Button className="bg-white text-parking-accent hover:bg-gray-100 text-lg px-8 py-6">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="rounded-md bg-parking-primary p-2 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-white"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 9h6v6H9z" />
                    <path d="m21 15-3-3 3-3" />
                    <path d="m3 15 3-3-3-3" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-parking-accent">ParkWise</span>
              </div>
              <p className="text-gray-600 mt-2">Smart parking for modern cities</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h3 className="font-semibold mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-parking-primary">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-parking-primary">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-parking-primary">Testimonials</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-parking-primary">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-parking-primary">Contact</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-parking-primary">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-parking-primary">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-parking-primary">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500">
            <p>&copy; 2025 ParkWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
