import { useEffect, useState, useMemo } from "react";
import { getNowWeather, getTmrWeather, getDustData, IDustData } from "./DayApi";
import * as S from "./styles";
import { getRGBA, getLinearGradient } from "./DayUtils";
import WeatherModal from "./components/Modal";

const DayPalette = () => {
  const [nowWeather, setNowWeather] = useState<{
    T1H?: string;
    RN1?: string;
  } | null>(null);
  const [tmrWeather, setTmrWeather] = useState<{
    TMP?: string;
    REH?: string;
  } | null>(null);
  const [dustData, setDustData] = useState<{ pm10Value?: string } | null>(null);
  const [tmrDustData, setTmrDustData] = useState<{
    pm10Value24?: string;
  } | null>(null);
  const [gradient, setGradient] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

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
  const tmrToday =
    now.getHours() < 6
      ? formatDate(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
        )
      : formatDate(now);
  const tomorrow = formatDate(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  );

  useEffect(() => {
    getNowWeather(today, hours + "00")
      .then((data) => {
        const tmpValue = data.find(
          (item) => item.category === "T1H"
        )?.obsrValue;
        const rehValue = data.find(
          (item) => item.category === "RN1"
        )?.obsrValue;
        setNowWeather({ T1H: tmpValue, RN1: rehValue });
      })
      .catch(console.error);

    getTmrWeather(tmrToday)
      .then((data) => {
        const filteredData = data.filter(
          (item) =>
            item.fcstDate === tomorrow &&
            item.fcstTime === hours + "00" &&
            (item.category === "TMP" || item.category === "REH")
        );

        const tmpValue = filteredData.find(
          (item) => item.category === "TMP"
        )?.fcstValue;
        const rehValue = filteredData.find(
          (item) => item.category === "REH"
        )?.fcstValue;

        setTmrWeather({ TMP: tmpValue, REH: rehValue });
      })
      .catch(console.error);

    getDustData()
      .then((data: IDustData[]) => {
        const filteredData = data.find((item) => item.stationName === "종로구");
        setDustData(
          filteredData ? { pm10Value: filteredData.pm10Value } : null
        );
        setTmrDustData(
          filteredData ? { pm10Value24: filteredData.pm10Value24 } : null
        );
      })
      .catch(console.error);
  }, [today, hours, tomorrow, tmrToday]);

  const startRGBA = useMemo(
    () =>
      getRGBA(
        +(nowWeather?.T1H ?? 0),
        +(nowWeather?.RN1 ?? 0),
        +hours,
        +(dustData?.pm10Value ?? 0)
      ),
    [nowWeather, dustData, hours]
  );

  const endRGBA = useMemo(
    () =>
      getRGBA(
        +(tmrWeather?.TMP ?? 0),
        +(tmrWeather?.REH ?? 0),
        +hours,
        +(tmrDustData?.pm10Value24 ?? 0)
      ),
    [tmrWeather, tmrDustData, hours]
  );

  useEffect(() => {
    setGradient(getLinearGradient(180, startRGBA, endRGBA));
  }, [startRGBA, endRGBA]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const angle = (e.clientX / window.innerWidth) * 360; // 마우스 이동에 따라 각도 변경
    setGradient(getLinearGradient(angle, startRGBA, endRGBA));
  };

  return (
    <S.Wrapper gradient={gradient} onMouseMove={handleMouseMove}>
      <S.DotWrapper>
        <S.Today startRGBA={startRGBA} onClick={() => setIsOpen(true)}>
          Today
        </S.Today>
        <WeatherModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          nowWeather={nowWeather}
          nowDustData={dustData}
          startRGBA={startRGBA}
        />
        <S.SunMovement />
        <S.Tomorrow endRGBA={endRGBA}></S.Tomorrow>
        <WeatherModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          tmrWeather={tmrWeather}
          tmrDustData={tmrDustData}
          startRGBA={startRGBA}
        />
      </S.DotWrapper>
    </S.Wrapper>
  );
};

export default DayPalette;
