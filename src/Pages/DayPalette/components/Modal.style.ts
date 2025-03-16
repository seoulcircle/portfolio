/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";

// Glassmorphism 스타일 모달
export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  min-width: 400px;
  height: 50vh;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  color: white;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 1.2;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  color: white;
`;
export const DataBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DateText = styled.p`
  font-size: 24px;
  font-weight: 400;
`;

export const TimeText = styled.p`
  font-size: 40px;
  font-weight: bold;
  & span {
    font-size: 20px;
    margin-left: 5px;
    opacity: 0.5;
  }
`;

export const WeatherText = styled.p`
  font-size: 24px;
  margin: 4px 0;
`;

export const PaletteBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PaletteTitle = styled.p`
  font-size: 24px;
  margin-top: 10px;
`;

export const PaletteText = styled.p`
  font-size: 24px;
`;

export const ColorCircle = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  background: ${({ color }) => color};
  border-radius: 50%;
  display: inline-block;
  margin-top: 10px;
`;
