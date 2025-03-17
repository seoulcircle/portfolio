import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import * as S from "./ColorSlider.style";

interface TodayWeather {
  time: string;
  TMP?: string;
  REH?: string;
}

interface SliderProps {
  isOpen: boolean;
  onClose: () => void;
  colors: { hour: number; color: string }[];
  todayWeather: TodayWeather[];
}

const TodayWeatherSlider = ({
  onClose,
  isOpen,
  colors,
  todayWeather,
}: SliderProps) => {
  const getCurrentHour = () => new Date().getHours();
  const [hour, setHour] = useState(getCurrentHour());

  // open 될때마다 초기값 재설정
  useEffect(() => {
    if (isOpen) {
      setHour(getCurrentHour());
    }
  }, [isOpen]);

  // 슬라이더 움직였을 때 시간 value 받아냄
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(parseInt(e.target.value, 10));
  };

  // 시간 value에 맞는 색상 칮기
  const hourColor = colors;
  const getColorByHourColor = (hour: number) => {
    const hourData = hourColor.find((data) => data.hour === hour);
    return hourData ? hourData.color : "rgb(201, 205, 208)";
  };

  // overlay 시간 비율에 맞춰 그라디언트 처리
  const bgcolorGradient = [
    { hour: 6, color: [0, 36, 52, 0.3] },
    { hour: 14, color: [225, 162, 101, 0.3] },
    { hour: 24, color: [0, 7, 153, 0.3] },
  ];
  const getColorByHour = (
    hour: number,
    gradient: { hour: number; color: number[] }[]
  ) => {
    // 현재 hour가 포함된 색상 구간 찾기
    const index = gradient.findIndex(({ hour: h }) => hour < h) - 1;
    if (index < 0) return "rgba(11, 24, 74, 0.4)"; // 기본 색상 반환

    const start = gradient[index];
    const end = gradient[index + 1] || start; // 23시 이후 start 유지
    const ratio = (hour - start.hour) / (end.hour - start.hour); // 시간 비율 계산
    const blended = start.color.map(
      (startVal, i) =>
        i === 3
          ? (startVal * (1 - ratio) + end.color[i] * ratio).toFixed(2) // A 소수점 2자리 유지
          : Math.round(startVal * (1 - ratio) + end.color[i] * ratio) // R, G, B는 정수 변환
    );

    return `rgba(${blended.join(", ")})`;
  };
  const getColorByHourBgColor = (hour: number) =>
    getColorByHour(hour, bgcolorGradient);

  // 원형 shadow 색상 처리
  const getShadowByHour = (hour: number) => {
    const color = getColorByHourColor(hour);
    return `0px 0px 20px 5px ${color}`;
  };

  // 모바일에서 슬라이더 이외에 전체화면 터치 스크롤 방지
  useEffect(() => {
    const disableScroll = (e: TouchEvent) => {
      if (!(e.target instanceof HTMLInputElement)) {
        e.preventDefault(); // 슬라이더가 아닌 경우만 스크롤 차단
      }
    };
    document.addEventListener("touchmove", disableScroll, { passive: false });
    return () => {
      // 언마운트되면 이벤트 제거
      document.removeEventListener("touchmove", disableScroll);
    };
  }, []);

  // 시간 value에 맞는 날씨 정보 리턴
  const getWeatherData = (hour: number) => {
    const data = todayWeather.find((item) => Number(item.time) === hour);
    return {
      temperature: data?.TMP ?? "0",
      humidity: data?.REH ?? "0",
    };
  };
  const { temperature, humidity } = getWeatherData(hour);

  // 시간 value에 따라서 원형 포지션 설정
  const getBottomPosition = (hour: number) => {
    const minHour = 6;
    const maxHour = 23;
    const minBottom = 20;
    const maxBottom = 200;
    const angle = ((hour - minHour) / (maxHour - minHour)) * Math.PI;
    return minBottom + Math.sin(angle) * (maxBottom - minBottom);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backgroundColor: getColorByHourBgColor(hour) }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <S.SliderWrapper onClick={(e) => e.stopPropagation()}>
            <S.SliderTrack>
              <input
                type="range"
                min="6"
                max="23"
                value={hour}
                onChange={handleSliderChange}
              />
              <S.SliderSun
                animate={{
                  left: `${((hour - 6) / 17) * 100 - 5}%`,
                  bottom: `${getBottomPosition(hour)}px`,
                  backgroundColor: getColorByHourColor(hour),
                  boxShadow: getShadowByHour(hour),
                }}
                transition={{ type: "tween", duration: 0.5 }}
              />
            </S.SliderTrack>
            <S.TimeLabels>
              {Array.from({ length: 18 }).map((_, index) => (
                <S.TimeLabel key={index} isActive={index + 6 === hour}>
                  {index + 6}
                  <span>시</span>
                </S.TimeLabel>
              ))}
            </S.TimeLabels>
          </S.SliderWrapper>
          <S.WeatherData>
            <p>{hour}시</p>
            <p>온도: {temperature}°C</p>
            <p>습도: {humidity}%</p>
          </S.WeatherData>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};

export default TodayWeatherSlider;
