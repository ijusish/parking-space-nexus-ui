
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import MobileNav from "@/components/layout/MobileNav";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data
  const stats = [
    {
      title: "Available Parking Slots",
      value: "28",
      change: "+4",
      status: "increase",
      description: "near your location",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M7 6h10M7 18h10M4 12h16" />
        </svg>
      ),
    },
    {
      title: "Active Bookings",
      value: "2",
      change: "0",
      status: "neutral",
      description: "ongoing reservations",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
          <path d="M15 3v6h6" />
          <path d="M10 16l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Registered Vehicles",
      value: "3",
      change: "+1",
      status: "increase",
      description: "in your account",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10H8s-2.7.6-4.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
          <path d="M7 17h10m-5-6v6" />
          <circle cx="6.5" cy="17.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      ),
    },
  ];

  // Mock upcoming bookings
  const upcomingBookings = [
    {
      id: 1,
      location: "Downtown Parking Garage",
      start: "2025-05-22 09:00 AM",
      end: "2025-05-22 05:00 PM",
      status: "confirmed",
      vehicle: "Honda Civic (ABC-1234)",
    },
    {
      id: 2,
      location: "Airport Long-Term Parking",
      start: "2025-05-25 06:30 AM",
      end: "2025-05-28 08:00 PM",
      status: "pending",
      vehicle: "Toyota Camry (XYZ-9876)",
    },
  ];

  return (
    <div className="pb-16 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.firstName || 'User'}!</h1>
          <p className="text-gray-500">Here's an overview of your parking activity</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/parking-slots">
            <Button className="bg-parking-primary hover:bg-parking-secondary w-full md:w-auto">
              Find Parking
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-gray-100 rounded-md">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">
                {stat.description}{" "}
                <span
                  className={`font-medium ${
                    stat.status === "increase"
                      ? "text-green-600"
                      : stat.status === "decrease"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {stat.change !== "0" && stat.change}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
      {upcomingBookings.length > 0 ? (
        <div className="space-y-4">
          {upcomingBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{booking.location}</h3>
                    <p className="text-gray-500 text-sm mt-1">{booking.vehicle}</p>
                  </div>
                  <div className={`mt-3 md:mt-0 px-3 py-1 rounded-full text-sm ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center text-sm">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2 text-gray-400"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m12 6 0 6 4 2" />
                    </svg>
                    <span className="text-gray-600">
                      {booking.start}
                    </span>
                  </div>
                  <span className="hidden sm:block mx-2 text-gray-400">→</span>
                  <div className="flex items-center mt-1 sm:mt-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2 text-gray-400 sm:ml-2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m12 6 0 6 4 2" />
                    </svg>
                    <span className="text-gray-600">
                      {booking.end}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
                <Button variant="outline" size="sm">View Details</Button>
                <Button size="sm" variant="destructive">Cancel</Button>
              </CardFooter>
            </Card>
          ))}
          <div className="mt-4">
            <Link to="/bookings">
              <Button variant="link" className="text-parking-primary p-0">
                View all bookings
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-gray-500">No upcoming bookings</p>
            <Button className="mt-4 bg-parking-primary hover:bg-parking-secondary">
              Book a Parking Slot
            </Button>
          </CardContent>
        </Card>
      )}

      <MobileNav />
    </div>
  );
};

export default Dashboard;
