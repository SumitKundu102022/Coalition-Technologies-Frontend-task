const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen gap-4 bg-linear-to-r from-gray-300 via-teal-500 to-teal-950">
      <div className="animate-spin rounded-full h-22 w-22 border-t-6 border-b-6 border-b-teal-100"></div>
      <p className="text-2xl text-teal-50">Loading Patient Data...</p>
    </div>
  );
};

export default Spinner;
