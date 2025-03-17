import { useState, useEffect } from "react";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const useTime = () => {
  const [time, setTime] = useState({
    hours: "",
    today: "",
    tmrToday: "",
    tomorrow: "",
  });

  useEffect(() => {
    const now = new Date();
    const minutes = now.getMinutes();
    const hours =
      minutes < 10
        ? String((now.getHours() - 1 + 24) % 24).padStart(2, "0")
        : String(now.getHours()).padStart(2, "0");

    const today = formatDate(now);
    // minutes < 10
    //   ? formatDate(
    //       new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    //     )
    //   : formatDate(now);

    const tmrToday =
      now.getHours() < 6
        ? formatDate(
            new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
          )
        : formatDate(now);
    const tomorrow = formatDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    );

    setTime({ hours, today, tmrToday, tomorrow });
  }, []);

  return time;
};

export default useTime;
