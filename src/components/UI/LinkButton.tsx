import { Link } from "react-router-dom";
import styled from "styled-components";
import { buttonStyle } from "./Button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  $pill?: boolean;
  $appearance?: "primary" | "secondary";
}

const LinkButton = styled(Link)<ButtonProps>`
  ${buttonStyle}
`;

export default LinkButton;