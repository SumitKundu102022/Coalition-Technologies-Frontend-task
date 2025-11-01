// src/components/TopNav.tsx
import React from "react";
import {
    Home,
  Calendar,
  MessageSquare,
  CreditCard,
  Settings,
  Bell,
  Search,
  Users,
  MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";
// Assuming you have imported the Patient type from App.tsx
import techCareLogo from "../assets/TestLogo.svg";
import doctorIcon from "../assets/senior-woman-doctor-and-portrait-1.png";

interface TopNavProps {
  currentPatientName: string; // Used for the small profile in the top right
  // You can pass the doctor's name here too if needed
}

// 1. Define the variants for the animation
const navVariants: any = {
    hidden: { y: -50, opacity: 0 }, // Start position: slightly above and transparent
    visible: { 
        y: 0, 
        opacity: 1, 
        transition: { 
            type: "spring", 
            stiffness: 100, 
            damping: 20, 
            delay: 0.1 // A slight delay to load after the sidebar
        } 
    },
};

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
    <motion.header
      className="flex justify-between items-center h-20 m-1.5 mt-0.5 bg-white border border-gray-200 px-8 py-2 sticky top-0 z-10 shadow-sm rounded-full"
      variants={navVariants} // 3. Apply the defined variants
      initial="hidden" // 4. Start from the 'hidden' state
      animate="visible" // 5. Animate to the 'visible' state
    >
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-12">
        <div className="text-2xl font-bold text-gray-800">
          {/* <h1 className="text-2xl font-bold text-primary-accent mb-10"> */}
          <img src={techCareLogo} alt="Tech Care Logo" />
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
                                    ? "bg-primary-accent text-sidebar-dark font-bold bg-teal-300"
                                    : "text-gray-700 font-semibold hover:text-gray-800 hover:bg-teal-200"
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
        {/* <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800" />
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-800" /> */}
        {/* <div className="w-px h-8 bg-gray-200"></div>  */}
        <div className="flex items-center space-x-2">
          {/* Doctor's Profile Picture (placeholder) */}
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src={doctorIcon} // Placeholder image for doctor
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
        <div className="w-px h-8 bg-gray-200"></div> {/* Separator */}
        <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
        <MoreVertical className="top-0 right-0 w-5 h-5 text-gray-600 cursor-pointer" />
      </div>
    </motion.header>
  );
};

export default TopNav;
