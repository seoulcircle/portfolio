import { useState, useMemo, useEffect } from "react";
import { getRGBA, getLinearGradient } from "../DayUtils";

const useColor = (
  nowWeather: { T1H?: string; REH?: string } | null,
  dustData: { pm10Value?: string } | null,
  tmrWeather: { TMP?: string; REH?: string } | null,
  tmrDustData: { pm10Value24?: string } | null,
  todayWeather: { time?: string; TMP?: string; REH?: string }[],
  hours: string
) => {
  const [gradient, setGradient] = useState<string>("");

  const startRGBA = useMemo(
    () =>
      getRGBA(
        +(nowWeather?.T1H ?? 0),
        +(nowWeather?.REH ?? 0),
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
        (+hours + 12) / 24,
        +(tmrDustData?.pm10Value24 ?? 0)
      ),
    [tmrWeather, tmrDustData, hours]
  );

  const dayColors = useMemo(() => {
    return todayWeather.map((data) => ({
      hour: +(data.time ?? 0), // `time`을 숫자로 변환하여 `hour` 필드에 저장
      color: getRGBA(+(data.TMP ?? 0), +(data.REH ?? 0), +(data.time ?? 0), 50),
    }));
  }, [todayWeather]);

  useEffect(() => {
    setGradient(getLinearGradient(180, startRGBA, endRGBA));
  }, [startRGBA, endRGBA]);

  const handleMouseMove = (e: React.MouseEvent) => {
    requestAnimationFrame(() => {
      const angle = (e.clientX / window.innerWidth) * 360;
      setGradient(getLinearGradient(angle, startRGBA, endRGBA));
    });
  };

  return { startRGBA, endRGBA, gradient, handleMouseMove, dayColors };
};

export default useColor;
