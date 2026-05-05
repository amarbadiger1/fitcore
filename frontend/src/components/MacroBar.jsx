const MacroBar = ({ label, value, goal, color }) => {
  const percent = (value / goal) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <p className="text-gray-600">{label}</p>
        <p>{value}g / <span className="text-gray-400">{goal}g</span></p>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className={`${color} h-2 rounded`} style={{ width: `${percent || 0}%` }}></div>
      </div>
    </div>
  );
};

export default MacroBar