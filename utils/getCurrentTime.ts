const getCurrentTime = (value?: string) => {
  let date = new Date();

  if (value) {
    const [hoursStr, minutesStr] = value.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    date.setHours(hours);
    date.setMinutes(minutes);
  }

  const timeString = date.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });

  return timeString;
};

export default getCurrentTime;
