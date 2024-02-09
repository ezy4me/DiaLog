const getCurrentTime = (value?: string) => {
  let date = new Date();
  let hours = 0;
  let minutes = 0;

  if (value) {
    if (value.includes("-")) {
      date = new Date(value);
      const [hoursStr, minutesStr] = value.substring(11, 19).split(":");

      hours = parseInt(hoursStr, 10);
      minutes = parseInt(minutesStr, 10);
    } else {
      const [hoursStr, minutesStr] = value.split(":");
      hours = parseInt(hoursStr, 10);
      minutes = parseInt(minutesStr, 10);
    }

    date.setHours(hours);
    date.setMinutes(minutes);
  }

  const timeString = date.toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeString;
};

export default getCurrentTime;
