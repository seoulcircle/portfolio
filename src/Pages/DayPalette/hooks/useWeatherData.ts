import { useEffect, useState } from "react";
import {
  getNowWeather,
  getTmrWeather,
  getDustData,
  IDustData,
} from "../DayApi";

interface WeatherData {
  T1H?: string;
  TMP?: string;
  REH?: string;
}

interface DustData {
  pm10Value?: string;
  pm10Value24?: string;
}
interface TodayWeather {
  time: string;
  TMP?: string;
  REH?: string;
}

const useWeatherData = (
  today: string,
  hours: string,
  tmrToday: string,
  tomorrow: string
) => {
  const [nowWeather, setNowWeather] = useState<WeatherData | null>(null);
  const [tmrWeather, setTmrWeather] = useState<WeatherData | null>(null);
  const [todayWeather, setTodayWeather] = useState<TodayWeather[]>([]);
  const [dustData, setDustData] = useState<DustData | null>(null);
  const [tmrDustData, setTmrDustData] = useState<DustData | null>(null);

  useEffect(() => {
    if (!today || !hours || !tmrToday || !tomorrow) {
      return;
    }
    // 현재의 날씨 데이터
    getNowWeather(today, hours + "00")
      .then((data) => {
        setNowWeather({
          T1H: data?.find((item) => item.category === "T1H")?.obsrValue,
          REH: data?.find((item) => item.category === "REH")?.obsrValue,
        });
      })
      .catch(console.error);

    // 내일의 날씨 데이터
    getTmrWeather(tmrToday)
      .then((data) => {
        const filteredData = data?.filter(
          (item) =>
            item.fcstDate === tomorrow &&
            item.fcstTime === hours + "00" &&
            (item.category === "TMP" || item.category === "REH")
        );

        setTmrWeather({
          TMP: filteredData?.find((item) => item.category === "TMP")?.fcstValue,
          REH: filteredData?.find((item) => item.category === "REH")?.fcstValue,
        });
      })
      .catch(console.error);

    // 오늘의 날씨 데이터
    getTmrWeather(today)
      .then((data) => {
        const filteredData = data?.filter(
          (item) =>
            item.fcstDate === today &&
            (item.category === "TMP" || item.category === "REH")
        );

        const groupedData = filteredData?.reduce<
          { time: string; TMP?: string; REH?: string }[]
        >((acc, item) => {
          const time = item.fcstTime.slice(0, 2).padStart(2, "0");
          const category = item.category as "TMP" | "REH";
          const existing = acc.find((entry) => entry.time === time);

          if (existing) {
            existing[category] = item.fcstValue;
          } else {
            acc.push({ time, [item.category]: item.fcstValue });
          }

          return acc;
        }, []);
        setTodayWeather(groupedData);
      })
      .catch(console.error);

    // 미세먼지 데이터
    getDustData()
      .then((data: IDustData[]) => {
        const filteredData = data?.find(
          (item) => item.stationName === "종로구"
        );
        setDustData({ pm10Value: filteredData?.pm10Value });
        setTmrDustData({ pm10Value24: filteredData?.pm10Value24 });
      })
      .catch(console.error);
  }, [today, hours, tomorrow, tmrToday]);
  return { nowWeather, tmrWeather, dustData, tmrDustData, todayWeather };
};

export default useWeatherData;
