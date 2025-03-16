import { useState } from "react";
import * as S from "./styles";
import WeatherModal from "./components/Modal";
import useTime from "./hooks/useTime";
import useWeatherData from "./hooks/useWeatherData";
import useColor from "./hooks/useColor";
import SunMovementSlider from "./components/SunSlider";
import { AnimatePresence } from "framer-motion";

const DayPalette = () => {
  const { hours, today, tmrToday, tomorrow } = useTime();
  const { nowWeather, tmrWeather, dustData, tmrDustData } = useWeatherData(
    today,
    hours,
    tmrToday,
    tomorrow
  );
  const { gradient, startRGBA, endRGBA, handleMouseMove } = useColor(
    nowWeather,
    dustData,
    tmrWeather,
    tmrDustData,
    hours
  );

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [slider, setSlider] = useState(false);
  const handleOutsideClick = (e: React.MouseEvent) => {
    // 모달이 열려있을 때만 닫기
    if (activeModal || slider) {
      setActiveModal(null);
      setSlider(false);
    }
  };

  return (
    <S.Wrapper
      gradient={gradient}
      onMouseMove={handleMouseMove}
      onClick={handleOutsideClick}
    >
      <S.DotWrapper>
        <S.Today startRGBA={startRGBA} onClick={() => setActiveModal("today")}>
          Today
        </S.Today>
        <S.SunMovement
          onClick={(e) => {
            setSlider((prev) => !prev);
          }}
        >
          Solar
        </S.SunMovement>
        <S.Tomorrow
          endRGBA={endRGBA}
          onClick={() => setActiveModal("tomorrow")}
        >
          Tomorrow
        </S.Tomorrow>
      </S.DotWrapper>
      <S.ModalWrapper>
        <WeatherModal
          isOpen={activeModal === "today"}
          onClose={() => setActiveModal(null)}
          weatherData={nowWeather}
          dustData={dustData}
          colorRGBA={{ startRGBA, endRGBA }}
          modalType="today"
        />
        <SunMovementSlider isOpen={slider} onClose={() => setSlider(false)} />

        <WeatherModal
          isOpen={activeModal === "tomorrow"}
          onClose={() => setActiveModal(null)}
          weatherData={tmrWeather}
          dustData={tmrDustData}
          colorRGBA={{ startRGBA, endRGBA }}
          modalType="tomorrow"
        />
      </S.ModalWrapper>
    </S.Wrapper>
  );
};

export default DayPalette;
