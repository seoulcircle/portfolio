import { AnimatePresence } from "framer-motion";
import * as S from "./Modal.style";

interface WeatherData {
  T1H?: string; // 오늘 온도
  TMP?: string; // 내일 온도
  REH?: string; // 습도 (공통)
}

interface DustData {
  pm10Value?: string;
  pm10Value24?: string;
}

interface ColorRGBA {
  startRGBA?: string;
  endRGBA?: string;
}

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  weatherData: WeatherData | null;
  dustData: DustData | null;
  colorRGBA: ColorRGBA | null;
  modalType: "today" | "tomorrow";
}

const WeatherModal = ({
  isOpen,
  onClose,
  weatherData,
  dustData,
  colorRGBA,
  modalType,
}: WeatherModalProps) => {
  const now = new Date();
  const today =
    modalType === "today"
      ? `${now.getFullYear()}.${(now.getMonth() + 1)
          .toString()
          .padStart(2, "0")}.${now.getDate().toString().padStart(2, "0")}`
      : `${now.getFullYear()}.${(now.getMonth() + 1)
          .toString()
          .padStart(2, "0")}.${(now.getDate() + 1)
          .toString()
          .padStart(2, "0")}`;

  const time =
    modalType === "today"
      ? `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : `${now.getHours().toString().padStart(2, "0")}:00`;

  const temperature =
    modalType === "today"
      ? Number(weatherData?.T1H) || 0
      : Number(weatherData?.TMP) || 0;

  const fineDust =
    modalType === "today"
      ? Number(dustData?.pm10Value) || 0
      : Number(dustData?.pm10Value24) || 0;

  const weatherColor =
    modalType === "today" ? colorRGBA?.startRGBA : colorRGBA?.endRGBA;

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
                {time}
                {modalType === "tomorrow" ? <span>기준</span> : null}
              </S.TimeText>
            </S.DataBox>
            <S.DataBox>
              <S.WeatherText>TEMPERATURE : {temperature}℃</S.WeatherText>
              <S.WeatherText>
                HUMIDITY : {Number(weatherData?.REH) || 0}%
              </S.WeatherText>
              <S.WeatherText>FINE DUST : {fineDust}㎍/㎥</S.WeatherText>
            </S.DataBox>
            <S.PaletteBox>
              <S.PaletteTitle>
                WEATHER PALETTE :<br /> {weatherColor}
              </S.PaletteTitle>
              <S.ColorCircle color={weatherColor ?? ""} />
            </S.PaletteBox>
          </S.ModalContent>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};

export default WeatherModal;
