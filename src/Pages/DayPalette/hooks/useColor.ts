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

  // 그라디언트 시작 색상
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

  // 그라디언트 끝 색상
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

  // Today의 원형 색상
  const dayColors = useMemo(() => {
    return todayWeather.map((data) => ({
      hour: +(data.time ?? 0),
      color: getRGBA(+(data.TMP ?? 0), +(data.REH ?? 0), +(data.time ?? 0), 50),
    }));
  }, [todayWeather]);

  // 첫 로딩시 그라디언트 각도 설정
  useEffect(() => {
    setGradient(getLinearGradient(180, startRGBA, endRGBA));
  }, [startRGBA, endRGBA]);

  // 마우스의 위치에 따라 그라디언트 각도 변경
  const handleMouseMove = (e: React.MouseEvent) => {
    requestAnimationFrame(() => {
      const angle = (e.clientX / window.innerWidth) * 360;
      setGradient(getLinearGradient(angle, startRGBA, endRGBA));
    });
  };

  return { startRGBA, endRGBA, gradient, handleMouseMove, dayColors };
};

export default useColor;
