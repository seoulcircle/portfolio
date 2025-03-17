import { useState } from "react";
import * as S from "./styles";
import WeatherModal from "./components/Modal";
import useTime from "./hooks/useTime";
import useWeatherData from "./hooks/useWeatherData";
import useColor from "./hooks/useColor";
import ColorSlider from "./components/ColorSlider";

const DayPalette = () => {
  const { hours, today, tmrToday, tomorrow } = useTime();
  const { nowWeather, tmrWeather, dustData, tmrDustData, todayWeather } =
    useWeatherData(today, hours, tmrToday, tomorrow);
  const { gradient, startRGBA, endRGBA, handleMouseMove, dayColors } = useColor(
    nowWeather,
    dustData,
    tmrWeather,
    tmrDustData,
    todayWeather,
    hours
  );

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [slider, setSlider] = useState(false);
  const handleOutsideClick = (e: React.MouseEvent) => {
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
      <S.CircleWrapper>
        <S.Today startRGBA={startRGBA} onClick={() => setActiveModal("today")}>
          Now
        </S.Today>
        <S.SunMovement
          onClick={(e) => {
            setSlider((prev) => !prev);
          }}
        >
          Today
        </S.SunMovement>
        <S.Tomorrow
          endRGBA={endRGBA}
          onClick={() => setActiveModal("tomorrow")}
        >
          Tomorrow
        </S.Tomorrow>
      </S.CircleWrapper>
      <S.ModalWrapper>
        <WeatherModal
          isOpen={activeModal === "today"}
          onClose={() => setActiveModal(null)}
          weatherData={nowWeather}
          dustData={dustData}
          colorRGBA={{ startRGBA, endRGBA }}
          modalType="today"
        />
        <ColorSlider
          isOpen={slider}
          onClose={() => setSlider(false)}
          colors={dayColors}
          todayWeather={todayWeather}
        />

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
