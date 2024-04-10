"use client";
import React, { useState, useEffect } from "react";
import Chart from "@/components/Charts/Chart";
import DevicePieChart from "@/components/Charts/PieChart";
import axios from "axios";
import HorizontalBarChartDept from "@/components/Charts/HorizontalBarChartDept";
import HorizontalBarChartCont from "@/components/Charts/HorizontalBarChartCont";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [views, setViews] = useState([]);
  const [totalPageviews, setTotalPageviews] = useState(0);
  const [guestVisitors, setGuestVisitors] = useState(0);
  const [userVisitors, setUserVisitors] = useState(0);
  const [numDays, setNumDays] = useState(29);
  const [topContent, setTopContent] = useState([]);
  const [topDepartments, setTopDepartments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/visit")
      .then((res) => {
        setViews(res.data);
        filterData(res.data, numDays);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching views:", error);
        setIsLoading(false);
      });
  }, [numDays]);

  const filterData = (data, numDays) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);

    if (numDays === 1) {
      // Si numDays es 1, filtramos para el día de hoy
      startDate.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 del día actual
    } else {
      // Filtramos para el rango de fechas correspondiente a los últimos numDays días
      startDate.setDate(currentDate.getDate() - numDays);
    }

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.dateTime);
      return itemDate >= startDate && itemDate <= currentDate;
    });

    setTotalPageviews(filteredData.length);

    const guestViews = filteredData.filter((view) => view.user === "Guest");
    const userViews = filteredData.filter((view) => view.user !== "Guest");

    setGuestVisitors(guestViews.length);
    setUserVisitors(userViews.length);

    const pageviewsMap = filteredData.reduce((acc, view) => {
      acc[view.page] = (acc[view.page] || 0) + 1;
      return acc;
    }, {});

    // Ordenar las páginas por la cantidad de visitas de mayor a menor
    const sortedContent = Object.keys(pageviewsMap).sort(
      (a, b) => pageviewsMap[b] - pageviewsMap[a]
    );

    setTopContent(
      sortedContent
        .map((page) => ({ page, views: pageviewsMap[page] }))
        .slice(0, 5)
    );

    const departmentsMap = [
      { department: "/remo" },
      { department: "/real-estate" },
      { department: "/legal" },
      { department: "/community" },
    ];

    const topDepartmentsData = departmentsMap.map((dept) => {
      return {
        ...dept,
        views: Object.keys(pageviewsMap)
          .filter((page) => page.startsWith(dept.department))
          .reduce((total, page) => total + pageviewsMap[page], 0),
      };
    });

    const sortedDepartments = topDepartmentsData.sort(
      (a, b) => b.views - a.views
    );
    setTopDepartments(sortedDepartments);
  };

  const handleNumDaysChange = (e) => {
    setNumDays(parseInt(e.target.value));
  };

  const renderHeader = () => {
    switch (numDays) {
      case 1:
        return "Daily Overview";
      case 6:
        return "Weekly Overview";
      case 29:
        return "Monthly Overview";
      default:
        return "Overview";
    }
  };

  const calculateUserVisits = () => {
    const userVisits = {};

    // Iterar sobre las vistas filtradas para contar las visitas de cada usuario
    views.forEach((view) => {
      const itemDate = new Date(view.dateTime);
      const currentDate = new Date();
      const startDate = new Date(currentDate);

      if (numDays === 1) {
        // Si numDays es 1, filtramos para el día de hoy
        startDate.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 del día actual
      } else {
        // Filtramos para el rango de fechas correspondiente a los últimos numDays días
        startDate.setDate(currentDate.getDate() - numDays);
      }

      if (itemDate >= startDate && itemDate <= currentDate) {
        if (view.user !== "Guest") {
          if (!userVisits[view.user]) {
            userVisits[view.user] = 1;
          } else {
            userVisits[view.user]++;
          }
        }
      }
    });

    // Convertir el objeto en un array de objetos
    const userVisitsArray = Object.entries(userVisits).map(
      ([user, visits]) => ({ user, visits })
    );

    // Ordenar el array por número de visitas en orden descendente
    userVisitsArray.sort((a, b) => b.visits - a.visits);

    return userVisitsArray;
  };

  const calculateAverageUserPageviews = () => {
    const userVisits = calculateUserVisits();
    const totalUserPageviews = userVisits.reduce(
      (acc, user) => acc + user.visits,
      0
    );
    const totalUsers = userVisits.length;
    const averageUserPageviews =
      totalUsers > 0 ? totalUserPageviews / totalUsers : 0;
    return Math.round(averageUserPageviews);
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <main className=" flex w-full flex-col  overflow-hidden bg-white min-h-screen">
      <div className="flex items-center justify-between xl:p-4 p-2 mt-[70px]">
        <p className="xl:text-2xl text-xl font-bold">{renderHeader()}</p>
        <div className="flex">
          <select
            className="border border-gray-300 rounded-md p-2"
            value={numDays}
            onChange={handleNumDaysChange}
          >
            <option value={29}>Monthly</option>
            <option value={6}>Weekly</option>
            <option value={1}>Daily</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 grid-rows-5 xl:gap-4 gap-2  w-full  xl:p-4 p-2">
        {/* Chart Component */}
        <div className="h-full col-span-4 row-span-2 bg-[#fafafa]  flex flex-col items-start justify-center border border-gray-200 shadow-md rounded-xl">
          <p className="text-xl text-gray-800 pt-8 xl:pl-8 pl-4 pb-4 font-bold">Visitors Analytics</p>
          <Chart data={views} numDays={numDays}></Chart>
        </div>
        {/* Total Pageviews, Guest Visitors, User Visitors */}
        <div className="h-full col-span-4 row-span-1 bg-[#fafafa] flex flex-col items-start justify-center  border border-gray-200 shadow-md rounded-xl">
          <div className="flex justify-between w-full xl:px-32">
            <div className="flex flex-col text-center">
              <p className="text-[20px] xl:text-[35px]">{totalPageviews}</p>
              <p className="text-gray-500 text-sm xl:text-lg">Total pageviews</p>
            </div>
            <div className="w-[1px] h-full bg-gray-300"></div>
            <div className="flex flex-col text-center">
              <p className="text-[20px] xl:text-[35px]">{guestVisitors}</p>
              <p className="text-gray-500 text-sm xl:text-lg">Guest visitors</p>
            </div>
            <div className="w-[1px] h-full bg-gray-300"></div>
            <div className="flex flex-col text-center">
              <p className="text-[20px] xl:text-[35px]">{userVisitors}</p>
              <p className="text-gray-500 text-sm xl:text-lg">Users visitors</p>
            </div>
            <div className="w-[1px] h-full bg-gray-300"></div>
            <div className="flex flex-col text-center">
              <p className="text-[20px] xl:text-[35px]">{calculateAverageUserPageviews()}</p>
              <p className="text-gray-500 text-sm xl:text-lg">Average views</p>
            </div>
          </div>
        </div>
        {/* Top Content */}
        <div className="col-span-4 xl:col-span-2 row-span-2 bg-[#fafafa] flex flex-col items-start justify-start border border-gray-200 shadow-md rounded-xl">
          <p className="text-xl text-gray-800 pt-8 xl:pl-8 pl-4 pb-4 font-bold">Top Content</p>
          <HorizontalBarChartCont data={topContent} dataKey={"page"} />
        </div>

        {/* Top Departments */}
        <div className="col-span-4 xl:col-span-2 row-span-2 bg-[#fafafa] flex flex-col items-start justify-start border border-gray-200 shadow-md rounded-xl">
          <p className="text-xl text-gray-800 pt-8 xl:pl-8 pl-4 pb-4 font-bold">
            Top Departments
          </p>
          <HorizontalBarChartDept data={topDepartments} dataKey={"department"} />
        </div>
      </div>
      {/* Pie Chart */}
      <div className="flex xl:flex-row flex-col gap-3 px-2 xl:px-4 pb-4 ">
        {/* Visitors Analytics Pie Chart */}
        <div className="h-full w-full xl:w-2/5 bg-[#fafafa]  border border-gray-200 shadow-md rounded-xl">
          <p className="text-xl text-gray-800 pt-8 xl:pl-8 pl-4 pb-4 font-bold">Used Devices</p>
          <DevicePieChart numDays={numDays} />
          {/* Placeholder */}
          <div className="mx-8 flex flex-wrap items-center justify-center gap-y-3">
            {/* Placeholder for Pie Chart Legends */}
          </div>
        </div>
        {/* Top Users Visitors */}
        <div className="h-full w-full xl:w-3/5 bg-[#fafafa] border border-gray-200 shadow-md rounded-xl overflow-hidden">
          <p className="text-xl text-gray-800 pt-8 xl:pl-8 pl-4 pb-4 font-bold">
            Top Users Views
          </p>
          <div className="xl:m-4">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-500 font-bold uppercase text-xs xl:text-sm">
                    User
                  </th>
                  <th className="px-4 py-2 text-gray-500  font-bold uppercase text-xs xl:text-sm">
                  Views
                  </th>
                </tr>
              </thead>
              <tbody>
                {calculateUserVisits()
                  .sort((a, b) => b.visits - a.visits)
                  .slice(0, 10)
                  .map((user, index) => (
                    <tr
                      key={index}
                      className=" border-y-2 border-gray-200"
                    >
                      <td className="px-4 py-2 text-xs xl:text-sm">{user.user}</td>
                      <td className="px-4 py-2 text-xs xl:text-sm">{user.visits}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
