/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const breakpoints = {
  mobile: "639px",
};

export const Overlay = styled(motion.div)`
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
  min-width: 430px;
  min-height: 400px;
  position: relative;
  text-align: center;
  color: white;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 1.2;
  @media (max-width: ${breakpoints.mobile}) {
    min-width: 300px;
    min-height: 350px;
  }
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
  font-weight: 300;
`;

export const TimeText = styled.p`
  font-size: 44px;
  font-weight: 500;
  border-bottom: 1px solid white;
  padding-bottom: 5px;
  & span {
    font-size: 20px;
    margin-left: 5px;
    opacity: 0.5;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 36px;
  }
`;

export const WeatherText = styled.p`
  font-size: 30px;
  font-weight: 300;
  margin: 3px 0;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

export const PaletteBox = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PaletteTitle = styled.p`
  font-size: 24px;
  margin-top: 10px;
  font-size: 26px;
  font-weight: 300;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

export const PaletteText = styled.p`
  font-size: 24px;
`;

export const ColorCircle = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  background: ${({ color }) => color};
  border-radius: 25px;
  display: inline-block;
  margin-top: 10px;
  margin-left: 20px;
  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 0;
  }
`;
