export function getTimeStamps(updatedAt, createdAt) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let updateYear = updatedAt.getFullYear();
  let updateMonth = months[updatedAt.getMonth()];
  let updateDay = days[updatedAt.getDay()];
  let updateDate = updatedAt.getDate();
  let updateHours = updatedAt.getHours();
  let updateMin = updatedAt.getMinutes();

  let createdFullYear = createdAt.getFullYear();
  let createdMonth = months[createdAt.getMonth()];
  let createdDay = days[createdAt.getDay()];
  let createdDayNr = createdAt.getDate();
  let createdHours = createdAt.getHours();
  let createdMinutes = createdAt.getMinutes();

  const updatedAtTime =
    updateDay +
    " " +
    updateDate +
    " " +
    updateMonth +
    " / " +
    updateYear +
    " " +
    updateHours +
    ":" +
    updateMin;

  const createdAtTime =
    createdDay +
    " " +
    createdDayNr +
    " " +
    createdMonth +
    " / " +
    createdFullYear +
    " " +
    createdHours +
    ":" +
    createdMinutes;
  return { updatedAtTime, createdAtTime };
}
