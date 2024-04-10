"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "@/components/Charts/Chart";
import {
  IconEye,
  IconUsers,
  IconCalendarEvent,
  IconHome,
  IconMailQuestion,
  IconHammer,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const Page = () => {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role == "admin";

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [events, setEvents] = useState([]);
  const [views, setViews] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [prices, setPrices] = useState([]);
  const [todayViews, setTodayViews] = useState(0);
  const [todayProperties, setTodayProperties] = useState(0);
  const [todayPrices, setTodayPrices] = useState(0);
  const [todayConsultations, setTodayConsultatios] = useState(0);
  const [todayUsers, setTodayUsers] = useState(0);
  const [todayEvents, setTodayEvents] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    axios
      .all([
        axios.get("/api/visit"),
        axios.get("/api/users"),
        axios.get("/api/properties"),
        axios.get("/api/events"),
        axios.get("/api/consultations"),
        axios.get("/api/prices"),
      ])
      .then(
        axios.spread(
          (
            visitRes,
            usersRes,
            propertiesRes,
            eventsRes,
            consultationsRes,
            pricesRes
          ) => {
            setViews(visitRes.data);
            setUsers(usersRes.data);
            setProperties(propertiesRes.data);
            setEvents(eventsRes.data);
            setConsultations(consultationsRes.data);
            setPrices(pricesRes.data);

            // Filter today's properties
            const todayPropertiesCount = propertiesRes.data.filter(
              (property) => {
                const propertyDate = new Date(property.publishDate);
                return propertyDate >= today;
              }
            ).length;
            setTodayProperties(todayPropertiesCount);

            // Filter today's events
            const todayEventsCount = eventsRes.data.filter((event) => {
              const eventDate = new Date(event.date);
              return eventDate >= today;
            }).length;
            setTodayEvents(todayEventsCount);

            // Filter today's consultations
            const todayConsultationsCount = consultationsRes.data.filter(
              (consultation) => {
                const consultationDate = new Date(consultation.date);
                return consultationDate >= today;
              }
            ).length;
            setTodayConsultatios(todayConsultationsCount);

            // Filter today's users
            const todayUsersCount = usersRes.data.filter((user) => {
              const userDate = new Date(user.date);
              return userDate >= today;
            }).length;
            setTodayUsers(todayUsersCount);

            // Filter today's prices
            const todayPricesCount = pricesRes.data.filter((price) => {
              const priceDate = new Date(price.date);
              return priceDate >= today;
            }).length;
            setTodayPrices(todayPricesCount);

            // Calculate today's views
            const todayViewsCount = visitRes.data.filter((visit) => {
              const visitDate = new Date(visit.dateTime);
              return visitDate >= today;
            }).length;
            setTodayViews(todayViewsCount);

            setIsLoading(false);
          }
        )
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };

  if (isAdmin) {
    return isLoading ? (
      <LoadingScreen />
    ) : (
      <main className="flex w-full overflow-hidden bg-white min-h-screen">
        <div class="grid xl:grid-cols-6 grid-cols-3 grid-rows-4 xl:gap-4 gap-2  w-full mt-[70px] mb-[60px] xl:mb-[0px] xl:p-4 p-2">
          <div class="col-span-1 row-span-1 bg-[#fafafa] shadow-md xl:p-8 p-2 flex flex-col items-start justify-center  border border-gray-200 rounded-xl">
            <IconEye className="xl:w-12 xl:h-12 w-10 h-10 bg-[#f3f2f2] rounded-md text-[#8c2828]" />
            <p class="xl:text-2xl text-lg font-semibold text-gray-800">
              {views.length}
            </p>
            <p class="xl:text-base text-sm text-gray-500">Total Views</p>

            <div className="bg-gray-300 h-[1px] w-full"></div>
            <p className="xl:text-base text-sm text-green-500">
              +{todayViews} Today
            </p>
          </div>
          <div class="col-span-1 row-span-1 bg-[#fafafa] shadow-md xl:p-8 p-2 flex flex-col items-start justify-center border border-gray-200 rounded-xl">
            <IconHome className="xl:w-12 xl:h-12 w-10 h-10 bg-[#f3f2f2] rounded-md text-[#8c2828]" />
            <p class="xl:text-2xl text-lg font-semibold text-gray-800">
              {properties.length}
            </p>
            <p class="xl:text-base text-sm text-gray-500">Properties</p>
            <div className="bg-gray-300 h-[1px] w-full"></div>
            <p class="xl:text-base text-sm text-green-500">
              +{todayProperties} Today
            </p>
          </div>
          <div class="col-span-1 row-span-1 bg-[#fafafa] shadow-md xl:p-8 p-2 flex flex-col items-start justify-center  border border-gray-200 rounded-xl">
            <IconCalendarEvent className="xl:w-12 xl:h-12 w-10 h-10 bg-[#f3f2f2] rounded-md text-[#8c2828]" />
            <p class="xl:text-2xl text-lg font-semibold text-gray-800">
              {events.length}
            </p>
            <p class="xl:text-base text-sm text-gray-500"> Events</p>
            <div className="bg-gray-300 h-[1px] w-full"></div>
            <p class="xl:text-base text-sm text-green-500">
              +{todayEvents} Today
            </p>
          </div>
          <div class="col-span-1 row-span-1 bg-[#fafafa] shadow-md xl:p-8 p-2 flex flex-col items-start justify-center  border border-gray-200 rounded-xl">
            <IconMailQuestion className="xl:w-12 xl:h-12 w-10 h-10 bg-[#f3f2f2] rounded-md text-[#8c2828]" />
            <p class="xl:text-2xl text-lg font-semibold text-gray-800">
              {consultations.length}
            </p>
            <p class="xl:text-base text-sm text-gray-500">Legal Consul</p>
            <div className="bg-gray-300 h-[1px] w-full"></div>
            <p class="xl:text-base text-sm text-green-500">
              +{todayConsultations} Today
            </p>
          </div>
          <div class="col-span-1 row-span-1 bg-[#fafafa] shadow-md xl:p-8 p-2 flex flex-col items-start justify-center  border border-gray-200 rounded-xl">
            <IconHammer className="xl:w-12 xl:h-12 w-10 h-10 bg-[#f3f2f2] rounded-md text-[#8c2828]" />
            <p class="xl:text-2xl text-lg font-semibold text-gray-800">
              {prices.length}
            </p>
            <p class="xl:text-base text-sm text-gray-500">Remo Quotes</p>

            <div className="bg-gray-300 h-[1px] w-full"></div>
            <p class="xl:text-base text-sm text-green-500">
              +{todayPrices} Today
            </p>
          </div>
          <div class="col-span-1 row-span-1 bg-[#fafafa] shadow-md xl:p-8 p-2 flex flex-col items-start justify-center border border-gray-200 rounded-xl">
            <IconUsers className="xl:w-12 xl:h-12 w-10 h-10 bg-[#f3f2f2] rounded-md text-[#8c2828]" />
            <p class="xl:text-2xl text-lg font-semibold text-gray-800">
              {users.length}
            </p>
            <p class="xl:text-base text-sm text-gray-500">Total Users</p>
            <div className="bg-gray-300 h-[1px] w-full"></div>
            <p class="xl:text-base text-sm text-green-500">
              +{todayUsers} Today
            </p>
          </div>

          <div class="col-span-3 row-span-3 bg-[#fafafa] shadow-md xl:p-4 flex flex-col  justify-center  border border-gray-200 rounded-xl">
            <p class="xl:text-xl text-lg text-gray-800 font-bold xl:p-8 p-4">
              Daily Traffic
            </p>
            <Chart data={views} numDays={7}></Chart>
          </div>
          <div class="col-span-3 row-span-3 bg-[#fafafa] shadow-md xl:p-4 flex flex-col   border border-gray-200 rounded-xl">
            <div className="w-full xl:h-1/2">
              <p class="xl:text-xl text-lg text-gray-800 xl:p-8 p-4 font-bold">Recent Quotes</p>
              <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Service
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider xl:block hidden"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#fafafa] divide-y divide-gray-200">
                  {prices
                    .slice()
                    .reverse()
                    .slice(0, 3)
                    .map((price, index) => (
                      <tr key={index}>
                        <td className="xl:px-6 px-2 py-4 whitespace-nowrap max-w-44 overflow-hidden xl:max-w-none">
                          <div className="flex items-center">
                            <div className="xl:ml-4">
                              <div className="text-sm text-gray-500 font-bold uppercase">
                                {price.serviceName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="xl:px-6 px-2 py-4 whitespace-nowrap text-sm text-gray-500 xl:block hidden">
                          {price.userName}
                        </td>
                        <td className="xl:px-6 px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                          {timeSince(price.date)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="w-full xl:h-1/2 h-full">
              <p class="xl:text-xl text-lg text-gray-800 xl:p-8 p-4 font-bold">Recent Consultations</p>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Service
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider xl:block hidden"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#fafafa] divide-y divide-gray-200">
                  {consultations
                    .slice()
                    .reverse()
                    .slice(0, 3)
                    .map((consultation, index) => (
                      <tr key={index}>
                        <td className="xl:px-6 px-2 py-4 whitespace-nowrap max-w-44 overflow-hidden xl:max-w-none">
                          <div className="flex items-center">
                            <div className="xl:ml-4">
                              <div className="text-sm text-gray-500 font-bold uppercase">
                                {consultation.serviceName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="xl:px-6 px-2 py-4 whitespace-nowrap text-sm text-gray-500 xl:block hidden">
                          {consultation.userName}
                        </td>
                        <td className="xl:px-6 px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                          {timeSince(consultation.date)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return null;
};

export default Page;
