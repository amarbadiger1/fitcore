import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const Progress = () => {
  const [activeRange, setActiveRange] = useState("1M");

  const data = {
    totalLoss: 4.2,
    bodyFat: 18.4,
    bodyFatChange: -1.2,
    muscleMass: 64.2,
    muscleStatus: "Stable this week",
    chart: [
      { date: "Jun 01", value: 70 },
      { date: "Jun 07", value: 75 },
      { date: "Jun 14", value: 65 },
      { date: "Jun 21", value: 72 },
      { date: "Today", value: 80 },
    ],
  };

  const chartData = data.chart;

  return (
    <div className="w-10/12 mx-auto bg-gray-50 min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Weight Journey */}
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Weight Journey
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Total loss:{" "}
                <span className="font-medium text-gray-700">
                  {data.totalLoss} kg
                </span>{" "}
                this month
              </p>
            </div>

            {/* Range Buttons */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
              {["1M", "3M", "1Y"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveRange(t)}
                  className={`px-4 py-1 text-sm rounded-full transition ${
                    activeRange === t
                      ? "bg-white shadow text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        index === chartData.length - 1
                          ? "#22c55e" // active green
                          : "#e5e7eb" // light gray bars
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Body Fat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-sm text-gray-500">Body Fat</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {data.bodyFat}%
            </p>
          </div>

          <p className="text-sm mt-4 text-green-500">
            ↓ {Math.abs(data.bodyFatChange)}% from last month
          </p>
        </div>

        {/* Muscle Mass */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-sm text-gray-500">Muscle Mass</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {data.muscleMass} kg
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            {data.muscleStatus}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Progress;