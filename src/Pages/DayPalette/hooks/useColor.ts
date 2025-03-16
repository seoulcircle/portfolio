import { useState, useMemo, useEffect } from "react";
import { getRGBA, getLinearGradient } from "../DayUtils";

const useColor = (
  nowWeather: { T1H?: string; REH?: string } | null,
  dustData: { pm10Value?: string } | null,
  tmrWeather: { TMP?: string; REH?: string } | null,
  tmrDustData: { pm10Value24?: string } | null,
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

  useEffect(() => {
    setGradient(getLinearGradient(180, startRGBA, endRGBA));
  }, [startRGBA, endRGBA]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const angle = (e.clientX / window.innerWidth) * 360; // 마우스 이동에 따라 각도 변경
    setGradient(getLinearGradient(angle, startRGBA, endRGBA));
  };

  return { startRGBA, endRGBA, gradient, handleMouseMove };
};

export default useColor;
