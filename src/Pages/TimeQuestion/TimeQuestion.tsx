import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { AnimatePresence, motion } from "framer-motion";

const TimeQuestion = () => {
  const [timeHour, setTimeHour] = useState<string>("00");
  const [timeMinutes, setTimeMinutes] = useState<string>("00");
  const [timeSeconds, setTimeSeconds] = useState<string>("00");
  const [minuteList, setMinuteList] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 시간 갱신
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours().toString().padStart(2, "0");
      const minute = now.getMinutes().toString().padStart(2, "0");
      const second = now.getSeconds().toString().padStart(2, "0");

      setTimeHour(hour);
      setTimeMinutes(minute);
      setTimeSeconds(second);

      const minuteNum = now.getMinutes();
      const fullList = Array.from({ length: minuteNum + 2 }, (_, i) =>
        i.toString().padStart(2, "0")
      );
      setMinuteList(fullList);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 스크롤 맨 아래로 자동 내리기
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [timeMinutes]);

  return (
    <S.Wrapper>
      <S.Time>
        <S.Hours>
          <span>{timeHour}</span>
        </S.Hours>

        <S.Minutes ref={containerRef}>
          <S.MinuteList>
            <AnimatePresence initial={false}>
              {minuteList.map((minute) => (
                <motion.div
                  key={minute}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <S.Minute>
                    <S.MinuteTime>{minute}</S.MinuteTime>
                    <S.Question>What is your thought now?</S.Question>
                  </S.Minute>
                </motion.div>
              ))}
            </AnimatePresence>
          </S.MinuteList>
        </S.Minutes>

        <S.Seconds>
          <span>{timeSeconds}</span>
        </S.Seconds>
      </S.Time>
    </S.Wrapper>
  );
};

export default TimeQuestion;
