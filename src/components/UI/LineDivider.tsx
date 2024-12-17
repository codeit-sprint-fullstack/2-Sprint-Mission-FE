import styled from "styled-components";

interface InputFieldProps {
  $margin?: string;
}

const LineDivider = styled.hr<InputFieldProps>`
  width: 100%;
  border: none;
  height: 1px;
  background-color: var(--gray-200);
  margin: ${({ $margin }) => $margin || "16px 0"};
`;

export default LineDivider;
