import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

const COLORS = ["#434343", "green", "green", "#FF8042"];

const DevicePieChart = ({ numDays }) => {
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [numDays]);

  const fetchData = () => {
    axios
      .get("/api/visit")
      .then((response) => {
        const filteredData = filterDataByNumDays(response.data, numDays);
        const devices = filteredData.map((visit) => visit.device);
        const deviceCounts = devices.reduce((acc, device) => {
          acc[device] = (acc[device] || 0) + 1;
          return acc;
        }, {});
        const data = Object.keys(deviceCounts).map((device) => ({
          name:
            device === "unknown"
              ? "Unknown"
              : device.charAt(0).toUpperCase() + device.slice(1),
          value: deviceCounts[device],
        }));
        setDeviceData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const filterDataByNumDays = (data, numDays) => {
    const today = new Date();
    const cutoffDate = new Date(today);
    cutoffDate.setDate(cutoffDate.getDate() - numDays);
   
    return data.filter((visit) => new Date(visit.dateTime) >= cutoffDate );
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-full w-full overflow-y-hidden">
      <ResponsiveContainer width="100%" height="82%">
        <PieChart>
          <Pie
            data={deviceData}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={70}
            dataKey="value"
          >
            {deviceData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DevicePieChart;
