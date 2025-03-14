import { useEffect, useState } from "react";
import { getUltraShortForecast, getVillageForecast } from "./DayApi";

const DayPalette = () => {
  const [ultraShortData, setUltraShortData] = useState<any[]>([]);
  const [villageData, setVillageData] = useState<any[]>([]);

  // 날짜 & 시간 처리
  const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const nowHour = new Date().getHours().toString().padStart(2, "0");
  const nowTime = `${nowHour}00`;

  useEffect(() => {
    // 초단기 실황 조회
    getUltraShortForecast(today, nowTime)
      .then(setUltraShortData)
      .catch(console.error);

    // 단기 예보 조회
    getVillageForecast(today).then(setVillageData).catch(console.error);
  }, [today, nowTime]);

  return (
    <div>
      <h1>날씨 정보</h1>

      <h2>🌤️ 초단기 실황</h2>
      <ul>
        {ultraShortData.map((item, index) => (
          <li key={index}>
            {item.category}: {item.obsrValue}
          </li>
        ))}
      </ul>

      <h2>📅 단기 예보</h2>
      <ul>
        {villageData.map((item, index) => (
          <li key={index}>
            {item.category}: {item.fcstValue} ({item.fcstTime})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayPalette;
