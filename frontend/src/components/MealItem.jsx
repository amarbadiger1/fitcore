const MealItem = ({ title, desc, kcal }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center mb-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <p className="text-gray-700">{kcal}</p>
    </div>
  );
};
export default MealItem