// src/components/TopNav.tsx
import React from "react";
import {
    Home,
  LayoutDashboard,
  Calendar,
  MessageSquare,
    DollarSign,
  CreditCard,
  Settings,
  Bell,
  Search,
  Users,
  MoreVertical,
} from "lucide-react";
// Assuming you have imported the Patient type from App.tsx
import doctorIcon from "../assets/TestLogo.svg";

interface TopNavProps {
  currentPatientName: string; // Used for the small profile in the top right
  // You can pass the doctor's name here too if needed
}

const TopNav: React.FC<TopNavProps> = ({ currentPatientName }) => {
  // Nav Items Data
  const navItems = [
    { icon: Home, label: "Overview", active: false },
    { icon: Users, label: "Patients", active: true }, // 'Patients' is the active page
    { icon: Calendar, label: "Schedule", active: false },
    { icon: MessageSquare, label: "Message", active: false },
    { icon: CreditCard, label: "Transactions", active: false },
  ];

  return (
    <header className="flex justify-between items-center h-20 mt-1.5 bg-white border-b border-gray-200 px-8 py-2 sticky top-0 z-10 shadow-sm rounded-full">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-12">
        <div className="text-2xl font-bold text-gray-800">
          {/* <h1 className="text-2xl font-bold text-primary-accent mb-10"> */}
          <img src={doctorIcon} alt="Doctor Icon" />
          {/* </h1> */}
        </div>

        {/* Center Section: Navigation Links */}
        <nav className="flex space-x-6 h-full">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center space-x-2 p-2 px-4 rounded-full cursor-pointer transition-colors duration-200
                                ${
                                  item.active
                                    ? "bg-primary-accent text-sidebar-dark font-semibold bg-teal-300"
                                    : "text-gray-500 hover:text-gray-800 hover:bg-teal-200"
                                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Right Section: User Profile and Icons */}
      <div className="flex items-center space-x-6">
        <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800" />
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800" />
        <div className="w-px h-8 bg-gray-200"></div> {/* Separator */}
        <div className="flex items-center space-x-2">
          {/* Doctor's Profile Picture (placeholder) */}
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=9" // Placeholder image for doctor
              alt="Dr. Simmons"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Dr. Jose Simmons
            </p>
            <p className="text-xs text-gray-500">General Practitioner</p>
          </div>
        </div>
        <Settings className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800" />
        <MoreVertical className="top-0 right-0 w-5 h-5 text-gray-400 cursor-pointer" />
      </div>
    </header>
  );
};

export default TopNav;
