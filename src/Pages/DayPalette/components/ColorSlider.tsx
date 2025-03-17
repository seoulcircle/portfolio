import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import * as S from "./ColorSlider.style";

interface SliderProps {
  isOpen: boolean;
  onClose: () => void;
  colors: { hour: number; color: string }[];
}

const SunMovementSlider = ({ onClose, isOpen, colors }: SliderProps) => {
  const getCurrentHour = () => new Date().getHours();
  const [hour, setHour] = useState(getCurrentHour());

  useEffect(() => {
    if (isOpen) {
      setHour(getCurrentHour());
    }
  }, [isOpen]);

  const bgcolorGradient = [
    { hour: 0, color: "rgba(8, 129, 185, 0.3)" },
    { hour: 12, color: "rgba(225, 162, 101, 0.3)" },
    { hour: 23, color: "rgba(93, 99, 228, 0.4)" },
  ];
  const hourColor = colors;

  const getColorByHour = (
    hour: number,
    gradient: { hour: number; color: string }[],
    isRGBA = false
  ) => {
    for (let i = 0; i < gradient.length - 1; i++) {
      const start = gradient[i];
      const end = gradient[i + 1];

      if (hour >= start.hour && hour <= end.hour) {
        const ratio = (hour - start.hour) / (end.hour - start.hour);

        const startValues =
          start.color.match(/\d+(\.\d+)?/g)?.map(Number) || [];
        const endValues = end.color.match(/\d+(\.\d+)?/g)?.map(Number) || [];

        const blended = startValues.map(
          (startVal, idx) =>
            Math.round(startVal * (1 - ratio) + (endValues[idx] || 0) * ratio) // 시작 색과 마지막 색을 시간 비율만큼 계산
        );

        if (isRGBA) {
          return `rgba(${blended[0]}, ${blended[1]}, ${blended[2]}, ${Math.max(
            blended[3] || 0.3,
            0.3
          )})`;
        }
        return `rgb(${blended.slice(0, 3).join(", ")})`;
      }
    }

    return isRGBA ? "rgba(11, 24, 74, 0.4)" : "rgb(201, 205, 208)";
  };

  // 현재 hour에 맞는 색상
  const getColorByHourColor = (hour: number) => {
    // `hourColor` 배열에서 현재 `hour`에 해당하는 색상 찾기
    const hourData = hourColor.find((data) => data.hour === hour);
    return hourData ? hourData.color : "rgb(201, 205, 208)"; // 기본 색상 설정
  };

  const getColorByHourBgColor = (hour: number) =>
    getColorByHour(hour, bgcolorGradient, true);

  const getColorByHourShadow = (hour: number) => {
    const color = getColorByHourColor(hour);
    return `0px 0px 20px 5px ${color}`;
  };
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(parseInt(e.target.value, 10));
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // ✅ 기본 터치 스크롤 이벤트 방지
    document.body.style.overflow = "hidden"; // ✅ 스크롤 방지
  };

  const handleTouchEnd = () => {
    document.body.style.overflow = "auto"; // ✅ 스크롤 다시 활성화
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // ✅ 터치 이동 시 스크롤 방지
  };

  const getBottomPosition = (hour: number) => {
    const minHour = 6;
    const maxHour = 23;
    const minBottom = 20;
    const maxBottom = 200;

    // 시간(6~23)을 0°~180°로 변환
    const angle = ((hour - minHour) / (maxHour - minHour)) * Math.PI; // 라디안 단위 변환

    // 사인 함수 적용하여 반원형 변환
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
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
              <S.SliderSun
                animate={{
                  left: `${((hour - 6) / 17) * 100 - 5}%`,
                  bottom: `${getBottomPosition(hour)}px`,
                  backgroundColor: getColorByHourColor(hour),
                  boxShadow: getColorByHourShadow(hour),
                }}
                transition={{ type: "tween", duration: 0.5 }}
              />
            </S.SliderTrack>
            <S.TimeLabels>
              {Array.from({ length: 18 }).map((_, index) => (
                <S.TimeLabel key={index} isActive={index + 6 === hour}>
                  {index + 6}
                  <span>시</span> {/* 6시부터 23시 */}
                </S.TimeLabel>
              ))}
            </S.TimeLabels>
          </S.SliderWrapper>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};

export default SunMovementSlider;
