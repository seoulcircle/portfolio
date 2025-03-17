import styled from "@emotion/styled";
const breakpoints = {
  mobile: "639px",
};
export const Wrapper = styled.div<{ gradient: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90%;
  min-height: 400px;
  background: ${(props) => props.gradient};
  transition: background 0.1s ease-out;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
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
  & button {
    width: 100px;
    height: 100px;
    padding: 20px;
    border-radius: 50px;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: white;
    text-align: center;
    cursor: pointer;
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: row;
    gap: 10vw;
    width: 100%;
    height: auto;
    margin: 0;
    margin-top: 30px;
    align-items: center;
    & button {
      width: 80px;
      height: 80px;
      padding: 0;
      border-radius: 40px;
      font-size: 16px;
    }
  }
`;
export const Today = styled.button<{ startRGBA: string }>`
  background-color: ${(props) => `${props.startRGBA}`};
`;
export const SunMovement = styled.button`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;
export const Tomorrow = styled.button<{ endRGBA: string }>`
  background-color: ${(props) => `${props.endRGBA}`};
`;

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 500px;
  @media (max-width: ${breakpoints.mobile}) {
    min-width: auto;
  }
`;
