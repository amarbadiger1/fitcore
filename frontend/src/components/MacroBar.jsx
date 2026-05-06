const MacroBar = ({ label, value, goal, color }) => {
  const percent = goal ? (value / goal) * 100 : 0;

  // cap at 100
  const finalPercent = Math.min(percent, 100);

  // if exceeded → force red
  const finalColor = value > goal ? "bg-red-500" : color;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <p className="text-gray-600">{label}</p>
        <p>
          {value}g / <span className="text-gray-400">{goal}g</span>
        </p>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className={`${finalColor} h-2 rounded`}
          style={{ width: `${finalPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MacroBar;