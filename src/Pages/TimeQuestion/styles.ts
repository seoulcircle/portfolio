import styled from "@emotion/styled";
const breakpoints = {
  mobile: "639px",
};
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 90%;
  min-width: 980px;
`;

export const Time = styled.div`
  display: flex;
  font-size: 100px;
  font-weight: 300;
  gap: 10px;
`;
export const Hours = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
`;

export const Minutes = styled.div`
  display: flex;
  height: 100%;
  width: 650px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export const MinuteList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Minute = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 205px;
  margin-right: 15px;
  border-bottom: 1px solid black;
`;
export const MinuteTime = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Question = styled.div`
  font-size: 30px;
`;

export const Seconds = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
`;
