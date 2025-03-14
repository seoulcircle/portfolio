import styled from "@emotion/styled";

export const ColorPalette = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: ${({ color }) => color};
`;
