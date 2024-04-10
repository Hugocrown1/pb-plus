"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

function RouteTracker() {
  const pathname = usePathname();
  const [device, setDevice] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === "authenticated") {
          if (!pathname.startsWith("/dashboard")) {
            const userAgent = navigator.userAgent;
            let currentDevice;
            // Detectar el tipo de dispositivo
            if (
              /Android/i.test(userAgent) ||
              /iPhone|iPad|iPod/i.test(userAgent) ||
              /Windows Phone/i.test(userAgent)
            ) {
              currentDevice = "Mobile";
            } else if (/Tablet/i.test(userAgent) || /iPad/i.test(userAgent)) {
              currentDevice = "Tablet";
            } else {
              currentDevice = "Desktop";
            }
            setDevice(currentDevice);

            const currentDateTime = new Date().toISOString();

            const visitData = {
              page: pathname,
              device: currentDevice,
              user: session?.user?.email,
              dateTime: currentDateTime,
            };

            await axios.post("/api/visit", visitData);
          }
        } else if (
          status === "unauthenticated" &&
          !pathname.startsWith("/dashboard")
        ) {
          const userAgent = navigator.userAgent;
          let currentDevice;
          // Detectar el tipo de dispositivo
          if (
            /Android/i.test(userAgent) ||
            /iPhone|iPad|iPod/i.test(userAgent) ||
            /Windows Phone/i.test(userAgent)
          ) {
            currentDevice = "Mobile";
          } else if (/Tablet/i.test(userAgent) || /iPad/i.test(userAgent)) {
            currentDevice = "Tablet";
          } else {
            currentDevice = "Desktop";
          }
          setDevice(currentDevice);

          const currentDateTime = new Date().toISOString();

          const visitData = {
            page: pathname,
            device: currentDevice,
            user: "Guest",
            dateTime: currentDateTime,
          };

          // Hacer la solicitud POST a la API para guardar los datos usando Axios
          await axios.post("/api/visit", visitData);
        }
      } catch (error) {
        console.error("Error al guardar la visita:", error);
      }
    };

    fetchData();
  }, [pathname, session, status]);

  return null;
}

export default RouteTracker;
