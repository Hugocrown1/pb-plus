const dateFormatter = (dateString) => {
  if (!dateString) return "Date";

  const date = new Date(dateString);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDay = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;

  const formattedTime = `${hour}:${minute} ${period}`;

  const formattedDate = `${weekDay}, ${month} ${day} at ${formattedTime}`;

  return formattedDate;
};

export default dateFormatter;
