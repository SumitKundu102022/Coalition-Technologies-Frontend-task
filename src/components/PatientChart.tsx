import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Vital {
  value: number;
}
interface DiagnosisHistory {
  month: string;
  year: number;
  blood_pressure: { systolic: Vital; diastolic: Vital };
}

interface PatientChartProps {
  history: DiagnosisHistory[];
}

// const PatientChart: React.FC<PatientChartProps> = ({ history }) => {
//   // Only use the last 6 entries for a cleaner chart if the history is long
//   const chartHistory = history.slice(0, 6).reverse();

//   const data = {
//     labels: chartHistory.map((item) => `${item.month}, ${item.year}`),
//     datasets: [
//       {
//         label: "Systolic",
//         data: chartHistory.map((item) => item.blood_pressure.systolic.value),
//         borderColor: "#01F0CC", // Primary accent color
//         backgroundColor: "rgba(1, 240, 204, 0.2)",
//         tension: 0.4,
//         fill: true,
//         pointRadius: 6,
//         pointBackgroundColor: "white",
//         pointBorderWidth: 2,
//       },
//       {
//         label: "Diastolic",
//         data: chartHistory.map((item) => item.blood_pressure.diastolic.value),
//         borderColor: "#6C707C", // A gray color for contrast
//         backgroundColor: "rgba(108, 112, 124, 0.2)",
//         tension: 0.4,
//         fill: true,
//         pointRadius: 6,
//         pointBackgroundColor: "white",
//         pointBorderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "bottom" as const,
//         labels: {
//           usePointStyle: true,
//           boxWidth: 8,
//         },
//       },
//       title: {
//         display: false,
//       },
//       tooltip: {
//         // Customize tooltips to look like the design if needed
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         beginAtZero: false,
//         // Customize Y-axis lines to match the design (e.g., dashed lines)
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// };


const PatientChart: React.FC<PatientChartProps> = ({ history }) => {
  // Reverse and simplify history for chart
  const chartData = history.slice(0, 6).reverse();

  const data = {
    labels: chartData.map((h) => `${h.month.substring(0, 3)}. ${h.year % 100}`),
    datasets: [
      {
        label: "Systolic",
        data: chartData.map((h) => h.blood_pressure.systolic.value),
        borderColor: "#E66F7F", // Systolic Pink/Red color
        backgroundColor: "transparent",
        tension: 0.4, // Makes the line curved/smooth
        pointRadius: 6,
        pointBackgroundColor: "#E66F7F",
        pointBorderColor: "#FFFFFF",
        pointHoverRadius: 8,
      },
      {
        label: "Diastolic",
        data: chartData.map((h) => h.blood_pressure.diastolic.value),
        borderColor: "#986BFF", // Diastolic Purple color
        backgroundColor: "transparent",
        tension: 0.4, // Makes the line curved/smooth
        pointRadius: 6,
        pointBackgroundColor: "#986BFF",
        pointBorderColor: "#FFFFFF",
        pointHoverRadius: 8,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false, // Important for fixed height
    plugins: {
      legend: {
        display: false, // No need for the chart legend, we use the custom summary,
      },
      tooltip: {
        // Custom tooltips can be added here if needed
      },
    },
    scales: {
      y: {
        min: 60, // Set minimum Y-axis value
        max: 180, // Set maximum Y-axis value
        grid: {
          borderDash: [5, 5],
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
    },
  };

    // const options = {
    //   responsive: true,
    //   maintainAspectRatio: false,
    //   plugins: {
    //     legend: {
    //       position: "bottom" as const,
    //       labels: {
    //         usePointStyle: true,
    //         boxWidth: 8,
    //       },
    //     },
    //     title: {
    //       display: false,
    //     },
    //     tooltip: {
    //       // Customize tooltips to look like the design if needed
    //     },
    //   },
    //   scales: {
    //     x: {
    //       grid: {
    //         display: false,
    //       },
    //     },
    //     y: {
    //       beginAtZero: false,
    //       // Customize Y-axis lines to match the design (e.g., dashed lines)
    //     },
    //   },
    // };
  return <Line data={data} options={options} />;
};

export default PatientChart;
