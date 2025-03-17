import styled from "@emotion/styled";
const breakpoints = {
  mobile: "639px",
};
export const Wrapper = styled.div<{ gradient: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90%;
  background: ${(props) => props.gradient};
  transition: background 0.1s ease-out;
  min-height: 400px;
  @media (max-width: ${breakpoints.mobile}) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  height: 100%;
  width: 100px;
  margin-left: 40px;
  z-index: 999;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: row;
    gap: 10vw;
    width: 100%;
    margin: 0;
    margin-top: 20px;
    height: auto;
    align-items: center;
  }
`;
export const Today = styled.button<{ startRGBA: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${(props) => `${props.startRGBA}`};
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  color: white;
  text-align: center;
  cursor: pointer;
  @media (max-width: ${breakpoints.mobile}) {
    width: 70px;
    height: 70px;
    border-radius: 35px;
    padding: 0;
  }
`;
export const SunMovement = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  color: white;
  text-align: center;
  cursor: pointer;
  @media (max-width: ${breakpoints.mobile}) {
    width: 70px;
    height: 70px;
    border-radius: 35px;
    padding: 0;
  }
`;
export const Tomorrow = styled.button<{ endRGBA: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${(props) => `${props.endRGBA}`};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  padding: 20px;
  color: white;
  text-align: center;
  cursor: pointer;
  @media (max-width: ${breakpoints.mobile}) {
    width: 70px;
    height: 70px;
    border-radius: 35px;
    padding: 0;
  }
`;

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 500px;
  @media (max-width: ${breakpoints.mobile}) {
    min-width: auto;
  }
`;
