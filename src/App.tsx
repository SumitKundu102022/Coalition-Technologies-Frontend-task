import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  Search,
  Briefcase,
  Calendar,
  Heart,
  Download,
} from "lucide-react"; // Example icons
import PatientChart from "./components/PatientChart";
import "./index.css";
import PatientSidebar from "./components/PatientSidebar";
import TopNav from "./components/TopNav";
import PatientDetailCard from "./components/PatientDetailCard"; // NEW IMPORT
import BriefcaseImage from "./assets/respiratory rate.svg";
import TemperatureImage from "./assets/temperature.svg";
import HeartRateImage from "./assets/HeartBPM.svg";
import UpArrowIcon from "./assets/ArrowUp.svg";
import DownArrowIcon from "./assets/ArrowDown.svg";

const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;
const apiUrl = import.meta.env.VITE_API_URL;


// Define the structure for the patient data (typescript)
export interface Vital {
  value: number;
  levels: string;
}

export interface DiagnosisHistory {
  month: string;
  year: number;
  blood_pressure: {
    systolic: Vital;
    diastolic: Vital;
  };
  respiratory_rate: Vital;
  temperature: Vital;
  heart_rate: Vital;
}

export interface Patient {
  name: string;
  gender: string;
  age: number;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: DiagnosisHistory[];
  diagnostic_list: { name: string; description: string; status: string }[];
  lab_results: string[];
  profile_picture: string;
  date_of_birth: string;
}

const API_URL = `${apiUrl}`;
// const TARGET_PATIENT_NAME = "Ryan Johnson";

