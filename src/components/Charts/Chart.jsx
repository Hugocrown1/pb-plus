import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VisitsBarChart = ({ data, numDays }) => {
  const [visitsData, setVisitsData] = useState([]);

  useEffect(() => {
    const adjustedNumDays = Math.max(7, numDays);
    const filteredVisitsData = filterVisitsData(data, adjustedNumDays);
    setVisitsData(filteredVisitsData);
  }, [data, numDays]);

  const filterVisitsData = (data, numDays) => {
    const lastNDays = [];
    for (let i = numDays - 1; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      lastNDays.push(day.toLocaleDateString("en-US"));
    }

    const visitsCount = lastNDays.reduce((acc, day) => {
      acc[day] = 0;
      return acc;
    }, {});

    data.forEach((visit) => {
      const visitDate = new Date(visit.dateTime).toLocaleDateString("en-US");
      if (visitsCount[visitDate] !== undefined) {
        visitsCount[visitDate]++;
      }
    });

    const chartData = Object.keys(visitsCount).map((date) => ({
      name: date,
      Visitors: visitsCount[date],
    }));

    return chartData;
  };

  const formatYAxisTick = (value) => {
    return Math.round(value);
  };

  return (
    <div className="h-full w-full overflow-x-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={visitsData}
          margin={{
            top: 10,
            right: 50,
            left: 50,
            bottom: 20,
          }}
        >
          <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={10} angle={-45} textAnchor="end"/>
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={formatYAxisTick}
            fontSize={12}
            
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="Visitors" fill="#434343" radius={[16, 16, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitsBarChart;
