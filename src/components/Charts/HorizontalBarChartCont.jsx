import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from "recharts";

const colors = ["#434343"];

const CustomYAxisTick = (props) => {
  const { x, y, payload } = props;
  const truncatedText = '/'+payload.value.split("/")[1];
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={8} textAnchor="end" fill="#666">
        {truncatedText}
      </text>
    </g>
  );
};

const HorizontalBarChartCont = ({ data, dataKey }) => {
  return (
    <ResponsiveContainer width={"100%"} height={50 * data.length} debounce={50}>
      <BarChart data={data} layout="vertical" margin={{ left: 50, right: 10 }}>
        <XAxis hide type="number" />
        <YAxis
          dataKey={dataKey}
          type="category"
          axisLine={false}
          tick={<CustomYAxisTick />}
        />
        <Tooltip
          formatter={(value) => value.toLocaleString()}
          labelFormatter={(label) => label}
          cursor={{ fill: "transparent" }}
        />

        <Bar
          dataKey="views"
          radius={[0, 16, 16, 0]}
          label={{ position: "insideRight", fill: "#fff" }}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              dataKey="users"
              fill={colors[index % colors.length]}
              isAnimationActive={false}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChartCont;
