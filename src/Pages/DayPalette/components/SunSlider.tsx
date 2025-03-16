import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import * as S from "./SunSlider.style";

interface SliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const SunMovementSlider = ({ onClose, isOpen }: SliderProps) => {
  const getCurrentHour = () => new Date().getHours();
  const [hour, setHour] = useState(getCurrentHour());

  useEffect(() => {
    if (isOpen) {
      setHour(getCurrentHour());
    }
  }, [isOpen]);

  const colorGradient = [
    { hour: 0, color: "rgb(249, 243, 148)" },
    { hour: 12, color: "rgb(241, 67, 6)" },
    { hour: 23, color: "rgb(201, 205, 208)" },
  ];
  const bgcolorGradient = [
    { hour: 0, color: "rgba(0, 0, 0, 0.3)" },
    { hour: 12, color: "rgba(225, 225, 225, 0.3)" },
    { hour: 23, color: "rgba(11, 24, 74, 0.4)" },
  ];

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

  const getColorByHourColor = (hour: number) =>
    getColorByHour(hour, colorGradient);
  const getColorByHourBgColor = (hour: number) =>
    getColorByHour(hour, bgcolorGradient, true);

  const getColorByHourShadow = (hour: number) => {
    const color = getColorByHourColor(hour);
    return `0px 0px 20px 5px ${color}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(parseInt(e.target.value, 10));
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
                min="0"
                max="23"
                value={hour}
                onChange={handleSliderChange}
              />
              <S.SliderSun
                animate={{
                  left: `${(hour / 23) * 100 - 5}%`,
                  backgroundColor: getColorByHourColor(hour),
                  boxShadow: getColorByHourShadow(hour),
                }}
                transition={{ type: "tween", duration: 0.5 }}
              />
            </S.SliderTrack>
            <S.TimeLabels>
              {Array.from({ length: 24 }).map((_, index) => (
                <S.TimeLabel key={index} isActive={index === hour}>
                  {index}
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
