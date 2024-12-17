import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";
import { buttonStyle } from "./Button";

interface LinkButtonProps extends LinkProps {
  $pill?: boolean;
  $appearance?: string;
}

const LinkButton = styled(Link) <LinkButtonProps>`
  ${buttonStyle}
`;

export default LinkButton;
