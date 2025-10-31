// src/components/PatientDetailCard.tsx
import React from "react";
import {
  Calendar,
  User,
  Phone,
  PhoneCall,
  DollarSign,
  MoreVertical,
  Venus,
  Mars,
  ShieldCheck,
} from "lucide-react";
// Import the Patient interface from App.tsx

interface Patient {
  name: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  profile_picture: string;
}

interface PatientDetailCardProps {
  patient: Patient;
}

const PatientDetailCard: React.FC<PatientDetailCardProps> = ({ patient }) => {
  // Helper to render an info row
  const InfoRow = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactElement;
    label: string;
    value: string;
  }) => (
    <div className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded-lg transition-colors">
      <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-xs text-gray-500">{value}</p>
      </div>
    </div>
  );

  // 🔥 DATE FORMATTING LOGIC 🔥
  const formatDateOfBirth = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      // Options for Month Name, Day (numeric), Year (numeric)
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options); // Outputs: August 23, 1996
    } catch (e) {
      console.error("Failed to parse date:", e);
      return dateString; // Return original if parsing fails
    }
  };

  const formattedDOB = formatDateOfBirth(patient.date_of_birth);

  return (
    <div className="bg-card-bg p-6 rounded-3xl shadow-lg flex flex-col items-center h-full">
      {/* Profile Image and Name */}
      <div className="relative mb-6">
        <img
          src={patient.profile_picture}
          alt={patient.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-none shadow-md"
        />
        {/* <MoreVertical className="absolute top-0 right-0 w-5 h-5 text-gray-400 cursor-pointer" /> */}
      </div>

      <h3 className="text-2xl font-bold text-text-dark-gray mb-6">
        {patient.name}
      </h3>

      {/* Information Grid */}
      <div className="w-full space-y-4 pt-4">
        <InfoRow
          icon={<Calendar className="w-5 h-5 text-primary-accent" />}
          label="Date Of Birth"
          value={formattedDOB}
        />
        <InfoRow
          icon={
            patient.gender === "Female" ? (
              <Venus className="w-5 h-5 text-primary-accent" />
            ) : (
              <Mars className="w-5 h-5 text-primary-accent" />
            )
          }
          label="Gender"
          value={patient.gender}
        />
        <InfoRow
          icon={<Phone className="w-5 h-5 text-primary-accent" />}
          label="Contact Info."
          value={patient.phone_number}
        />
        <InfoRow
          icon={<Phone className="w-5 h-5 text-primary-accent" />}
          label="Emergency Contacts"
          value={patient.emergency_contact}
        />
        <InfoRow
          icon={<ShieldCheck className="w-5 h-5 text-primary-accent" />}
          label="Insurance Provider"
          value={patient.insurance_type}
        />
      </div>

      {/* Action Button */}
      <button className="mt-8 w-full py-3 bg-primary-accent text-sidebar-dark font-bold rounded-full hover:bg-teal-200 bg-teal-300 transition-opacity cursor-pointer">
        Show All Details
      </button>
    </div>
  );
};

export default PatientDetailCard;
