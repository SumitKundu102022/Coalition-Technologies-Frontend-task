import { motion } from "framer-motion";
import { MoreHorizontal, Search} from "lucide-react"; // Added User for patient list item
// Define the Patient interface (you can import it from App.tsx)
interface Patient {
  // Simplified structure for the sidebar display
  name: string;
    profile_picture: string;
    gender: string;
    age: number;
}

interface PatientSidebarProps {
  patients: Patient[];
  selectedPatient: Patient;
  onSelectPatient: (patient: Patient) => void;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({
  patients,
  selectedPatient,
  onSelectPatient,
}) => {
  // Framer Motion Variants for Sidebar Animation
  const sidebarVariants = {
    hidden: { x: "-30%" },
    visible: {
      x: "0%",
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <motion.aside
      className="w-80 mt-7 ml-2 bg-sidebar-dark text-white p-6 flex flex-col h-min rounded-2xl shadow-lg border border-gray-100"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* Search Bar */}
      {/* <div className="mb-6">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-accent"
          // NOTE: For a complete solution, you would add state here to filter the `patients` array
        />
      </div> */}{" "}
      <div>
        {/* <h1 className="text-2xl font-bold text-primary-accent mb-10">
          <span className="font-extrabold text-3xl">D.</span> |{" "}
          <img src={doctorIcon} alt="Doctor Icon" />
        </h1> */}
        <nav className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-md hover:bg-white/10 space-x-3 cursor-pointer text-gray-800">
            <span className="font-bold text-2xl">Patients</span>
            <Search className="w-5 h-5 text-gray-600" />
          </div>
          {/* ... other nav items like Schedule, Message, etc. */}
        </nav>
      </div>
      {/* Dynamic Patient List */}
      <div className="flex flex-col h-215 mt-6">
        <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
          {patients.map((patient) => (
            <div
              key={patient.name} // Assuming name is unique for simplicity
              onClick={() => onSelectPatient(patient)}
              className={`
                            flex items-center p-3 cursor-pointer transition-all duration-200
                            ${
                              selectedPatient.name === patient.name
                                ? "bg-primary-accent text-sidebar-dark bg-teal-100 m-auto"
                                : "hover:bg-teal-200 text-gray-100"
                            }
                        `}
            >
              <img
                src={patient.profile_picture}
                alt={patient.name}
                className={`w-10 h-10 rounded-full object-cover mr-3 ${
                  selectedPatient.name === patient.name
                    ? "border-2 border-sidebar-dark"
                    : "border-2 border-transparent"
                }`}
              />
              <div className="flex items-center justify-between w-full">
                <div className="">
                  <p className="font-semibold text-gray-600">{patient.name}</p>
                  <p className="text-xs text-gray-700">
                    {patient.gender}, {patient.age} years
                  </p>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>

              {selectedPatient.name === patient.name && (
                <div className="ml-auto w-2 h-2 rounded-full bg-sidebar-dark"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Footer / User Profile */}
      {/* <div className="mt-6 pt-4 border-t border-green-200">
        <div className="flex items-center space-x-3">
          <User className="w-8 h-8 rounded-full bg-gray-500 p-1" />
          <div>
            <p className="font-semibold">{patients[0].name}</p>
            <p className="text-sm text-gray-400">{patients[0].profile_picture}</p>
          </div>
        </div>
      </div> */}
      {/* User Profile Area */}
    </motion.aside>
  );
};

export default PatientSidebar;
