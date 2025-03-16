/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Overlay = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 800px;
`;

export const SliderWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px; */
  width: 60%;
  margin-bottom: 190px;
`;

export const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  input[type="range"] {
    -webkit-appearance: none; /* 기본 스타일 제거 */
    width: 100%;
    height: 1px;
    background: black; /* 트랙 색상 */
    outline: none;
    transition: all 0.3s ease-in-out;
  }
  & ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: black;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
`;

export const SliderSun = styled(motion.div)`
  position: absolute;
  top: -150px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  filter: blur(5px);
`;
export const TimeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  position: relative;
`;

export const TimeLabel = styled.span<{ isActive: boolean }>`
  font-size: ${(props) => (props.isActive ? "16px" : "14px")};
  color: ${(props) => (props.isActive ? "#fff" : "#9e9e9e")};
  transition: all 0.3s;
  width: 10px;
  height: 16px;
`;
