import { useEffect, useState } from "react";
import { getNowWeather, getTmrWeather } from "./DayApi";
import * as S from "./styles";
// import getRGBA from "./DayUtils";

const DayPalette = () => {
  const [nowWeather, setNowWeather] = useState<any[]>([]);
  const [tmrWeather, setTmrWeather] = useState<any[]>([]);

  // 시간 변환 (HH)
  const now = new Date();
  const minutes = now.getMinutes();
  const hours =
    minutes < 10
      ? String((now.getHours() - 1 + 24) % 24).padStart(2, "0")
      : String(now.getHours()).padStart(2, "0");

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };
  const today = formatDate(now);
  let tmrToday;
  if (now.getHours() < 6) {
    // 데이터가 6시 기준으로 갱신
    tmrToday = formatDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    );
  } else {
    tmrToday = formatDate(now);
  }

  const tomorrow = formatDate(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  );

  useEffect(() => {
    // 정시 기준 현재 날씨 조회
    getNowWeather(today, hours + "00")
      .then((data) => {
        const filteredData = data.filter(
          (item) => ["T1H", "RN1"].includes(item.category).obsrValue // 날씨, 습도 카테고리
        );
        setNowWeather(filteredData);
      })
      .catch(console.error);
    // 다음날 날씨 조회
    getTmrWeather(tmrToday)
      .then((data) => {
        const filteredData = data.find(
          (item) => item.fcstDate === tomorrow && item.fcstTime === hours + "00"
        );
        setTmrWeather([filteredData]);
      })
      .catch(console.error);
  }, [today, hours, tmrToday, tomorrow]);

  // const todayColor = getRGBA(hours, temp, humidity, pm);

  return (
    <div>
      <S.ColorPalette />
      <h1>날씨 정보</h1>
      <h2>🌤️ 초단기 실황</h2>
      <ul>
        {nowWeather.map((item, index) => (
          <li key={index}>
            {item.category}: {item.obsrValue}
          </li>
        ))}
      </ul>

      <h2>📅 단기 예보</h2>
      <ul>
        {tmrWeather.map((item, index) => (
          <li key={index}>
            {item.category}: {item.fcstValue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayPalette;
