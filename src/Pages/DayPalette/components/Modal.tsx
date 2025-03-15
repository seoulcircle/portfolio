import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import * as S from "./Modal.style";

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  nowWeather: { T1H?: string; RN1?: string } | null;
  nowDustData: { pm10Value?: string } | null;
  startRGBA: string;
}

interface TmrWeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  tmrWeather: { TMP?: string; REH?: string } | null;
  tmrDustData: { pm10Value24?: string } | null;
  startRGBA: string;
}

const WeatherModal = ({
  isOpen,
  onClose,
  nowWeather,
  nowDustData,
  startRGBA,
}: WeatherModalProps) => {
  const [today, setToday] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");

  useEffect(() => {
    const now = new Date();

    // YYYY.MM.DD
    const formattedDate = `${now.getFullYear()}.${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${now.getDate().toString().padStart(2, "0")}`;
    setToday(formattedDate);

    // HH:MM
    setHours(now.getHours().toString().padStart(2, "0"));
    setMinutes(now.getMinutes().toString().padStart(2, "0"));
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <S.ModalContent
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.CloseButton onClick={onClose}>×</S.CloseButton>
            <S.DataBox>
              <S.DateText>{today}</S.DateText>
              <S.TimeText>
                {hours}:{minutes}
              </S.TimeText>
            </S.DataBox>
            <S.DataBox>
              <S.WeatherText>
                TEMPERATURE : {nowWeather?.T1H ?? 0}℃
              </S.WeatherText>
              <S.WeatherText>HUMIDITY : {nowWeather?.RN1 ?? 0}%</S.WeatherText>
              <S.WeatherText>
                FINE DUST : {nowDustData?.pm10Value ?? 0}㎍/㎥
              </S.WeatherText>
            </S.DataBox>
            <S.PaletteBox>
              <S.PaletteTitle>
                WEATHER PALETTE :<br /> {startRGBA}
              </S.PaletteTitle>

              <S.ColorCircle color={startRGBA} />
            </S.PaletteBox>
          </S.ModalContent>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};

export default WeatherModal;
