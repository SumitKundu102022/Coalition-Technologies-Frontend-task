# Tech.Care Patient Dashboard Readme
  


  <h1>&#129537; Tech.Care Patient Dashboard</h1>
    <p>This is a dynamic, responsive patient dashboard interface built using <strong>React</strong> with <strong>Vite</strong>, styled entirely with <strong>Tailwind CSS</strong>, and utilizing the official Coalition Technologies patient data API. The application features a dynamic patient sidebar and detailed patient views, including diagnosis history, vitals, and lab results, matching a high-fidelity design mockup.</p>

  <hr>

  <h2>✨ Features</h2>
  <ul>
        <li><strong>Dynamic Patient Selection:</strong> Clicking a patient in the sidebar updates the entire dashboard content without a page reload.</li>
        <li><strong>API Integration:</strong> Fetches real patient data from the provided Coalition Technologies API using Basic Authentication.</li>
        <li><strong>Responsive Layout:</strong> Uses a three-column grid structure for main content and a persistent sidebar.</li>
        <li><strong>High-Fidelity UI:</strong> Implements specific design details from the mockup, including:
            <ul>
                <li>Custom-styled Top Navigation Bar.</li>
                <li>Formatted <strong>Diagnosis History</strong> with Chart.js, using smooth, custom-colored lines for Systolic and Diastolic blood pressure.</li>
                <li>Styled <strong>Vitals Cards</strong> (Respiratory Rate, Temperature, Heart Rate) with color coding.</li>
                <li>Structured <strong>Diagnostic List</strong> displayed in a scrollable, header-fixed table format.</li>
                <li>Detailed, formatted <strong>Patient Information Card</strong> on the right sidebar.</li>
                <li>Scrollable patient list in the sidebar (<code>overflow-y-auto</code> implementation).</li>
            </ul>
        </li>
    </ul>

  <hr>

  <h2>🛠️ Tech Stack</h2>
    <ul>
        <li><strong>Framework:</strong> React (Functional Components with Hooks)</li>
        <li><strong>Build Tool:</strong> Vite</li>
        <li><strong>Styling:</strong> Tailwind CSS</li>
        <li><strong>Data Visualization:</strong> Chart.js (integrated via <code>react-chartjs-2</code>)</li>
        <li><strong>Animation:</strong> Framer Motion (for sidebar)</li>
        <li><strong>Icons:</strong> Lucide React</li>
    </ul>

  <hr>

  <h2>🚀 Getting Started</h2>

  <h3>Prerequisites</h3>
    <p>You must have <strong>Node.js</strong> and <strong>npm</strong> (or yarn/pnpm) installed on your machine.</p>

  <h3>1. Installation</h3>
    <p>Clone the repository and install dependencies:</p>
    <pre><code>git clone &lt;repository_url&gt;
cd tech-care-dashboard
npm install
</code></pre>

  <h3>2. Environment Variables</h3>
    <p>This project requires authentication credentials for the patient API. Create a file named <code>.env</code> in the root of the project directory and add your credentials:</p>
    <pre><code># .env
VITE_API_URL=https://fedskilltest.coalitiontechnologies.online/.......
VITE_API_USERNAME="YOUR_USERNAME_HERE"
VITE_API_PASSWORD="YOUR_PASSWORD_HERE"
</code></pre>
    <p><strong>Note:</strong> Replace the placeholder values with the actual username and password provided for the assessment.</p>

  <h3>3. Running the App</h3>
    <p>Start the development server:</p>
    <pre><code>npm run dev
</code></pre>
    <p>The application will typically be available at <code>http://localhost:5173</code>.</p>

  <hr>

  <h2>📂 Project Structure (Key Files)</h2>

  <table>
        <thead>
  <tr>
                <th>File / Directory</th>
                <th>Description</th>
  </tr>
  </thead>
  <tbody>
  <tr>
                <td><code>src/App.tsx</code></td>
                <td>Main application component. Manages global state (<code>allPatients</code>, <code>selectedPatient</code>) and layout logic. Contains helper functions like <code>renderVitalCard</code>.</td>
  </tr>
  <tr>
                <td><code>src/components/PatientSidebar.tsx</code></td>
                <td>Component for the left sidebar. Displays the scrollable list of all patients and handles selection clicks.</td>
  </tr>
  <tr>
                <td><code>src/components/TopNav.tsx</code></td>
                <td>Component for the fixed header/navigation bar at the top.</td>
  </tr>
  <tr>
                <td><code>src/components/PatientDetailCard.tsx</code></td>
                <td>Component for the patient information/profile card on the far right. Includes date formatting logic.</td>
  </tr>
  <tr>
                <td><code>src/components/PatientChart.tsx</code></td>
                <td>Component that wraps Chart.js to render the Blood Pressure line graph based on the selected patient's history.</td>
  </tr>
  <tr>
                <td><code>tailwind.config.js</code></td>
                <td>Tailwind configuration file, where custom colors (e.g., <code>systolic-pink</code>, <code>diastolic-purple</code>) are defined.</td>
  </tr>
  </tbody>
  </table>

  <hr>

  <h2>&#127912; Design Notes &amp; Customizations</h2>
  <p>The application implements several detailed fixes based on the design mockups:</p>
  <ul>
        <li><strong>Scrolling Fix:</strong> The patient list container in <code>PatientSidebar.tsx</code> uses <code>flex-1</code> and <code>overflow-y-auto</code> to ensure only the list scrolls, not the entire sidebar.</li>
        <li><strong>Date Formatting:</strong> Dates are formatted to a specific standard (e.g., "August 23, 1996") using <code>toLocaleDateString</code>.</li>
        <li><strong>Grid Layout:</strong> The main view utilizes a flexible <code>grid grid-cols-4</code> to separate the main content (3 columns) from the patient details card (1 column).</li>
    </ul>

