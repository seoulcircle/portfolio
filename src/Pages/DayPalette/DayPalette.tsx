import { useState } from "react";
import * as S from "./styles";
import WeatherModal from "./components/Modal";
import useTime from "./hooks/useTime";
import useWeatherData from "./hooks/useWeatherData";
import useColor from "./hooks/useColor";

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

  return (
    <S.Wrapper gradient={gradient} onMouseMove={handleMouseMove}>
      <S.DotWrapper>
        <S.Today startRGBA={startRGBA} onClick={() => setActiveModal("today")}>
          Today
        </S.Today>
        <WeatherModal
          isOpen={activeModal === "today"}
          onClose={() => setActiveModal(null)}
          weatherData={nowWeather}
          dustData={dustData}
          colorRGBA={{ startRGBA, endRGBA }}
          modalType="today"
        />
        <S.SunMovement />
        <S.Tomorrow
          endRGBA={endRGBA}
          onClick={() => setActiveModal("tomorrow")}
        >
          Tomorrow
        </S.Tomorrow>
        <WeatherModal
          isOpen={activeModal === "tomorrow"}
          onClose={() => setActiveModal(null)}
          weatherData={tmrWeather}
          dustData={tmrDustData}
          colorRGBA={{ startRGBA, endRGBA }}
          modalType="tomorrow"
        />
      </S.DotWrapper>
    </S.Wrapper>
  );
};

export default DayPalette;
