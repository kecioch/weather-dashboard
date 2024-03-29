const getTimeString = (date, timezone) => {
  const options = {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
    ,
    { value: hour },
    ,
    { value: minute },
  ] = formatter.formatToParts(date);

  return `${year}-${month}-${day}T${hour === "24" ? "00" : hour}:${minute}`;
};

const calcMsUntilNextHour = () => {
  const now = new Date();
  const minutesUntilNextHour = 60 - now.getMinutes();
  const secondsUntilNextHour = minutesUntilNextHour * 60 - now.getSeconds();
  const millisecondsUntilNextHour = secondsUntilNextHour * 1000;
  return millisecondsUntilNextHour;
};

export { getTimeString, calcMsUntilNextHour };
