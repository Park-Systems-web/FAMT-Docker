export const dateToLocaleString = (
  date: string,
  timeZone?: string,
  format?: string,
) => {
  // ex> 2022-01-11 17:30
  switch (format) {
    case "MMM DD":
      return new Date(date)
        .toLocaleString("en-GB", {
          timeZone,
          month: "short",
          day: "2-digit",
        })
        .split(" ")
        .reverse()
        .join(" ");
    // ex> Mon, Jan 17, 2022, 02:00 PM
    case "MMM DD YYYY": {
      const splitResult = new Date(date)
        .toLocaleString("en-US", {
          timeZone,
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
        .split(",");
      return `${splitResult[1]} (${splitResult[0]}), ${splitResult[2]}`;
    }
    case "HH:mm":
      return new Date(date).toLocaleString("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
      });
    case "HH:mm am/pm": {
      const resultDate = new Date(date).toLocaleString("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return resultDate === "00:00 pm" ? "12:00 pm" : resultDate;
    }
    default:
      return new Date(date).toLocaleString("sv-SE", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
  }
};

// duration을 계산하여 hh:mm string을 반환하는 메서드
export const calculateDurationToString = (
  startTime: string,
  duration: number,
  timeZone: string,
) => {
  const time = new Date(startTime);
  const minute = time.getMinutes();
  time.setMinutes(minute + duration);

  const timeString = time.toLocaleString("sv-SE", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeString;
};

// duration 계산 후 Date 객체 반환해주는 메서드
export const calculateDurationToDate = (
  startTime: string,
  duration: number,
) => {
  const time = new Date(startTime);
  const minute = time.getMinutes();
  time.setMinutes(minute + duration);
  return time;
};

//
export const getUserTimezoneDate = (startTime: string, timeZone: string) => {
  const newDateString = new Date(startTime).toLocaleString("sv-SE", {
    timeZone,
  });

  return new Date(newDateString);
};

export const isDateValid = (d: Date | null) => {
  return d instanceof Date && !Number.isNaN(d.getTime());
};