const App: React.FC = () => {
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onSelectPatient, setOnSelectPatient] = useState<((patient: Patient) => void) | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // NOTE: The API requires Basic Authentication.
        // You must replace 'YOUR_USERNAME' and 'YOUR_PASSWORD' with the credentials provided.
        const credentials = btoa(`${username}:${password}`);

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.length > 0) {
          setAllPatients(data);
          setPatient(data[0]); // Fallback to first patient
        } else {
          console.error("Patient not found in list.");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  // Function passed to the sidebar to change the active patient
  const handleSelectPatient = (patient: Patient) => {
    setPatient(patient);
  };

  // Helper to render the small vital cards (Respiratory, Temperature, Heart Rate)
  const renderVitalCard = (
    vital: Vital | undefined,
    title: string,
    icon: React.ReactElement,
    colorClass: string // New prop for color theme
    // analysis: string
  ) => (
    <div
      className={`p-6 rounded-3xl flex flex-col justify-between ${colorClass} h-[200px]`}
      key={title}
    >
      <div className="flex flex-col items-start">
        {/* Icon (The icon component itself will be styled by the colorClass) */}
        <div className="mb-4">{icon}</div>
        {/* <img src={icon} alt="image" /> */}
        <p className="text-sm font-semibold text-gray-700">{title}</p>
      </div>

      <div className="flex flex-col">
        <p className="text-3xl font-bold text-gray-800">
          {vital?.value || "N/A"}{" "}
          {title === "Temperature"
            ? "°F"
            : title === "Heart Rate"
            ? " bpm"
            : " bpm"}
        </p>
        <div className="text-sm mt-1">
          {/* The 'levels' (Normal/Higher/Lower) styling */}
          <p
            className={`font-semibold ${
              title.includes("Normal")
                ? "text-green-600"
                : title.includes("Lower")
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {/* {analysis} */}
          </p>
          <p className="font-semibold text-text-dark-gray">
            {vital?.levels || "Normal"}
          </p>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading Patient Data...
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-red-600">
        Failed to load patient data or patient not found.
      </div>
    );
  }

  // --- Framer Motion Variants for Sidebar Animation ---
  // src/App.tsx (New helper function)

  // Helper to render the BP summary lines
  const renderBloodPressureReading = (
    vital: Vital | undefined,
    label: string,
    colorClass: string,
    bgColorClass: string
  ) => (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-2">
        <div
          className={`w-2 h-2 rounded-full ${bgColorClass} ${colorClass}`}
        ></div>
        <p className={`text-sm font-semibold ${colorClass}`}>{label}</p>
      </div>
      <p className="text-3xl font-bold text-text-dark-gray">
        {vital?.value || "N/A"}
      </p>
      <div className="flex items-center space-x-1 text-sm text-gray-500">
        {/* Analysis Icon (Up/Down arrow) - Need to determine trend based on 'levels' */}
        {vital?.levels.includes("Higher") && (
          <span className="text-red-500"><img src={UpArrowIcon} alt="Up Arrow" /></span>
        )}
        {vital?.levels.includes("Lower") && (
          <span className="text-blue-500"><img src={DownArrowIcon} alt="Down Arrow" /></span>
        )}
        <p>{vital?.levels || "Normal"}</p>
      </div>
    </div>
  );

  return (
    <>
      {" "}
      <div className="flex flex-col h-screen">
        <TopNav currentPatientName={patient.name} />
        <div className="flex h-screen">
          {/* Sidebar Component (Handles the patient list and selection) */}
          <PatientSidebar
            patients={allPatients}
            selectedPatient={patient}
            onSelectPatient={handleSelectPatient}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-8">
            <div className="grid grid-cols-3 gap-6">
              {/* Column 1: Patient Information Card & Diagnosis History */}
              <div className="col-span-2 space-y-6">
                {/* Diagnosis History - Graph and Vitals */}
                <div className="bg-card-bg p-6 rounded-3xl shadow-lg">
                  <h3 className="text-xl font-bold text-text-dark-gray mb-4">
                    Diagnosis History
                  </h3>
                  {/* Blood Pressure Chart & Summary Card */}
                  <div className="bg-white p-6 rounded-3xl shadow-inner border border-gray-100 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center justify-between gap-50">
                        <h4 className="text-lg font-semibold text-text-dark-gray">
                          Blood Pressure
                        </h4>
                        <p className="text-sm text-gray-500">Last 6 Months</p>
                      </div>
                    </div>

                    {/* Graph and Details Layout: Grid with 3 columns (2 for Graph, 1 for Summary) */}
                    <div className="grid grid-cols-3 gap-6 h-[250px]">
                      {/* 1. Blood Pressure Chart (Takes up 2/3 width) */}
                      <div className="col-span-2 relative h-full">
                        {/* The PatientChart component needs a specific height here */}
                        <PatientChart history={patient.diagnosis_history} />
                      </div>

                      {/* 2. Blood Pressure Summary (Takes up 1/3 width) */}
                      <div className="col-span-1 flex flex-col justify-around py-4">
                        {/* Systolic Reading */}
                        {renderBloodPressureReading(
                          patient.diagnosis_history[0]?.blood_pressure.systolic,
                          "Systolic",
                          "text-systolic-pink",
                          "bg-[#E66F7F]" // Use a custom color defined in Tailwind config
                        )}

                        {/* Separator */}
                        <div className="h-px w-full bg-gray-200 my-2"></div>

                        {/* Diastolic Reading */}
                        {renderBloodPressureReading(
                          patient.diagnosis_history[0]?.blood_pressure
                            .diastolic,
                          "Diastolic",
                          "text-diastolic-purple",
                          "bg-[#986BFF]" // Use a custom color defined in Tailwind config
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Vital Cards (Small) */}
                    {renderVitalCard(
                      patient.diagnosis_history[0]?.respiratory_rate,
                      "Respiratory Rate",
                      <img
                        className="w-15 h-15"
                        src={BriefcaseImage}
                        alt="Respiratory rate"
                      />,
                      "bg-[#E0F3FA]" // Light Blue background
                    )}
                    {renderVitalCard(
                      patient.diagnosis_history[0]?.temperature,
                      "Temperature",
                      <img
                        className="w-15 h-15"
                        src={TemperatureImage}
                        alt="Temperature"
                      />,
                      "bg-[#FFE6E9]" // Light Pink background
                      // <Calendar className="w-4 h-4 text-sidebar-dark" />
                    )}
                    {renderVitalCard(
                      patient.diagnosis_history[0]?.heart_rate,
                      "Heart Rate",
                      <img
                        className="w-15 h-15"
                        src={HeartRateImage}
                        alt="Heart Rate"
                      />,
                      "bg-[#FFE6F1]" // Light Pink background
                      // <Heart className="w-4 h-4 text-sidebar-dark" />
                    )}
                  </div>
                </div>

                {/* Diagnostic List */}
                <div className="bg-card-bg p-6 rounded-3xl shadow-lg">
                  <h3 className="text-xl font-bold text-text-dark-gray mb-4">
                    Diagnostic List
                  </h3>

                  <div className="bg-white rounded-xl shadow-inner border border-gray-100">
                    {/* Table Header (Fixed) */}
                    <div className="grid grid-cols-6 gap-4 p-3 font-semibold text-gray-500 bg-gray-100 rounded-t-xl">
                      <p className="col-span-2">Problem/Diagnosis</p>
                      <p className="col-span-3">Description</p>
                      <p className="col-span-1">Status</p>
                    </div>

                    {/* Table Body (Scrollable) */}
                    <div className="max-h-80 flex flex-col h-50">
                      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                        {patient.diagnostic_list.map((item, index) => (
                          <div
                            key={index}
                            // Grid structure to align with the header
                            className="grid grid-cols-6 gap-4 items-center p-3 border-b border-gray-100 hover:bg-gray-100 transition-colors"
                          >
                            {/* Problem/Diagnosis */}
                            <p className="col-span-2 font-semibold text-text-dark-gray">
                              {item.name}
                            </p>
                            {/* Description */}
                            <p className="col-span-3 text-sm text-gray-600">
                              {item.description}
                            </p>
                            {/* Status */}
                            <p className="col-span-1 text-sm text-gray-500">
                              {item.status}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Diagnostic List & Lab Results */}
              <div className="col-span-1 space-y-6">
                {/* Patient Information Card */}
                {/* RIGHT COLUMN: Patient Information Card */}
                <aside className="col-span-1 h-auto">
                  <PatientDetailCard patient={patient} />
                </aside>
                {/* Lab Results */}
                <div className="bg-card-bg p-6 rounded-3xl shadow-lg">
                  <h3 className="text-xl font-bold text-text-dark-gray mb-4">
                    Lab Results
                  </h3>
                  <div className="flex flex-col h-50">
                    <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                      {patient.lab_results.slice(0, 5).map((result, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-bg-light-gray p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <p className="text-text-dark-gray">{result}</p>
                        <Download className="w-5 h-5 text-gray-500" />
                      </div>
                    ))}
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
