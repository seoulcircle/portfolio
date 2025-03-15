import styled from "@emotion/styled";

export const Wrapper = styled.div<{ gradient: string }>`
  width: 100vw;
  height: 90%;
  background: ${(props) => props.gradient};
  transition: background 0.1s ease-out;
`;

export const DotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  height: 100%;
  margin-left: 40px;
`;
export const Today = styled.button<{ startRGBA: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${(props) => `${props.startRGBA}`};
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  padding: 20px;
  color: white;
  text-align: center;
  cursor: pointer;
`;
export const SunMovement = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.2); /* 반투명 배경 */
  backdrop-filter: blur(10px); /* 유리 효과 */
  -webkit-backdrop-filter: blur(10px); /* Safari 지원 */
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  padding: 20px;
  color: white;
  text-align: center;
  cursor: pointer;
`;
export const Tomorrow = styled.button<{ endRGBA: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${(props) => `${props.endRGBA}`};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  border: none;
  padding: 20px;
  color: white;
  text-align: center;
  cursor: pointer;
`;
